import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ErrorMessage from './ErrorMessage'

describe('ErrorMessage Component', () => {
  it('renders error message', () => {
    render(<ErrorMessage message="Test error message" />)
    expect(screen.getByText('Test error message')).toBeInTheDocument()
  })

  it('renders retry button when onRetry is provided', () => {
    const handleRetry = jest.fn()
    render(<ErrorMessage message="Error" onRetry={handleRetry} />)
    expect(screen.getByText('Try Again')).toBeInTheDocument()
  })

  it('calls onRetry when retry button is clicked', async () => {
    const handleRetry = jest.fn()
    render(<ErrorMessage message="Error" onRetry={handleRetry} />)
    await userEvent.click(screen.getByText('Try Again'))
    expect(handleRetry).toHaveBeenCalled()
  })
})
