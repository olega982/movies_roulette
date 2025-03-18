import { test, expect } from '@playwright/test'

const locators = {
  randomButton: '[testId="getMovie"]',
  movieCard: '[testId="movieCard"]',
  pageHeader: '[testId="pageHeader"]',
}

const baseUrl = 'http://localhost:3000'

test.describe('Main Page Screenshot Tests', () => {
  test('Take Main Page screenshot', async ({ page }) => {
    await page.goto(baseUrl)
    await expect(page.locator(locators.pageHeader)).toBeVisible()
    await page.screenshot({
      path: `screenshots/screenshot-${test.info().project.name}.png`,
    })
  })
})
