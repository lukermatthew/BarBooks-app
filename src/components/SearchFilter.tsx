import type React from "react";

interface SearchFilterProps {
  filter: string;
  onFilterChange: (filter: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  filter,
  onFilterChange,
}) => {
  return (
    <div className="filter-container">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          placeholder="Search products..."
          className="search-input"
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
        />
        {filter && (
          <button
            className="clear-search-btn"
            onClick={() => onFilterChange("")}
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
