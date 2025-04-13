describe("Verify Airalo Japan eSIM package", () => {
  it("Searches for Japan and verifies the first Japan eSIM package", () => {
    // Step 1: Visit Airalo website
    cy.visit("https://www.airalo.com");
    cy.visit("/en");

    // Accept cookies if the banner appears
    cy.get("body").then($body => {
      if ($body.find('button:contains("ACCEPT")').length > 0) {
        cy.contains("button", "ACCEPT").click();
      }
    });
    cy.get("body").then($body => {
      if ($body.find("#wzrk-confirm").length > 0) {
        cy.get("#wzrk-confirm").click();
      }
    });
    //Change currency to USD
    cy.contains("€ EUR").click();
    cy.contains("United States dollar (USD) $").click();
    cy.contains("UPDATE").click();

    // Step 2: Search for "Japan"
    cy.get(
      'input[placeholder*="Search data packs for 200+ countries and regions"]'
    ).type("Japan");

    // Wait for the dropdown to appear and target the "Lokal" section
    cy.contains(".countries-list", "Local") // find the section
      .should("be.visible")
      .within(() => {
        cy.contains("Japan").click(); // click Japan from within Lokal
      });

    cy.wait(2000); // Give it time to populate dropdown

    // Step 3: Select the first eSIM package

    cy.get(".sim-item-link") // all packages
      .eq(1) // second package
      .contains("BUY NOW") // within it, find the Buy Now button
      .click(); // click it

    // Step 4: Verify the package details in the popup
    cy.get(".sim-detail-header").within(() => {
      cy.contains("p", "Moshi Moshi").should("be.visible");
      cy.contains("COVERAGE")
        .next()
        .should("contain", "Japan");
      cy.contains("DATA")
        .next()
        .should("contain", "1 GB");
      cy.contains("VALIDITY")
        .next()
        .should("contain", "7 Days");
      cy.contains("PRICE")
        .next()
        .should("contain", "$4.50 USD");
    });
  });
});
