import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import LearningPreferencesForm from '../LearningPreferencesForm'

describe('LearningPreferencesForm', () => {
  it('should render section title', () => {
    render(<LearningPreferencesForm />)
    
    expect(screen.getByText('Learning Preferences')).toBeInTheDocument()
  })

  it('should render learning topics', () => {
    render(<LearningPreferencesForm />)
    
    expect(screen.getByText('Preferred Learning Topics')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('Python')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.getByText('AWS')).toBeInTheDocument()
    expect(screen.getByText('Docker')).toBeInTheDocument()
    expect(screen.getByText('DevOps')).toBeInTheDocument()
    expect(screen.getByText('Machine Learning')).toBeInTheDocument()
    expect(screen.getByText('Cybersecurity')).toBeInTheDocument()
  })

  it('should render difficulty level options', () => {
    render(<LearningPreferencesForm />)
    
    expect(screen.getByText('Difficulty Level')).toBeInTheDocument()
    expect(screen.getByText('Beginner')).toBeInTheDocument()
    expect(screen.getByText('Intermediate')).toBeInTheDocument()
    expect(screen.getByText('Advanced')).toBeInTheDocument()
  })

  it('should render email notification preferences', () => {
    render(<LearningPreferencesForm />)
    
    expect(screen.getByText('Email Notifications')).toBeInTheDocument()
    expect(screen.getByText('Course updates and new content')).toBeInTheDocument()
    expect(screen.getByText('Learning reminders and streaks')).toBeInTheDocument()
    expect(screen.getByText('AI chat improvements and tips')).toBeInTheDocument()
    expect(screen.getByText('Platform updates and announcements')).toBeInTheDocument()
  })

  it('should allow selecting topic preferences', async () => {
    const user = userEvent.setup()
    render(<LearningPreferencesForm />)
    
    const javascriptOption = screen.getByLabelText('JavaScript')
    await user.click(javascriptOption)
    
    expect(javascriptOption).toBeChecked()
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
