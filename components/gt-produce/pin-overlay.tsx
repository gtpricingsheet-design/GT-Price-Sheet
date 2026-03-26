"use client"

import { useState, useEffect, useCallback } from 'react'
import { useGTProduce } from '@/contexts/gt-produce-context'
import { Eye, EyeOff, Delete } from 'lucide-react'

export function PinOverlay() {
  const {
    showPinOverlay,
    closePinPad,
    pinMode,
    pinCode,
    pinDigit,
    pinBackspace,
    adminPassSubmit,
    lockUntil,
    showToast
  } = useGTProduce()

  const [adminPassword, setAdminPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [adminError, setAdminError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset state when overlay opens/closes
  useEffect(() => {
    if (showPinOverlay) {
      setAdminPassword('')
      setAdminError('')
      setShowPassword(false)
    }
  }, [showPinOverlay])

  // Handle keyboard input for client mode
  useEffect(() => {
    if (!showPinOverlay || pinMode !== 'client') return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault()
        pinDigit(e.key)
      } else if (e.key === 'Backspace') {
        e.preventDefault()
        pinBackspace()
      } else if (e.key === 'Escape') {
        closePinPad()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [showPinOverlay, pinMode, pinDigit, pinBackspace, closePinPad])

  const handleAdminSubmit = useCallback(async () => {
    if (!adminPassword || isSubmitting) return
    
    setIsSubmitting(true)
    setAdminError('')
    
    const success = await adminPassSubmit(adminPassword)
    
    if (!success) {
      setAdminError('Incorrect passcode')
      setAdminPassword('')
    }
    
    setIsSubmitting(false)
  }, [adminPassword, adminPassSubmit, isSubmitting])

  const handleAdminKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdminSubmit()
    }
  }

  const isLocked = Date.now() < lockUntil

  if (!showPinOverlay) return null

  return (
    <div 
      id="pinOverlay" 
      className="pin-overlay open"
      onClick={(e) => e.target === e.currentTarget && closePinPad()}
    >
      <div className="pin-box">
        <button 
          id="pinCancelBtn" 
          className="pin-close" 
          onClick={closePinPad}
          aria-label="Close"
        >
          &times;
        </button>

        {pinMode === 'client' ? (
          <>
            <div className="pin-icon">🔐</div>
            <h2>Customer Access</h2>
            <p className="pin-sub">Enter your 6-digit code</p>
            
            <div id="pinDots" className="pin-dots">
              {[...Array(6)].map((_, i) => (
                <span 
                  key={i} 
                  className={`pin-dot ${i < pinCode.length ? 'filled' : ''}`}
                />
              ))}
            </div>

            <div id="pinKeypad" className="pin-keypad">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button 
                  key={num}
                  className="pin-key"
                  onClick={() => pinDigit(String(num))}
                  disabled={isLocked}
                >
                  {num}
                </button>
              ))}
              <span className="pin-key-placeholder" />
              <button 
                className="pin-key"
                onClick={() => pinDigit('0')}
                disabled={isLocked}
              >
                0
              </button>
              <button 
                className="pin-key pin-key-back"
                onClick={pinBackspace}
                disabled={isLocked}
              >
                <Delete className="w-5 h-5" />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="pin-icon">🔑</div>
            <h2>Admin Access</h2>
            <p className="pin-sub">Enter staff passcode</p>

            <div className="admin-pass-wrap">
              <input
                id="adminPassInput"
                type={showPassword ? 'text' : 'password'}
                className="admin-pass-input"
                placeholder="Passcode"
                value={adminPassword}
                onChange={(e) => {
                  setAdminPassword(e.target.value)
                  setAdminError('')
                }}
                onKeyDown={handleAdminKeyDown}
                disabled={isLocked || isSubmitting}
                autoFocus
              />
              <button
                type="button"
                className="admin-pass-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {adminError && (
              <p id="adminPassError" className="admin-pass-error">{adminError}</p>
            )}

            <button
              id="adminPassBtn"
              className="btn btn-primary admin-pass-btn"
              onClick={handleAdminSubmit}
              disabled={!adminPassword || isLocked || isSubmitting}
            >
              {isSubmitting ? 'Checking...' : 'Unlock'}
            </button>
          </>
        )}

        {isLocked && (
          <p className="pin-lockout">
            Too many attempts. Please wait...
          </p>
        )}
      </div>
    </div>
  )
}
