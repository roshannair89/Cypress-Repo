export const MixerTest = () => {
    cy.visit('/')
    cy.contains("Yara App").click()
    cy.contains("Meet for Happy Hour").click()

}
