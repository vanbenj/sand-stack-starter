describe("Sapper template app", () => {
  before(() => {
    cy.seedDb();
  });

  it("has the correct <h1>", () => {
    cy.visit("/");
    cy.contains("h1", "Great success!");
  });

  it("navigates to /about", () => {
    cy.visit("/");
    cy.get("#about").click();
    cy.url().should("include", "/about");
  });

  it("navigates to /reviews", () => {
    cy.visit("/");
    cy.get("#reviews").click();
    cy.wait(500);
    cy.url().should("include", "/reviews");
    cy.get("ul#users").children().should("have.length", 4);
  });

  it("load /reviews by ssr", () => {
    cy.visit("/reviews");
    cy.wait(500);
    cy.url().should("include", "/reviews");
    cy.get("ul#users").children().should("have.length", 4);
  });

  it("navigates to /categories", () => {
    cy.visit("/");
    cy.get("#categories").click();
    cy.wait(500);
    cy.url().should("include", "/categories");
    cy.get("ul#categories li").its("length").should("eq", 9);
    cy.get("ul#categories li").contains("Breakfast").click();
  });
});
