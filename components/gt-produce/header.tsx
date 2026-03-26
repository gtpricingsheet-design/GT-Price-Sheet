"use client"

import { useGTProduce } from '@/contexts/gt-produce-context'

export function Header() {
  const { currentSection } = useGTProduce()
  
  const title = currentSection === 'fruit' 
    ? 'Fresh Fruit' 
    : currentSection === 'veg' 
      ? 'Fresh Vegetables' 
      : 'GT Produce'
  
  const sectionLabel = currentSection === 'fruit' ? 'Fresh Produce' : 'Fresh Produce'
  
  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/London'
  })

  return (
    <header>
      <div className="logo-wrap">
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
      <div className="header-rule" />
      <div className="header-title" id="headerTitle">{title}</div>
      <div className="header-sub">
        <span id="sectionLabel">{sectionLabel}</span> &middot; Leeds &middot; <span id="dateField">{today}</span>
      </div>
    </header>
  )
}
