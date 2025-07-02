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
    
    expect(screen.getByText('Server Performance')).toBeInTheDocument()
    expect(screen.getByText('CPU Usage: 45%')).toBeInTheDocument()
    expect(screen.getByText('Memory Usage: 67%')).toBeInTheDocument()
    expect(screen.getByText('Disk Usage: 23%')).toBeInTheDocument()
    
    expect(screen.getByText('Database Performance')).toBeInTheDocument()
    expect(screen.getByText('Query Response Time: 120ms')).toBeInTheDocument()
    expect(screen.getByText('Active Connections: 45')).toBeInTheDocument()
    expect(screen.getByText('Cache Hit Rate: 94%')).toBeInTheDocument()
  })

  it('should render API metrics', () => {
    render(<SystemAnalyticsSection />)
    
    expect(screen.getByText('API Metrics')).toBeInTheDocument()
    expect(screen.getByText('Requests/min: 1,247')).toBeInTheDocument()
    expect(screen.getByText('Success Rate: 99.2%')).toBeInTheDocument()
    expect(screen.getByText('Avg Response: 85ms')).toBeInTheDocument()
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
