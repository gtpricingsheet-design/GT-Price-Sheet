"use client";

import { useGTProduce } from "@/contexts/gt-produce-context";
import { Header } from "./header";
import { MainContent } from "./main-content";
import { CartSummary } from "./cart-summary";
import { SectionChooser } from "./section-chooser";
import { PinOverlay } from "./pin-overlay";
import { NameModal } from "./name-modal";
import { CheckoutOverlay } from "./checkout-overlay";
import { Dashboard } from "./dashboard";
import { Toast } from "./toast";
import { ConfirmDialog } from "./confirm-dialog";

export function GTProduceApp() {
  const { isLoading } = useGTProduce();

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
      <CartSummary />
      
      {/* Overlays */}
      <PinOverlay />
      <NameModal />
      <CheckoutOverlay />
      <Dashboard />
      <Toast />
      <ConfirmDialog />
    </div>
  );
}
