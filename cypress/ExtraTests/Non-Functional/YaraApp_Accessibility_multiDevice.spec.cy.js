
import { YaraAppTest } from './YaraApp'
import { MixerTest } from './Mixer'
import { SpaceTest } from './Spaces'


	Cypress._.each(['macbook-15', 'iphone-8', 'samsung-s10','ipad-mini'], viewport => {
		it(`Testing Yara App landing page on ${viewport}`, () => {
			cy.login()
			cy.viewport(viewport)
			YaraAppTest()
			cy.injectAxe()
			cy.customCheckAlly()
		})

        it(`Testing Yara App Mixer page ${viewport}`, () => {
			cy.login()
			cy.viewport(viewport)
			MixerTest()
			cy.injectAxe()
			cy.customCheckAlly()
		})

        it(`Testing Yara App Spaces page ${viewport}`, () => {
			cy.login()
			cy.viewport(viewport)
			SpaceTest()
			cy.injectAxe()
			cy.customCheckAlly()
		})
	})
