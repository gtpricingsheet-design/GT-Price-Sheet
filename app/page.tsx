"use client";

// GT Produce - Price Sheet Application - Fresh Build
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

// Inline cart display component
function CartDisplayWidget({ onCheckout }: { onCheckout: () => void }) {
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

function GTProduceMainApp() {
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
      <CartDisplayWidget onCheckout={() => setShowCheckout(true)} />
      
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

export default function Home() {
  return (
    <GTProduceProvider>
      <GTProduceMainApp />
    </GTProduceProvider>
  );
}
