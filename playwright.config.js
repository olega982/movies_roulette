import { devices } from '@playwright/test'
import dotenv from 'dotenv'
const { defineConfig } = require('@playwright/test')

// Load environment variables
dotenv.config()

module.exports = defineConfig({
  timeout: 30000, // Global timeout for each test
  use: {
    headless: true, // Run tests in headless mode
    viewport: { width: 1280, height: 720 }, // Default viewport for desktop
    actionTimeout: 10000, // Timeout for actions like clicks and fills
    baseURL: 'https://api.themoviedb.org/3',
    navigationTimeout: 30000, // Timeout for navigation actions
    reporter: [['html', { outputFolder: 'playwright-report' }]],
  },
  projects: [
    {
      name: 'Desktop',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'Mobile',
      testDir: 'tests/visualTests',
      use: {
        browserName: 'chromium',
        viewport: { width: 375, height: 812 },
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)',
      },
    },
  ],
})
