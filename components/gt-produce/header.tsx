"use client"

import { useGTProduce } from '@/contexts/gt-produce-context'

export function Header() {
  const { currentSection } = useGTProduce()
  
  const title = currentSection === 'fruit' 
    ? 'Fresh Fruit' 
    : currentSection === 'veg' 
      ? 'Fresh Vegetables' 
      : 'GT Produce'
  
  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/London'
  })

  return (
    <header>
      <div className="logo-wrap">
        <img 
          src="/gt-logo-light.png" 
          alt="GT Produce" 
          className="gt-logo-light block dark:hidden h-[42px]"
        />
        <img 
          src="/gt-logo-dark.png" 
          alt="GT Produce" 
          className="gt-logo-dark hidden dark:block h-[42px]"
        />
      </div>
      <div className="header-rule" />
      <h1 className="header-title" id="headerTitle">{title}</h1>
      <p className="header-sub" id="dateField">{today}</p>
    </header>
  )
}
