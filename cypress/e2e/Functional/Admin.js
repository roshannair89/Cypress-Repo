export const AdminTest = () => {
    cy.visit('/')
    cy.contains("Yara App").click()
    cy.contains("Account").click()
    cy.contains('[href="https://staging.yaraworks.com/admin/en-ca"]', 'Admin').click()
    cy.wait(2000)

}