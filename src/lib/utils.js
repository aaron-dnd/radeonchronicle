/**
 * Format date string to readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return 'Unknown date'
  }
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Max length
 * @returns {string} Truncated text
 */
export const truncateText = (text, length = 150) => {
  if (!text || text.length <= length) return text
  return text.substring(0, length) + '...'
}

/**
 * Generate unique article ID
 * @param {Object} article - Article object
 * @param {number} index - Article index
 * @returns {string} Generated ID
 */
export const generateArticleId = (article, index) => {
  return `${index}_${article.title
    .toLowerCase()
    .replace(/\s+/g, '_')
    .substring(0, 50)}`
}

/**
 * Format article content for display
 * @param {string} content - Raw article content
 * @returns {string} Formatted content
 */
export const formatContent = (content) => {
  if (!content) return 'No content available'
    return content.replace(/\[\+\d+\s*chars\]/g, '')
}
