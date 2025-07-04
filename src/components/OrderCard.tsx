import type React from "react";

interface Order {
  id: string;
  product: string;
  qty: number;
  price: number;
}

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  return (
    <div className="order-card">
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
  );
};

export default OrderCard;
