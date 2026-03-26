"use client"

import { GTLogoSVG } from './gt-logo'
import type { Section } from '@/lib/types'

interface SectionChooserProps {
  isVisible: boolean
  editorUnlocked: boolean
  pendingOrderCount: number
  onChooseSection: (section: Section) => void
  onAdminClick: () => void
  onDashboardClick: () => void
  onToggleTheme: () => void
  theme: 'light' | 'dark'
}

export function SectionChooser({
  isVisible,
  editorUnlocked,
  pendingOrderCount,
  onChooseSection,
  onAdminClick,
  onDashboardClick,
  onToggleTheme,
  theme
}: SectionChooserProps) {
  return (
    <div id="categoryChooser" className={isVisible ? '' : 'hidden'}>
      <div className="chooser-logo">
        <GTLogoSVG height={52} />
      </div>
      <div className="chooser-title">GT Produce</div>
      <div className="chooser-sub">Wholesale Pricing & Procurement</div>
      
      <div className="chooser-cards">
        <div
          className="chooser-card"
          onClick={() => onChooseSection('fruit')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onChooseSection('fruit')}
        >
          <div className="card-emoji">🍎</div>
          <div className="card-label">Fruit</div>
          <div className="card-desc">Berries, Citrus & More</div>
        </div>
        
        <div
          className="chooser-card"
          onClick={() => onChooseSection('veg')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onChooseSection('veg')}
        >
          <div className="card-emoji">🥦</div>
          <div className="card-label">Vegetables</div>
          <div className="card-desc">Roots, Salads & Herbs</div>
        </div>
        
        <div
          className={`chooser-card ${editorUnlocked ? 'chooser-card-quotes' : 'chooser-card-admin'}`}
          onClick={editorUnlocked ? onDashboardClick : onAdminClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && (editorUnlocked ? onDashboardClick() : onAdminClick())}
        >
          <div className="card-emoji">{editorUnlocked ? '📋' : '🔑'}</div>
          <div className="card-label">{editorUnlocked ? 'Quotes' : 'Admin'}</div>
          <div className="card-desc">{editorUnlocked ? 'Manage & fulfil' : 'Staff access'}</div>
          {editorUnlocked && pendingOrderCount > 0 && (
            <span className="chooser-badge">{pendingOrderCount}</span>
          )}
        </div>
      </div>

      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
      }}>
        {!editorUnlocked && (
          <button
            onClick={onAdminClick}
            style={{
              background: 'linear-gradient(135deg, #4a8a16, #6fbf30)',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              padding: '8px 16px',
              fontFamily: "'DM Sans', sans-serif",
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '14px', height: '14px', flexShrink: 0 }}>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Admin
          </button>
        )}
        
        <button
          className="btn-icon theme-btn"
          onClick={onToggleTheme}
          title="Toggle theme"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  )
}
