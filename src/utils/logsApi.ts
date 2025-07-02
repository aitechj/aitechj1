const LOGS_API_BASE_URL = typeof window !== 'undefined' 
  ? process.env.NEXT_PUBLIC_LOGS_API_URL || 'https://logs.aitechj.com'
  : process.env.NEXT_PUBLIC_LOGS_API_URL || 'https://logs.aitechj.com';

import { ApiResponse } from '@/types';

class LogsApiClient {
  private getAuthHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
    };
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${LOGS_API_BASE_URL}${endpoint}`, {
        ...options,
        credentials: 'include',
        headers: {
          ...this.getAuthHeaders(),
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('Logs API request failed:', error);
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body: Record<string, unknown>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }
}

export const logsApiClient = new LogsApiClient();

export interface AuditLog {
  id: number;
  entityName: string;
  entityId: string;
  operation: string;
  oldValues?: string;
  newValues?: string;
  timestamp: string;
  userId?: number;
  severity: string;
}

export interface AuditLogPage {
  content: AuditLog[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export const auditApi = {
  getAllLogs: (page = 0, size = 10, startDate?: string, endDate?: string) => {
    let url = `/api/audit/logs?page=${page}&size=${size}`;
    if (startDate) url += `&startDate=${startDate}`;
    if (endDate) url += `&endDate=${endDate}`;
    return logsApiClient.get<AuditLogPage>(url);
  },
  
  getLogsByEntity: (entityName: string, page = 0, size = 10, startDate?: string, endDate?: string) => {
    let url = `/api/audit/logs/entity/${entityName}?page=${page}&size=${size}`;
    if (startDate) url += `&startDate=${startDate}`;
    if (endDate) url += `&endDate=${endDate}`;
    return logsApiClient.get<AuditLogPage>(url);
  },
  
  getLogsBySeverity: (severity: string, page = 0, size = 10, startDate?: string, endDate?: string) => {
    let url = `/api/audit/logs/severity/${severity}?page=${page}&size=${size}`;
    if (startDate) url += `&startDate=${startDate}`;
    if (endDate) url += `&endDate=${endDate}`;
    return logsApiClient.get<AuditLogPage>(url);
  },
  
  getLogsByUser: (userId: number, page = 0, size = 10, startDate?: string, endDate?: string) => {
    let url = `/api/audit/logs/user/${userId}?page=${page}&size=${size}`;
    if (startDate) url += `&startDate=${startDate}`;
    if (endDate) url += `&endDate=${endDate}`;
    return logsApiClient.get<AuditLogPage>(url);
  },
  
  createManualLog: (entityName: string, entityId: string, operation: string, oldValues?: string, newValues?: string, userId?: number, severity = 'INFO') => 
    logsApiClient.post<void>(`/api/audit/logs/manual?entityName=${entityName}&entityId=${entityId}&operation=${operation}&oldValues=${oldValues || ''}&newValues=${newValues || ''}&userId=${userId || ''}&severity=${severity}`, {}),
};
