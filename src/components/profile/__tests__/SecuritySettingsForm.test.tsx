import React from 'react'
import { render, screen } from '@testing-library/react'
import SecuritySettingsForm from '../SecuritySettingsForm'

describe('SecuritySettingsForm', () => {
  it('should render security settings title', () => {
    render(<SecuritySettingsForm />)
    
    expect(screen.getByText('Security Settings')).toBeInTheDocument()
  })

  it('should render password change form', () => {
    render(<SecuritySettingsForm />)
    
    expect(screen.getByText('Change Password')).toBeInTheDocument()
    expect(screen.getByText('Current Password')).toBeInTheDocument()
    expect(screen.getByText('New Password')).toBeInTheDocument()
    expect(screen.getByText('Confirm New Password')).toBeInTheDocument()
    expect(screen.getByText('Update Password')).toBeInTheDocument()
  })

  it('should render two-factor authentication section', () => {
    render(<SecuritySettingsForm />)
    
    expect(screen.getByText('Two-Factor Authentication')).toBeInTheDocument()
    expect(screen.getByText('Add an extra layer of security to your account')).toBeInTheDocument()
    expect(screen.getByText('Status: Not enabled')).toBeInTheDocument()
    expect(screen.getByText('Enable 2FA')).toBeInTheDocument()
  })

  it('should render account deletion section', () => {
    render(<SecuritySettingsForm />)
    
    expect(screen.getByText('Account Deletion')).toBeInTheDocument()
    expect(screen.getByText('Permanently delete your account and all associated data. This action cannot be undone.')).toBeInTheDocument()
    expect(screen.getByText('Delete Account')).toBeInTheDocument()
  })

  it('should have proper form structure', () => {
    const { container } = render(<SecuritySettingsForm />)
    const passwordInputs = container.querySelectorAll('input[type="password"]')
    
    expect(passwordInputs).toHaveLength(3)
  })

  it('should have proper container styling', () => {
    const { container } = render(<SecuritySettingsForm />)
    const formContainer = container.firstChild as HTMLElement
    
    expect(formContainer).toHaveClass('bg-slate-800/50', 'backdrop-blur-sm', 'border', 'border-slate-700', 'rounded-lg', 'p-6')
  })
})
