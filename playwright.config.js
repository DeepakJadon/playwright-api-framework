// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  retries: 0,
  reporter: [['html', { outputFolder: 'test-results', open: 'never' }]],
  timeout: 30000,
  use: {
    baseURL: 'https://reqres.in/api',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  },
});
