"use client";

import { useGTProduce } from "@/contexts/gt-produce-context";

export function CartSummary() {
  const { cart, cartTotal, setShowCheckout } = useGTProduce();

  const itemCount = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);

  if (itemCount === 0) return null;

  return (
    <div className="cart-summary">
      <div className="cart-info">
        <span className="cart-count">{itemCount} item{itemCount !== 1 ? "s" : ""}</span>
        <span className="cart-total">${cartTotal.toFixed(2)}</span>
      </div>
      <button className="checkout-btn" onClick={() => setShowCheckout(true)}>
        Checkout
      </button>
    </div>
  );
}
