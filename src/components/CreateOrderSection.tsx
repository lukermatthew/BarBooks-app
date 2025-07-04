import type React from "react";
import OrderForm from "./OrderForm";

interface CreateOrderSectionProps {
  product: string;
  qty: string;
  price: string;
  onProductChange: (product: string) => void;
  onQtyChange: (qty: string) => void;
  onPriceChange: (price: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string | null;
}

const CreateOrderSection: React.FC<CreateOrderSectionProps> = ({
  product,
  qty,
  price,
  onProductChange,
  onQtyChange,
  onPriceChange,
  onSubmit,
  loading,
  error,
}) => {
  return (
    <section className="create-order-section">
      <div className="form-card">
        <h2 className="section-title">
          <span className="title-icon">➕</span>
          Add New Order
        </h2>
        <OrderForm
          product={product}
          qty={qty}
          price={price}
          onProductChange={onProductChange}
          onQtyChange={onQtyChange}
          onPriceChange={onPriceChange}
          onSubmit={onSubmit}
          loading={loading}
          error={error}
        />
      </div>
    </section>
  );
};

export default CreateOrderSection;
