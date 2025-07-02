import '@testing-library/jest-dom'
import { authApi } from '../api'

global.fetch = jest.fn()

describe('authApi', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call login API endpoint', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        token: 'test-token',
        user: { id: '1', email: 'test@example.com', firstName: 'Test', lastName: 'User', role: 'user', subscription: 'free' }
      })
    }
    ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

    const result = await authApi.login({ email: 'test@example.com', password: 'password' })

    expect(global.fetch).toHaveBeenCalled()
    expect(result.data?.token).toBe('test-token')
  })

  it('should call register API endpoint', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        token: 'test-token',
        user: { id: '1', email: 'test@example.com', firstName: 'Test', lastName: 'User', role: 'user', subscription: 'free' }
      })
    }
    ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

    const result = await authApi.register({
      email: 'test@example.com',
      password: 'password',
      firstName: 'Test',
      lastName: 'User'
    })

    expect(global.fetch).toHaveBeenCalled()
    expect(result.data?.token).toBe('test-token')
  })

  it('should call logout API endpoint', async () => {
    const mockResponse = { ok: true, json: async () => ({}) }
    ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

    await authApi.logout()

    expect(global.fetch).toHaveBeenCalled()
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
    ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

    const result = await authApi.getCurrentUser()

    expect(global.fetch).toHaveBeenCalled()
    expect(result.data?.email).toBe('test@example.com')
  })

  it('should handle API errors gracefully', async () => {
    const mockResponse = {
      ok: false,
      status: 401,
      json: async () => ({ message: 'Unauthorized' })
    }
    ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

    const result = await authApi.login({ email: 'test@example.com', password: 'wrong' })

    expect(result.error).toBeDefined()
    expect(result.data).toBeUndefined()
  })
})
