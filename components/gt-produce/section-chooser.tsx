"use client"

import { useGTProduce } from '@/contexts/gt-produce-context'

export function SectionChooser() {
  const { 
    chooseSection, 
    openPinPad, 
    editorUnlocked,
    setDashboardOpen,
    theme,
    toggleTheme,
    activeOrdersCount
  } = useGTProduce()

  return (
    <div id="categoryChooser">
      <div className="chooser-logo">
        <span className="gt-logo-wrap">
          <img 
            src="/gt-logo-light.png" 
            alt="GT Produce" 
            className="gt-logo-light"
          />
          <img 
            src="/gt-logo-dark.png" 
            alt="GT Produce" 
            className="gt-logo-dark"
          />
        </span>
      </div>
      
      <div className="chooser-sub">Wholesale Pricing &amp; Procurement</div>

      <div className="chooser-cards">
        <div 
          className="chooser-card"
          onClick={() => chooseSection('fruit')}
        >
          <div className="card-emoji">🍎</div>
          <div className="card-label">Fruit</div>
          <div className="card-desc">Berries, Citrus &amp; More</div>
        </div>

        <div 
          className="chooser-card"
          onClick={() => chooseSection('veg')}
        >
          <div className="card-emoji">🥦</div>
          <div className="card-label">Vegetables</div>
          <div className="card-desc">Roots, Salads &amp; Herbs</div>
        </div>

        {editorUnlocked && (
          <div 
            id="adminCard"
            className="chooser-card chooser-card-admin"
            onClick={() => setDashboardOpen(true)}
          >
            <div className="card-emoji">🔑</div>
            <div className="card-label">Admin</div>
            <div className="card-desc">Staff access</div>
            {activeOrdersCount > 0 && (
              <span className="chooser-badge" id="ordersBadge">{activeOrdersCount}</span>
            )}
          </div>
        )}
      </div>
      
      <div style={{position: 'absolute', top: '16px', right: '16px', display: 'flex', alignItems: 'center', gap: '20px'}}>
        <button 
          onClick={() => openPinPad('admin')} 
          id="chooserAdminBtn"
          style={{
            background: 'linear-gradient(135deg,#4a8a16,#6fbf30)',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            padding: '8px 16px',
            fontFamily: "'DM Sans',sans-serif",
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 12px rgba(80,140,26,.25)',
            letterSpacing: '.02em',
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width: '14px', height: '14px', flexShrink: 0}}>
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          Admin
        </button>
        
        {editorUnlocked && (
          <button 
            className="btn btn-secondary" 
            id="toolbarQuotesBtn" 
            onClick={() => setDashboardOpen(true)}
            style={{position: 'relative'}}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="9" y1="12" x2="15" y2="12"/>
              <line x1="9" y1="16" x2="13" y2="16"/>
            </svg>
            Quotes
            {activeOrdersCount > 0 && (
              <span className="toolbar-quotes-badge" id="toolbarQuotesBadge">{activeOrdersCount}</span>
            )}
          </button>
        )}
        
        <button 
          className="btn-icon theme-btn" 
          onClick={toggleTheme} 
          title="Toggle theme"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  )
}
