"use client";

import { useGTProduce } from "@/contexts/gt-produce-context";

export function CartDisplay({ onCheckout }: { onCheckout: () => void }) {
  const { basket } = useGTProduce();
  
  // Safely handle undefined basket during initial render
  if (!basket) return null;
  
  const items = Object.values(basket);
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);

  if (itemCount === 0) return null;

  return (
    <div className="cart-summary">
      <div className="cart-info">
        <span className="cart-count">{itemCount} item{itemCount !== 1 ? "s" : ""}</span>
        <span className="cart-total">£{cartTotal.toFixed(2)}</span>
      </div>
      <button className="checkout-btn" onClick={onCheckout}>
        Checkout
      </button>
    </div>
  );
}
