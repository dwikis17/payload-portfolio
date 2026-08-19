import type { MetadataRoute } from 'next'

import { getCategories, getPosts, getProjects } from '@/lib/portfolio'

const siteUrl = 'https://heydwiki.com'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ponytail: sitemap queries are capped at 1,000 records; split with generateSitemaps if needed.
  const [categories, posts, projects] = await Promise.all([
    getCategories(),
    getPosts({ limit: 1000 }),
    getProjects({ limit: 1000 }),
  ])

  return [
    '/',
    '/blog',
    '/experience',
    '/projects',
    ...categories.map((category) => `/blog/category/${category.slug}`),
    ...posts.map((post) => ({
      lastModified: post.updatedAt,
      url: `/blog/${post.slug}`,
    })),
    ...projects.map((project) => ({
      lastModified: project.updatedAt,
      url: `/projects/${project.slug}`,
    })),
  ].map((entry) =>
    typeof entry === 'string'
      ? { url: `${siteUrl}${entry}` }
      : { ...entry, url: `${siteUrl}${entry.url}` },
  )
}
