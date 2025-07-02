import { auditApi } from '../logsApi'

const mockFetch = jest.fn()
global.fetch = mockFetch

describe('auditApi', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  it('should call getAllLogs API endpoint', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        content: [
          { id: '1', action: 'CREATE', entityType: 'User', entityId: '123', timestamp: '2024-01-01' }
        ],
        totalElements: 1,
        totalPages: 1,
        number: 0,
        size: 10
      })
    }
    mockFetch.mockResolvedValue(mockResponse)

    const result = await auditApi.getAllLogs(0, 10)

    expect(mockFetch).toHaveBeenCalled()
    expect(result.data?.content.length).toEqual(1)
    expect(result.data?.totalElements).toEqual(1)
  })

  it('should call getLogsByEntity API endpoint', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        content: [
          { id: '1', action: 'UPDATE', entityType: 'User', entityId: '123', timestamp: '2024-01-01' }
        ],
        totalElements: 1,
        totalPages: 1,
        number: 0,
        size: 10
      })
    }
    mockFetch.mockResolvedValue(mockResponse)

    const result = await auditApi.getLogsByEntity('User', 0, 10)

    expect(mockFetch).toHaveBeenCalled()
    expect(result.data?.content.length).toEqual(1)
  })

  it('should call createManualLog API endpoint', async () => {
    const mockResponse = { ok: true, json: async () => ({}) }
    mockFetch.mockResolvedValue(mockResponse)

    await auditApi.createManualLog('User', '123', 'CREATE')

    expect(mockFetch).toHaveBeenCalled()
  })

  it('should call getLogsBySeverity API endpoint', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        content: [
          { id: '1', action: 'DELETE', entityType: 'User', entityId: '123', timestamp: '2024-01-01', severity: 'HIGH' }
        ],
        totalElements: 1,
        totalPages: 1,
        number: 0,
        size: 10
      })
    }
    mockFetch.mockResolvedValue(mockResponse)

    const result = await auditApi.getLogsBySeverity('HIGH', 0, 10)

    expect(mockFetch).toHaveBeenCalled()
    expect(result.data?.content.length).toEqual(1)
  })

  it('should call getLogsByUser API endpoint', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        content: [
          { id: '1', action: 'LOGIN', entityType: 'Session', entityId: '456', timestamp: '2024-01-01', userId: 123 }
        ],
        totalElements: 1,
        totalPages: 1,
        number: 0,
        size: 10
      })
    }
    mockFetch.mockResolvedValue(mockResponse)

    const result = await auditApi.getLogsByUser(123, 0, 10)

    expect(mockFetch).toHaveBeenCalled()
    expect(result.data?.content.length).toEqual(1)
  })

  it('should handle API errors gracefully', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      json: async () => ({ message: 'Server Error' })
    }
    mockFetch.mockResolvedValue(mockResponse)

    const result = await auditApi.getAllLogs(0, 10)

    expect(result.error).toBeTruthy()
    expect(result.data).toBeFalsy()
  })
})
