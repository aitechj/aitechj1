import '@testing-library/jest-dom'

expect.extend(require('@testing-library/jest-dom/matchers'))

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

jest.mock('@/utils/api', () => ({
  authApi: {
    getCurrentUser: jest.fn(),
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
  },
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}))

process.env.NEXT_PUBLIC_API_URL = 'https://aitechj-backend-v2.fly.dev'

global.fetch = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
  if (global.fetch && global.fetch.mockClear) {
    global.fetch.mockClear()
  }
})
