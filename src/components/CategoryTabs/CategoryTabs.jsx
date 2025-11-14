'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const CATEGORIES = [
  { id: 'business', label: 'Business' },
  { id: 'technology', label: 'Technology' },
  { id: 'sports', label: 'Sports' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'science', label: 'Science' },
  { id: 'health', label: 'Health' },
  { id: 'general', label: 'General' },
]

export default function CategoryTabs() {
  const pathname = usePathname()
  const currentCategory = pathname.includes('/category/')
    ? pathname.split('/category/')[1]
    : null

  return (
    <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
      <Link href="/">
        <button
          className={`px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
            !currentCategory && !pathname.includes('/search')
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          All News
        </button>
      </Link>

      {CATEGORIES.map((category) => (
        <Link key={category.id} href={`/category/${category.id}`}>
          <button
            className={`px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
              currentCategory === category.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {category.label}
          </button>
        </Link>
      ))}
    </div>
  )
}
