import type React from "react";
import LoadingSpinner from "./LoadingSpinner";
import ErrorState from "./ErrorState";
import EmptyState from "./EmptyState";

interface SummaryData {
  totalRevenue: number;
  medianOrderPrice: number;
  topProductByQty: string;
}

interface SummarySectionProps {
  summary: SummaryData | null;
  loading: boolean;
  error: string | null;
}

const SummarySection: React.FC<SummarySectionProps> = ({
  summary,
  loading,
  error,
}) => {
  return (
    <section className="summary-section">
      <h2 className="section-title">Overview</h2>
      {loading ? (
        <LoadingSpinner message="Loading summary..." />
      ) : error ? (
        <ErrorState message={`Error loading summary: ${error}`} />
      ) : summary ? (
        <div className="summary-grid">
          <div className="summary-card revenue">
            <div className="card-icon">💰</div>
            <div className="card-content">
              <h3>Total Revenue</h3>
              <p className="card-value">
                ₱{summary.totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="summary-card median">
            <div className="card-icon">📊</div>
            <div className="card-content">
              <h3>Median Order Price</h3>
              <p className="card-value">
                ₱{summary.medianOrderPrice.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="summary-card top-product">
            <div className="card-icon">🏆</div>
            <div className="card-content">
              <h3>Top Product</h3>
              <p className="card-value">{summary.topProductByQty}</p>
            </div>
          </div>
        </div>
      ) : (
        <EmptyState icon="📭" message="No summary data available" />
      )}
    </section>
  );
};

export default SummarySection;
