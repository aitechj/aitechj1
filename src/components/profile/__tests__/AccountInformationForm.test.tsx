import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AccountInformationForm from '../AccountInformationForm'

const mockUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com'
}

describe('AccountInformationForm', () => {
  it('should render form fields with user data', () => {
    render(<AccountInformationForm user={mockUser} />)
    
    expect(screen.getByDisplayValue('John')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Doe')).toBeInTheDocument()
    expect(screen.getByDisplayValue('john.doe@example.com')).toBeInTheDocument()
  })

  it('should render form labels', () => {
    render(<AccountInformationForm user={mockUser} />)
    
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })

  it('should allow editing form fields', async () => {
    const user = userEvent.setup()
    render(<AccountInformationForm user={mockUser} />)
    
    const firstNameInput = screen.getByLabelText(/first name/i)
    await user.clear(firstNameInput)
    await user.type(firstNameInput, 'Jane')
    
    expect(screen.getByDisplayValue('Jane')).toBeInTheDocument()
  })

  it('should render save changes button', () => {
    render(<AccountInformationForm user={mockUser} />)
    
    expect(screen.getByText('Save Changes')).toBeInTheDocument()
  })

  it('should have proper container styling', () => {
    const { container } = render(<AccountInformationForm user={mockUser} />)
    const formContainer = container.firstChild as HTMLElement
    
    expect(formContainer).toHaveClass('bg-slate-800/50', 'backdrop-blur-sm', 'border', 'border-slate-700', 'rounded-lg', 'p-6')
  })

  it('should render section title', () => {
    render(<AccountInformationForm user={mockUser} />)
    
    expect(screen.getByText('Account Information')).toBeInTheDocument()
  })
})
