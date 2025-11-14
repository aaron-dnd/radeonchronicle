'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { formatDate, formatContent } from '../../../lib/utils'

export default function ArticlePage({ params }) {
  const router = useRouter()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Retrieve article from sessionStorage
    if (typeof window !== 'undefined') {
      const storedArticles = sessionStorage.getItem('selectedArticle')
      if (storedArticles) {
        try {
          const parsed = JSON.parse(storedArticles)
          setArticle(parsed)
        } catch (error) {
          console.error('Error parsing article:', error)
        }
      }
      setLoading(false)
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Article Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The article you&apos;re looking for could not be found. It may have been removed or the link is broken.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Go Back
          </button>
          <Link href="/">
            <button className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium">
              View All News
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={() => router.back()}
        className="mb-6 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors inline-flex items-center gap-2"
      >
        ← Back to News
      </button>

      <article className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Hero Image */}
        {article.urlToImage && (
          <div className="relative h-96 w-full">
            <Image
              src={article.urlToImage}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        <div className="p-8 md:p-12">
          {/* Meta Information */}
          <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Source</p>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {article.source?.name || 'Unknown'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Published</p>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {formatDate(article.publishedAt)}
              </p>
            </div>
            {article.author && (
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Author</p>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {article.author}
                </p>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            {article.title}
          </h1>

          {/* Description */}
          {article.description && (
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 italic">
              {article.description}
            </p>
          )}

          {/* Content */}
          <div className="prose dark:prose-invert max-w-none mb-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {formatContent(article.content) || article.description || 'No content available'}
            </p>
          </div>

          {/* Call to Action */}
          <Link href={article.url} target="_blank" rel="noopener noreferrer">
            <button className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium text-lg">
              Read Full Article on {article.source?.name || 'Source'} →
            </button>
          </Link>
        </div>
      </article>

      {/* Related Navigation */}
      <div className="mt-12 flex gap-4 justify-center">
        <Link href="/">
          <button className="px-6 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
            View All News
          </button>
        </Link>
      </div>
    </div>
  )
}
