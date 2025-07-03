export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  subscription: 'free' | 'pro' | 'enterprise';
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

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

export interface AuthResponse {
  user: User;
  token?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  durationWeeks: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  status: 'draft' | 'active' | 'archived';
  topics: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Enrollment {
  id: string;
  course: Course;
  progressPercentage: number;
  status: 'in_progress' | 'completed' | 'paused';
  enrolledAt: string;
  completedAt?: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  userMessage: string;
  aiResponse: string;
  timestamp: string;
  tokenCount: number;
}

export interface UserPreferences {
  id: string;
  preferredTopics: string[];
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  emailCourseUpdates: boolean;
  emailLearningReminders: boolean;
  emailChatTips: boolean;
  emailPlatformUpdates: boolean;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  enrolledCourses: number;
  completedCourses: number;
  aiChatQueries: number;
  learningStreak: number;
}

export interface AdminStats {
  totalUsers: number;
  activeCourses: number;
  totalChatQueries: number;
  totalRevenue: number;
}

export interface CourseRequest {
  title: string;
  description?: string;
  instructor: string;
  durationWeeks: number;
  difficulty: string;
  status?: string;
  topics?: string[];
}

export interface EnrollmentRequest {
  courseId: number;
  progressPercentage?: number;
}

export interface ChatMessageRequest {
  message: string;
}

export interface UserPreferencesRequest {
  preferredTopics?: string[];
  difficultyLevel: string;
  emailCourseUpdates: boolean;
  emailLearningReminders: boolean;
  emailChatTips: boolean;
  emailPlatformUpdates: boolean;
  bio?: string;
}

export interface UserProfileRequest {
  firstName: string;
  lastName: string;
  email: string;
  bio?: string;
}
