import { expect, test } from '@playwright/test'

import { seedPortfolio } from '../helpers/seedPortfolio'

test.describe('Frontend', () => {
  test.beforeAll(async () => {
    await seedPortfolio()
  })

  test('renders the portfolio homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await expect(page).toHaveTitle('Dwiki | Software Engineer')
    await expect(
      page.getByRole('heading', { name: 'A lifelong learner and software engineer.' }),
    ).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Selected projects' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Experience' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Writing' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Resume' }).first()).toHaveAttribute(
      'href',
      /docs\.google\.com/,
    )
    await expect(page.getByRole('link', { name: 'Email' }).last()).toHaveAttribute(
      'href',
      'mailto:dev.dwiki@gmail.com',
    )
    await expect(page.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      /linkedin\.com\/in\/heydwiki/,
    )
    await expect(page.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      /github\.com\/dwikis17/,
    )
  })

  test('renders project and writing detail pages', async ({ page }) => {
    await page.goto('http://localhost:3000/projects/eyespeak-assistive-tech')
    await expect(page.getByRole('heading', { name: 'Eyespeak | Assistive Tech' })).toBeVisible()
    await expect(
      page.getByText('Facial-expression controls turn small, intentional movements'),
    ).toBeVisible()

    await page.goto('http://localhost:3000/blog')
    await expect(page.getByRole('heading', { name: 'Notes from the work.' })).toBeVisible()
    await page.getByRole('link', { name: /Building across iOS and the web/ }).click()
    await expect(page).toHaveURL(/\/blog\/building-across-ios-and-the-web$/)
    await expect(
      page.getByRole('heading', { name: 'Building across iOS and the web' }),
    ).toBeVisible()
  })

  test('redirects legacy project URLs and hides drafts', async ({ page }) => {
    await page.goto('http://localhost:3000/projects/3d6a5f0d-f117-4a50-9600-3a3565a55528')
    await expect(page).toHaveURL(/\/projects\/eyespeak-assistive-tech$/)

    const draftResponse = await page.goto('http://localhost:3000/blog/draft-not-public')
    expect(draftResponse?.status()).toBe(404)
    await expect(page.getByText('This draft should never be visible')).not.toBeVisible()
  })
})
