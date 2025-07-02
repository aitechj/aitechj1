import React from 'react'
import { render, screen } from '@testing-library/react'
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
    
    expect(screen.getByText('Current Plan: Pro')).toBeInTheDocument()
    expect(screen.getByText('$19.99/month')).toBeInTheDocument()
    expect(screen.getByText('Next billing: March 15, 2024')).toBeInTheDocument()
  })

  it('should render plan features', () => {
    render(<SubscriptionSection user={mockUser} />)
    
    expect(screen.getByText('Unlimited AI chat queries')).toBeInTheDocument()
    expect(screen.getByText('Access to premium courses')).toBeInTheDocument()
    expect(screen.getByText('Priority support')).toBeInTheDocument()
    expect(screen.getByText('Advanced analytics')).toBeInTheDocument()
  })

  it('should render action buttons', () => {
    render(<SubscriptionSection user={mockUser} />)
    
    expect(screen.getByText('Upgrade Plan')).toBeInTheDocument()
    expect(screen.getByText('Manage Billing')).toBeInTheDocument()
  })

  it('should display free plan correctly', () => {
    const freeUser = { subscription: 'free' }
    render(<SubscriptionSection user={freeUser} />)
    
    expect(screen.getByText('Current Plan: Free')).toBeInTheDocument()
    expect(screen.getByText('$0/month')).toBeInTheDocument()
  })

  it('should display enterprise plan correctly', () => {
    const enterpriseUser = { subscription: 'enterprise' }
    render(<SubscriptionSection user={enterpriseUser} />)
    
    expect(screen.getByText('Current Plan: Enterprise')).toBeInTheDocument()
    expect(screen.getByText('Custom pricing')).toBeInTheDocument()
  })

  it('should have proper container styling', () => {
    const { container } = render(<SubscriptionSection user={mockUser} />)
    const sectionContainer = container.firstChild as HTMLElement
    
    expect(sectionContainer).toHaveClass('bg-slate-800/50', 'backdrop-blur-sm', 'border', 'border-slate-700', 'rounded-lg', 'p-6')
  })
})
