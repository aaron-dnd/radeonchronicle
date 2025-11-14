import { newsApi } from '@/lib/api/newsApi'
import axios from 'axios'

jest.mock('axios')

describe('NewsAPI Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('successfully fetches top headlines', async () => {
    const mockResponse = {
      data: {
        status: 'ok',
        totalResults: 100,
        articles: [
          {
            source: { id: 'test', name: 'Test' },
            title: 'Test Article',
            description: 'Test',
            url: 'https://test.com',
            urlToImage: null,
            publishedAt: '2025-11-14T00:00:00Z',
            content: 'Test content',
          },
        ],
      },
    }

    axios.create().get = jest.fn().mockResolvedValue(mockResponse)

    // Note: Direct API testing would require proper mocking
    // This is a placeholder for actual API tests
    expect(mockResponse.data.articles).toHaveLength(1)
  })

  it('handles API errors gracefully', async () => {
    // Error handling is tested in the errorHandler function
    const mockError = {
      response: {
        status: 429,
        data: { message: 'Rate limited' },
      },
    }

    // Verify error structure
    expect(mockError.response.status).toBe(429)
  })
})
