import React from 'react'
import { render, screen } from '@testing-library/react'
import UserManagementSection from '../UserManagementSection'

describe('UserManagementSection', () => {
  it('should render section title', () => {
    render(<UserManagementSection />)
    
    expect(screen.getByText('User Management')).toBeInTheDocument()
  })

  it('should render add user button', () => {
    render(<UserManagementSection />)
    
    expect(screen.getByText('Add User')).toBeInTheDocument()
  })

  it('should render user data', () => {
    render(<UserManagementSection />)
    
    expect(screen.getByText('John Developer')).toBeInTheDocument()
    expect(screen.getByText('john.dev@email.com')).toBeInTheDocument()
    expect(screen.getByText('Sarah Martinez')).toBeInTheDocument()
    expect(screen.getByText('sarah.m@email.com')).toBeInTheDocument()
    expect(screen.getByText('Mike Johnson')).toBeInTheDocument()
    expect(screen.getByText('mike.j@email.com')).toBeInTheDocument()
  })

  it('should render subscription badges', () => {
    render(<UserManagementSection />)
    
    expect(screen.getByText('Pro')).toBeInTheDocument()
    expect(screen.getByText('Basic')).toBeInTheDocument()
    expect(screen.getByText('Enterprise')).toBeInTheDocument()
  })

  it('should render user avatars', () => {
    render(<UserManagementSection />)
    
    expect(screen.getByText('JD')).toBeInTheDocument()
    expect(screen.getByText('SM')).toBeInTheDocument()
    expect(screen.getByText('MJ')).toBeInTheDocument()
  })

  it('should render view all users link', () => {
    render(<UserManagementSection />)
    
    expect(screen.getByText('View All Users →')).toBeInTheDocument()
  })

  it('should render menu icons', () => {
    const { container } = render(<UserManagementSection />)
    const menuIcons = container.querySelectorAll('svg')
    
    expect(menuIcons).toHaveLength(3)
  })

  it('should have proper container styling', () => {
    const { container } = render(<UserManagementSection />)
    const sectionContainer = container.firstChild as HTMLElement
    
    expect(sectionContainer).toHaveClass('bg-slate-800/50', 'backdrop-blur-sm', 'border', 'border-slate-700', 'rounded-lg', 'p-6')
  })
})
