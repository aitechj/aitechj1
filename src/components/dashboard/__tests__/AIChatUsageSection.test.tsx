import React from 'react'
import { render, screen } from '@testing-library/react'
import AIChatUsageSection from '../AIChatUsageSection'

describe('AIChatUsageSection', () => {
  it('should render section title', () => {
    render(<AIChatUsageSection />)
    
    expect(screen.getByText('AI Chat Usage')).toBeInTheDocument()
  })

  it('should render usage statistics', () => {
    render(<AIChatUsageSection />)
    
    expect(screen.getByText('247')).toBeInTheDocument()
    expect(screen.getByText('Total Queries')).toBeInTheDocument()
    expect(screen.getByText('1.2s')).toBeInTheDocument()
    expect(screen.getByText('Avg Response')).toBeInTheDocument()
    expect(screen.getByText('18')).toBeInTheDocument()
    expect(screen.getByText('This Week')).toBeInTheDocument()
  })

  it('should have proper container styling', () => {
    const { container } = render(<AIChatUsageSection />)
    const sectionContainer = container.firstChild as HTMLElement
    
    expect(sectionContainer).toHaveClass('mt-8', 'bg-slate-800/50', 'backdrop-blur-sm', 'border', 'border-slate-700', 'rounded-lg', 'p-6')
  })

  it('should render all stat icons', () => {
    const { container } = render(<AIChatUsageSection />)
    const svgElements = container.querySelectorAll('svg')
    
    expect(svgElements).toHaveLength(3)
  })
})
