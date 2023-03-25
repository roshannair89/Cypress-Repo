
import { AdminTest } from './Admin'

	Cypress._.each(['macbook-15','ipad-mini'], viewport => {
		it(`Testing Yara Admin landing page on ${viewport}`, () => {
			cy.login()
			cy.viewport(viewport)
			AdminTest()
			cy.injectAxe()
			cy.customCheckAlly()
		})

	})
