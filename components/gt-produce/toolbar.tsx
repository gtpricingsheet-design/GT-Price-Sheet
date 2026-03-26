"use client"

import { useGTProduce } from '@/contexts/gt-produce-context'
import { Moon, Sun, FileText, Settings, Lock, Unlock } from 'lucide-react'

export function Toolbar() {
  const {
    isConnected,
    editorUnlocked,
    salesmanName,
    countAll,
    currentSection,
    theme,
    toggleTheme,
    openPinPad,
    lockAdmin,
    setShowCatEditor,
    setDashboardOpen,
    goBackToChooser,
  } = useGTProduce()

  const handleExportPDF = () => {
    window.print()
  }

  return (
    <div className="editor-toolbar">
      <div className="toolbar-left">
        <span className={`toolbar-dot ${isConnected ? '' : 'offline'}`} />
        <span className="toolbar-status">
          {isConnected ? 'Live' : 'Offline'}
        </span>
        {editorUnlocked && salesmanName && (
          <span className="toolbar-badge">{salesmanName}</span>
        )}
      </div>

      <div className="toolbar-right">
        {currentSection && (
          <span className="toolbar-badge">
            {countAll()} items
          </span>
        )}

        {editorUnlocked && currentSection && (
          <button
            className="btn btn-secondary"
            onClick={() => setShowCatEditor(true)}
            data-edit-categories
          >
            <Settings className="w-4 h-4" />
            Categories
          </button>
        )}

        {currentSection && (
          <button className="btn btn-secondary" onClick={handleExportPDF}>
            <FileText className="w-4 h-4" />
            Export
          </button>
        )}

        <button className="btn-icon" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {editorUnlocked ? (
          <>
            <button
              className="btn btn-secondary"
              onClick={() => setDashboardOpen(true)}
            >
              Quotes
            </button>
            <button
              className="unlock-btn is-unlocked"
              onClick={lockAdmin}
            >
              <Unlock className="w-4 h-4" />
              Lock
            </button>
          </>
        ) : (
          <button
            className="unlock-btn"
            onClick={() => openPinPad('admin')}
          >
            <Lock className="w-4 h-4" />
            Admin
          </button>
        )}

        {currentSection && (
          <button className="btn btn-secondary" onClick={goBackToChooser}>
            Back
          </button>
        )}
      </div>
    </div>
  )
}
