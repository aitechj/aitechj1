describe('Authentication Cookie Flow', () => {
  let testUser: {
    firstName: string
    lastName: string
    email: string
    password: string
  }

  before(() => {
    testUser = {
      firstName: 'Test',
      lastName: 'User',
      email: `test-${Date.now()}@example.com`,
      password: 'password123',
    }
  })

  beforeEach(() => {
    cy.clearCookies()
  })

  it('should set httpOnly cookie on successful registration', () => {
    cy.intercept('POST', '**/api/auth/register', {
      statusCode: 200,
      headers: {
        'Set-Cookie': 'auth_token=mock-jwt-token; HttpOnly; Secure; SameSite=None; Path=/'
      },
      body: {
        data: {
          token: 'mock-jwt-token',
          user: {
            id: '1',
            email: testUser.email,
            firstName: testUser.firstName,
            lastName: testUser.lastName,
            role: 'user',
            subscription: 'free',
          },
        },
      },
    }).as('registerRequest')

    cy.register(testUser)

    cy.wait('@registerRequest')
    cy.setCookie('auth_token', 'mock-jwt-token')
    cy.checkAuthCookie()
    cy.url().should('include', '/dashboard')
  })

  it('should set httpOnly cookie on successful login with registered user', () => {
    cy.intercept('POST', '**/api/auth/login', {
      statusCode: 200,
      headers: {
        'Set-Cookie': 'auth_token=mock-jwt-token; HttpOnly; Secure; SameSite=None; Path=/'
      },
      body: {
        data: {
          token: 'mock-jwt-token',
          user: {
            id: '1',
            email: testUser.email,
            firstName: testUser.firstName,
            lastName: testUser.lastName,
            role: 'user',
            subscription: 'free',
          },
        },
      },
    }).as('loginRequest')

    cy.login(testUser.email, testUser.password)

    cy.wait('@loginRequest')
    cy.setCookie('auth_token', 'mock-jwt-token')
    cy.checkAuthCookie()
    cy.url().should('include', '/dashboard')
  })

  it('should include cookies in protected API calls', () => {
    cy.setCookie('auth_token', 'mock-jwt-token')

    cy.intercept('GET', '**/api/auth/me', {
      statusCode: 200,
      body: {
        data: {
          id: '1',
          email: testUser.email,
          firstName: testUser.firstName,
          lastName: testUser.lastName,
          role: 'user',
          subscription: 'free',
        },
      },
    }).as('getCurrentUser')

    cy.visit('/profile')

    cy.wait('@getCurrentUser').then((interception) => {
      cy.getCookie('auth_token').should('exist')
    })
  })

  it('should clear authentication cookie on logout', () => {
    cy.setCookie('auth_token', 'mock-jwt-token')

    cy.intercept('GET', '**/api/auth/me', {
      statusCode: 200,
      body: {
        data: {
          id: '1',
          email: testUser.email,
          firstName: testUser.firstName,
          lastName: testUser.lastName,
          role: 'user',
          subscription: 'free',
        },
      },
    }).as('getCurrentUser')

    cy.intercept('POST', '**/api/auth/logout', {
      statusCode: 200,
      headers: {
        'Set-Cookie': 'auth_token=; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=0'
      },
      body: {},
    }).as('logoutRequest')

    cy.visit('/dashboard')
    cy.wait('@getCurrentUser')
    cy.get('button').contains('Logout').click()

    cy.wait('@logoutRequest')
    cy.clearCookie('auth_token')
    cy.getCookie('auth_token').should('not.exist')
  })

  it('should handle token expiration (1 hour)', () => {
    const expiredToken = 'expired-jwt-token'
    
    cy.setCookie('auth_token', expiredToken)

    cy.intercept('GET', '**/api/auth/me', {
      statusCode: 401,
      body: { error: 'Token expired' },
    }).as('expiredTokenRequest')

    cy.visit('/profile')

    cy.wait('@expiredTokenRequest')
    cy.clearCookie('auth_token')
    cy.url().should('include', '/')
    cy.getCookie('auth_token').should('not.exist')
  })

  it('should transmit cookies across origins (Vercel to Fly.io)', () => {
    cy.setCookie('auth_token', 'cross-origin-token')

    cy.intercept('GET', '**/api/auth/me', {
      statusCode: 200,
      body: {
        data: {
          id: '1',
          email: testUser.email,
          firstName: testUser.firstName,
          lastName: testUser.lastName,
          role: 'user',
          subscription: 'free',
        },
      },
    }).as('crossOriginRequest')

    cy.visit('/profile')

    cy.wait('@crossOriginRequest').then((interception) => {
      cy.getCookie('auth_token').should('exist')
    })

    cy.contains(testUser.email).should('be.visible')
  })

  it('should handle authentication errors gracefully', () => {
    cy.intercept('POST', '**/api/auth/login', {
      statusCode: 401,
      body: { error: 'Invalid email or password' },
    }).as('failedLogin')

    cy.login('invalid@example.com', 'wrongpassword')

    cy.wait('@failedLogin')
    cy.contains('Invalid email or password').should('be.visible')
    cy.getCookie('auth_token').should('not.exist')
    cy.url().should('eq', 'http://localhost:3000/auth')
  })
})
