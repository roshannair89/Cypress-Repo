export const SpaceTest = () => {
    cy.visit('/')
    cy.contains("Yara App").click()
    cy.contains("Spaces").click()
    cy.wait(2000)

}
