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

  const handleSubmit = () => {
    const trimmedName = name.trim()
    if (!trimmedName) {
      showToast('Please enter your name', 'error')
      return
    }
    setClientName(trimmedName)
    setShowNameModal(false)
    setShowOrderOverlay(true)
    showToast(`Welcome, ${trimmedName}`, 'success')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  if (!showNameModal) return null

  return (
    <div 
      id="nameOverlay" 
      className="name-overlay open"
      onClick={(e) => e.target === e.currentTarget && setShowNameModal(false)}
    >
      <div className="name-box">
        <div className="name-icon">👋</div>
        <h2>Welcome</h2>
        <p className="name-sub">Please enter your name to continue</p>
        
        <input
          id="clientNameInput"
          type="text"
          className="name-input"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        
        <button 
          className="name-submit"
          onClick={handleSubmit}
        >
          Continue
        </button>
        
        <button 
          className="name-cancel"
          onClick={() => setShowNameModal(false)}
        >
          Cancel
        </button>
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
    showToast
  } = useGTProduce()

  const [name, setName] = useState('')

  useEffect(() => {
    if (showSalesNameModal) {
      setName(salesmanName || '')
    }
  }, [showSalesNameModal, salesmanName])

  const handleSubmit = () => {
    const trimmedName = name.trim()
    if (!trimmedName) {
      showToast('Please enter your name', 'error')
      return
    }
    setSalesmanName(trimmedName)
    setShowSalesNameModal(false)
    showToast(`Welcome, ${trimmedName}`, 'success')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  if (!showSalesNameModal) return null

  return (
    <div 
      id="salesNameOverlay" 
      className="name-overlay open"
      onClick={(e) => e.target === e.currentTarget && setShowSalesNameModal(false)}
    >
      <div className="name-box">
        <div className="name-icon">👤</div>
        <h2>Staff Name</h2>
        <p className="name-sub">Enter your name for order tracking</p>
        
        <input
          id="salesNameInput"
          type="text"
          className="name-input"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        
        <button 
          className="name-submit"
          onClick={handleSubmit}
        >
          Continue
        </button>
        
        <button 
          className="name-cancel"
          onClick={() => setShowSalesNameModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
