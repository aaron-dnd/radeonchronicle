import { render, screen } from '@testing-library/react'
import NewsList from './NewsList'

const mockArticles = [
  {
    source: { id: 'test1', name: 'Source 1' },
    author: 'Author 1',
    title: 'Article 1',
    description: 'Description 1',
    url: 'https://example.com/1',
    urlToImage: null,
    publishedAt: '2025-11-14T10:00:00Z',
    content: 'Content 1',
  },
  {
    source: { id: 'test2', name: 'Source 2' },
    author: 'Author 2',
    title: 'Article 2',
    description: 'Description 2',
    url: 'https://example.com/2',
    urlToImage: null,
    publishedAt: '2025-11-14T11:00:00Z',
    content: 'Content 2',
  },
]

describe('NewsList Component', () => {
  it('renders multiple articles', () => {
    render(<NewsList articles={mockArticles} />)
    expect(screen.getByText('Article 1')).toBeInTheDocument()
    expect(screen.getByText('Article 2')).toBeInTheDocument()
  })

  it('shows empty state when no articles', () => {
    render(<NewsList articles={[]} />)
    expect(screen.getByText(/No articles found/i)).toBeInTheDocument()
  })

  it('renders correct number of cards', () => {
    const { container } = render(<NewsList articles={mockArticles} />)
    const cards = container.querySelectorAll('a')
    expect(cards.length).toBe(2)
  })
})
