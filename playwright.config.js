// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  retries: 0,
  reporter: 
  [
  ['html', { outputFolder: 'test-results', open: 'never' }],
  ['allure-playwright']
  ],
  timeout: 30000,
  use: {
    baseURL: 'http://127.0.0.1:8000/',
    extraHTTPHeaders: 
    {
      'Content-Type': 'application/json',
   
    },
  }
});
