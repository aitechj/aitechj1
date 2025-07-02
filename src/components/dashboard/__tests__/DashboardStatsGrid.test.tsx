import React from 'react'
import { render, screen } from '@testing-library/react'
import DashboardStatsGrid from '../DashboardStatsGrid'

describe('DashboardStatsGrid', () => {
  it('should render all stat cards', () => {
    render(<DashboardStatsGrid />)
    
    expect(screen.getByText('Enrolled Courses')).toBeInTheDocument()
    expect(screen.getByText('12')).toBeInTheDocument()
    expect(screen.getByText('+2 this month')).toBeInTheDocument()
    
    expect(screen.getByText('Completed Courses')).toBeInTheDocument()
    expect(screen.getByText('8')).toBeInTheDocument()
    expect(screen.getByText('67% completion rate')).toBeInTheDocument()
    
    expect(screen.getByText('AI Chat Queries')).toBeInTheDocument()
    expect(screen.getByText('247')).toBeInTheDocument()
    expect(screen.getByText('This month')).toBeInTheDocument()
    
    expect(screen.getByText('Learning Streak')).toBeInTheDocument()
    expect(screen.getByText('15')).toBeInTheDocument()
    expect(screen.getByText('Days')).toBeInTheDocument()
  })

  it('should render with proper grid layout classes', () => {
    const { container } = render(<DashboardStatsGrid />)
    const gridContainer = container.firstChild as HTMLElement
    
    expect(gridContainer).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-4', 'gap-6', 'mb-12')
  })

  it('should render all stat card icons', () => {
    const { container } = render(<DashboardStatsGrid />)
    const svgElements = container.querySelectorAll('svg')
    
    expect(svgElements).toHaveLength(4)
  })

  it('should have proper styling for each stat card', () => {
    const { container } = render(<DashboardStatsGrid />)
    const statCards = container.querySelectorAll('.bg-slate-800\\/50')
    
    expect(statCards).toHaveLength(4)
    statCards.forEach(card => {
      expect(card).toHaveClass('backdrop-blur-sm', 'border', 'border-slate-700', 'rounded-lg', 'p-6')
    })
  })
})
