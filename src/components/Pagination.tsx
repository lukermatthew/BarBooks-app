import type React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  onPageChange,
}) => {
  return (
    <div className="pagination">
      <button
        className="pagination-btn prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevPage}
      >
        ← Previous
      </button>
      <div className="pagination-info">
        <span className="current-page">{currentPage}</span>
        {totalPages > 1 && (
          <>
            <span className="page-separator">of</span>
            <span className="total-pages">{totalPages}</span>
          </>
        )}
      </div>
      <button
        className="pagination-btn next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
