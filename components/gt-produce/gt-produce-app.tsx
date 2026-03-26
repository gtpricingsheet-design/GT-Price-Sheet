"use client";

import { useGTProduce } from "@/contexts/gt-produce-context";
import { Header } from "./header";
import { MainContent } from "./main-content";
import { SectionChooser } from "./section-chooser";
import { PinOverlay } from "./pin-overlay";
import { NameModal } from "./name-modal";
import { CheckoutOverlay } from "./checkout-overlay";
import { Dashboard } from "./dashboard";
import { Toast } from "./toast";
import { ConfirmDialog } from "./confirm-dialog";

// Inline cart display to avoid cache issues
function InlineCartDisplay({ onCheckout }: { onCheckout: () => void }) {
  const { basket } = useGTProduce();
  
  // Guard against undefined basket
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

export function GTProduceApp() {
  const { 
    isLoading, 
    showCheckout, 
    setShowCheckout,
    showDashboard,
    showNameModal,
    showPinOverlay
  } = useGTProduce();

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading GT Produce...</p>
      </div>
    );
  }

  return (
    <div className="gt-produce-app">
      <Header />
      <SectionChooser />
      <MainContent />
      <InlineCartDisplay onCheckout={() => setShowCheckout(true)} />
      
      {/* Overlays */}
      {showPinOverlay && <PinOverlay />}
      {showNameModal && <NameModal />}
      {showCheckout && <CheckoutOverlay />}
      {showDashboard && <Dashboard />}
      <Toast />
      <ConfirmDialog />
    </div>
  );
}
