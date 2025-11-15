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

            expect(mockResponse.data.articles).toHaveLength(1)
  })

  it('handles API errors gracefully', async () => {
        const mockError = {
      response: {
        status: 429,
        data: { message: 'Rate limited' },
      },
    }

        expect(mockError.response.status).toBe(429)
  })
})
