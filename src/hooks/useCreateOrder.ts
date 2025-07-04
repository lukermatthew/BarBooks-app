"use client"

import { useState } from "react"
import type { CreateOrderRequest, Order } from "../type/Order"


export function useCreateOrder() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createOrder = async (orderData: CreateOrderRequest): Promise<Order> => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        throw new Error(`Failed to create order: ${response.statusText}`)
      }

      const newOrder: Order = await response.json()
      return newOrder
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create order"
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const clearError = () => setError(null)

  return {
    createOrder,
    loading,
    error,
    clearError,
  }
}
