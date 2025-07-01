

describe('Admin Audit Flow', () => {
  const adminUser = {
    email: 'isha.bahati@hotmail.com',
    password: 'Techjadmin@1234!@#$'
  }

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  it('should authenticate admin user and access audit logs endpoint', () => {
    cy.login(adminUser.email, adminUser.password)
    cy.checkAuthCookie()
    
    cy.request({
      method: 'GET',
      url: `${Cypress.env('API_BASE_URL')}/api/audit/logs?page=0&size=10`,
      failOnStatusCode: false
    }).then((resp) => {
      expect(resp.status).to.eq(200)
      expect(resp.headers['content-type']).to.include('application/json')
    })
  })

  it('should reject non-admin users from audit endpoints', () => {
    const regularUser = {
      firstName: 'Regular',
      lastName: 'User',
      email: `regular-${Date.now()}@example.com`,
      password: 'RegularPass123!'
    }

    cy.register(regularUser)
    cy.checkAuthCookie()
    
    cy.request({
      method: 'GET',
      url: `${Cypress.env('API_BASE_URL')}/api/audit/logs`,
      failOnStatusCode: false
    }).then((resp) => {
      expect(resp.status).to.eq(403)
    })
  })

  it('should handle validation errors on audit log creation', () => {
    cy.login(adminUser.email, adminUser.password)
    cy.checkAuthCookie()
    
    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_BASE_URL')}/api/audit/logs/manual`,
      body: {
        entityName: '',
        entityId: '123',
        operation: 'CREATE',
        severity: 'INFO'
      },
      failOnStatusCode: false
    }).then((resp) => {
      expect(resp.status).to.eq(400)
      expect(resp.body).to.have.property('message')
      expect(resp.body.message).to.eq('Validation failed')
    })
  })

  it('should prevent XSS injection in audit log fields', () => {
    cy.login(adminUser.email, adminUser.password)
    cy.checkAuthCookie()
    
    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_BASE_URL')}/api/audit/logs/manual`,
      body: {
        entityName: '<script>alert("XSS")</script>',
        entityId: '123',
        operation: 'CREATE',
        severity: 'INFO'
      },
      failOnStatusCode: false
    }).then((resp) => {
      expect(resp.status).to.eq(400)
      expect(resp.body).to.have.property('message')
    })
  })

  it('should validate operation pattern constraints', () => {
    cy.login(adminUser.email, adminUser.password)
    cy.checkAuthCookie()
    
    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_BASE_URL')}/api/audit/logs/manual`,
      body: {
        entityName: 'TestEntity',
        entityId: '123',
        operation: 'invalid-operation',
        severity: 'INFO'
      },
      failOnStatusCode: false
    }).then((resp) => {
      expect(resp.status).to.eq(400)
      expect(resp.body).to.have.property('message')
      expect(resp.body.message).to.eq('Validation failed')
    })
  })

  it('should validate severity constraints', () => {
    cy.login(adminUser.email, adminUser.password)
    cy.checkAuthCookie()
    
    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_BASE_URL')}/api/audit/logs/manual`,
      body: {
        entityName: 'TestEntity',
        entityId: '123',
        operation: 'CREATE',
        severity: 'INVALID_SEVERITY'
      },
      failOnStatusCode: false
    }).then((resp) => {
      expect(resp.status).to.eq(400)
      expect(resp.body).to.have.property('message')
      expect(resp.body.message).to.eq('Validation failed')
    })
  })

  it('should validate pagination constraints', () => {
    cy.login(adminUser.email, adminUser.password)
    cy.checkAuthCookie()
    
    cy.request({
      method: 'GET',
      url: `${Cypress.env('API_BASE_URL')}/api/audit/logs?page=0&size=10`,
      failOnStatusCode: false
    }).then((resp) => {
      cy.log(`Valid request status: ${resp.status}`)
      expect(resp.status).to.eq(200)
      
      return cy.request({
        method: 'GET',
        url: `${Cypress.env('API_BASE_URL')}/api/audit/logs?page=-1&size=10`,
        failOnStatusCode: false
      })
    }).then((resp) => {
      cy.log(`Invalid page request status: ${resp.status}`)
      cy.log(`Response body: ${JSON.stringify(resp.body)}`)
      expect(resp.status).to.eq(400)
      
      return cy.request({
        method: 'GET',
        url: `${Cypress.env('API_BASE_URL')}/api/audit/logs?page=0&size=101`,
        failOnStatusCode: false
      })
    }).then((resp) => {
      cy.log(`Invalid size request status: ${resp.status}`)
      cy.log(`Response body: ${JSON.stringify(resp.body)}`)
      expect(resp.status).to.eq(400)
    })
  })

  it('should successfully create valid audit log', () => {
    cy.login(adminUser.email, adminUser.password)
    cy.checkAuthCookie()
    
    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_BASE_URL')}/api/audit/logs/manual`,
      body: {
        entityName: 'TestEntity',
        entityId: '123',
        operation: 'CREATE',
        oldValues: null,
        newValues: 'test data',
        userId: 1,
        severity: 'INFO'
      }
    }).then((resp) => {
      expect(resp.status).to.eq(200)
    })
  })
})
