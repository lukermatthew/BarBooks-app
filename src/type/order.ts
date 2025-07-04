export interface Order {
    id: string;
    product: string;
    qty: number;
    price: number;
  }


export interface CreateOrderRequest {
  product: string
  qty: number
  price: number
}

// Summary type
export interface OrderSummary {
  totalRevenue: number
  medianOrderPrice: number
  topProductByQty: string
}
