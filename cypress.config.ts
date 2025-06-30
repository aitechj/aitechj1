import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    chromeWebSecurity: false,
    defaultCommandTimeout: 8000,
    video: false,
    screenshotOnRunFailure: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    retries: { runMode: 2, openMode: 0 },
    env: {
      API_BASE_URL: 'https://aitechj-backend-v2.fly.dev',
    },
    setupNodeEvents(on, config) {
      
    },
  },
})
