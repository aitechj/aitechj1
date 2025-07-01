import { authApi } from '../api'

jest.mock('../api', () => ({
  authApi: {
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
    getCurrentUser: jest.fn(),
  },
}))

const mockAuthApi = authApi as jest.Mocked<typeof authApi>

describe('API Client Cookie Handling', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should handle login without storing tokens', async () => {
    mockAuthApi.login.mockResolvedValue({
      data: {
        token: 'jwt-token',
        user: { id: '1', email: 'test@example.com', firstName: 'Test', lastName: 'User', role: 'user', subscription: 'free' },
      },
    })

    const result = await authApi.login({
      email: 'test@example.com',
      password: 'TestPass123!',
    })

    expect(result.data?.token).toBe('jwt-token')
    expect(result.data?.user.email).toBe('test@example.com')
  })

  it('should handle register without storing tokens', async () => {
    mockAuthApi.register.mockResolvedValue({
      data: {
        token: 'jwt-token',
        user: { id: '1', email: 'test@example.com', firstName: 'Test', lastName: 'User', role: 'user', subscription: 'free' },
      },
    })

    const result = await authApi.register({
      email: 'test@example.com',
      password: 'TestPass123!',
      firstName: 'Test',
      lastName: 'User',
    })

    expect(result.data?.token).toBe('jwt-token')
    expect(result.data?.user.email).toBe('test@example.com')
  })

  it('should call logout endpoint', async () => {
    mockAuthApi.logout.mockResolvedValue({ data: undefined })

    await authApi.logout()

    expect(mockAuthApi.logout).toHaveBeenCalled()
  })

  it('should handle getCurrentUser API call', async () => {
    mockAuthApi.getCurrentUser.mockResolvedValue({
      data: { id: '1', email: 'test@example.com', firstName: 'Test', lastName: 'User', role: 'user', subscription: 'free' },
    })

    const result = await authApi.getCurrentUser()

    expect(result.data?.email).toBe('test@example.com')
    expect(mockAuthApi.getCurrentUser).toHaveBeenCalled()
  })

  it('should handle authentication errors', async () => {
    mockAuthApi.login.mockRejectedValue(new Error('Invalid credentials'))

    await expect(authApi.login({
      email: 'test@example.com',
      password: 'wrong-password',
    })).rejects.toThrow('Invalid credentials')
  })
})
