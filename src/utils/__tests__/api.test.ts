import { authApi, apiClient } from '../api'

global.fetch = jest.fn()

describe('API Client Cookie Handling', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should include credentials in all requests', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ message: 'success' }),
    }
    ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

    await apiClient.get('/test')

    const [url, options] = (global.fetch as jest.Mock).mock.calls[0]
    expect(url).toContain('/test')
    expect(options.credentials).toBe('include')
  })

  it('should not include Authorization header in requests', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ message: 'success' }),
    }
    ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

    await apiClient.get('/test')

    const [, options] = (global.fetch as jest.Mock).mock.calls[0]
    expect(options.headers.Authorization).toBeUndefined()
  })

  it('should handle login without storing tokens', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        token: 'jwt-token',
        user: { id: '1', email: 'test@example.com' },
      }),
    }
    ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

    const result = await authApi.login({
      email: 'test@example.com',
      password: 'password123',
    })

    expect(result.data?.token).toBe('jwt-token')
    expect(result.data?.user.email).toBe('test@example.com')
  })

  it('should handle register without storing tokens', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        token: 'jwt-token',
        user: { id: '1', email: 'test@example.com' },
      }),
    }
    ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

    const result = await authApi.register({
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
    })

    expect(result.data?.token).toBe('jwt-token')
    expect(result.data?.user.email).toBe('test@example.com')
  })

  it('should call logout endpoint', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    }
    ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

    await authApi.logout()

    const [url, options] = (global.fetch as jest.Mock).mock.calls[0]
    expect(url).toContain('/api/auth/logout')
    expect(options.method).toBe('POST')
    expect(options.credentials).toBe('include')
  })
})
