import { getPayload } from 'payload'

import config from '../../src/payload.config.js'
import {
  seedCategories,
  seedPortfolio as seedPortfolioRecords,
} from '../../src/seed/portfolio.js'

export async function seedPortfolio(): Promise<void> {
  const payload = await getPayload({ config })
  await seedPortfolioRecords(payload)
  await seedCategories(payload)

  const [postResult, categoryResult] = await Promise.all([
    payload.find({
      collection: 'posts',
      limit: 1,
      overrideAccess: true,
      where: { slug: { equals: 'building-across-ios-and-the-web' } },
    }),
    payload.find({
      collection: 'categories',
      limit: 2,
      overrideAccess: true,
      sort: 'slug',
      where: { slug: { in: ['ai-ml', 'ios'] } },
    }),
  ])

  if (postResult.docs[0] && categoryResult.docs.length === 2) {
    await payload.update({
      collection: 'posts',
      id: postResult.docs[0].id,
      data: { categories: categoryResult.docs.map((category) => category.id) },
      overrideAccess: true,
    })
  }
}
