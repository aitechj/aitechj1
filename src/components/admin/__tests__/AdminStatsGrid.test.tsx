import React from 'react'
import { render, screen } from '@testing-library/react'
import AdminStatsGrid from '../AdminStatsGrid'

describe('AdminStatsGrid', () => {
  it('should render all stat cards', () => {
    render(<AdminStatsGrid />)
    
    expect(screen.getByText('Total Users')).toBeInTheDocument()
    expect(screen.getByText('2,847')).toBeInTheDocument()
    expect(screen.getByText('+12% this month')).toBeInTheDocument()
    
    expect(screen.getByText('Active Courses')).toBeInTheDocument()
    expect(screen.getByText('67')).toBeInTheDocument()
    expect(screen.getByText('3 new this week')).toBeInTheDocument()
    
    expect(screen.getByText('AI Chat Queries')).toBeInTheDocument()
    expect(screen.getByText('45.2K')).toBeInTheDocument()
    expect(screen.getByText('Today')).toBeInTheDocument()
    
    expect(screen.getByText('Revenue')).toBeInTheDocument()
    expect(screen.getByText('$82.4K')).toBeInTheDocument()
    expect(screen.getByText('This month')).toBeInTheDocument()
  })

  it('should render with proper grid layout classes', () => {
    const { container } = render(<AdminStatsGrid />)
    const gridContainer = container.firstChild as HTMLElement
    
    expect(gridContainer).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-4', 'gap-6', 'mb-12')
  })

  it('should render all stat card icons', () => {
    const { container } = render(<AdminStatsGrid />)
    const svgElements = container.querySelectorAll('svg')
    
    expect(svgElements).toHaveLength(4)
  })

  it('should have proper styling for each stat card', () => {
    const { container } = render(<AdminStatsGrid />)
    const statCards = container.querySelectorAll('.bg-slate-800\\/50')
    
    expect(statCards).toHaveLength(4)
    statCards.forEach(card => {
      expect(card).toHaveClass('backdrop-blur-sm', 'border', 'border-slate-700', 'rounded-lg', 'p-6')
    })
  })
})
