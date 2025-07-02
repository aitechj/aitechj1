describe('Profile Management', () => {
  let testUser: {
    firstName: string
    lastName: string
    email: string
    password: string
  }

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    testUser = {
      firstName: 'Profile',
      lastName: 'User',
      email: `profile-${Date.now()}@example.com`,
      password: 'ProfilePass123!'
    }
  })

  it('should complete full profile management journey', () => {
    cy.register(testUser)
    cy.checkAuthCookie()
    
    cy.visit('/profile')
    cy.url().should('include', '/profile')
    
    cy.contains('Profile Settings').should('be.visible')
    cy.contains('Profile User').should('be.visible')
    cy.contains('Account Information').should('be.visible')
  })

  it('should display profile sidebar with user data', () => {
    cy.register(testUser)
    cy.visit('/profile')
    
    cy.contains('Profile User').should('be.visible')
    cy.contains(testUser.email).should('be.visible')
    cy.contains('Free Member').should('be.visible')
    cy.contains('Member Since').should('be.visible')
  })

  it('should display account information form', () => {
    cy.register(testUser)
    cy.visit('/profile')
    
    cy.contains('Account Information').should('be.visible')
    cy.get('input[value="Profile"]').should('be.visible')
    cy.get('input[value="User"]').should('be.visible')
    cy.contains('Save Changes').should('be.visible')
  })

  it('should display subscription section', () => {
    cy.register(testUser)
    cy.visit('/profile')
    
    cy.contains('Subscription & Billing').should('be.visible')
    cy.contains('Pro Plan').should('be.visible')
    cy.contains('$29/month').should('be.visible')
    cy.contains('Next billing: Feb 15, 2024').should('be.visible')
  })

  it('should display learning preferences', () => {
    cy.register(testUser)
    cy.visit('/profile')
    
    cy.contains('Learning Preferences').should('be.visible')
    cy.contains('Preferred Learning Topics').should('be.visible')
    cy.contains('JavaScript').should('be.visible')
    cy.contains('Save Preferences').should('be.visible')
  })

  it('should display security settings', () => {
    cy.register(testUser)
    cy.visit('/profile')
    
    cy.contains('Security Settings').should('be.visible')
    cy.contains('Change Password').should('be.visible')
    cy.contains('Two-Factor Authentication').should('be.visible')
    cy.contains('Update Password').should('be.visible')
  })
})
