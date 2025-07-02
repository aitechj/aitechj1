import '@testing-library/jest-dom'
import { apiClient, authApi } from '../api'

const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>
global.fetch = mockFetch

describe('ApiClient', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should make GET requests', async () => {
    const mockResponse = { data: { id: 1, name: 'Test' } }
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse)
    } as any)

    const result = await apiClient.get('/test')

    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/test'),
      expect.objectContaining({
        method: 'GET',
        credentials: 'include'
      })
    )
    expect(result.data).toEqual(mockResponse)
  })

  it('should make POST requests', async () => {
    const mockResponse = { success: true }
    const postData = { name: 'Test' }
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse)
    } as any)

    const result = await apiClient.post('/test', postData)

    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/test'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(postData),
        credentials: 'include'
      })
    )
    expect(result.data).toEqual(mockResponse)
  })

  it('should handle errors', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404
    } as any)

    const result = await apiClient.get('/test')

    expect(result.error).toBeDefined()
    expect(result.data).toBeUndefined()
  })
})

describe('authApi', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call login endpoint', async () => {
    const mockResponse = { token: 'test-token' }
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse)
    } as any)

    await authApi.login({ email: 'test@example.com', password: 'password' })

    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/auth/login'),
      expect.objectContaining({
        method: 'POST'
      })
    )
  })

  it('should call register endpoint', async () => {
    const mockResponse = { token: 'test-token' }
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse)
    } as any)

    await authApi.register({
      email: 'test@example.com',
      password: 'password',
      firstName: 'Test',
      lastName: 'User'
    })

    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/auth/register'),
      expect.objectContaining({
        method: 'POST'
      })
    )
  })
})
