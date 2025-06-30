describe('Authentication Cookie Flow', () => {
  const testUser = {
    firstName: 'Test',
    lastName: 'User',
    email: `test-${Date.now()}@example.com`,
    password: 'password123',
  }

  beforeEach(() => {
    cy.clearCookies()
  })

  it('should set httpOnly cookie on successful login', () => {
    cy.intercept('POST', '**/api/auth/login', {
      statusCode: 200,
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
    cy.checkAuthCookie()
    cy.url().should('include', '/dashboard')
  })

  it('should set httpOnly cookie on successful registration', () => {
    cy.intercept('POST', '**/api/auth/register', {
      statusCode: 200,
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
    cy.checkAuthCookie()
    cy.url().should('include', '/dashboard')
  })

  it('should include cookies in protected API calls', () => {
    cy.setCookie('auth_token', 'mock-jwt-token', {
      httpOnly: true,
      secure: true,
      sameSite: 'no_restriction',
    })

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
      expect(interception.request.headers).to.have.property('cookie')
      expect(interception.request.headers.cookie).to.include('auth_token=mock-jwt-token')
    })
  })

  it('should clear authentication cookie on logout', () => {
    cy.setCookie('auth_token', 'mock-jwt-token', {
      httpOnly: true,
      secure: true,
      sameSite: 'no_restriction',
    })

    cy.intercept('POST', '**/api/auth/logout', {
      statusCode: 200,
      body: {},
    }).as('logoutRequest')

    cy.visit('/dashboard')
    cy.contains('Logout').click()

    cy.wait('@logoutRequest')
    cy.getCookie('auth_token').should('not.exist')
    cy.url().should('include', '/auth')
  })

  it('should handle token expiration (1 hour)', () => {
    const expiredToken = 'expired-jwt-token'
    
    cy.setCookie('auth_token', expiredToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'no_restriction',
    })

    cy.intercept('GET', '**/api/auth/me', {
      statusCode: 401,
      body: { error: 'Token expired' },
    }).as('expiredTokenRequest')

    cy.visit('/profile')

    cy.wait('@expiredTokenRequest')
    cy.url().should('include', '/auth')
    cy.getCookie('auth_token').should('not.exist')
  })

  it('should transmit cookies across origins (Vercel to Fly.io)', () => {
    cy.setCookie('auth_token', 'cross-origin-token', {
      httpOnly: true,
      secure: true,
      sameSite: 'no_restriction',
    })

    cy.intercept('GET', 'https://aitechj-backend-v2.fly.dev/api/auth/me', {
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
      expect(interception.request.headers).to.have.property('cookie')
      expect(interception.request.headers.cookie).to.include('auth_token=cross-origin-token')
    })

    cy.contains(testUser.email).should('be.visible')
  })

  it('should handle authentication errors gracefully', () => {
    cy.intercept('POST', '**/api/auth/login', {
      statusCode: 401,
      body: { error: 'Invalid credentials' },
    }).as('failedLogin')

    cy.login('invalid@example.com', 'wrongpassword')

    cy.wait('@failedLogin')
    cy.contains('Invalid credentials').should('be.visible')
    cy.getCookie('auth_token').should('not.exist')
    cy.url().should('include', '/auth')
  })
})
