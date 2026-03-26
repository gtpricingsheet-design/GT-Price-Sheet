"use client"

import { useGTProduce } from '@/contexts/gt-produce-context'
import { Moon, Sun } from 'lucide-react'

export function SectionChooser() {
  const { 
    chooseSection, 
    openPinPad, 
    editorUnlocked,
    setDashboardOpen,
    theme,
    toggleTheme
  } = useGTProduce()

  return (
    <div className="chooser-container">
      <div className="chooser-inner">
        <div className="chooser-logo">
          <img 
            src="/gt-logo-light.png" 
            alt="GT Produce" 
            className="gt-logo-light block dark:hidden h-14"
          />
          <img 
            src="/gt-logo-dark.png" 
            alt="GT Produce" 
            className="gt-logo-dark hidden dark:block h-14"
          />
        </div>
        
        <div className="chooser-tagline">
          Premium Produce, Daily Prices
        </div>

        <div className="chooser-cards">
          <button 
            className="chooser-card chooser-card-fruit"
            onClick={() => chooseSection('fruit')}
          >
            <span className="card-emoji">🍎</span>
            <span className="card-label">Fruit</span>
            <span className="card-desc">Fresh selection</span>
          </button>

          <button 
            className="chooser-card chooser-card-veg"
            onClick={() => chooseSection('veg')}
          >
            <span className="card-emoji">🥬</span>
            <span className="card-label">Vegetables</span>
            <span className="card-desc">Farm to market</span>
          </button>

          <button 
            id="adminCard"
            className={`chooser-card ${editorUnlocked ? 'chooser-card-quotes' : 'chooser-card-admin'}`}
            onClick={() => editorUnlocked ? setDashboardOpen(true) : openPinPad('admin')}
          >
            <span className="card-emoji">{editorUnlocked ? '📋' : '🔑'}</span>
            <span className="card-label">{editorUnlocked ? 'Quotes' : 'Admin'}</span>
            <span className="card-desc">{editorUnlocked ? 'Manage & fulfil' : 'Staff access'}</span>
          </button>
        </div>

        <button 
          className="chooser-theme-btn btn-icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}
