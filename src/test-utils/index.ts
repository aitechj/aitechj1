import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { User } from '@/types'

const mockUser: User = {
  id: '1',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  role: 'user',
  subscription: 'free',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z'
}

const mockAdminUser: User = {
  id: '2',
  email: 'admin@example.com',
  firstName: 'Admin',
  lastName: 'User',
  role: 'admin',
  subscription: 'enterprise',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z'
}

const mockProUser: User = {
  id: '3',
  email: 'pro@example.com',
  firstName: 'Pro',
  lastName: 'User',
  role: 'user',
  subscription: 'pro',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z'
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  user?: User | null
}

const customRender = (
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
) => {
  return render(ui, options)
}

export * from '@testing-library/react'
export { customRender as render }
export { mockUser, mockAdminUser, mockProUser }
