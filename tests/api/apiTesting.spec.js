import { test, expect } from '@playwright/test'

const API_KEY = process.env.REACT_APP_TMDB_KEY

test.describe('Movie API Tests', () => {
  test('should fetch movie genres', async ({ request, baseURL }) => {
    const response = await request.get(
      `${baseURL}/genre/movie/list?api_key=${API_KEY}`
    )
    console.log('api key', API_KEY)
    expect(response.ok()).toBeTruthy()
    const data = await response.json()
    expect(data.genres).toBeDefined()
    expect(data.genres.length).toBeGreaterThan(0)
  })

  test('should discover movies', async ({ request }) => {
    const response = await request.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28&primary_release_date.gte=2010-01-01&primary_release_date.lte=2020-12-31&sort_by=popularity.desc&vote_average.gte=7&vote_count.gte=100&page=1`
    )

    expect(response.ok()).toBeTruthy()
    const data = await response.json()
    expect(data.results).toBeDefined()
    expect(data.results.length).toBeGreaterThan(0)
  })

  test('should fetch movie details', async ({ request }) => {
    const movieId = 550 // Example movie ID
    const response = await request.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`
    )
    expect(response.ok()).toBeTruthy()
    const data = await response.json()
    expect(data.id).toBe(movieId)
    expect(data.title).toBeDefined()
  })
})
