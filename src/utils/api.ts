const API_BASE_URL = typeof window !== 'undefined' 
  ? (window as Window).location?.origin?.includes('vercel.app') 
    ? process.env.NEXT_PUBLIC_API_URL || 'https://aitechj-backend-v2.fly.dev'
    : process.env.NEXT_PUBLIC_API_URL || 'https://aitechj-backend-v2.fly.dev'
  : process.env.NEXT_PUBLIC_API_URL || 'https://aitechj-backend-v2.fly.dev';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

class ApiClient {
  private getAuthHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
    };
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        credentials: 'include', // Include cookies in requests
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
      console.error('API request failed:', error);
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

  async put<T>(endpoint: string, body: Record<string, unknown>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();

export interface LoginRequest {
  email: string;
  password: string;
  [key: string]: unknown;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  [key: string]: unknown;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  subscription: 'free' | 'pro' | 'enterprise';
}

export interface AuthResponse {
  token: string;
  user: User;
}

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

export const authApi = {
  login: (credentials: LoginRequest) => 
    apiClient.post<AuthResponse>('/api/auth/login', credentials),
  
  register: (userData: RegisterRequest) => 
    apiClient.post<AuthResponse>('/api/auth/register', userData),
  
  getCurrentUser: () => 
    apiClient.get<User>('/api/auth/me'),
  
  logout: () => 
    apiClient.post<void>('/api/auth/logout', {}),
};

export const auditApi = {
  getAllLogs: (page = 0, size = 20) => 
    apiClient.get<AuditLogPage>(`/api/audit/logs?page=${page}&size=${size}`),
  
  getLogsByEntity: (entityName: string, page = 0, size = 20) => 
    apiClient.get<AuditLogPage>(`/api/audit/logs/entity/${entityName}?page=${page}&size=${size}`),
  
  getLogsBySeverity: (severity: string, page = 0, size = 20) => 
    apiClient.get<AuditLogPage>(`/api/audit/logs/severity/${severity}?page=${page}&size=${size}`),
  
  getLogsByUser: (userId: number, page = 0, size = 20) => 
    apiClient.get<AuditLogPage>(`/api/audit/logs/user/${userId}?page=${page}&size=${size}`),
  
  createManualLog: (entityName: string, entityId: string, operation: string, oldValues?: string, newValues?: string, userId?: number, severity = 'INFO') => 
    apiClient.post<void>(`/api/audit/logs/manual?entityName=${entityName}&entityId=${entityId}&operation=${operation}&oldValues=${oldValues || ''}&newValues=${newValues || ''}&userId=${userId || ''}&severity=${severity}`, {}),
};
