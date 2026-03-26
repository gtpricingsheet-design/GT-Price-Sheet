"use client";

import { useState } from "react";
import { useGTProduce } from "@/contexts/gt-produce-context";

export function CheckoutOverlay() {
  const {
    showCheckout,
    setShowCheckout,
    cart,
    cartTotal,
    customerName,
    clearCart,
    submitOrder,
    showToast,
  } = useGTProduce();

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!showCheckout) return null;

  const cartItems = Object.values(cart);

  const handleSubmit = async () => {
    if (cartItems.length === 0) {
      showToast("Your cart is empty", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitOrder();
      showToast("Order submitted successfully!", "success");
      setShowCheckout(false);
    } catch (error) {
      showToast("Failed to submit order", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    clearCart();
    showToast("Cart cleared", "success");
  };

  return (
    <div className="overlay checkout-overlay">
      <div className="checkout-modal">
        <div className="checkout-header">
          <h2>Checkout</h2>
          <button className="close-btn" onClick={() => setShowCheckout(false)}>
            &times;
          </button>
        </div>

        <div className="checkout-customer">
          <span>Customer: </span>
          <strong>{customerName || "Guest"}</strong>
        </div>

        <div className="checkout-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart">Your cart is empty</div>
          ) : (
            <table className="checkout-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.qty}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${(item.qty * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="total-row">
                  <td colSpan={3}>Total</td>
                  <td>${cartTotal.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>

        <div className="checkout-actions">
          <button
            className="clear-cart-btn"
            onClick={handleClear}
            disabled={cartItems.length === 0}
          >
            Clear Cart
          </button>
          <button
            className="submit-order-btn"
            onClick={handleSubmit}
            disabled={isSubmitting || cartItems.length === 0}
          >
            {isSubmitting ? "Submitting..." : "Submit Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
