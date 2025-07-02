import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
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
  it('should render all profile components together', () => {
    render(<ProfilePage />)
    
    expect(screen.getByText('Profile Settings')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Account Information')).toBeInTheDocument()
    expect(screen.getByText('Subscription & Billing')).toBeInTheDocument()
    expect(screen.getByText('Learning Preferences')).toBeInTheDocument()
    expect(screen.getByText('Security Settings')).toBeInTheDocument()
  })

  it('should render profile sidebar with user data', () => {
    render(<ProfilePage />)
    
    expect(screen.getByText('user@example.com')).toBeInTheDocument()
    expect(screen.getByText('Pro Member')).toBeInTheDocument()
    expect(screen.getByText('Member Since')).toBeInTheDocument()
    expect(screen.getByText('Courses Completed')).toBeInTheDocument()
  })

  it('should render account information form', () => {
    render(<ProfilePage />)
    
    expect(screen.getByDisplayValue('John')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Doe')).toBeInTheDocument()
    expect(screen.getByDisplayValue('user@example.com')).toBeInTheDocument()
  })

  it('should render subscription section with plan details', () => {
    render(<ProfilePage />)
    
    expect(screen.getByText('Subscription & Billing')).toBeInTheDocument()
    expect(screen.getByText('Pro Plan')).toBeInTheDocument()
    expect(screen.getByText('$29/month')).toBeInTheDocument()
  })

  it('should render learning preferences form', () => {
    render(<ProfilePage />)
    
    expect(screen.getByText('Learning Preferences')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('Python')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('should render security settings form', () => {
    render(<ProfilePage />)
    
    expect(screen.getByText('Security Settings')).toBeInTheDocument()
    expect(screen.getByText('Change Password')).toBeInTheDocument()
    expect(screen.getByText('Two-Factor Authentication')).toBeInTheDocument()
  })

  it('should have proper page layout structure', () => {
    const { container } = render(<ProfilePage />)
    const pageContainer = container.querySelector('.min-h-screen')
    
    expect(pageContainer).toBeInTheDocument()
    expect(pageContainer).toHaveClass('bg-gradient-to-br', 'from-slate-900', 'via-blue-900', 'to-slate-900')
  })
})
