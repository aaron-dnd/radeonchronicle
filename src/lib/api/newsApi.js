import axios from 'axios'

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

export const newsApi = {
  // Get top headlines
  getTopHeadlines: async (page = 1, pageSize = 12) => {
    try {
      const response = await apiClient.get('/top-headlines', {
        params: {
          country: 'us',
          apiKey: API_KEY,
          page,
          pageSize,
        },
      })
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },

  // Get news by category
  getNewsByCategory: async (category, page = 1, pageSize = 12) => {
    try {
      const response = await apiClient.get('/top-headlines', {
        params: {
          category,
          country: 'us',
          apiKey: API_KEY,
          page,
          pageSize,
        },
      })
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },

  // Search news articles
  searchNews: async (query, page = 1, pageSize = 12) => {
    try {
      const response = await apiClient.get('/everything', {
        params: {
          q: query,
          apiKey: API_KEY,
          page,
          pageSize,
          sortBy: 'publishedAt',
        },
      })
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  },
}

// Error handling helper
function handleApiError(error) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      return { message: 'Invalid API key', code: 'INVALID_KEY' }
    }
    if (error.response?.status === 429) {
      return { message: 'API rate limit exceeded', code: 'RATE_LIMIT' }
    }
    if (error.response?.data?.message) {
      return { message: error.response.data.message }
    }
    if (!error.response) {
      return { message: 'Network error. Please check your connection.' }
    }
  }
  return { message: 'Failed to fetch news. Please try again.' }
}
