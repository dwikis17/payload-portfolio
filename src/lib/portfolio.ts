import config from '@payload-config'
import type { Experience, Media, Post, Project } from '@/payload-types'
import { getPayload } from 'payload'

async function getPortfolioPayload() {
  return getPayload({ config })
}

export async function getProjects(options: { featuredOnly?: boolean; limit?: number } = {}) {
  const payload = await getPortfolioPayload()
  const result = await payload.find({
    collection: 'projects',
    depth: 1,
    limit: options.limit ?? 20,
    overrideAccess: false,
    sort: 'order',
    ...(options.featuredOnly ? { where: { featured: { equals: true } } } : {}),
  })

  return result.docs as Project[]
}

export async function getProject(slug: string) {
  const payload = await getPortfolioPayload()
  const result = await payload.find({
    collection: 'projects',
    depth: 1,
    limit: 1,
    overrideAccess: false,
    where: { slug: { equals: slug } },
  })

  return (result.docs[0] as Project | undefined) ?? null
}

export async function getExperiences(limit = 20) {
  const payload = await getPortfolioPayload()
  const result = await payload.find({
    collection: 'experiences',
    depth: 1,
    limit,
    overrideAccess: false,
    sort: 'order',
  })

  return result.docs as Experience[]
}

export async function getPosts(limit = 20) {
  const payload = await getPortfolioPayload()
  const result = await payload.find({
    collection: 'posts',
    depth: 1,
    limit,
    overrideAccess: false,
    sort: '-publishedAt',
  })

  return result.docs as Post[]
}

export async function getPost(slug: string) {
  const payload = await getPortfolioPayload()
  const result = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 1,
    overrideAccess: false,
    where: { slug: { equals: slug } },
  })

  return (result.docs[0] as Post | undefined) ?? null
}

export function getMediaUrl(media: number | Media | null | undefined) {
  return media && typeof media !== 'number' ? media.url || null : null
}
