'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { newsApi } from '../../lib/api/newsApi'
import NewsList from '../../components/NewsList/NewsList'
import Pagination from '../../components/Pagination/Pagination'
import LoadingSpinner from '../../components/LoadingSpinnner/LoadingSpinner'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import CategoryTabs from '../../components/CategoryTabs/CategoryTabs'

function SearchPageContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const pageSize = 12

  useEffect(() => {
    if (query) {
      setCurrentPage(1)
      fetchSearchResults()
    }
  }, [query])

  useEffect(() => {
    if (query && currentPage > 1) {
      fetchSearchResults()
    }
  }, [currentPage])

  const fetchSearchResults = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await newsApi.searchNews(query, currentPage, pageSize)
      setArticles(response.articles)
      setTotalResults(response.totalResults)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const totalPages = Math.ceil(Math.min(totalResults, 100) / pageSize)

  if (!query) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Please enter a search query
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Search Results
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Results for: <span className="font-semibold text-blue-600">&quot;{query}&quot;</span>
          {totalResults > 0 && (
            <span className="ml-2">({totalResults} results found)</span>
          )}
        </p>
      </div>

      <CategoryTabs />

      {loading && <LoadingSpinner />}
      {error && (
        <ErrorMessage message={error.message} onRetry={fetchSearchResults} />
      )}

      {!loading && !error && articles.length > 0 && <NewsList articles={articles} />}

      {!loading && !error && articles.length === 0 && (
        <ErrorMessage message={`No articles found for "${query}". Try a different search.`} />
      )}

      {!loading && !error && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SearchPageContent />
    </Suspense>
  )
}
