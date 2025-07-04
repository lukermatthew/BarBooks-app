"use client";

import type React from "react";

import { useGetOrders } from "./hooks/useGetOrders";
import { useSummary } from "./hooks/useSummary";
import { useCreateOrder } from "./hooks/useCreateOrder";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [product, setProduct] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);

  // Use hooks
  const {
    data: summary,
    loading: loadingSummary,
    error: summaryError,
    refetchSummary,
  } = useSummary();

  const {
    data: orders,
    total: totalOrders,
    loading: loadingOrders,
    error: ordersError,
    refetchOrders,
  } = useGetOrders(filter, currentPage, ordersPerPage);

  const {
    createOrder,
    loading: creatingOrder,
    error: createOrderError,
    clearError,
  } = useCreateOrder();

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    try {
      await createOrder({
        product,
        qty: Number(qty),
        price: Number(price),
      });
      // Success - clear form and refresh data
      setProduct("");
      setQty("");
      setPrice("");
      setCurrentPage(1);
      // Refresh both orders and summary
      await Promise.all([refetchOrders(), refetchSummary()]);
      console.log("Order created and data refreshed");
    } catch (err) {
      console.error("Failed to create order:", err);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(totalOrders / ordersPerPage);
  const hasNextPage =
    currentPage < totalPages && orders.length === ordersPerPage;
  const hasPrevPage = currentPage > 1;

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="main-title">
            <span className="title-icon">📦</span>
            Order Dashboard
          </h1>
          <p className="subtitle">Manage your orders and track performance</p>
        </header>

        {/* Summary Cards */}
        <section className="summary-section">
          <h2 className="section-title">Overview</h2>
          {loadingSummary ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading summary...</p>
            </div>
          ) : summaryError ? (
            <div className="error-state">
              <span className="error-icon">⚠️</span>
              <p>Error loading summary: {summaryError}</p>
            </div>
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
            <div className="empty-state">
              <span className="empty-icon">📭</span>
              <p>No summary data available</p>
            </div>
          )}
        </section>

        <div className="main-content">
          {/* Orders Section */}
          <section className="orders-section">
            <div className="section-header">
              <h2 className="section-title">
                Recent Orders
                {filter && (
                  <span className="filter-badge">filtered by "{filter}"</span>
                )}
              </h2>
              <div className="filter-container">
                <div className="search-input-wrapper">
                  <span className="search-icon">🔍</span>
                  <input
                    placeholder="Search products..."
                    className="search-input"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  />
                  {filter && (
                    <button
                      className="clear-search-btn"
                      onClick={() => setFilter("")}
                      title="Clear search"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="orders-content">
              {loadingOrders ? (
                <div className="loading-state">
                  <div className="spinner"></div>
                  <p>Loading orders...</p>
                </div>
              ) : ordersError ? (
                <div className="error-state">
                  <span className="error-icon">⚠️</span>
                  <p>Error: {ordersError}</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon">📦</span>
                  <p>
                    {filter
                      ? "No orders match your search."
                      : "No orders found."}
                  </p>
                </div>
              ) : (
                <>
                  <div className="orders-list">
                    {orders.map((order) => (
                      <div key={order.id} className="order-card">
                        <div className="order-header">
                          <h3 className="order-product">{order.product}</h3>
                          <span className="order-id">#{order.id}</span>
                        </div>
                        <div className="order-details">
                          <div className="order-detail">
                            <span className="detail-label">Quantity</span>
                            <span className="detail-value">{order.qty}</span>
                          </div>
                          <div className="order-detail">
                            <span className="detail-label">Price</span>
                            <span className="detail-value price">
                              ₱{order.price.toLocaleString()}
                            </span>
                          </div>
                          <div className="order-detail">
                            <span className="detail-label">Total</span>
                            <span className="detail-value total">
                              ₱{(order.qty * order.price).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="pagination">
                    <button
                      className="pagination-btn prev"
                      onClick={() => setCurrentPage((prev) => prev - 1)}
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
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                      disabled={!hasNextPage}
                    >
                      Next →
                    </button>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Create Order Form */}
          <section className="create-order-section">
            <div className="form-card">
              <h2 className="section-title">
                <span className="title-icon">➕</span>
                Add New Order
              </h2>
              <form onSubmit={handleSubmit} className="order-form">
                <div className="form-group">
                  <label htmlFor="product" className="form-label">
                    Product Name
                  </label>
                  <input
                    id="product"
                    placeholder="Enter product name"
                    className="form-input"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="qty" className="form-label">
                      Quantity
                    </label>
                    <input
                      id="qty"
                      type="number"
                      placeholder="0"
                      className="form-input"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      required
                      min="1"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="price" className="form-label">
                      Price (₱)
                    </label>
                    <input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      className="form-input"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                <button
                  className="submit-button"
                  type="submit"
                  disabled={creatingOrder}
                >
                  {creatingOrder ? (
                    <>
                      <div className="button-spinner"></div>
                      Adding Order...
                    </>
                  ) : (
                    <>
                      <span className="button-icon">➕</span>
                      Add Order
                    </>
                  )}
                </button>
              </form>
              {createOrderError && (
                <div className="error-message">
                  <span className="error-icon">⚠️</span>
                  <span>Error: {createOrderError}</span>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
