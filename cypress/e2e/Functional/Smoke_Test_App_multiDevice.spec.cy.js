import { smokeTest } from './Smoke'

Cypress._.each(['iphone-8','ipad-mini','samsung-s10'], viewport => {
  it(`works on ${viewport}`, () => {
    cy.Prdlogin()
    cy.viewport(viewport)
    smokeTest()
  })
})