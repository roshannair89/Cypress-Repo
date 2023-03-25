export const smokeTest = () => {

  cy.visit('/app')
  // cy.contains("Yara App").click()

  cy.on('uncaught:exception', (e, runnable) => {
    console.log('error', e)
    console.log('runnable', runnable)
    if (e.message.includes('ResizeObserver')) {
        // we expected this error, so let's ignore it
        // and let the test continue
        return false
    }
    // on any other error message the test fails
})

  cy.contains("Yara")//Yara logo
  cy.contains('Welcome to Yara Works')
  cy.contains("We're excited to see you. And we hope you enjoy Yara Works as much as we do. If you have questions or want to provide feedback, we're always happy to hear from you.")
  cy.contains('Roshan')
  cy.contains("Spaces")//Spaces nav icon
  cy.contains("Discover")//Discover nav icon
  //cy.contains("Have some free time?")//Mixer nav icon
  cy.contains("Account")//Account nav icon
  cy.contains('Support')//Support link
  cy.contains("Share Feedback").should('have.attr', 'type', 'button')
  cy.contains('[href="https://habitat.telus.com/data-trust-office/en/home/privacy-home/team-member-privacy/"]', "Privacy Commitment")
  cy.contains("Yara Works and the butterfly logo are trademarks of TELUS Corporation used under license.")

  cy.get('[href="/app/spaces?space-event=book-room"]').contains('New Meeting')//New Meeting button
  cy.get('[href="/app/spaces?space-event=book-desk"]').contains('Reserve a desk')//Desk Reservation button
  cy.contains("People Discovery").should('have.attr', 'href', '/app/people')//People Discovery
  //Current month/year label check
  var d = new Date();
  var month = d.toLocaleString('default', { month: 'long' })
  var year = d.getFullYear()
  cy.contains(month + ' ' + year)
  cy.contains("Up next")//Next in your day label
  cy.contains("Earlier today")//Earlier today
  //cy.contains("Have some free time?")
  //cy.contains("Meet for Coffee")
  //cy.contains("Grab a Bite")




  // //Check Mixer Screen
  // cy.contains("Meet for Happy Hour").click()
  // cy.wait(1000)
  // cy.contains('View profile')
  // cy.contains('Send request')
  // cy.contains('[href="/app/mixer"]', 'Back to Mixer').click()//Click Back to Mixer
  // cy.contains("Mixer")
  // cy.get('.bvImRu').should('be.visible')//Checking "Settings" field
  // //cy.contains('Pick an activity')
  // cy.get('.fDKTrT').should('be.visible')//Check "How it works" field
  // cy.contains("Meet for Coffee")
  // cy.contains("Grab a Bite")
  // cy.contains("Meet for Happy Hour")

//   //Check Discover Screen
//   cy.contains("Discover").click()
//   cy.contains('Discover')
//   cy.contains("What are you looking to discover today?")
//   cy.contains("People")//check People tab
//   //cy.contains("Mixer")
//   //cy.contains("Explore Mixer").should('have.attr', 'href', '/app/mixer').click()
//   //cy.contains("Meet for Happy Hour").click({ force: true })
//   //cy.wait(1000)
//  // cy.contains('Back to Mixer').click()//Click Back to Mixer
//  // cy.contains("Mixer")
//   cy.get(':nth-child(2) > [data-testid="data-testid"]').should('be.visible')//Checking "Settings" field
//   //cy.contains('Pick an activity')
//   // cy.get('.htUsfd > [data-testid="data-testid"]').should('be.visible')//Check "How it works" field
//   // cy.contains("Meet for Coffee")
//   // cy.contains("Grab a Bite")
//   // cy.contains("Meet for Happy Hour")

  //Check People Screen
  cy.contains("Discover").click()//Go back to Discover screen from Mixer
  cy.contains("People").click()
  cy.contains("Find people by name or email").should('have.attr', 'type', 'button').click()
  cy.contains("Cancel").should('have.attr', 'type', 'button').click({ force: true })
  cy.contains("Advanced Search").should('have.attr', 'href', '/app/people/advanced-search')
  cy.contains("Shared skills and interests").should('have.attr', 'href', '/app/people/shared-tags')
  cy.contains("People in my building").should('have.attr', 'href', '/app/people/my-building')
  //cy.contains("Mixer")
  //cy.contains('[href="/app/mixer"]', 'Explore Mixer')
  cy.contains("My team").should('have.attr', 'href', '/app/people/my-team')
  cy.contains("Follow").should('have.attr', 'type', 'button')
  //cy.contains('[href="/app/discover/people/my-team"]', 'See All')
  cy.contains("Following").should('have.attr', 'href', '/app/profile#followers')
  //cy.contains('[href="/app/discover/people/following"]', 'See All')
  cy.contains("Followers").should('have.attr', 'href', '/app/profile#followers')



  //Check Account Screen
  cy.visit("/app")
  cy.get('[data-testid="account"]').click()
  //cy.contains("EN").should('have.attr', 'type', 'button')
  //cy.contains('[href="https://yaraworks.com/admin/en-ca"]', 'Admin')
  //cy.contains('[href="https://yaraworks.com/logout"]', 'Logout')
  cy.contains("Profile").should('have.attr', 'href', '/app/profile').click({force:true})
  cy.contains('Roshan Nair')
  cy.contains('TELUS Employer Solutions Inc')
  cy.contains('roshan.nair@telus.com')
  cy.contains('About Me')
  cy.contains('Expertise')
  cy.contains('Interests')
  cy.contains('Org Chart')
  cy.contains('Project and Role')


  //Check Support screen
  cy.contains("Support").click()
  cy.contains("Support")
  cy.contains('FAQs')
  cy.contains("How do I report a bug or make a suggestion?").should('have.attr', 'type', 'button')
  cy.contains("Desk and Room Bookings")
  cy.contains("Why can't I book a certain desk or room?").should('have.attr', 'type', 'button')
  cy.contains("Does Yara Works sync with my existing Calendar?").should('have.attr', 'type', 'button')
  cy.contains("Can I book a desk or room for use outside of regular office hours?").should('have.attr', 'type', 'button')
  cy.contains("Is it a desk or a workstation?").should('have.attr', 'type', 'button')
  cy.contains("My Account")
  cy.contains("How do I reset my password?").should('have.attr', 'type', 'button')

  //Check Spaces screen
  cy.visit('/app')
  cy.contains("Spaces").click()
  cy.wait(2000)
  cy.get('.hfEKVq').should('be.visible').and('have.attr', 'type', 'button')//Date picker
  //cy.get('.gGWMnh').should('be.visible')//search icon
  //cy.contains("TELUS").click()
  //cy.contains("46 other locations")
  //cy.get('[placeholder="Search..."]').type("Sky")
  //cy.contains("TELUS Sky").click({ force: true })
  cy.wait(2000)
  cy.contains("Explore building").click().invoke('attr', 'href').then(href => {
    cy.visit(href)
    cy.wait(2000)
    cy.contains('About TELUS Sky')
    cy.contains('685 Centre St Sw, Calgary, AB T2G 2C7')
    cy.contains("TELUS Sky exemplifies our commitment to creating healthier and stronger communities. The transformation and revitalization of the city block exemplifies our TELUS brand, and is a powerful testament to our commitment to invest in and support jobs in Alberta today, tomorrow and well into the future.")
    //cy.contains("Our Space")
    cy.contains('[href="/app/spaces?space-event=book-desk&buildingUuid=51aa168f-4149-4d15-8ce3-818c23ebb228"]', 'Book a Desk')
    cy.contains('[href="/app/spaces?space-event=book-room&buildingUuid=51aa168f-4149-4d15-8ce3-818c23ebb228"]', 'Book a Room')


    //Check Yara Voice Assistant
    cy.visit('/app')
    cy.contains('Beta Release: Yara Voice Assistant!')
    cy.contains('Book Desks and Schedule Meetings with Voice commands').click()
    cy.contains("Voice Assistant")
    cy.contains("Click microphone to start and stop dialogue")
    cy.contains("Hi Roshan, welcome to Voice Assistant, I can help you book a desk or schedule a meeting.")
    cy.contains('Please say “Book a Desk”, "Schedule a Meeting" or choose from the suggestions.')
    cy.contains('Go back')
    cy.contains('Go back to beginning')
    cy.contains('Exit')

  })


}