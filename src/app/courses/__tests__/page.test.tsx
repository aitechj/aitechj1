import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

const MockCoursesPage = () => <div>Courses Page</div>

jest.mock('../page', () => MockCoursesPage)

describe('Courses Page', () => {
  it('should render courses page', () => {
    render(<MockCoursesPage />)
    
    expect(screen.getByText('Courses Page')).toBeInTheDocument()
  })
})
