import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import AuthPage from '../page'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}))

jest.mock('@/components/auth/AuthProvider', () => ({
  useAuth: () => ({
    login: jest.fn(),
    register: jest.fn()
  })
}))

jest.mock('@/components/auth/LoginForm', () => {
  return function MockLoginForm({ onSwitchToRegister }: { onSwitchToRegister: () => void }) {
    return (
      <div>
        <div>Login Form</div>
        <button onClick={onSwitchToRegister}>Switch to Register</button>
      </div>
    )
  }
})

jest.mock('@/components/auth/RegisterForm', () => {
  return function MockRegisterForm({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
    return (
      <div>
        <div>Register Form</div>
        <button onClick={onSwitchToLogin}>Switch to Login</button>
      </div>
    )
  }
})

const mockPush = jest.fn()

describe('AuthPage', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush
    })
  })

  it('should render login form by default', () => {
    render(<AuthPage />)
    
    expect(screen.getByText('Login Form')).toBeInTheDocument()
  })

  it('should switch to register form', async () => {
    const user = userEvent.setup()
    render(<AuthPage />)
    
    await user.click(screen.getByText('Switch to Register'))
    
    expect(screen.getByText('Register Form')).toBeInTheDocument()
  })

  it('should switch back to login form', async () => {
    const user = userEvent.setup()
    render(<AuthPage />)
    
    await user.click(screen.getByText('Switch to Register'))
    await user.click(screen.getByText('Switch to Login'))
    
    expect(screen.getByText('Login Form')).toBeInTheDocument()
  })
})
