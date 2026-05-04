import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  
    reporter: 'html',
  
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
    
    baseURL: 'https://staging.testertestarudo.com/es',
    video: "retain-on-failure",
    screenshot: "only-on-failure",
    viewport: {width: 1200, height: 720},

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    navigationTimeout: 30000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  
  ],
  
});
