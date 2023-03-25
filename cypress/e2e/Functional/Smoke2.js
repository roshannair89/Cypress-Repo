export const smokeTest = () => {

//Check Admin Smoke
cy.visit('/admin')
//cy.contains("Account").click()
//cy.contains('Admin').click()
cy.get('[data-testid="image-variant-next-image"]').should('be.visible')//Yara logo
//cy.contains('Roshan Nair')
cy.contains('Roshan Nair')//User profile


//Check Building screen
cy.contains("Space Management")
cy.contains('[data-testid="heading"]', 'Buildings')
cy.contains('[data-testid="heading-description"]', 'Manage your buildings')
//cy.contains('[href="/admin/buildings"]', 'Buildings')
cy.contains('Name and Address')
cy.contains('City')
//cy.contains("No. of Floors")
//cy.contains("Area")
cy.contains("Capacity")
cy.contains('[data-testid="filter"]', 'Filter')
cy.get('#page-search').type("harbour")//building search
cy.contains("TELUS Harbour")
cy.get('#page-search').clear()//clear search
cy.contains("Filters").should('have.attr', 'type', 'button').click()//Test Filter by City
cy.contains("Select city").type("Calg{enter}")
cy.get('#dialog_label').should('have.text','Filter by:').click()
cy.get('[data-testid="show-results"]').click()
cy.get('.cZxWKf').contains("Calgary")



//Check Floor screen
cy.contains('[href="/floors"]', 'Floors').click()
cy.contains('[data-testid="heading"]', 'Floors')
//cy.contains('Floor Number')
cy.contains('Building')
cy.contains("Area")
cy.contains("Capacity")
cy.contains('[data-testid="filter"]', 'Filter')
cy.get('#page-search').type("8")//Floor Search
cy.contains("Floor 008")
cy.get('#page-search').clear()//clear search
cy.contains("Filters").should('have.attr', 'type', 'button').click()//Test Filter by Building
cy.contains("Select building").click().type("garde{enter}")
cy.get('#dialog_label').should('have.text','Filter by:').click()
cy.get('[data-testid="show-results"]').click()
cy.get('.cMtmwz').contains("TELUS Garden")


//Check Spaces Screen
cy.contains('[href="/admin/spaces"]', 'Spaces').click()
cy.contains('[data-testid="heading"]', 'Spaces')
cy.contains('Number')
cy.contains('Type')
cy.contains("Capacity")
cy.contains("Building")
cy.contains("Floor")
//cy.get('.summaryHeading').should('have.text', 'OverviewSpaces')
//cy.contains('[data-testid="filter"]', 'Filter')
//cy.intercept()
cy.get('#page-search').type("007")//Spaces search
cy.contains("007")
cy.get('#page-search').clear()//clear search
cy.contains("Space Type").should('have.attr', 'type', 'button').click()//Test Filter by Space type
cy.contains("Select a space type").click().type("Batte{enter}")
cy.get('#dialog_label').should('have.text','Filter by:').click()
cy.get('[data-testid="show-results"]').click()
cy.get('.efRQOf').contains("Battery Room")
cy.get('.efRQOf').should('not.contain','Workstation')



// //Check Amenities Screen
// cy.contains('[href="/admin/amenities"]', 'Amenities').click()
// cy.wait(1000)
// cy.contains('[data-testid="heading"]', 'Amenities')
// cy.contains('Name')
// cy.contains('Count')
// cy.get('#page-search').type("Surface")//Amenities search
// cy.contains("Tackable Surface")

//Check Book on behalf screen
cy.contains('[href="/admin/book-on-behalf"]', 'Book on behalf').click()
cy.contains('Book on behalf')
cy.contains('Name')
cy.contains('Title')
cy.contains('Status')
cy.get('#page-search').type("cetra")//Book on behalf search
cy.contains("Eva Cetra")

//Check Policy Groups screen
cy.contains('[href="/admin/policies"]', 'Policies').click()
cy.contains('[data-testid="heading"]', 'Policies')
cy.contains('Name')
cy.contains('Booking Type')
cy.contains('Created On')
cy.contains('Spaces')

//Check People screen
cy.contains('[href="/admin/people"]', 'People').click()
cy.wait(2000)
cy.contains( 'People')
cy.contains('Name')
cy.contains('Title')
cy.contains('Yara Works User')
cy.contains('[data-testid="filter"]', 'Filter')
cy.get('#page-search').type("cetra")//People search
cy.contains("Eva Cetra")
cy.get('#page-search').clear()//clear search
cy.contains("Filters").should('have.attr', 'type', 'button').click()//Test Filter by City
cy.contains("Select city").type("Calg{enter}")
cy.get('#dialog_label').should('have.text','Filter by:').click()
cy.get('[data-testid="show-results"]').click()
//cy.get('.gMDiow').contains("Calgary")

//Check User screen
cy.wait(1000)
cy.contains('[href="/admin/users"]', 'Users').click()
cy.contains('[data-testid="heading"]', 'Users')
cy.contains('Name')
cy.contains('Role')
cy.contains('Status')
cy.contains('[role="tab"]', 'Yara Admin')
cy.contains('[role="tab"]', 'Yara App').click()
cy.contains('Name')
cy.contains('Role')
cy.contains('Status')
cy.contains('[data-testid="filter"]', 'Filter')
cy.get('#page-search').type("cetra")//Book on behalf search
cy.contains("Evanthia Cetra")
cy.get('[data-testid="tab-yara-app"]').click()
cy.contains("Evanthia Cetra")
cy.get('#page-search').clear()//clear search
cy.contains("Filters").should('have.attr', 'type', 'button').click()//Test Filter by Status
cy.contains("Select a status").type("Acti{enter}")
cy.get('#dialog_label').should('have.text','Filter by:').click()
cy.get('[data-testid="show-results"]').click()
cy.get('.hMvAJf').contains("Active")
cy.get('.hMvAJf').should('not.contain','Deactivated')
cy.get('.hMvAJf').should('not.contain','Cancelled')
cy.get('.hMvAJf').should('not.contain','Invited')
cy.get('.hMvAJf').should('not.contain','Unverified')

//Check Feedback screen
cy.contains('[href="/admin/feedback"]', 'Feedback').click()
cy.contains('[data-testid="heading"]', 'Feedback')
cy.contains('Overview')
cy.contains('[data-testid="filter"]', 'Feedback Type')
cy.contains('[data-testid="filter"]', 'Status')
cy.contains('[data-testid="filter"]', 'More Filters')
cy.contains('[data-testid="filter"]', 'From')
cy.contains('[data-testid="filter"]', 'To')
cy.get('#page-search').clear()//clear search
cy.contains("Status").should('have.attr', 'type', 'button').click()//Test Filter by Status
cy.contains("Select feedback status").type("pen{enter}")
cy.get('#dialog_label').should('have.text','Filter by:').click()
cy.get('[data-testid="show-results"]').click()
cy.get('.sc-5ddceaf4-5').contains("Pending")
cy.get('.sc-5ddceaf4-5').should('not.contain','resolved')


//below code is to check all hyperlinks on the page
cy.get("a:not([href*='mailto:'])").each(page => {
  cy.request(page.prop('href'))
})

}