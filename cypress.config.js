const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'https://tapsshop.pl',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    video: false,
  },
});