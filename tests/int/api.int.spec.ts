import { getPayload, Payload } from 'payload'
import config from '@/payload.config'
import { portfolioSeed } from '../../src/seed/portfolio'
import type { Category } from '../../src/payload-types'

import { describe, it, beforeAll, expect } from 'vitest'
import { seedPortfolio } from '../helpers/seedPortfolio'

let payload: Payload

describe('API', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
    await seedPortfolio()
  })

  it('fetches users', async () => {
    const users = await payload.find({
      collection: 'users',
    })
    expect(users).toBeDefined()
  })

  it('hides unpublished posts from public queries', async () => {
    const draft = await payload.find({
      collection: 'posts',
      limit: 1,
      overrideAccess: false,
      where: { slug: { equals: 'draft-not-public' } },
    })

    expect(draft.docs).toHaveLength(0)
  })

  it('exposes the seeded categories to public reads', async () => {
    const categories = await payload.find({
      collection: 'categories',
      limit: 10,
      overrideAccess: false,
      sort: 'slug',
    })

    expect(categories.docs.map(({ name, slug }) => ({ name, slug }))).toEqual([
      { name: 'AI & ML', slug: 'ai-ml' },
      { name: 'iOS', slug: 'ios' },
      { name: 'Personal', slug: 'personal' },
    ])
  })

  it('supports optional multiple categories and filtered public posts', async () => {
    const categories = await payload.find({
      collection: 'categories',
      limit: 2,
      overrideAccess: true,
      sort: 'slug',
      where: { slug: { in: ['ai-ml', 'ios'] } },
    })
    const slug = `category-test-${Date.now()}`
    let postId: number | undefined

    try {
      const post = await payload.create({
        collection: 'posts',
        data: {
          ...portfolioSeed.posts[0],
          categories: categories.docs.map((category) => category.id),
          slug,
          title: 'Category relationship test',
        },
        overrideAccess: true,
      })
      postId = post.id

      const publicPost = await payload.findByID({
        collection: 'posts',
        depth: 1,
        id: post.id,
        overrideAccess: false,
      })
      const populatedCategories = (publicPost.categories ?? []).filter(
        (category): category is Category => typeof category !== 'number',
      )

      expect(populatedCategories.map((category) => category.slug)).toEqual(['ai-ml', 'ios'])

      const filteredPosts = await payload.find({
        collection: 'posts',
        overrideAccess: false,
        where: { categories: { contains: categories.docs[0].id } },
      })

      expect(filteredPosts.docs.some(({ id }) => id === post.id)).toBe(true)
    } finally {
      if (postId) {
        await payload.delete({ collection: 'posts', id: postId, overrideAccess: true })
      }
    }
  })

  it('keeps category assignment optional', async () => {
    const slug = `uncategorized-test-${Date.now()}`
    let postId: number | undefined

    try {
      const post = await payload.create({
        collection: 'posts',
        data: { ...portfolioSeed.posts[0], slug, title: 'Uncategorized post test' },
        overrideAccess: true,
      })
      postId = post.id

      expect(post.categories ?? []).toHaveLength(0)
    } finally {
      if (postId) {
        await payload.delete({ collection: 'posts', id: postId, overrideAccess: true })
      }
    }
  })

  it('removes category assignments without deleting posts', async () => {
    const categorySlug = `delete-category-${Date.now()}`
    const category = await payload.create({
      collection: 'categories',
      data: { name: 'Delete category test', slug: categorySlug },
      overrideAccess: true,
    })
    const post = await payload.create({
      collection: 'posts',
      data: { ...portfolioSeed.posts[0], categories: [category.id], slug: `${categorySlug}-post` },
      overrideAccess: true,
    })

    try {
      await payload.delete({ collection: 'categories', id: category.id, overrideAccess: true })

      const remainingPost = await payload.findByID({
        collection: 'posts',
        depth: 1,
        id: post.id,
        overrideAccess: true,
      })

      expect(remainingPost.categories ?? []).toHaveLength(0)
    } finally {
      await payload.delete({ collection: 'posts', id: post.id, overrideAccess: true })
    }
  })
})
