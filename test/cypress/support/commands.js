// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import { v1 as neo4j } from "neo4j-driver";

Cypress.Commands.add(
  "selectNth",
  { prevSubject: "element" },
  (subject, pos) => {
    cy.wrap(subject)
      .children("option")
      .eq(pos)
      .then((e) => {
        cy.wrap(subject).select(e.val());
      });
  }
);

Cypress.Commands.add("seedDb", () => {
  cy.fixture("seedDb.cypher").then((seedDb) => {
    (async () => {
      const driver = neo4j.driver(
        Cypress.env("NEO4J_URI"),
        neo4j.auth.basic(
          Cypress.env("NEO4J_USER"),
          Cypress.env("NEO4J_PASSWORD")
        )
      );
      const session = driver.session();
      try {
        await session.run("MATCH (n) DETACH DELETE n");
        await session.run(seedDb);
      } finally {
        await session.close();
        await driver.close();
      }
    })();
  });
});
