import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import SubscriptionSection from '../SubscriptionSection'

const mockUser = {
  subscription: 'pro'
}

describe('SubscriptionSection', () => {
  it('should render section title', () => {
    render(<SubscriptionSection user={mockUser} />)
    
    expect(screen.getByText('Subscription & Billing')).toBeInTheDocument()
  })

  it('should render current plan information', () => {
    render(<SubscriptionSection user={mockUser} />)
    
    expect(screen.getByText('Pro Plan')).toBeInTheDocument()
    expect(screen.getByText('$29/month')).toBeInTheDocument()
    expect(screen.getByText('Next billing: Feb 15, 2024')).toBeInTheDocument()
  })

  it('should render plan features', () => {
    render(<SubscriptionSection user={mockUser} />)
    
    expect(screen.getByText('Unlimited courses and AI chat queries')).toBeInTheDocument()
    expect(screen.getByText('AI Chat Usage')).toBeInTheDocument()
    expect(screen.getByText('Course Access')).toBeInTheDocument()
    expect(screen.getByText('All Courses')).toBeInTheDocument()
  })

  it('should render action buttons', () => {
    render(<SubscriptionSection user={mockUser} />)
    
    expect(screen.getByText('Change Plan')).toBeInTheDocument()
    expect(screen.getByText('Cancel Subscription')).toBeInTheDocument()
  })

  it('should display free plan correctly', () => {
    const freeUser = { subscription: 'free' }
    render(<SubscriptionSection user={freeUser} />)
    
    expect(screen.getByText('Free Plan')).toBeInTheDocument()
    expect(screen.getByText('Free')).toBeInTheDocument()
  })

  it('should display enterprise plan correctly', () => {
    const enterpriseUser = { subscription: 'enterprise' }
    render(<SubscriptionSection user={enterpriseUser} />)
    
    expect(screen.getByText('Enterprise Plan')).toBeInTheDocument()
    expect(screen.getByText('$99/month')).toBeInTheDocument()
  })

  it('should have proper container styling', () => {
    const { container } = render(<SubscriptionSection user={mockUser} />)
    const sectionContainer = container.firstChild as HTMLElement
    
    expect(sectionContainer).toHaveClass('bg-slate-800/50', 'backdrop-blur-sm', 'border', 'border-slate-700', 'rounded-lg', 'p-6')
  })
})
