import { getPayload } from 'payload'

import config from '../../src/payload.config.js'
import { seedPortfolio as seedPortfolioRecords } from '../../src/seed/portfolio.js'

export async function seedPortfolio(): Promise<void> {
  const payload = await getPayload({ config })
  await seedPortfolioRecords(payload)
}
