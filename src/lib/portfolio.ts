import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import type { Category, Experience, Media, Post, Project } from '@/payload-types'
import { getPayload } from 'payload'

// ponytail: time-based cache; add publish-triggered tag invalidation if 60s staleness is too high.
const PORTFOLIO_CACHE_TTL = 60

async function getPortfolioPayload() {
  return getPayload({ config })
}

const getCachedProjects = unstable_cache(
  async (featuredOnly: boolean, limit: number) => {
    const payload = await getPortfolioPayload()
    const result = await payload.find({
      collection: 'projects',
      depth: 1,
      limit,
      overrideAccess: false,
      sort: 'order',
      ...(featuredOnly ? { where: { featured: { equals: true } } } : {}),
    })

    return result.docs as Project[]
  },
  ['portfolio-projects'],
  { revalidate: PORTFOLIO_CACHE_TTL },
)

export function getProjects(options: { featuredOnly?: boolean; limit?: number } = {}) {
  return getCachedProjects(options.featuredOnly ?? false, options.limit ?? 20)
}

const getCachedProject = unstable_cache(
  async (slug: string) => {
    const payload = await getPortfolioPayload()
    const result = await payload.find({
      collection: 'projects',
      depth: 1,
      limit: 1,
      overrideAccess: false,
      where: { slug: { equals: slug } },
    })

    return (result.docs[0] as Project | undefined) ?? null
  },
  ['portfolio-project'],
  { revalidate: PORTFOLIO_CACHE_TTL },
)

export function getProject(slug: string) {
  return getCachedProject(slug)
}

const getCachedExperiences = unstable_cache(
  async (limit: number) => {
    const payload = await getPortfolioPayload()
    const result = await payload.find({
      collection: 'experiences',
      depth: 1,
      limit,
      overrideAccess: false,
      sort: 'order',
    })

    return result.docs as Experience[]
  },
  ['portfolio-experiences'],
  { revalidate: PORTFOLIO_CACHE_TTL },
)

export function getExperiences(limit = 20) {
  return getCachedExperiences(limit)
}

const getCachedCategories = unstable_cache(
  async () => {
    const payload = await getPortfolioPayload()
    const result = await payload.find({
      collection: 'categories',
      depth: 0,
      limit: 100,
      overrideAccess: false,
      sort: 'name',
    })

    return result.docs as Category[]
  },
  ['portfolio-categories'],
  { revalidate: PORTFOLIO_CACHE_TTL },
)

export function getCategories() {
  return getCachedCategories()
}

const getCachedCategory = unstable_cache(
  async (slug: string) => {
    const payload = await getPortfolioPayload()
    const result = await payload.find({
      collection: 'categories',
      depth: 0,
      limit: 1,
      overrideAccess: false,
      where: { slug: { equals: slug } },
    })

    return (result.docs[0] as Category | undefined) ?? null
  },
  ['portfolio-category'],
  { revalidate: PORTFOLIO_CACHE_TTL },
)

export function getCategory(slug: string) {
  return getCachedCategory(slug)
}

const getCachedPosts = unstable_cache(
  async (limit: number, categoryId?: number) => {
    const payload = await getPortfolioPayload()
    const result = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      overrideAccess: false,
      sort: '-publishedAt',
      ...(categoryId === undefined ? {} : { where: { categories: { contains: categoryId } } }),
    })

    return result.docs as Post[]
  },
  ['portfolio-posts'],
  { revalidate: PORTFOLIO_CACHE_TTL },
)

export function getPosts({ limit = 20, categoryId }: { limit?: number; categoryId?: number } = {}) {
  return getCachedPosts(limit, categoryId)
}

const getCachedPost = unstable_cache(
  async (slug: string) => {
    const payload = await getPortfolioPayload()
    const result = await payload.find({
      collection: 'posts',
      depth: 1,
      limit: 1,
      overrideAccess: false,
      where: { slug: { equals: slug } },
    })

    return (result.docs[0] as Post | undefined) ?? null
  },
  ['portfolio-post'],
  { revalidate: PORTFOLIO_CACHE_TTL },
)

export function getPost(slug: string) {
  return getCachedPost(slug)
}

export function getMediaUrl(media: number | Media | null | undefined) {
  return media && typeof media !== 'number' ? media.url || null : null
}
