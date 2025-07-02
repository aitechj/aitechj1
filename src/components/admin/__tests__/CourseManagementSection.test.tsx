import React from 'react'
import { render, screen } from '@testing-library/react'
import CourseManagementSection from '../CourseManagementSection'

describe('CourseManagementSection', () => {
  it('should render section title', () => {
    render(<CourseManagementSection />)
    
    expect(screen.getByText('Course Management')).toBeInTheDocument()
  })

  it('should render add course button', () => {
    render(<CourseManagementSection />)
    
    expect(screen.getByText('Add Course')).toBeInTheDocument()
  })

  it('should render course data', () => {
    render(<CourseManagementSection />)
    
    expect(screen.getByText('Full Stack JavaScript Development')).toBeInTheDocument()
    expect(screen.getByText('AWS Cloud Architecture')).toBeInTheDocument()
    expect(screen.getByText('Python for Data Science')).toBeInTheDocument()
  })

  it('should render course details', () => {
    render(<CourseManagementSection />)
    
    expect(screen.getByText('12 weeks • 847 enrolled • Active')).toBeInTheDocument()
    expect(screen.getByText('8 weeks • 523 enrolled • Active')).toBeInTheDocument()
    expect(screen.getByText('10 weeks • 692 enrolled • Draft')).toBeInTheDocument()
  })

  it('should render course status badges', () => {
    render(<CourseManagementSection />)
    
    expect(screen.getByText('ACTIVE')).toBeInTheDocument()
    expect(screen.getByText('NEW')).toBeInTheDocument()
    expect(screen.getByText('DRAFT')).toBeInTheDocument()
  })

  it('should render view all courses link', () => {
    render(<CourseManagementSection />)
    
    expect(screen.getByText('View All Courses →')).toBeInTheDocument()
  })

  it('should render edit icons', () => {
    const { container } = render(<CourseManagementSection />)
    const editIcons = container.querySelectorAll('svg')
    
    expect(editIcons).toHaveLength(3)
  })

  it('should have proper container styling', () => {
    const { container } = render(<CourseManagementSection />)
    const sectionContainer = container.firstChild as HTMLElement
    
    expect(sectionContainer).toHaveClass('bg-slate-800/50', 'backdrop-blur-sm', 'border', 'border-slate-700', 'rounded-lg', 'p-6')
  })
})
