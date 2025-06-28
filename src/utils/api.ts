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
    const token = localStorage.getItem('auth_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
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

export const authApi = {
  login: (credentials: LoginRequest) => 
    apiClient.post<AuthResponse>('/api/auth/login', credentials),
  
  register: (userData: RegisterRequest) => 
    apiClient.post<AuthResponse>('/api/auth/register', userData),
  
  getCurrentUser: () => 
    apiClient.get<User>('/api/auth/me'),
};
