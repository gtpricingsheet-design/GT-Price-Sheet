"use client"

import { useState, useEffect } from 'react'
import { useGTProduce } from '@/contexts/gt-produce-context'

export function NameModal() {
  const {
    showNameModal,
    setShowNameModal,
    clientName,
    setClientName,
    setShowOrderOverlay,
    showToast
  } = useGTProduce()

  const [name, setName] = useState('')

  useEffect(() => {
    if (showNameModal) {
      setName(clientName || '')
    }
  }, [showNameModal, clientName])

  const confirmName = () => {
    const trimmedName = name.trim()
    if (!trimmedName) {
      showToast('Please enter your name', 'error')
      return
    }
    setClientName(trimmedName)
    setShowNameModal(false)
    setShowOrderOverlay(true)
  }

  const closeNameModal = () => {
    setShowNameModal(false)
  }

  if (!showNameModal) return null

  return (
    <div className="name-overlay" id="nameOverlay" style={{display: 'flex'}}>
      <div className="name-box">
        <div className="name-icon">👋</div>
        <h2>Your Details</h2>
        <div className="name-sub">Enter your business or contact name</div>
        <input 
          type="text" 
          className="name-input" 
          id="clientNameInput" 
          placeholder="Business or contact name" 
          autoComplete="off" 
          spellCheck={false}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && confirmName()}
          autoFocus
        />
        <button className="name-submit" onClick={confirmName}>Continue</button>
        <button className="name-cancel" onClick={closeNameModal}>Cancel</button>
      </div>
    </div>
  )
}

export function SalesNameModal() {
  const {
    showSalesNameModal,
    setShowSalesNameModal,
    salesmanName,
    setSalesmanName,
    setDashboardOpen
  } = useGTProduce()

  const [name, setName] = useState('')

  useEffect(() => {
    if (showSalesNameModal) {
      setName(salesmanName || '')
    }
  }, [showSalesNameModal, salesmanName])

  const confirmSalesName = () => {
    const trimmedName = name.trim()
    if (!trimmedName) return
    setSalesmanName(trimmedName)
    setShowSalesNameModal(false)
    setDashboardOpen(true)
  }

  const closeSalesName = () => {
    setShowSalesNameModal(false)
  }

  if (!showSalesNameModal) return null

  return (
    <div className="name-overlay" id="salesNameOverlay" style={{display: 'flex'}}>
      <div className="name-box">
        <div className="name-icon">👤</div>
        <h2>Who&apos;s on?</h2>
        <div className="name-sub">Your name shows on claimed quotes</div>
        <input 
          type="text" 
          className="name-input" 
          id="salesNameInput" 
          placeholder="Your first name" 
          autoComplete="off" 
          spellCheck={false}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && confirmSalesName()}
          autoFocus
        />
        <button className="name-submit" onClick={confirmSalesName}>Open Dashboard</button>
        <button className="name-cancel" onClick={closeSalesName}>Cancel</button>
      </div>
    </div>
  )
}
