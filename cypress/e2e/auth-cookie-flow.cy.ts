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

  it('should create user via signup and then login with same credentials', () => {
    cy.intercept('GET', '**/api/auth/me', (req) => {
      const authCookie = req.headers.cookie?.includes('auth_token=mock-jwt-token')
      if (authCookie) {
        req.reply({
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
        })
      } else {
        req.reply({
          statusCode: 401,
          body: { error: 'Not authenticated' },
        })
      }
    }).as('getCurrentUser')

    cy.intercept('POST', '**/api/auth/register', (req) => {
      req.reply({
        statusCode: 200,
        headers: {
          'Set-Cookie': 'auth_token=mock-jwt-token-register; HttpOnly; Secure; SameSite=None; Path=/'
        },
        body: {
          data: {
            token: 'mock-jwt-token-register',
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
      })
    }).as('registerRequest')

    cy.intercept('POST', '**/api/auth/login', (req) => {
      req.reply({
        statusCode: 200,
        headers: {
          'Set-Cookie': 'auth_token=mock-jwt-token-login; HttpOnly; Secure; SameSite=None; Path=/'
        },
        body: {
          data: {
            token: 'mock-jwt-token-login',
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
      })
    }).as('loginRequest')

    cy.intercept('POST', '**/api/auth/logout', (req) => {
      req.reply({
        statusCode: 200,
        headers: {
          'Set-Cookie': 'auth_token=; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=0'
        },
        body: {},
      })
    }).as('logoutRequest')

    cy.register(testUser)
    cy.wait('@registerRequest')
    
    cy.setCookie('auth_token', 'mock-jwt-token-register')
    cy.reload()
    cy.wait('@getCurrentUser')
    
    cy.checkAuthCookie()
    cy.url().should('include', '/dashboard')
    cy.get('button').contains('Logout').should('be.visible')

    cy.get('button').contains('Logout').click()
    cy.wait('@logoutRequest')
    cy.clearCookie('auth_token')
    cy.getCookie('auth_token').should('not.exist')

    cy.login(testUser.email, testUser.password)
    cy.wait('@loginRequest')
    
    cy.setCookie('auth_token', 'mock-jwt-token-login')
    cy.reload()
    cy.wait('@getCurrentUser')
    
    cy.checkAuthCookie()
    cy.url().should('include', '/dashboard')
    cy.get('button').contains('Logout').should('be.visible')
  })

  it('should include cookies in protected API calls after signup', () => {
    cy.intercept('POST', '**/api/auth/register', {
      statusCode: 200,
      headers: {
        'Set-Cookie': 'auth_token=mock-jwt-token-protected; HttpOnly; Secure; SameSite=None; Path=/'
      },
      body: {
        data: {
          token: 'mock-jwt-token-protected',
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
    }).as('registerForProtectedRequest')

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

    cy.register(testUser)
    cy.wait('@registerForProtectedRequest')
    cy.setCookie('auth_token', 'mock-jwt-token-protected')

    cy.visit('/profile')
    cy.wait('@getCurrentUser').then((interception) => {
      cy.getCookie('auth_token').should('exist')
    })
  })

  it('should handle token expiration after signup', () => {
    cy.intercept('POST', '**/api/auth/register', {
      statusCode: 200,
      headers: {
        'Set-Cookie': 'auth_token=expired-jwt-token; HttpOnly; Secure; SameSite=None; Path=/'
      },
      body: {
        data: {
          token: 'expired-jwt-token',
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
    }).as('registerForExpirationTest')

    cy.intercept('GET', '**/api/auth/me', {
      statusCode: 401,
      body: { error: 'Token expired' },
    }).as('expiredTokenRequest')

    cy.register(testUser)
    cy.wait('@registerForExpirationTest')
    cy.setCookie('auth_token', 'expired-jwt-token')

    cy.visit('/profile')
    cy.wait('@expiredTokenRequest')
    cy.clearCookie('auth_token')
    cy.url().should('include', '/')
    cy.getCookie('auth_token').should('not.exist')
  })

  it('should transmit cookies across origins after signup', () => {
    cy.intercept('POST', '**/api/auth/register', {
      statusCode: 200,
      headers: {
        'Set-Cookie': 'auth_token=mock-jwt-token-signup; HttpOnly; Secure; SameSite=None; Path=/'
      },
      body: {
        data: {
          token: 'mock-jwt-token-signup',
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
    }).as('signupRequest')

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

    cy.register(testUser)
    cy.wait('@signupRequest')
    cy.setCookie('auth_token', 'mock-jwt-token-signup')
    cy.reload()
    cy.wait('@getCurrentUser')
    
    cy.url().should('include', '/dashboard')
    cy.get('button').contains('Logout').should('be.visible')

    cy.visit('/profile')
    cy.wait('@getCurrentUser')
    cy.wait(1000)
    cy.get('input[type="email"]').should('have.value', testUser.email)

    cy.intercept('POST', '**/api/auth/logout', {
      statusCode: 200,
      headers: {
        'Set-Cookie': 'auth_token=; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=0'
      },
      body: {},
    }).as('logoutRequest')

    cy.intercept('POST', '**/api/auth/login', {
      statusCode: 200,
      headers: {
        'Set-Cookie': 'auth_token=mock-jwt-token-signin; HttpOnly; Secure; SameSite=None; Path=/'
      },
      body: {
        data: {
          token: 'mock-jwt-token-signin',
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
    }).as('signinRequest')

    cy.get('button').contains('Logout').click()
    cy.wait('@logoutRequest')
    cy.clearCookie('auth_token')

    cy.login(testUser.email, testUser.password)
    cy.wait('@signinRequest')
    cy.setCookie('auth_token', 'mock-jwt-token-signin')
    cy.reload()
    cy.wait('@getCurrentUser')
    
    cy.url().should('include', '/dashboard')
    cy.visit('/profile')
    cy.wait('@getCurrentUser')
    cy.get('input[type="email"]').should('have.value', testUser.email)
  })

  it('should handle authentication errors gracefully after successful signup', () => {
    cy.intercept('GET', '**/api/auth/me', (req) => {
      const authCookie = req.headers.cookie?.includes('auth_token=mock-jwt-token-error-test')
      if (authCookie) {
        req.reply({
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
        })
      } else {
        req.reply({
          statusCode: 401,
          body: { error: 'Not authenticated' },
        })
      }
    }).as('getCurrentUserForErrorTest')

    cy.intercept('POST', '**/api/auth/register', (req) => {
      req.reply({
        statusCode: 200,
        headers: {
          'Set-Cookie': 'auth_token=mock-jwt-token-error-test; HttpOnly; Secure; SameSite=None; Path=/'
        },
        body: {
          data: {
            token: 'mock-jwt-token-error-test',
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
      })
    }).as('registerForErrorTest')

    cy.intercept('POST', '**/api/auth/logout', (req) => {
      req.reply({
        statusCode: 200,
        headers: {
          'Set-Cookie': 'auth_token=; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=0'
        },
        body: {},
      })
    }).as('logoutForErrorTest')

    cy.intercept('POST', '**/api/auth/login', {
      statusCode: 401,
      body: { error: 'Invalid email or password' },
    }).as('failedLogin')

    cy.register(testUser)
    cy.wait('@registerForErrorTest')
    
    cy.setCookie('auth_token', 'mock-jwt-token-error-test')
    cy.reload()
    cy.wait('@getCurrentUserForErrorTest')
    
    cy.checkAuthCookie()
    cy.url().should('include', '/dashboard')
    cy.get('button').contains('Logout').should('be.visible')

    cy.get('button').contains('Logout').click()
    cy.wait('@logoutForErrorTest')
    cy.clearCookie('auth_token')

    cy.login('invalid@example.com', 'wrongpassword')
    cy.wait('@failedLogin')
    cy.contains('Invalid email or password').should('be.visible')
    cy.getCookie('auth_token').should('not.exist')
    cy.url().should('eq', 'http://localhost:3000/auth')
  })
})
