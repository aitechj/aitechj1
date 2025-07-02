import React from 'react'
import { render, screen } from '@testing-library/react'
import ProfileSidebar from '../ProfileSidebar'

const mockUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  subscription: 'pro'
}

describe('ProfileSidebar', () => {
  it('should render user information', () => {
    render(<ProfileSidebar user={mockUser} />)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument()
    expect(screen.getByText('Pro Member')).toBeInTheDocument()
  })

  it('should render user statistics', () => {
    render(<ProfileSidebar user={mockUser} />)
    
    expect(screen.getByText('Member Since')).toBeInTheDocument()
    expect(screen.getByText('Jan 2024')).toBeInTheDocument()
    expect(screen.getByText('Courses Completed')).toBeInTheDocument()
    expect(screen.getByText('12')).toBeInTheDocument()
    expect(screen.getByText('Learning Streak')).toBeInTheDocument()
    expect(screen.getByText('45 days')).toBeInTheDocument()
    expect(screen.getByText('Total Study Time')).toBeInTheDocument()
    expect(screen.getByText('127 hours')).toBeInTheDocument()
  })

  it('should render achievements section', () => {
    render(<ProfileSidebar user={mockUser} />)
    
    expect(screen.getByText('Achievements')).toBeInTheDocument()
    expect(screen.getByText('Expert')).toBeInTheDocument()
    expect(screen.getByText('Focused')).toBeInTheDocument()
    expect(screen.getByText('Streak')).toBeInTheDocument()
  })

  it('should display correct subscription badge for free user', () => {
    const freeUser = { ...mockUser, subscription: 'free' }
    render(<ProfileSidebar user={freeUser} />)
    
    expect(screen.getByText('Free Member')).toBeInTheDocument()
  })

  it('should display correct subscription badge for enterprise user', () => {
    const enterpriseUser = { ...mockUser, subscription: 'enterprise' }
    render(<ProfileSidebar user={enterpriseUser} />)
    
    expect(screen.getByText('Enterprise Member')).toBeInTheDocument()
  })

  it('should have proper container styling', () => {
    const { container } = render(<ProfileSidebar user={mockUser} />)
    const sidebarContainer = container.firstChild as HTMLElement
    
    expect(sidebarContainer).toHaveClass('bg-slate-800/50', 'backdrop-blur-sm', 'border', 'border-slate-700', 'rounded-lg', 'p-6')
  })
})
