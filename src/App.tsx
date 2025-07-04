"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useGetOrders } from "./hooks/useGetOrders";
import { useSummary } from "./hooks/useSummary";
import { useCreateOrder } from "./hooks/useCreateOrder";
import Header from "./components/Header";
import SummarySection from "./components/SummarySection";
import OrdersSection from "./components/OrdersSection";
import CreateOrderSection from "./components/CreateOrderSection";
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
        <Header />

        <SummarySection
          summary={summary}
          loading={loadingSummary}
          error={summaryError}
        />

        <div className="main-content">
          <OrdersSection
            orders={orders}
            loading={loadingOrders}
            error={ordersError}
            filter={filter}
            onFilterChange={setFilter}
            currentPage={currentPage}
            totalPages={totalPages}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            onPageChange={setCurrentPage}
          />

          <CreateOrderSection
            product={product}
            qty={qty}
            price={price}
            onProductChange={setProduct}
            onQtyChange={setQty}
            onPriceChange={setPrice}
            onSubmit={handleSubmit}
            loading={creatingOrder}
            error={createOrderError}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
