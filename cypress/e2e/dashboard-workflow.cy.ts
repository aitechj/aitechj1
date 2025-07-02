describe('Dashboard Workflow', () => {
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
      firstName: 'Dashboard',
      lastName: 'User',
      email: `dashboard-${Date.now()}@example.com`,
      password: 'DashboardPass123!'
    }
  })

  it('should complete full dashboard user journey', () => {
    cy.register(testUser)
    cy.checkAuthCookie()
    
    cy.visit('/')
    cy.url().should('include', '/dashboard')
    
    cy.contains('Enrolled Courses').should('be.visible')
    cy.contains('Completed Courses').should('be.visible')
    cy.contains('AI Chat Queries').should('be.visible')
    cy.contains('Learning Streak').should('be.visible')
  })

  it('should display current courses section', () => {
    cy.register(testUser)
    cy.visit('/dashboard')
    
    cy.contains('Current Courses').should('be.visible')
    cy.contains('Continue').should('be.visible')
  })

  it('should display recent activity section', () => {
    cy.register(testUser)
    cy.visit('/dashboard')
    
    cy.contains('Recent Activity').should('be.visible')
    cy.contains('View All Activity').should('be.visible')
  })

  it('should display AI chat usage section', () => {
    cy.register(testUser)
    cy.visit('/dashboard')
    
    cy.contains('AI Chat Usage').should('be.visible')
    cy.contains('Open AI Chat').should('be.visible')
  })

  it('should navigate between dashboard sections', () => {
    cy.register(testUser)
    cy.visit('/dashboard')
    
    cy.contains('Current Courses').should('be.visible')
    cy.contains('Recent Activity').should('be.visible')
    cy.contains('AI Chat Usage').should('be.visible')
  })
})
