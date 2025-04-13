const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.airalo.com",
    supportFile: false,
    setupNodeEvents(on, config) {
      // implement node event listeners if needed
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    //supportFile: "cypress/support/e2e.js",
    defaultCommandTimeout: 10000,
    chromeWebSecurity: false // useful if dealing with cross-origin iframes
  }
});
