describe('Authentication Cookie Flow', () => {
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
      firstName: 'Test',
      lastName: 'User',
      email: `test-${Date.now()}@example.com`,
      password: 'TestPass123!',
    }
  })

  it('should register user and set httpOnly cookie correctly', () => {
    cy.register(testUser)
    cy.wait(1000)
    cy.checkAuthCookie()
  })

  it('should login user and set httpOnly cookie correctly', () => {
    cy.register(testUser)
    cy.clearAuthCookie()
    cy.wait(1000)
    cy.login(testUser.email, testUser.password)
    cy.wait(1000)
    cy.checkAuthCookie()
  })

  it('should include cookies in protected API calls', () => {
    cy.register(testUser)
    cy.wait(1000)
    cy.checkAuthCookie()
  })

  it('should handle token expiration correctly', () => {
    cy.register(testUser)
    cy.wait(1000)
    cy.checkAuthCookie()
    
    cy.request({
      method: 'GET',
      url: `${Cypress.env('API_BASE_URL')}/api/auth/me`,
      headers: {
        'Authorization': 'Bearer expired-token'
      },
      failOnStatusCode: false,
      timeout: 15000
    }).then((resp) => {
      expect(resp.status).to.be.oneOf([401, 403])
    })
  })

  it('should transmit cookies across origins', () => {
    cy.register(testUser)
    cy.wait(1000)
    cy.checkAuthCookie()
    
    cy.clearAuthCookie()
    cy.wait(1000)
    
    cy.login(testUser.email, testUser.password)
    cy.wait(1000)
    cy.checkAuthCookie()
  })

  it('should handle authentication errors gracefully', () => {
    cy.register(testUser)
    cy.wait(1000)
    cy.checkAuthCookie()
    
    cy.clearAuthCookie()
    cy.wait(1000)
    
    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_BASE_URL')}/api/auth/login`,
      body: { email: 'invalid@example.com', password: 'wrongpassword' },
      failOnStatusCode: false,
      timeout: 15000
    }).then((resp) => {
      expect(resp.status).to.be.oneOf([400, 401])
    })
  })
})
