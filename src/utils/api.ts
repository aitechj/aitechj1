import { 
  ApiResponse,
  LoginRequest, 
  RegisterRequest, 
  User, 
  AuthResponse,
  Course,
  Enrollment,
  ChatMessage,
  UserPreferences,
  DashboardStats,
  AdminStats,
  CourseRequest,
  EnrollmentRequest,
  ChatMessageRequest,
  UserPreferencesRequest,
  UserProfileRequest
} from '@/types';

const API_BASE_URL = typeof window !== 'undefined' 
  ? (window as Window).location?.origin?.includes('vercel.app') 
    ? process.env.NEXT_PUBLIC_API_URL || 'https://aitechj-backend-v2.fly.dev'
    : process.env.NEXT_PUBLIC_API_URL || 'https://aitechj-backend-v2.fly.dev'
  : process.env.NEXT_PUBLIC_API_URL || 'https://aitechj-backend-v2.fly.dev';

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

  async post<T>(endpoint: string, body: Record<string, unknown> | unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async put<T>(endpoint: string, body: Record<string, unknown> | unknown): Promise<ApiResponse<T>> {
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

export const coursesApi = {
  getAll: () => 
    apiClient.get<Course[]>('/api/courses'),
  
  getById: (id: string) => 
    apiClient.get<Course>(`/api/courses/${id}`),
  
  create: (courseData: CourseRequest) => 
    apiClient.post<Course>('/api/courses', courseData),
  
  update: (id: string, courseData: CourseRequest) => 
    apiClient.put<Course>(`/api/courses/${id}`, courseData),
  
  delete: (id: string) => 
    apiClient.delete<void>(`/api/courses/${id}`),
};

export const enrollmentsApi = {
  getAll: () => 
    apiClient.get<Enrollment[]>('/api/enrollments'),
  
  enroll: (enrollmentData: EnrollmentRequest) => 
    apiClient.post<Enrollment>('/api/enrollments', enrollmentData),
  
  updateProgress: (id: string, progressData: EnrollmentRequest) => 
    apiClient.put<Enrollment>(`/api/enrollments/${id}/progress`, progressData),
};

export const dashboardApi = {
  getStats: () => 
    apiClient.get<DashboardStats>('/api/dashboard/stats'),
  
  getCurrentCourses: () => 
    apiClient.get<Enrollment[]>('/api/dashboard/courses'),
};

export const profileApi = {
  update: (profileData: UserProfileRequest) => 
    apiClient.put<User>('/api/profile', profileData),
  
  getPreferences: () => 
    apiClient.get<UserPreferences>('/api/profile/preferences'),
  
  updatePreferences: (preferencesData: UserPreferencesRequest) => 
    apiClient.put<UserPreferences>('/api/profile/preferences', preferencesData),
};

export const adminApi = {
  getStats: () => 
    apiClient.get<AdminStats>('/api/admin/stats'),
  
  getUsers: () => 
    apiClient.get<User[]>('/api/admin/users'),
};

export const chatApi = {
  sendMessage: (messageData: ChatMessageRequest) => 
    apiClient.post<ChatMessage>('/api/chat/message', messageData),
  
  getHistory: () => 
    apiClient.get<ChatMessage[]>('/api/chat/history'),
  
  getUsage: () => 
    apiClient.get<number>('/api/chat/usage'),
};

export const api = {
  auth: authApi,
  courses: coursesApi,
  enrollments: enrollmentsApi,
  dashboard: dashboardApi,
  profile: profileApi,
  admin: adminApi,
  chat: chatApi,
};
