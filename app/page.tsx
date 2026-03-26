"use client";

// GT Produce Price Sheet - Complete Fresh Build v3
import { GTProduceProvider, useGTProduce } from "@/contexts/gt-produce-context";
import { Header } from "@/components/gt-produce/header";
import { MainContent } from "@/components/gt-produce/main-content";
import { SectionChooser } from "@/components/gt-produce/section-chooser";
import { PinOverlay } from "@/components/gt-produce/pin-overlay";
import { NameModal } from "@/components/gt-produce/name-modal";
import { CheckoutOverlay } from "@/components/gt-produce/checkout-overlay";
import { Dashboard } from "@/components/gt-produce/dashboard";
import { Toast } from "@/components/gt-produce/toast";
import { ConfirmDialog } from "@/components/gt-produce/confirm-dialog";

// Basket display - completely new component name
function BasketWidget({ onCheckout }: { onCheckout: () => void }) {
  const { basket } = useGTProduce();
  
  // Explicit null/undefined check before any operations
  if (basket === null || basket === undefined) {
    return null;
  }
  
  const basketItems = Object.values(basket);
  const itemCount = basketItems.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = basketItems.reduce((sum, item) => sum + item.qty * item.price, 0);

  if (itemCount === 0) return null;

  return (
    <div className="cart-summary">
      <div className="cart-info">
        <span className="cart-count">{itemCount} item{itemCount !== 1 ? "s" : ""}</span>
        <span className="cart-total">£{totalPrice.toFixed(2)}</span>
      </div>
      <button className="checkout-btn" onClick={onCheckout}>
        Checkout
      </button>
    </div>
  );
}

// Main application component - fresh name
function ProduceApp() {
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
      <BasketWidget onCheckout={() => setShowCheckout(true)} />
      
      {showPinOverlay && <PinOverlay />}
      {showNameModal && <NameModal />}
      {showCheckout && <CheckoutOverlay />}
      {showDashboard && <Dashboard />}
      <Toast />
      <ConfirmDialog />
    </div>
  );
}

export default function Home() {
  return (
    <GTProduceProvider>
      <ProduceApp />
    </GTProduceProvider>
  );
}
