import '@testing-library/jest-dom'
import { logsApiClient, auditApi } from '../logsApi'

const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>
global.fetch = mockFetch

describe('LogsApiClient', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should make GET requests', async () => {
    const mockResponse = { content: [], totalElements: 0 }
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse)
    } as any)

    const result = await logsApiClient.get('/api/audit/logs')

    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/audit/logs'),
      expect.objectContaining({
        method: 'GET',
        credentials: 'include'
      })
    )
    expect(result.data).toEqual(mockResponse)
  })

  it('should handle errors', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500
    } as any)

    const result = await logsApiClient.get('/api/audit/logs')

    expect(result.error).toBeDefined()
    expect(result.data).toBeUndefined()
  })
})

describe('auditApi', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should get all logs', async () => {
    const mockResponse = { content: [], totalElements: 0 }
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse)
    } as any)

    await auditApi.getAllLogs(0, 10)

    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/audit/logs?page=0&size=10'),
      expect.objectContaining({
        method: 'GET'
      })
    )
  })

  it('should get logs by entity', async () => {
    const mockResponse = { content: [], totalElements: 0 }
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse)
    } as any)

    await auditApi.getLogsByEntity('User', 0, 10)

    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/audit/logs/entity/User?page=0&size=10'),
      expect.objectContaining({
        method: 'GET'
      })
    )
  })

  it('should create manual log', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({})
    } as any)

    await auditApi.createManualLog('User', '123', 'CREATE')

    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/audit/logs/manual'),
      expect.objectContaining({
        method: 'POST'
      })
    )
  })
})
