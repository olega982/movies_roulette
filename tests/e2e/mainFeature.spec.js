import { test, expect } from '@playwright/test'

const locators = {
  randomButton: '[testId="getMovie"]',
  movieCard: '[testId="movieCard"]',
  movieTitle: '[testId="movieTitle"]',
  movieGenres: '[testId="movieGenres"]',
  movieRating: '[testId="movieRating"]',
  voteCount: '[testId="voteCount"]',
  startYearInput: '[testId="startYear"]',
  endYearInput: '[testId="endYear"]',
  genreSelect: '[testId="genres"]',
}

const baseUrl = 'http://localhost:3000'
const filmGenre = {
  family: '10751',
}

test.describe('Main business flow process', () => {
  test('Select random movie with default settings', async ({ page }) => {
    await page.goto(baseUrl)
    await page.locator(locators.randomButton).click()

    const movieCard = page.locator(locators.movieCard)
    await expect(movieCard).toBeVisible()

    const ratingText = await movieCard.locator(locators.movieRating).innerText()
    const voteCountText = await movieCard
      .locator(locators.voteCount)
      .innerText()
    const genresText = await movieCard.locator(locators.movieGenres).innerText()

    const rating = parseFloat(ratingText.split('/')[0])
    const voteCount = parseInt(voteCountText.match(/\d+/)[0], 10)
    const selectedGenre = 'ACTION'
    console.log(rating, voteCount, selectedGenre)

    expect(rating).toBeGreaterThanOrEqual(7)
    expect(voteCount).toBeGreaterThan(100)
    expect(genresText).toContain(selectedGenre)
  })

  test('Select movie by year and genre', async ({ page }) => {
    await page.goto(baseUrl)
    await page.locator(locators.genreSelect).selectOption(filmGenre.family)

    // Set the year range
    await page.locator(locators.startYearInput).fill('2015')
    await page.locator(locators.endYearInput).fill('2017')

    // Click the random button
    await page.locator(locators.randomButton).click()

    const movieCard = page.locator(locators.movieCard)
    await expect(movieCard).toBeVisible()

    const title = await movieCard.locator(locators.movieTitle).innerText()
    const year = parseInt(title.split('(')[1].trim())
    const genresText = await movieCard.locator(locators.movieGenres).innerText()

    // Verify the year and genre
    expect(year).toBeGreaterThanOrEqual(2015)
    expect(year).toBeLessThanOrEqual(2017)
    expect(genresText).toContain('FAMILY')
  })
})
