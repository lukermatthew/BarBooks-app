import type React from "react";
import SearchFilter from "./SearchFilter";
import LoadingSpinner from "./LoadingSpinner";
import ErrorState from "./ErrorState";
import EmptyState from "./EmptyState";
import OrderCard from "./OrderCard";
import Pagination from "./Pagination";
import type { Order } from "../type/Order";

interface OrdersSectionProps {
  orders: Order[];
  loading: boolean;
  error: string | null;
  filter: string;
  onFilterChange: (filter: string) => void;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPageChange: (page: number) => void;
}

const OrdersSection: React.FC<OrdersSectionProps> = ({
  orders,
  loading,
  error,
  filter,
  onFilterChange,
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  onPageChange,
}) => {
  return (
    <section className="orders-section">
      <div className="section-header">
        <h2 className="section-title">
          Recent Orders
          {filter && (
            <span className="filter-badge">filtered by "{filter}"</span>
          )}
        </h2>
        <SearchFilter filter={filter} onFilterChange={onFilterChange} />
      </div>

      <div className="orders-content">
        {loading ? (
          <LoadingSpinner message="Loading orders..." />
        ) : error ? (
          <ErrorState message={`Error: ${error}`} />
        ) : orders.length === 0 ? (
          <EmptyState
            icon="📦"
            message={
              filter ? "No orders match your search." : "No orders found."
            }
          />
        ) : (
          <>
            <div className="orders-list">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}
              onPageChange={onPageChange}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default OrdersSection;
