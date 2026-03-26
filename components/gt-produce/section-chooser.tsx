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
          className="chooser-card chooser-card-modern"
          onClick={() => chooseSection('fruit')}
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(80,140,26,0.15)',
            boxShadow: '0 4px 24px rgba(80,140,26,0.08), 0 1px 3px rgba(0,0,0,0.04)',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(80,140,26,0.2), 0 8px 16px rgba(80,140,26,0.1)'
            e.currentTarget.style.borderColor = 'rgba(80,140,26,0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)'
            e.currentTarget.style.boxShadow = '0 4px 24px rgba(80,140,26,0.08), 0 1px 3px rgba(0,0,0,0.04)'
            e.currentTarget.style.borderColor = 'rgba(80,140,26,0.15)'
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px) scale(0.98)'
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
          }}
        >
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #6fbf30, #4a8a16)',
              opacity: 0,
              transition: 'opacity 0.3s ease'
            }}
            className="card-accent-bar"
          />
          <div className="card-emoji" style={{fontSize: '42px', marginBottom: '12px', transition: 'transform 0.3s ease'}}>🍎</div>
          <div className="card-label" style={{fontSize: '18px', fontWeight: 700, letterSpacing: '-0.01em'}}>Fruit</div>
          <div className="card-desc" style={{opacity: 0.7, fontSize: '13px', marginTop: '4px'}}>Berries, Citrus &amp; More</div>
        </div>

        <div 
          className="chooser-card chooser-card-modern"
          onClick={() => chooseSection('veg')}
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(80,140,26,0.15)',
            boxShadow: '0 4px 24px rgba(80,140,26,0.08), 0 1px 3px rgba(0,0,0,0.04)',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(80,140,26,0.2), 0 8px 16px rgba(80,140,26,0.1)'
            e.currentTarget.style.borderColor = 'rgba(80,140,26,0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)'
            e.currentTarget.style.boxShadow = '0 4px 24px rgba(80,140,26,0.08), 0 1px 3px rgba(0,0,0,0.04)'
            e.currentTarget.style.borderColor = 'rgba(80,140,26,0.15)'
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px) scale(0.98)'
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
          }}
        >
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #6fbf30, #4a8a16)',
              opacity: 0,
              transition: 'opacity 0.3s ease'
            }}
            className="card-accent-bar"
          />
          <div className="card-emoji" style={{fontSize: '42px', marginBottom: '12px', transition: 'transform 0.3s ease'}}>🥦</div>
          <div className="card-label" style={{fontSize: '18px', fontWeight: 700, letterSpacing: '-0.01em'}}>Vegetables</div>
          <div className="card-desc" style={{opacity: 0.7, fontSize: '13px', marginTop: '4px'}}>Roots, Salads &amp; Herbs</div>
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
