import { authApi } from '../api'

const mockFetch = jest.fn()
global.fetch = mockFetch

describe('authApi', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  it('should call login API endpoint', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        token: 'test-token',
        user: { id: '1', email: 'test@example.com', firstName: 'Test', lastName: 'User', role: 'user', subscription: 'free' }
      })
    }
    mockFetch.mockResolvedValue(mockResponse)

    const result = await authApi.login({ email: 'test@example.com', password: 'password' })

    expect(mockFetch).toHaveBeenCalled()
    expect(result.data?.token).toEqual('test-token')
  })

  it('should call register API endpoint', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        token: 'test-token',
        user: { id: '1', email: 'test@example.com', firstName: 'Test', lastName: 'User', role: 'user', subscription: 'free' }
      })
    }
    mockFetch.mockResolvedValue(mockResponse)

    const result = await authApi.register({
      email: 'test@example.com',
      password: 'password',
      firstName: 'Test',
      lastName: 'User'
    })

    expect(mockFetch).toHaveBeenCalled()
    expect(result.data?.token).toEqual('test-token')
  })

  it('should call logout API endpoint', async () => {
    const mockResponse = { ok: true, json: async () => ({}) }
    mockFetch.mockResolvedValue(mockResponse)

    await authApi.logout()

    expect(mockFetch).toHaveBeenCalled()
  })

  it('should call getCurrentUser API endpoint', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      role: 'user',
      subscription: 'free',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    }
    const mockResponse = { ok: true, json: async () => mockUser }
    mockFetch.mockResolvedValue(mockResponse)

    const result = await authApi.getCurrentUser()

    expect(mockFetch).toHaveBeenCalled()
    expect(result.data?.email).toEqual('test@example.com')
  })

  it('should handle API errors gracefully', async () => {
    const mockResponse = {
      ok: false,
      status: 401,
      json: async () => ({ message: 'Unauthorized' })
    }
    mockFetch.mockResolvedValue(mockResponse)

    const result = await authApi.login({ email: 'test@example.com', password: 'wrong' })

    expect(result.error).toBeTruthy()
    expect(result.data).toBeFalsy()
  })
})
