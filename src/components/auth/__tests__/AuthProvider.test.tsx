import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import { AuthProvider, useAuth } from '../AuthProvider'
import { authApi } from '@/utils/api'

jest.mock('@/utils/api', () => ({
  authApi: {
    getCurrentUser: jest.fn(),
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
  },
}))

const mockAuthApi = authApi as jest.Mocked<typeof authApi>

const TestComponent = () => {
  const { user, isLoading, login, register, logout } = useAuth()
  
  return (
    <div>
      <div data-testid="loading">{isLoading ? 'loading' : 'loaded'}</div>
      <div data-testid="user">{user ? user.email : 'no user'}</div>
      <button onClick={() => login('test@example.com', 'password')}>
        Login
      </button>
      <button onClick={() => register('test@example.com', 'password', 'Test', 'User')}>
        Register
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

describe('AuthProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should initialize without localStorage dependency', async () => {
    mockAuthApi.getCurrentUser.mockRejectedValue(new Error('Not authenticated'))

    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      )
    })

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('loaded')
    })

    expect(screen.getByTestId('user')).toHaveTextContent('no user')
  })

  it('should set user from getCurrentUser API call', async () => {
    mockAuthApi.getCurrentUser.mockResolvedValue({
      data: { id: '1', email: 'test@example.com', firstName: 'Test', lastName: 'User', role: 'user', subscription: 'free', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    })

    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      )
    })

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('test@example.com')
    }, { timeout: 3000 })
  })

  it('should handle login without localStorage', async () => {
    mockAuthApi.getCurrentUser.mockRejectedValue(new Error('Not authenticated'))
    mockAuthApi.login.mockResolvedValue({
      data: {
        token: 'jwt-token',
        user: { id: '1', email: 'test@example.com', firstName: 'Test', lastName: 'User', role: 'user', subscription: 'free', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
      },
    })

    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      )
    })

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('loaded')
    })

    const loginButton = screen.getByText('Login')
    
    await act(async () => {
      loginButton.click()
    })

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('test@example.com')
    }, { timeout: 3000 })
  })

  it('should handle logout with API call', async () => {
    mockAuthApi.getCurrentUser.mockResolvedValue({
      data: { id: '1', email: 'test@example.com', firstName: 'Test', lastName: 'User', role: 'user', subscription: 'free', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    })
    mockAuthApi.logout.mockResolvedValue({ data: undefined })

    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      )
    })

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('test@example.com')
    }, { timeout: 3000 })

    const logoutButton = screen.getByText('Logout')
    
    await act(async () => {
      logoutButton.click()
    })

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('no user')
    }, { timeout: 3000 })

    expect(screen.getByTestId('user')).toHaveTextContent('no user')
  })
})
