'use client'

import Link from 'next/link'
import Image from 'next/image'
import { formatDate, truncateText } from '../../lib/utils'

export default function NewsCard({ article, index }) {
  const articleId = `${index}_${article.title
    .toLowerCase()
    .replace(/\s+/g, '_')
    .substring(0, 50)}`

  const handleArticleClick = () => {
    // Store article data in sessionStorage before navigating
    sessionStorage.setItem('selectedArticle', JSON.stringify(article))
  }

  return (
    <Link href={`/article/${articleId}`} onClick={handleArticleClick}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-48 w-full bg-gray-200 dark:bg-gray-700 flex-shrink-0">
          {article.urlToImage ? (
            <Image
              src={article.urlToImage}
              alt={article.title}
              fill
              className="object-cover"
              priority={false}
              onError={(e) => {
                e.target.src = '/placeholder.jpg'
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-300 dark:bg-gray-600">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
              </svg>
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Source and Date */}
          <div className="flex justify-between items-start gap-2 mb-2">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 truncate">
              {article.source.name}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
              {formatDate(article.publishedAt).split(',')[0]}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex-grow">
            {article.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
            {truncateText(article.description || 'No description available', 100)}
          </p>

          {/* Read More Button */}
          <button className="inline-block text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm transition-colors">
            Read More →
          </button>
        </div>
      </div>
    </Link>
  )
}
