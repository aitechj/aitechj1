import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RegisterForm from '../RegisterForm'

describe('RegisterForm', () => {
  const mockOnRegister = jest.fn()
  const mockOnSwitchToLogin = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render registration form fields', () => {
    render(
      <RegisterForm 
        onRegister={mockOnRegister} 
        onSwitchToLogin={mockOnSwitchToLogin} 
      />
    )

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument()
  })

  it('should call onRegister with form data', async () => {
    const user = userEvent.setup()
    
    render(
      <RegisterForm 
        onRegister={mockOnRegister} 
        onSwitchToLogin={mockOnSwitchToLogin} 
      />
    )

    await user.type(screen.getByLabelText(/first name/i), 'Test')
    await user.type(screen.getByLabelText(/last name/i), 'User')
    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/^password/i), 'TestPass123!')
    await user.type(screen.getByLabelText(/confirm password/i), 'TestPass123!')
    await user.click(screen.getByRole('checkbox'))
    
    await user.click(screen.getByRole('button', { name: /create account/i }))

    expect(mockOnRegister).toHaveBeenCalledWith('test@example.com', 'TestPass123!', 'Test', 'User')
  })

  it('should validate password match', async () => {
    const user = userEvent.setup()
    
    render(
      <RegisterForm 
        onRegister={mockOnRegister} 
        onSwitchToLogin={mockOnSwitchToLogin} 
      />
    )

    await user.type(screen.getByLabelText(/first name/i), 'Test')
    await user.type(screen.getByLabelText(/last name/i), 'User')
    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/^password/i), 'TestPass123!')
    await user.type(screen.getByLabelText(/confirm password/i), 'different')
    await user.click(screen.getByRole('checkbox'))
    
    await user.click(screen.getByRole('button', { name: /create account/i }))

    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument()
    })
    expect(mockOnRegister).not.toHaveBeenCalled()
  })

  it('should display error message', async () => {
    const mockOnRegisterWithError = jest.fn().mockRejectedValue(new Error('Email already exists'))
    const user = userEvent.setup()

    render(
      <RegisterForm 
        onRegister={mockOnRegisterWithError} 
        onSwitchToLogin={mockOnSwitchToLogin}
      />
    )

    await user.type(screen.getByLabelText(/first name/i), 'Test')
    await user.type(screen.getByLabelText(/last name/i), 'User')
    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/^password/i), 'TestPass123!')
    await user.type(screen.getByLabelText(/confirm password/i), 'TestPass123!')
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: /create account/i }))

    await waitFor(() => {
      expect(screen.getByText('Registration failed. Please try again.')).toBeInTheDocument()
    })
  })

  it('should show loading state', async () => {
    const mockOnRegisterSlow = jest.fn().mockImplementation(() => new Promise(() => {}))
    const user = userEvent.setup()

    render(
      <RegisterForm 
        onRegister={mockOnRegisterSlow} 
        onSwitchToLogin={mockOnSwitchToLogin}
      />
    )

    await user.type(screen.getByLabelText(/first name/i), 'Test')
    await user.type(screen.getByLabelText(/last name/i), 'User')
    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/^password/i), 'TestPass123!')
    await user.type(screen.getByLabelText(/confirm password/i), 'TestPass123!')
    await user.click(screen.getByRole('checkbox'))
    
    const submitButton = screen.getByRole('button', { name: /create account/i })
    await user.click(submitButton)

    expect(screen.getByText(/creating account/i)).toBeInTheDocument()
  })
})
