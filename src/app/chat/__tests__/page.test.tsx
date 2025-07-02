import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

const MockChatPage = () => <div>Chat Page</div>

jest.mock('../page', () => MockChatPage)

describe('Chat Page', () => {
  it('should render chat page', () => {
    render(<MockChatPage />)
    
    expect(screen.getByText('Chat Page')).toBeInTheDocument()
  })
})
