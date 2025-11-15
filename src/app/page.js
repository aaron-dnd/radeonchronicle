"use client";

import { useState, useEffect } from "react";
import { newsApi } from "../lib/api/newsApi";
import NewsList from "../components/NewsList/NewsList";
import Pagination from "../components/Pagination/Pagination";
import LoadingSpinner from "../components/LoadingSpinnner/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import CategoryTabs from "../components/CategoryTabs/CategoryTabs";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const pageSize = 12;

  useEffect(() => {
    fetchHeadlines();
  }, [currentPage]);

  const fetchHeadlines = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await newsApi.getTopHeadlines(currentPage, pageSize);
      setArticles(response.articles);
      setTotalResults(response.totalResults);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(Math.min(totalResults, 100) / pageSize);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Top Headlines
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Stay updated with the latest news from around the world
        </p>
      </div>

      <CategoryTabs />

      {loading && <LoadingSpinner />}
      {error && (
        <ErrorMessage message={error.message} onRetry={fetchHeadlines} />
      )}

      {!loading && !error && articles.length > 0 && (
        <NewsList articles={articles} />
      )}

      {!loading && !error && articles.length === 0 && (
        <ErrorMessage
          message="No articles found. Please try again."
          onRetry={fetchHeadlines}
        />
      )}

      {!loading && !error && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
