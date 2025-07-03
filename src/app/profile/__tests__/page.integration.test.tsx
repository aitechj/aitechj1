import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import ProfilePage from '../page'

jest.mock('@/components/auth/AuthProvider', () => ({
  useAuth: () => ({
    user: {
      id: '1',
      email: 'user@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'user',
      subscription: 'pro',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    isLoading: false,
    isAuthenticated: true
  })
}))

describe('ProfilePage Integration', () => {
  it('should render all profile components together', async () => {
    await act(async () => {
      render(<ProfilePage />)
    })
    
    expect(screen.getByText('Profile Settings')).toBeInTheDocument()
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('Account Information')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('Subscription & Billing')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('Learning Preferences')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('Security Settings')).toBeInTheDocument()
    })
  })

  it('should render profile sidebar with user data', async () => {
    await act(async () => {
      render(<ProfilePage />)
    })
    
    await waitFor(() => {
      expect(screen.getByText('user@example.com')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('Pro Member')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('Member Since')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('Courses Completed')).toBeInTheDocument()
    })
  })

  it('should render account information form', async () => {
    await act(async () => {
      render(<ProfilePage />)
    })
    
    await waitFor(() => {
      expect(screen.getByDisplayValue('John')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByDisplayValue('Doe')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByDisplayValue('user@example.com')).toBeInTheDocument()
    })
  })

  it('should render subscription section with plan details', async () => {
    await act(async () => {
      render(<ProfilePage />)
    })
    
    await waitFor(() => {
      expect(screen.getByText('Subscription & Billing')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('Pro Plan')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('$29/month')).toBeInTheDocument()
    })
  })

  it('should render learning preferences form', async () => {
    await act(async () => {
      render(<ProfilePage />)
    })
    
    await waitFor(() => {
      expect(screen.getByText('Learning Preferences')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('JavaScript')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('Python')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('React')).toBeInTheDocument()
    })
  })

  it('should render security settings form', async () => {
    await act(async () => {
      render(<ProfilePage />)
    })
    
    await waitFor(() => {
      expect(screen.getByText('Security Settings')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('Change Password')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('Two-Factor Authentication')).toBeInTheDocument()
    })
  })

  it('should have proper page layout structure', async () => {
    let container
    await act(async () => {
      const result = render(<ProfilePage />)
      container = result.container
    })
    
    const pageContainer = container.querySelector('.min-h-screen')
    
    expect(pageContainer).toBeInTheDocument()
    expect(pageContainer).toHaveClass('bg-gradient-to-br', 'from-slate-900', 'via-blue-900', 'to-slate-900')
  })
})
