// hooks/useGetOrders.ts
import { useEffect, useState, useCallback } from "react";
import type { Order } from "../type/Order";

export function useGetOrders(
  filter: string,
  currentPage: number,
  ordersPerPage: number
) {
  const [data, setData] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const offset = (currentPage - 1) * ordersPerPage;
      const response = await fetch(
        `http://localhost:3000/api/orders?product=${filter}&limit=${ordersPerPage}&offset=${offset}`
      );
      
      if (!response.ok) throw new Error("Failed to fetch orders");
      
      const orders = await response.json();
      setData(orders);

      if (orders.length < ordersPerPage) {
        setTotal(offset + orders.length);
      } else {
        setTotal(offset + orders.length + 1);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }, [filter, currentPage, ordersPerPage]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return { 
    data, 
    total, 
    loading, 
    error, 
    refetchOrders: fetchOrders 
  };
}