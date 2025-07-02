import React from 'react'
import { render, screen } from '@testing-library/react'
import RecentActivitySection from '../RecentActivitySection'

describe('RecentActivitySection', () => {
  it('should render section title', () => {
    render(<RecentActivitySection />)
    
    expect(screen.getByText('Recent Activity')).toBeInTheDocument()
  })

  it('should render activity items', () => {
    render(<RecentActivitySection />)
    
    expect(screen.getByText('Completed "React Hooks Deep Dive" lesson')).toBeInTheDocument()
    expect(screen.getByText('Asked AI about "async/await best practices"')).toBeInTheDocument()
    expect(screen.getByText('Started "AWS Cloud Architecture" course')).toBeInTheDocument()
    expect(screen.getByText('Earned "JavaScript Expert" badge')).toBeInTheDocument()
    expect(screen.getByText('Completed final project for "Node.js Backend"')).toBeInTheDocument()
  })

  it('should render timestamps', () => {
    render(<RecentActivitySection />)
    
    expect(screen.getByText('2 hours ago')).toBeInTheDocument()
    expect(screen.getByText('5 hours ago')).toBeInTheDocument()
    expect(screen.getByText('1 day ago')).toBeInTheDocument()
    expect(screen.getByText('2 days ago')).toBeInTheDocument()
    expect(screen.getByText('3 days ago')).toBeInTheDocument()
  })

  it('should render activity icons', () => {
    const { container } = render(<RecentActivitySection />)
    const activityIcons = container.querySelectorAll('.w-8')
    
    expect(activityIcons.length).toBeGreaterThan(0)
  })

  it('should render view all activity link', () => {
    render(<RecentActivitySection />)
    
    expect(screen.getByText('View All Activity →')).toBeInTheDocument()
  })
})
