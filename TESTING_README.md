# Testing Infrastructure for httpOnly Cookie Authentication

## Overview

This repository includes comprehensive testing infrastructure for the httpOnly cookie authentication system. The testing suite covers unit tests, integration tests, and end-to-end tests to ensure secure and reliable authentication flows.

## Testing Framework Setup

### Dependencies
- **Jest**: Unit testing framework with Next.js integration
- **Testing Library**: React component testing utilities
- **Cypress**: End-to-end testing framework
- **TypeScript**: Full type safety for all test files

### Configuration Files
- `jest.config.js` - Jest configuration with Next.js support
- `jest.setup.js` - Global test setup and mocks
- `cypress.config.ts` - Cypress configuration for e2e tests

## Test Structure

### Unit Tests (`src/**/__tests__/`)
- **API Client Tests** (`src/utils/__tests__/api.test.ts`)
  - Cookie inclusion in requests
  - No localStorage dependency
  - Proper credential handling

- **AuthProvider Tests** (`src/components/auth/__tests__/AuthProvider.test.tsx`)
  - Context initialization without localStorage
  - Login/register state management
  - Logout API integration

- **Form Component Tests**
  - LoginForm validation and submission
  - RegisterForm validation and password matching
  - Error handling and loading states

### End-to-End Tests (`cypress/e2e/`)
- **Authentication Cookie Flow** (`cypress/e2e/auth-cookie-flow.cy.ts`)
  - All 6 critical test cases covered
  - Cross-origin cookie transmission
  - Real API integration testing

## Critical Test Cases

### 1. Login Flow Sets httpOnly Cookie
```typescript
// Verifies POST /api/auth/login sets secure httpOnly cookie
cy.login(email, password)
cy.checkAuthCookie() // Validates httpOnly, secure, sameSite attributes
```

### 2. Register Flow Sets httpOnly Cookie
```typescript
// Verifies POST /api/auth/register sets secure httpOnly cookie
cy.register(userData)
cy.checkAuthCookie() // Validates cookie attributes
```

### 3. Protected API Calls with Cookie Authentication
```typescript
// Tests GET /api/auth/me works with cookie-based auth
cy.setCookie('auth_token', 'token', { httpOnly: true })
cy.visit('/profile')
// Verifies cookie is sent in request headers
```

### 4. Logout Clears Authentication Cookie
```typescript
// Tests POST /api/auth/logout clears cookie
cy.contains('Logout').click()
cy.getCookie('auth_token').should('not.exist')
```

### 5. Token Expiration Handling (1 Hour)
```typescript
// Tests JWT expiration and automatic logout
cy.intercept('GET', '**/api/auth/me', { statusCode: 401 })
cy.visit('/profile')
cy.url().should('include', '/auth') // Redirected to login
```

### 6. Cross-Origin Cookie Transmission
```typescript
// Tests cookies work between Vercel frontend and Fly.io backend
cy.intercept('GET', 'https://aitechj-backend-v2.fly.dev/api/auth/me')
// Verifies cookie is included in cross-origin requests
```

## Local Development Setup

### Prerequisites
```bash
# Install dependencies
pnpm install

# Ensure backend is running
# Backend URL: https://aitechj-backend-v2.fly.dev
```

### Running Tests

#### Unit Tests
```bash
# Run all unit tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

#### End-to-End Tests
```bash
# Run Cypress tests headlessly
pnpm test:e2e

# Open Cypress interactive mode
pnpm test:e2e:open
```

#### All Tests
```bash
# Run complete test suite
pnpm test && pnpm test:e2e
```

## CI/CD Workflow

### GitHub Actions: "HTTPS non-local Cookie testing"

The testing workflow runs on:
- Pull requests to `main` branch
- Pushes to `main` branch

#### Workflow Jobs

1. **Unit Tests**
   - Runs Jest test suite
   - Generates coverage reports
   - Uploads coverage artifacts

2. **E2E Tests**
   - Builds Next.js application
   - Starts development server
   - Runs Cypress tests against live app
   - Tests real HTTPS cookie transmission

3. **Integration Tests**
   - Tests cross-origin cookie functionality with curl
   - Verifies JWT token expiration timing
   - Validates backend API responses

### Environment Variables
```bash
# Required for CI testing
NEXT_PUBLIC_API_URL=https://aitechj-backend-v2.fly.dev
CYPRESS_baseUrl=http://localhost:3000
CYPRESS_API_BASE_URL=https://aitechj-backend-v2.fly.dev
```

## Test Utilities

### Cypress Custom Commands
```typescript
// Login helper
cy.login(email, password)

// Registration helper
cy.register({ firstName, lastName, email, password })

// Cookie validation
cy.checkAuthCookie() // Verifies httpOnly cookie exists
cy.clearAuthCookie() // Clears authentication cookie
```

### Jest Mocks
- Next.js router navigation
- Fetch API with cookie support
- Environment variables
- Authentication context

## Troubleshooting

### Common Issues

#### Tests Failing Locally
1. **Backend Connection**: Ensure backend is accessible at `https://aitechj-backend-v2.fly.dev`
2. **Cookie Settings**: Verify browser allows cross-origin cookies
3. **Port Conflicts**: Check if port 3000 is available for test server

#### CI/CD Failures
1. **Network Issues**: Backend API may be temporarily unavailable
2. **Timeout Errors**: Increase wait times for slow network conditions
3. **Cookie Blocking**: CI environment may block third-party cookies

#### Authentication Errors
1. **JWT Expiration**: Tokens expire after 1 hour
2. **Cookie Attributes**: Ensure httpOnly, secure, sameSite are set correctly
3. **CORS Configuration**: Verify backend allows credentials from frontend domain

### Debug Commands
```bash
# Check test configuration
pnpm test --verbose

# Debug Cypress tests
DEBUG=cypress:* pnpm test:e2e

# Validate Jest setup
npx jest --showConfig
```

## Contributing

### Adding New Tests

1. **Unit Tests**: Add to `src/**/__tests__/` directory
2. **E2E Tests**: Add to `cypress/e2e/` directory
3. **Test Utilities**: Add to `cypress/support/commands.ts`

### Test Naming Convention
- Unit tests: `*.test.ts` or `*.test.tsx`
- E2E tests: `*.cy.ts`
- Test utilities: `commands.ts`, `e2e.ts`

### Best Practices
- Mock external dependencies in unit tests
- Use real API calls in e2e tests
- Test error scenarios and edge cases
- Maintain test isolation and cleanup
- Document complex test scenarios

## Security Considerations

### Cookie Testing
- Tests verify httpOnly attribute prevents XSS
- Validates secure flag for HTTPS-only transmission
- Checks sameSite attribute for CSRF protection
- Ensures proper cookie expiration handling

### Authentication Flow
- Tests cover all authentication endpoints
- Validates JWT token security and expiration
- Ensures proper logout and session cleanup
- Tests cross-origin authentication scenarios

## Performance

### Test Execution Times
- Unit tests: ~10-15 seconds
- E2E tests: ~2-3 minutes
- Full test suite: ~3-4 minutes

### Optimization
- Parallel test execution in CI
- Efficient test data setup/teardown
- Minimal test dependencies
- Smart test selection based on changes

## Monitoring

### Test Results
- Coverage reports uploaded to CI artifacts
- Screenshots/videos for failed e2e tests
- Detailed error logs for debugging
- Performance metrics tracking

### Alerts
- Failed tests trigger CI failure
- Coverage drops below threshold
- Authentication flow regressions detected
- Cross-origin cookie issues identified
