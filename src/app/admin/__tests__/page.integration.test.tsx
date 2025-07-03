import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import AdminPage from '../page'

jest.mock('@/components/auth/AuthProvider', () => ({
  useAuth: () => ({
    user: {
      id: '1',
      email: 'isha.bahati@hotmail.com',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      subscription: 'enterprise',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    isLoading: false,
    isAuthenticated: true
  })
}))

describe('AdminPage Integration', () => {
  it('should render all admin components together', async () => {
    await act(async () => {
      render(<AdminPage />)
    })
    
    expect(screen.getAllByText('Admin Portal')).toHaveLength(2)
    
    await waitFor(() => {
      expect(screen.getByText('Total Users')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('User Management')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('Course Management')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('System Analytics')).toBeInTheDocument()
    })
  })

  it('should render stats grid with proper data', async () => {
    await act(async () => {
      render(<AdminPage />)
    })
    
    await waitFor(() => {
      expect(screen.getByText('2,847')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('67')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getAllByText('45.2K')).toHaveLength(2)
    })
    
    await waitFor(() => {
      expect(screen.getByText('$82.4K')).toBeInTheDocument()
    })
  })

  it('should render management sections with tables', async () => {
    await act(async () => {
      render(<AdminPage />)
    })
    
    await waitFor(() => {
      expect(screen.getByText('John Developer')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('Full Stack JavaScript Development')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('Add User')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getAllByText('Add Course')).toHaveLength(2)
    })
  })

  it('should render system analytics with metrics', async () => {
    await act(async () => {
      render(<AdminPage />)
    })
    
    await waitFor(() => {
      expect(screen.getByText('AI Chat Performance')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('User Engagement')).toBeInTheDocument()
    })
    
    await waitFor(() => {
      expect(screen.getByText('System Health')).toBeInTheDocument()
    })
  })

  it('should have proper page layout structure', async () => {
    let container
    await act(async () => {
      const result = render(<AdminPage />)
      container = result.container
    })
    
    const pageContainer = container.querySelector('.min-h-screen')
    
    expect(pageContainer).toBeInTheDocument()
    expect(pageContainer).toHaveClass('bg-gradient-to-br', 'from-slate-900', 'via-blue-900', 'to-slate-900')
  })
})
