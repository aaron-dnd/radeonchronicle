'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { newsApi } from '../../../lib/api/newsApi'
import NewsList from '../../../components/NewsList/NewsList'
import Pagination from '../../../components/Pagination/Pagination'
import LoadingSpinner from '../../../components/LoadingSpinnner/LoadingSpinner'
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage'
import CategoryTabs from '../../../components/CategoryTabs/CategoryTabs'

const CATEGORY_LABELS = {
  business: 'Business',
  technology: 'Technology',
  sports: 'Sports',
  entertainment: 'Entertainment',
  science: 'Science',
  health: 'Health',
  general: 'General',
}

export default function CategoryPage() {
  const params = useParams()
  const category = params.category || 'general'

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const pageSize = 12

  useEffect(() => {
    setCurrentPage(1)
  }, [category])

  useEffect(() => {
    fetchCategoryNews()
  }, [category, currentPage])

  const fetchCategoryNews = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await newsApi.getNewsByCategory(
        category,
        currentPage,
        pageSize
      )
      setArticles(response.articles)
      setTotalResults(response.totalResults)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const totalPages = Math.ceil(Math.min(totalResults, 100) / pageSize)
  const categoryLabel = CATEGORY_LABELS[category] || 'News'

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {categoryLabel} News
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Latest updates in {categoryLabel.toLowerCase()}
        </p>
      </div>

      <CategoryTabs />

      {loading && <LoadingSpinner />}
      {error && (
        <ErrorMessage message={error.message} onRetry={fetchCategoryNews} />
      )}

      {!loading && !error && articles.length > 0 && <NewsList articles={articles} />}

      {!loading && !error && articles.length === 0 && (
        <ErrorMessage message={`No ${categoryLabel.toLowerCase()} articles found. Try another category.`} />
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
