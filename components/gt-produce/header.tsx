"use client";

import { useGTProduce } from "@/contexts/gt-produce-context";
import { GTLogo } from "./gt-logo";

export function Header() {
  const {
    isAdmin,
    customerName,
    setShowPinOverlay,
    setShowDashboard,
    setShowNameModal,
  } = useGTProduce();

  return (
    <header className="main-header">
      <div className="header-left">
        <GTLogo />
        <div className="header-title">
          <h1>GT Produce</h1>
          <span className="tagline">Fresh Daily Prices</span>
        </div>
      </div>

      <div className="header-right">
        {customerName && (
          <div className="customer-badge" onClick={() => setShowNameModal(true)}>
            <span className="customer-icon">👤</span>
            <span className="customer-name">{customerName}</span>
          </div>
        )}

        {!customerName && (
          <button className="name-btn" onClick={() => setShowNameModal(true)}>
            Enter Name
          </button>
        )}

        {isAdmin ? (
          <button className="dashboard-btn" onClick={() => setShowDashboard(true)}>
            Dashboard
          </button>
        ) : (
          <button className="admin-btn" onClick={() => setShowPinOverlay(true)}>
            Admin
          </button>
        )}
      </div>
    </header>
  );
}
