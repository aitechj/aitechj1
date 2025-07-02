import React from 'react'
import { render, screen } from '@testing-library/react'
import SystemAnalyticsSection from '../SystemAnalyticsSection'

describe('SystemAnalyticsSection', () => {
  it('should render section title', () => {
    render(<SystemAnalyticsSection />)
    
    expect(screen.getByText('System Analytics')).toBeInTheDocument()
  })

  it('should render analytics metrics', () => {
    render(<SystemAnalyticsSection />)
    
    expect(screen.getByText('AI Chat Performance')).toBeInTheDocument()
    expect(screen.getByText('Average Response Time')).toBeInTheDocument()
    expect(screen.getByText('1.2s')).toBeInTheDocument()
    expect(screen.getByText('Success Rate')).toBeInTheDocument()
    expect(screen.getByText('99.7%')).toBeInTheDocument()
    
    expect(screen.getByText('User Engagement')).toBeInTheDocument()
    expect(screen.getByText('Daily Active Users')).toBeInTheDocument()
    expect(screen.getByText('1,847')).toBeInTheDocument()
    
    expect(screen.getByText('System Health')).toBeInTheDocument()
    expect(screen.getByText('Server Uptime')).toBeInTheDocument()
    expect(screen.getByText('99.9%')).toBeInTheDocument()
  })

  it('should render performance metrics', () => {
    render(<SystemAnalyticsSection />)
    
    expect(screen.getByText('Performance Metrics')).toBeInTheDocument()
    expect(screen.getByText('CPU Usage')).toBeInTheDocument()
    expect(screen.getByText('45%')).toBeInTheDocument()
    expect(screen.getByText('Memory Usage')).toBeInTheDocument()
    expect(screen.getByText('67%')).toBeInTheDocument()
    expect(screen.getByText('Storage Usage')).toBeInTheDocument()
    expect(screen.getByText('23%')).toBeInTheDocument()
  })

  it('should have proper container styling', () => {
    const { container } = render(<SystemAnalyticsSection />)
    const sectionContainer = container.firstChild as HTMLElement
    
    expect(sectionContainer).toHaveClass('mt-8', 'bg-slate-800/50', 'backdrop-blur-sm', 'border', 'border-slate-700', 'rounded-lg', 'p-6')
  })

  it('should render progress bars', () => {
    const { container } = render(<SystemAnalyticsSection />)
    const progressBars = container.querySelectorAll('.bg-blue-600')
    
    expect(progressBars.length).toBeGreaterThan(0)
  })
})
