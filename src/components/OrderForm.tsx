import type React from "react";

interface OrderFormProps {
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

const OrderForm: React.FC<OrderFormProps> = ({
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
    <>
      <form onSubmit={onSubmit} className="order-form">
        <div className="form-group">
          <label htmlFor="product" className="form-label">
            Product Name
          </label>
          <input
            id="product"
            placeholder="Enter product name"
            className="form-input"
            value={product}
            onChange={(e) => onProductChange(e.target.value)}
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
              onChange={(e) => onQtyChange(e.target.value)}
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
              onChange={(e) => onPriceChange(e.target.value)}
              required
              min="0"
              step="0.01"
            />
          </div>
        </div>
        <button className="submit-button" type="submit" disabled={loading}>
          {loading ? (
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
      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          <span>Error: {error}</span>
        </div>
      )}
    </>
  );
};

export default OrderForm;
