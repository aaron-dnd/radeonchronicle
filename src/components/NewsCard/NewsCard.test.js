import { render, screen } from '@testing-library/react'
import NewsCard from './NewsCard'

const mockArticle = {
  source: { id: 'test', name: 'Test Source' },
  author: 'Test Author',
  title: 'Breaking: Test Article Title',
  description: 'This is a test article description',
  url: 'https://example.com/article',
  urlToImage: 'https://example.com/image.jpg',
  publishedAt: '2025-11-14T10:00:00Z',
  content: 'Full test content here',
}

describe('NewsCard Component', () => {
  it('renders article title', () => {
    render(<NewsCard article={mockArticle} index={0} />)
    expect(screen.getByText('Breaking: Test Article Title')).toBeInTheDocument()
  })

  it('renders source name', () => {
    render(<NewsCard article={mockArticle} index={0} />)
    expect(screen.getByText('Test Source')).toBeInTheDocument()
  })

  it('renders article description', () => {
    render(<NewsCard article={mockArticle} index={0} />)
    expect(screen.getByText(/test article description/i)).toBeInTheDocument()
  })

  it('renders read more button', () => {
    render(<NewsCard article={mockArticle} index={0} />)
    expect(screen.getByText(/Read More/i)).toBeInTheDocument()
  })

  it('creates correct article link', () => {
    const { container } = render(<NewsCard article={mockArticle} index={0} />)
    const link = container.querySelector('a')
    expect(link).toHaveAttribute('href', expect.stringContaining('/article/'))
  })
})
