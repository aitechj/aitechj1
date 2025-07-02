import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LearningPreferencesForm from '../LearningPreferencesForm'

describe('LearningPreferencesForm', () => {
  it('should render section title', () => {
    render(<LearningPreferencesForm />)
    
    expect(screen.getByText('Learning Preferences')).toBeInTheDocument()
  })

  it('should render preference options', () => {
    render(<LearningPreferencesForm />)
    
    expect(screen.getByText('Preferred Learning Style')).toBeInTheDocument()
    expect(screen.getByText('Visual')).toBeInTheDocument()
    expect(screen.getByText('Auditory')).toBeInTheDocument()
    expect(screen.getByText('Kinesthetic')).toBeInTheDocument()
    expect(screen.getByText('Reading/Writing')).toBeInTheDocument()
  })

  it('should render difficulty level options', () => {
    render(<LearningPreferencesForm />)
    
    expect(screen.getByText('Preferred Difficulty Level')).toBeInTheDocument()
    expect(screen.getByText('Beginner')).toBeInTheDocument()
    expect(screen.getByText('Intermediate')).toBeInTheDocument()
    expect(screen.getByText('Advanced')).toBeInTheDocument()
  })

  it('should render notification preferences', () => {
    render(<LearningPreferencesForm />)
    
    expect(screen.getByText('Notification Preferences')).toBeInTheDocument()
    expect(screen.getByText('Email notifications')).toBeInTheDocument()
    expect(screen.getByText('Push notifications')).toBeInTheDocument()
    expect(screen.getByText('Weekly progress reports')).toBeInTheDocument()
  })

  it('should allow selecting preferences', async () => {
    const user = userEvent.setup()
    render(<LearningPreferencesForm />)
    
    const visualOption = screen.getByLabelText('Visual')
    await user.click(visualOption)
    
    expect(visualOption).toBeChecked()
  })

  it('should render save preferences button', () => {
    render(<LearningPreferencesForm />)
    
    expect(screen.getByText('Save Preferences')).toBeInTheDocument()
  })

  it('should have proper container styling', () => {
    const { container } = render(<LearningPreferencesForm />)
    const formContainer = container.firstChild as HTMLElement
    
    expect(formContainer).toHaveClass('bg-slate-800/50', 'backdrop-blur-sm', 'border', 'border-slate-700', 'rounded-lg', 'p-6')
  })
})
