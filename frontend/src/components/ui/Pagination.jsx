import clsx from 'clsx';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import React from 'react';

/**
 * Pagination component for navigating through pages
 */
const Pagination = React.memo(function Pagination({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
  loading = false,
  showInfo = true,
  maxPagesToShow = 5
}) {
  const pages = [];
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col gap-4 items-center justify-center mt-8">
      {showInfo && totalItems > 0 && (
        <p className="text-sm text-gray-600">
          Showing {startItem} to {endItem} of {totalItems} results
        </p>
      )}

      <div className="flex items-center justify-center gap-1">
        {/* Previous button */}
        <button
          onClick={() => onPageChange?.(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className={clsx(
            'p-2 rounded-md transition-colors',
            currentPage === 1 || loading
              ? 'opacity-50 cursor-not-allowed text-gray-400'
              : 'hover:bg-gray-100 text-gray-700 active:bg-gray-200'
          )}
          aria-label="Previous page"
        >
          <FiChevronLeft size={20} />
        </button>

        {/* First page + ellipsis */}
        {startPage > 1 && (
          <>
            <button
              onClick={() => onPageChange?.(1)}
              className="px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium"
            >
              1
            </button>
            {startPage > 2 && (
              <span className="px-2 text-gray-400">…</span>
            )}
          </>
        )}

        {/* Page numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange?.(page)}
            disabled={loading}
            className={clsx(
              'px-3 py-2 rounded-md transition-colors text-sm font-medium min-w-10',
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'hover:bg-gray-100 text-gray-700 active:bg-gray-200',
              loading && 'opacity-50 cursor-not-allowed'
            )}
          >
            {page}
          </button>
        ))}

        {/* Last page + ellipsis */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="px-2 text-gray-400">…</span>
            )}
            <button
              onClick={() => onPageChange?.(totalPages)}
              className="px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next button */}
        <button
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          className={clsx(
            'p-2 rounded-md transition-colors',
            currentPage === totalPages || loading
              ? 'opacity-50 cursor-not-allowed text-gray-400'
              : 'hover:bg-gray-100 text-gray-700 active:bg-gray-200'
          )}
          aria-label="Next page"
        >
          <FiChevronRight size={20} />
        </button>
      </div>
    </div>
  );
});

Pagination.displayName = 'Pagination';
export default Pagination;
