declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      register(userData: {
        firstName: string
        lastName: string
        email: string
        password: string
      }): Chainable<void>
      checkAuthCookie(): Chainable<void>
      clearAuthCookie(): Chainable<void>
    }
  }
}

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/auth')
  cy.get('input[type="email"]').type(email)
  cy.get('input[type="password"]').type(password)
  cy.get('button[type="submit"]').contains('Sign In').click()
})

Cypress.Commands.add('register', (userData) => {
  cy.visit('/auth')
  cy.contains('Sign up').click()
  cy.get('input[placeholder="John"]').type(userData.firstName)
  cy.get('input[placeholder="Doe"]').type(userData.lastName)
  cy.get('input[type="email"]').type(userData.email)
  cy.get('input[type="password"]').first().type(userData.password)
  cy.get('input[type="password"]').last().type(userData.password)
  cy.get('input[type="checkbox"]').check()
  cy.get('button[type="submit"]').contains('Create Account').click()
})

Cypress.Commands.add('checkAuthCookie', () => {
  cy.getCookie('auth_token').should('exist')
})

Cypress.Commands.add('clearAuthCookie', () => {
  cy.clearCookie('auth_token')
})

export {}
