import { getPayload, Payload } from 'payload'
import config from '@/payload.config'

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
})
