import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
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
  it('should render all dashboard components together', async () => {
    await act(async () => {
      render(<DashboardPage />)
    })
    
    expect(screen.getByText('Learning Dashboard')).toBeInTheDocument()
    
    await waitFor(() => {
      expect(screen.getByText('Enrolled Courses')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('Current Courses')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('Recent Activity')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('AI Chat Usage')).toBeInTheDocument()
    })
  })

  it('should render stats grid with user data', async () => {
    await act(async () => {
      render(<DashboardPage />)
    })
    
    await waitFor(() => {
      expect(screen.getByText('12')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('8')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getAllByText('247')).toHaveLength(2)
    })
    
    await waitFor(() => {
      expect(screen.getByText('15')).toBeInTheDocument()
    })
  })

  it('should render current courses with progress', async () => {
    await act(async () => {
      render(<DashboardPage />)
    })
    
    await waitFor(() => {
      expect(screen.getByText('Full Stack JavaScript Development')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('AWS Cloud Architecture')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('Python for Data Science')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getAllByText('Continue')).toHaveLength(2)
    })
  })

  it('should render recent activity items', async () => {
    await act(async () => {
      render(<DashboardPage />)
    })
    
    await waitFor(() => {
      expect(screen.getByText('Completed "React Hooks Deep Dive" lesson')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('Asked AI about "async/await best practices"')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('Earned "JavaScript Expert" badge')).toBeInTheDocument()
    })
  })

  it('should render AI chat usage statistics', async () => {
    await act(async () => {
      render(<DashboardPage />)
    })
    
    await waitFor(() => {
      expect(screen.getByText('Total Queries')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('Avg Response')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('This Week')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('1.2s')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('18')).toBeInTheDocument()
    })
  })

  it('should have proper page layout structure', async () => {
    let container
    await act(async () => {
      const result = render(<DashboardPage />)
      container = result.container
    })
    
    const pageContainer = container.querySelector('.min-h-screen')
    
    expect(pageContainer).toBeInTheDocument()
    expect(pageContainer).toHaveClass('bg-gradient-to-br', 'from-slate-900', 'via-blue-900', 'to-slate-900')
  })
})
