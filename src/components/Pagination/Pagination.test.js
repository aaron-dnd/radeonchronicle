import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Pagination from './Pagination'

describe('Pagination Component', () => {
  it('disables previous button on first page', () => {
    const handleChange = jest.fn()
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={handleChange} />
    )
    expect(screen.getByLabelText('Previous page')).toBeDisabled()
  })

  it('disables next button on last page', () => {
    const handleChange = jest.fn()
    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={handleChange} />
    )
    expect(screen.getByLabelText('Next page')).toBeDisabled()
  })

  it('calls onPageChange when next button clicked', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={handleChange} />
    )
    await user.click(screen.getByLabelText('Next page'))
    expect(handleChange).toHaveBeenCalledWith(2)
  })

  it('calls onPageChange when previous button clicked', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={handleChange} />
    )
    await user.click(screen.getByLabelText('Previous page'))
    expect(handleChange).toHaveBeenCalledWith(2)
  })

  it('displays current page and total pages', () => {
    const handleChange = jest.fn()
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={handleChange} />
    )
    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument()
  })

  it('previous button is enabled on page 2', () => {
    const handleChange = jest.fn()
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={handleChange} />
    )
    expect(screen.getByLabelText('Previous page')).not.toBeDisabled()
  })

  it('next button is enabled on page 4', () => {
    const handleChange = jest.fn()
    render(
      <Pagination currentPage={4} totalPages={5} onPageChange={handleChange} />
    )
    expect(screen.getByLabelText('Next page')).not.toBeDisabled()
  })
})
