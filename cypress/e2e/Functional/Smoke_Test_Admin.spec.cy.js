import { smokeTest } from './Smoke2'

Cypress._.each(['macbook-16'], viewport => {
  it(`works on ${viewport}`, () => {
    cy.Prdlogin()
    cy.viewport(viewport)
    smokeTest()
  })
})