"use client"

import { GTLogoSVG } from './gt-logo'

interface EditorToolbarProps {
  isOnline: boolean
  itemCount: number
  editorUnlocked: boolean
  pendingOrderCount: number
  onHomeClick: () => void
  onExportPDF: () => void
  onEditCategories: () => void
  onDashboardClick: () => void
  onToggleTheme: () => void
  theme: 'light' | 'dark'
}

export function EditorToolbar({
  isOnline,
  itemCount,
  editorUnlocked,
  pendingOrderCount,
  onHomeClick,
  onExportPDF,
  onEditCategories,
  onDashboardClick,
  onToggleTheme,
  theme
}: EditorToolbarProps) {
  return (
    <div className="editor-toolbar" id="toolbar">
      <div className="toolbar-left">
        <a
          onClick={onHomeClick}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', textDecoration: 'none', marginRight: '6px' }}
          title="Home"
        >
          <GTLogoSVG height={32} />
        </a>
        <div style={{ width: '1px', height: '18px', background: 'var(--border-gt)', margin: '0 4px', flexShrink: 0 }} />
        <span className={`toolbar-dot ${isOnline ? '' : 'offline'}`} />
        <span className="toolbar-status">{isOnline ? '✓ Synced' : '○ Offline'}</span>
        <span className="toolbar-badge">{itemCount} products</span>
      </div>
      
      <div className="toolbar-right">
        <button className="btn btn-primary" onClick={onExportPDF}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <polyline points="9 15 12 18 15 15" />
          </svg>
          Export
        </button>
        
        {editorUnlocked && (
          <button className="btn btn-secondary" onClick={onEditCategories} data-edit-categories>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            Categories
          </button>
        )}
        
        <button className="btn btn-secondary" onClick={onHomeClick}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          </svg>
        </button>
        
        {editorUnlocked && (
          <button className="btn btn-secondary" onClick={onDashboardClick} style={{ position: 'relative' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="9" y1="12" x2="15" y2="12" />
              <line x1="9" y1="16" x2="13" y2="16" />
            </svg>
            Quotes
            {pendingOrderCount > 0 && (
              <span className="toolbar-quotes-badge">{pendingOrderCount}</span>
            )}
          </button>
        )}
        
        <button className="btn-icon theme-btn" onClick={onToggleTheme} title="Toggle theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  )
}
