const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://yaraworks.com/',
    chromeWebSecurity: false,
    failOnStatusCode: false,
    defaultCommandTimeout: 20000,
    projectId: 'ua8dd1',
    specPattern: 'cypress/e2e/**/*.cy.js',
  
      }
});
