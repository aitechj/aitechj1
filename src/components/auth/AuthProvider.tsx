'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  subscription: 'free' | 'pro' | 'enterprise';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { authApi } = await import('@/utils/api');
        const response = await authApi.getCurrentUser();
        
        if (response.data) {
          setUser(response.data);
        }
      } catch {
        setUser(null);
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { authApi } = await import('@/utils/api');
      const response = await authApi.login({ email, password });
      
      if (response.error || !response.data) {
        throw new Error(response.error || 'Login failed');
      }

      const { user } = response.data;
      setUser(user);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    setIsLoading(true);
    try {
      const { authApi } = await import('@/utils/api');
      const response = await authApi.register({ email, password, firstName, lastName });
      
      if (response.error || !response.data) {
        throw new Error(response.error || 'Registration failed');
      }

      const { user } = response.data;
      setUser(user);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { apiClient } = await import('@/utils/api');
      await apiClient.post('/api/auth/logout', {});
    } catch (error) {
      console.error('Logout request failed:', error);
    }
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
