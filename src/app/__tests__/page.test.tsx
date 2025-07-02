import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../page'

jest.mock('@/components', () => ({
  Navigation: ({ currentPage }: { currentPage: string }) => <nav data-testid="navigation">{currentPage}</nav>
}))

describe('Home Page', () => {
  it('should render hero section', () => {
    render(<Home />)
    
    expect(screen.getByText('Master Technology with')).toBeInTheDocument()
    expect(screen.getByText('AI-Powered Learning')).toBeInTheDocument()
  })

  it('should render navigation', () => {
    render(<Home />)
    
    expect(screen.getByTestId('navigation')).toBeInTheDocument()
  })

  it('should render call-to-action buttons', () => {
    render(<Home />)
    
    expect(screen.getByText('Browse Courses')).toBeInTheDocument()
    expect(screen.getByText('Try AI Chat')).toBeInTheDocument()
  })

  it('should render feature cards', () => {
    render(<Home />)
    
    expect(screen.getByText('Technical Courses')).toBeInTheDocument()
    expect(screen.getByText('AI-Powered Chat')).toBeInTheDocument()
    expect(screen.getByText('Secure Platform')).toBeInTheDocument()
  })
})
