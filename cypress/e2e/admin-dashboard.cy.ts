describe('Admin Dashboard', () => {
  const adminUser = {
    email: 'isha.bahati@hotmail.com',
    password: 'Techjadmin@1234!@#$'
  }

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  it('should complete full admin dashboard journey', () => {
    cy.login(adminUser.email, adminUser.password)
    cy.checkAuthCookie()
    
    cy.visit('/admin')
    cy.url().should('include', '/admin')
    
    cy.contains('Admin Portal').should('be.visible')
    cy.contains('Total Users').should('be.visible')
    cy.contains('Active Courses').should('be.visible')
    cy.contains('AI Chat Queries').should('be.visible')
    cy.contains('Revenue').should('be.visible')
  })

  it('should display user management section', () => {
    cy.login(adminUser.email, adminUser.password)
    cy.visit('/admin')
    
    cy.contains('User Management').should('be.visible')
    cy.contains('Add User').should('be.visible')
    cy.contains('John Developer').should('be.visible')
    cy.contains('john.dev@email.com').should('be.visible')
    cy.contains('Pro').should('be.visible')
  })

  it('should display course management section', () => {
    cy.login(adminUser.email, adminUser.password)
    cy.visit('/admin')
    
    cy.contains('Course Management').should('be.visible')
    cy.contains('Add Course').should('be.visible')
    cy.contains('Full Stack JavaScript Development').should('be.visible')
    cy.contains('AWS Cloud Architecture').should('be.visible')
    cy.contains('847 enrolled').should('be.visible')
  })

  it('should display system analytics section', () => {
    cy.login(adminUser.email, adminUser.password)
    cy.visit('/admin')
    
    cy.contains('System Analytics').should('be.visible')
    cy.contains('AI Chat Performance').should('be.visible')
    cy.contains('User Engagement').should('be.visible')
    cy.contains('System Health').should('be.visible')
  })

  it('should reject non-admin users from admin dashboard', () => {
    const regularUser = {
      firstName: 'Regular',
      lastName: 'User',
      email: `regular-${Date.now()}@example.com`,
      password: 'RegularPass123!'
    }

    cy.register(regularUser)
    cy.checkAuthCookie()
    
    cy.visit('/admin', { failOnStatusCode: false })
    cy.url().should('not.include', '/admin')
  })
})
