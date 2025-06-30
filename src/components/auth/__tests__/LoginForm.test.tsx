import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from '../LoginForm'

describe('LoginForm', () => {
  const mockOnLogin = jest.fn()
  const mockOnSwitchToRegister = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render login form fields', () => {
    render(
      <LoginForm 
        onLogin={mockOnLogin} 
        onSwitchToRegister={mockOnSwitchToRegister} 
      />
    )

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('should call onLogin with form data', async () => {
    const user = userEvent.setup()
    
    render(
      <LoginForm 
        onLogin={mockOnLogin} 
        onSwitchToRegister={mockOnSwitchToRegister} 
      />
    )

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(mockOnLogin).toHaveBeenCalledWith('test@example.com', 'password123')
  })

  it('should display error message', async () => {
    const mockOnLoginWithError = jest.fn().mockRejectedValue(new Error('Invalid credentials'))
    const user = userEvent.setup()

    render(
      <LoginForm 
        onLogin={mockOnLoginWithError} 
        onSwitchToRegister={mockOnSwitchToRegister}
      />
    )

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(screen.getByText('Invalid email or password')).toBeInTheDocument()
    })
  })

  it('should show loading state', async () => {
    const mockOnLoginSlow = jest.fn().mockImplementation(() => new Promise(() => {}))
    const user = userEvent.setup()

    render(
      <LoginForm 
        onLogin={mockOnLoginSlow} 
        onSwitchToRegister={mockOnSwitchToRegister}
      />
    )

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    
    const submitButton = screen.getByRole('button', { name: /sign in/i })
    await user.click(submitButton)

    expect(screen.getByText(/signing in/i)).toBeInTheDocument()
  })

  it('should call onSwitchToRegister when register link is clicked', async () => {
    const user = userEvent.setup()
    
    render(
      <LoginForm 
        onLogin={mockOnLogin} 
        onSwitchToRegister={mockOnSwitchToRegister} 
      />
    )

    await user.click(screen.getByText(/sign up/i))

    expect(mockOnSwitchToRegister).toHaveBeenCalled()
  })
})
