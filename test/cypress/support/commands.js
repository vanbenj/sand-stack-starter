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
    const DELETE_ALL = "MATCH (n) DETACH DELETE n";

    const escapedSeedDb = seedDb.replace(/'/g, "\\'");
    const LOAD_SEED_DB = `
    CALL apoc.cypher.runMany('
    ${escapedSeedDb}
    ',
    {})
    YIELD row, result
    RETURN row, result;
    `;
    console.log(LOAD_SEED_DB);
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
        await session.run(DELETE_ALL);
        await session.run(LOAD_SEED_DB);
      } finally {
        await session.close();
        await driver.close();
      }
    })();
  });
});
