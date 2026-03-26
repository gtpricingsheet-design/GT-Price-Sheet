"use client";

import { useGTProduce } from "@/contexts/gt-produce-context";
import { GTLogoSVG } from "./gt-logo";

export function Header() {
  const {
    currentSection,
    setCurrentSection,
    editorUnlocked,
    clientName,
    setShowPinOverlay,
    setShowDashboard,
    setShowNameModal,
    theme,
    toggleTheme,
  } = useGTProduce();

  // Only show header when a section is selected
  if (!currentSection) return null;

  return (
    <header className="main-header">
      <div className="header-left">
        <button className="back-btn" onClick={() => setCurrentSection(null)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <GTLogoSVG height={36} />
        <div className="header-title">
          <h1>GT Produce</h1>
          <span className="tagline">Fresh Daily Prices</span>
        </div>
      </div>

      <div className="header-right">
        {clientName && (
          <div className="customer-badge" onClick={() => setShowNameModal(true)}>
            <span className="customer-icon">👤</span>
            <span className="customer-name">{clientName}</span>
          </div>
        )}

        {!clientName && (
          <button className="name-btn" onClick={() => setShowNameModal(true)}>
            Enter Name
          </button>
        )}

        <button
          className="btn-icon theme-btn"
          onClick={toggleTheme}
          title="Toggle theme"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        {editorUnlocked ? (
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
