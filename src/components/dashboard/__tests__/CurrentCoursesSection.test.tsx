import React from 'react'
import { render, screen } from '@testing-library/react'
import CurrentCoursesSection from '../CurrentCoursesSection'

describe('CurrentCoursesSection', () => {
  it('should render section title', () => {
    render(<CurrentCoursesSection />)
    
    expect(screen.getByText('Current Courses')).toBeInTheDocument()
  })

  it('should render course cards', () => {
    render(<CurrentCoursesSection />)
    
    expect(screen.getByText('Full Stack JavaScript Development')).toBeInTheDocument()
    expect(screen.getByText('AWS Cloud Architecture')).toBeInTheDocument()
    expect(screen.getByText('Python for Data Science')).toBeInTheDocument()
  })

  it('should render progress percentages', () => {
    render(<CurrentCoursesSection />)
    
    expect(screen.getByText('65%')).toBeInTheDocument()
    expect(screen.getByText('12%')).toBeInTheDocument()
    expect(screen.getByText('43%')).toBeInTheDocument()
  })

  it('should render course status badges', () => {
    render(<CurrentCoursesSection />)
    
    expect(screen.getByText('IN PROGRESS')).toBeInTheDocument()
    expect(screen.getByText('NEW')).toBeInTheDocument()
    expect(screen.getByText('PAUSED')).toBeInTheDocument()
  })

  it('should render action buttons', () => {
    render(<CurrentCoursesSection />)
    
    const continueButtons = screen.getAllByText('Continue')
    expect(continueButtons).toHaveLength(2)
    
    const resumeButton = screen.getByText('Resume')
    expect(resumeButton).toBeInTheDocument()
  })

  it('should render view all courses link', () => {
    render(<CurrentCoursesSection />)
    
    expect(screen.getByText('View All Courses →')).toBeInTheDocument()
  })
})
