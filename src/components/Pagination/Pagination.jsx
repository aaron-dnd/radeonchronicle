"use client";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-medium"
        aria-label="Previous page"
      >
        ← Previous
      </button>

      <div className="flex items-center gap-2">
        <span className="text-gray-600 dark:text-gray-400 font-medium">
          Page
        </span>
        <div className="px-4 py-2 bg-gray-100 dark:bg-gray-900 border-2 border-blue-600 dark:border-blue-400 rounded-lg text-blue-600 dark:text-blue-400 font-bold text-center min-w-12">
          {currentPage}
        </div>
        <span className="text-gray-600 dark:text-gray-400 font-medium">
          of {totalPages}
        </span>
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-medium"
        aria-label="Next page"
      >
        Next →
      </button>
    </div>
  );
}
