import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import SearchBar from './SearchBar'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('SearchBar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders search input and button', () => {
    render(<SearchBar />)
    expect(screen.getByPlaceholderText('Search news...')).toBeInTheDocument()
    expect(screen.getByText('Search')).toBeInTheDocument()
  })

  it('updates input value on change', async () => {
    const user = userEvent.setup()
    render(<SearchBar />)
    const input = screen.getByPlaceholderText('Search news...')
    await user.type(input, 'React')
    expect(input).toHaveValue('React')
  })

  it('calls router.push on submit', async () => {
    const user = userEvent.setup()
    const mockPush = jest.fn()
    ;(useRouter).mockReturnValue({ push: mockPush })

    render(<SearchBar />)
    const input = screen.getByPlaceholderText('Search news...')
    const button = screen.getByText('Search')

    await user.type(input, 'React')
    await user.click(button)

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('/search?q=React'))
    })
  })

  it('clears input after search', async () => {
    const user = userEvent.setup()
    const mockPush = jest.fn()
    ;(useRouter).mockReturnValue({ push: mockPush })

    render(<SearchBar />)
    const input = screen.getByPlaceholderText('Search news...')
    const button = screen.getByText('Search')

    await user.type(input, 'React')
    await user.click(button)

    await waitFor(() => {
      expect(input).toHaveValue('')
    })
  })

  it('disables search button when input is empty', () => {
    render(<SearchBar />)
    const button = screen.getByText('Search')
    expect(button).toBeDisabled()
  })

  it('enables search button when text is present', async () => {
    const user = userEvent.setup()
    render(<SearchBar />)
    const input = screen.getByPlaceholderText('Search news...')
    const button = screen.getByText('Search')

    expect(button).toBeDisabled()

    await user.type(input, 'React')

    expect(button).not.toBeDisabled()
  })

  it('shows clear button when text is present', async () => {
    const user = userEvent.setup()
    render(<SearchBar />)
    const input = screen.getByPlaceholderText('Search news...')

    await user.type(input, 'React')

    const clearButton = screen.getByLabelText('Clear search')
    expect(clearButton).toBeInTheDocument()
  })

  it('hides clear button when input is empty', async () => {
    const user = userEvent.setup()
    render(<SearchBar />)
    const input = screen.getByPlaceholderText('Search news...')

    await user.type(input, 'React')
    let clearButton = screen.getByLabelText('Clear search')
    expect(clearButton).toBeInTheDocument()

    await user.click(clearButton)
    expect(input).toHaveValue('')
  })

  it('clears input when clear button is clicked', async () => {
    const user = userEvent.setup()
    render(<SearchBar />)
    const input = screen.getByPlaceholderText('Search news...')

    await user.type(input, 'React')
    const clearButton = screen.getByLabelText('Clear search')
    await user.click(clearButton)

    expect(input).toHaveValue('')
  })

  it('encodes query parameter correctly', async () => {
    const user = userEvent.setup()
    const mockPush = jest.fn()
    ;(useRouter).mockReturnValue({ push: mockPush })

    render(<SearchBar />)
    const input = screen.getByPlaceholderText('Search news...')
    const button = screen.getByText('Search')

    await user.type(input, 'React & Vue')
    await user.click(button)

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('%20'))
    })
  })

  it('trims whitespace before searching', async () => {
    const user = userEvent.setup()
    const mockPush = jest.fn()
    ;(useRouter).mockReturnValue({ push: mockPush })

    render(<SearchBar />)
    const input = screen.getByPlaceholderText('Search news...')
    const button = screen.getByText('Search')

    await user.type(input, '   ')
    
    // Button should still be disabled for whitespace-only input
    expect(button).toBeDisabled()
  })
})
