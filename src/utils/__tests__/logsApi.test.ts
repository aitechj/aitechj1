import '@testing-library/jest-dom'
import { auditApi } from '../logsApi'

global.fetch = jest.fn()

describe('auditApi', () => {
  beforeEach(() => {
    jest.clearAllMocks()
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
    ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

    const result = await auditApi.getAllLogs(0, 10)

    expect(global.fetch).toHaveBeenCalled()
    expect(result.data?.content.length).toBe(1)
    expect(result.data?.totalElements).toBe(1)
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
    ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

    const result = await auditApi.getLogsByEntity('User', 0, 10)

    expect(global.fetch).toHaveBeenCalled()
    expect(result.data?.content.length).toBe(1)
  })

  it('should call createManualLog API endpoint', async () => {
    const mockResponse = { ok: true, json: async () => ({}) }
    ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

    await auditApi.createManualLog('User', '123', 'CREATE')

    expect(global.fetch).toHaveBeenCalled()
  })

  it('should handle API errors gracefully', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      json: async () => ({ message: 'Server Error' })
    }
    ;(global.fetch as jest.Mock).mockResolvedValue(mockResponse)

    const result = await auditApi.getAllLogs(0, 10)

    expect(result.error).toBeDefined()
    expect(result.data).toBeUndefined()
  })
})
