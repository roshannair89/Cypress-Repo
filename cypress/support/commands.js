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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

  
    Cypress.Commands.add('Prdlogin', () => {

        
        cy. clearCookies() 
        cy. clearLocalStorage()
        cy.setCookie('panda-user-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4MjAzYzdlMS1mOWNhLTRhZjEtYTdkMC1kMGMwZDZjYWIxMDYiLCJhY2NvdW50UmVmZXJlbmNlIjoidGVsdXMiLCJ1c2VyVXVpZCI6IjI0ZmFiNGYyLTA0OTgtNDI4ZC04OTVjLTczZjUwYmNiOWNiYyIsImFjY291bnRVdWlkIjoiNzA3NjE3NDItMWJjZS00M2NlLWIwMjMtYjk5YmEwYTg0ZjY2IiwidXNlckVtYWlsIjoicm9zaGFuLm5haXJAdGVsdXMuY29tIiwic2NvcGVzIjpbInlhcmE6YWRtaW4iXSwiaWF0IjoxNjc5MzIyOTgxLCJleHAiOjE2Nzk5MjI5ODF9.-Iepo6UXxB7kdYwc-kieXdvj2ECrwdKAKbkRzD1CxeE')
        cy.setCookie('yara-user-calendar', 'GoogleCloud')
        cy.setCookie('yara-account-slug','TELUS')
        cy.setCookie('__Host-next-auth.csrf-token', 'f64b2499e964827df21306418f3c3bfc9b53d63e1306abadc64676d5ab982a41%7C3ad905cd84b4cfd54e121319598f23b02e3ca97666b79ba4796aec6d56c20353', {
            secure: true
        })
        cy.setCookie('panda-account-uuid', '70761742-1bce-43ce-b023-b99ba0a84f66')
        cy.setCookie('panda-user-auth-apps', '%5B%22admin%22%2C%22app%22%5D')
        
        
        })
  
    Cypress.Commands.add("customCheckAlly",() => {
  
      const severityIndicatorsIcons={
          minor:'Minor' ,
          major:'Major',
         serious:'Serious',
         critical:'Critical'
  
      }
  
      function callback(violations){
  
          violations.forEach((violation) => {
              const nodes= Cypress.$(violation.nodes.map((node)=> node.target).join(","));
  
              Cypress.log({
                  name: `${severityIndicatorsIcons[violation.impact]} Ally`,
                  consoleProps:() => violation,
                  $el:nodes,
                  message: `[${violation.help}](${violation.helpUrl})`
              })
          
          });
  
      }
  
      cy.checkA11y(null,null,callback)
  
    })
  
  
  