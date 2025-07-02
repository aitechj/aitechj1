import React from 'react'
import { render, screen } from '@testing-library/react'
import DashboardPage from '../page'

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

describe('DashboardPage Integration', () => {
  it('should render all dashboard components together', () => {
    render(<DashboardPage />)
    
    expect(screen.getByText('Learning Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Enrolled Courses')).toBeInTheDocument()
    expect(screen.getByText('Current Courses')).toBeInTheDocument()
    expect(screen.getByText('Recent Activity')).toBeInTheDocument()
    expect(screen.getByText('AI Chat Usage')).toBeInTheDocument()
  })

  it('should render stats grid with user data', () => {
    render(<DashboardPage />)
    
    expect(screen.getByText('12')).toBeInTheDocument()
    expect(screen.getByText('8')).toBeInTheDocument()
    expect(screen.getAllByText('247')).toHaveLength(2)
    expect(screen.getByText('15')).toBeInTheDocument()
  })

  it('should render current courses with progress', () => {
    render(<DashboardPage />)
    
    expect(screen.getByText('Full Stack JavaScript Development')).toBeInTheDocument()
    expect(screen.getByText('AWS Cloud Architecture')).toBeInTheDocument()
    expect(screen.getByText('Python for Data Science')).toBeInTheDocument()
    expect(screen.getAllByText('Continue')).toHaveLength(2)
  })

  it('should render recent activity items', () => {
    render(<DashboardPage />)
    
    expect(screen.getByText('Completed "React Hooks Deep Dive" lesson')).toBeInTheDocument()
    expect(screen.getByText('Asked AI about "async/await best practices"')).toBeInTheDocument()
    expect(screen.getByText('Earned "JavaScript Expert" badge')).toBeInTheDocument()
  })

  it('should render AI chat usage statistics', () => {
    render(<DashboardPage />)
    
    expect(screen.getByText('Total Queries')).toBeInTheDocument()
    expect(screen.getByText('Avg Response')).toBeInTheDocument()
    expect(screen.getByText('This Week')).toBeInTheDocument()
    expect(screen.getByText('1.2s')).toBeInTheDocument()
    expect(screen.getByText('18')).toBeInTheDocument()
  })

  it('should have proper page layout structure', () => {
    const { container } = render(<DashboardPage />)
    const pageContainer = container.querySelector('.min-h-screen')
    
    expect(pageContainer).toBeInTheDocument()
    expect(pageContainer).toHaveClass('bg-gradient-to-br', 'from-slate-900', 'via-blue-900', 'to-slate-900')
  })
})
