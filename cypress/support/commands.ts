declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      loginAdmin(): Chainable<void>
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
  cy.request({
    method: 'POST',
    url: `${Cypress.env('API_BASE_URL')}/api/auth/login`,
    body: { email, password }
  }).then((resp) => {
    expect(resp.status).to.eq(200)
    expect(resp.headers['set-cookie']).to.exist
    const setCookieHeader = resp.headers['set-cookie']
    const cookieString = Array.isArray(setCookieHeader) ? setCookieHeader.join(';') : setCookieHeader
    expect(cookieString).to.include('HttpOnly')
    
    const authTokenMatch = cookieString.match(/auth_token=([^;]+)/)
    if (authTokenMatch) {
      cy.setCookie('auth_token', authTokenMatch[1], {
        domain: 'aitechj-backend-v2.fly.dev',
        httpOnly: true,
        secure: true,
        sameSite: 'no_restriction'
      })
    }
  })
})

Cypress.Commands.add('register', (userData) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('API_BASE_URL')}/api/auth/register`,
    body: {
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName
    }
  }).then((resp) => {
    expect(resp.status).to.eq(200)
    expect(resp.headers['set-cookie']).to.exist
    const setCookieHeader = resp.headers['set-cookie']
    const cookieString = Array.isArray(setCookieHeader) ? setCookieHeader.join(';') : setCookieHeader
    expect(cookieString).to.include('HttpOnly')
    
    const authTokenMatch = cookieString.match(/auth_token=([^;]+)/)
    if (authTokenMatch) {
      cy.setCookie('auth_token', authTokenMatch[1], {
        domain: 'aitechj-backend-v2.fly.dev',
        httpOnly: true,
        secure: true,
        sameSite: 'no_restriction'
      })
    }
  })
})

Cypress.Commands.add('checkAuthCookie', () => {
  cy.getCookie('auth_token').then((cookie) => {
    cy.request({
      url: `${Cypress.env('API_BASE_URL')}/api/auth/me`,
      timeout: 15000,
      headers: cookie ? { 'Cookie': `auth_token=${cookie.value}` } : {}
    }).its('status').should('eq', 200)
  })
})

Cypress.Commands.add('loginAdmin', () => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('API_BASE_URL')}/api/auth/login`,
    body: { 
      email: 'isha.bahati@hotmail.com', 
      password: 'Techjadmin@1234!@#$' 
    }
  }).then((resp) => {
    expect(resp.status).to.eq(200)
    expect(resp.headers['set-cookie']).to.exist
    const setCookieHeader = resp.headers['set-cookie']
    const cookieString = Array.isArray(setCookieHeader) ? setCookieHeader.join(';') : setCookieHeader
    expect(cookieString).to.include('HttpOnly')
  })
})

Cypress.Commands.add('clearAuthCookie', () => {
  cy.request('POST', `${Cypress.env('API_BASE_URL')}/api/auth/logout`).then((resp) => {
    expect(resp.status).to.eq(200)
  })
})

export {}
