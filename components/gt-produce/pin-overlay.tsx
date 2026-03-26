"use client"

import { useState, useEffect, useRef } from 'react'
import { GTLogoSVG } from './gt-logo'
import { showToast } from './toast'

interface PinOverlayProps {
  isOpen: boolean
  mode: 'admin' | 'client'
  onClose: () => void
  onAdminSuccess: () => void
  onClientSuccess: () => void
  loginAsAdmin: (password: string) => Promise<boolean>
  loginAsCustomer: (pin: string) => Promise<boolean>
}

const PIN_MAX_ATTEMPTS = 5
const PIN_LOCKOUT_MS = 30000

export function PinOverlay({
  isOpen,
  mode,
  onClose,
  onAdminSuccess,
  onClientSuccess,
  loginAsAdmin,
  loginAsCustomer
}: PinOverlayProps) {
  const [pinCode, setPinCode] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [failCount, setFailCount] = useState(0)
  const [lockUntil, setLockUntil] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [shake, setShake] = useState(false)
  
  const adminInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setPinCode('')
      setAdminPassword('')
      setError('')
      setShowPassword(false)
      
      if (mode === 'admin') {
        setTimeout(() => adminInputRef.current?.focus(), 200)
      }
    }
  }, [isOpen, mode])

  const handlePinDigit = async (digit: string) => {
    if (mode !== 'client' || pinCode.length >= 6) return
    
    if (Date.now() < lockUntil) {
      const secs = Math.ceil((lockUntil - Date.now()) / 1000)
      showToast(`Too many attempts. Wait ${secs}s`, 'error')
      return
    }

    const newPin = pinCode + digit
    setPinCode(newPin)

    if (newPin.length === 6) {
      setIsSubmitting(true)
      const success = await loginAsCustomer(newPin)
      setIsSubmitting(false)
      
      if (success) {
        setFailCount(0)
        onClose()
        onClientSuccess()
      } else {
        const newFailCount = failCount + 1
        setFailCount(newFailCount)
        
        if (newFailCount >= PIN_MAX_ATTEMPTS) {
          setLockUntil(Date.now() + PIN_LOCKOUT_MS)
          setFailCount(0)
          showToast('Too many attempts — locked for 30s', 'error')
        } else {
          showToast(`Incorrect code (${PIN_MAX_ATTEMPTS - newFailCount} left)`, 'error')
        }
        
        setShake(true)
        setTimeout(() => {
          setShake(false)
          setPinCode('')
        }, 350)
      }
    }
  }

  const handlePinBackspace = () => {
    if (mode !== 'client' || pinCode.length === 0) return
    setPinCode(prev => prev.slice(0, -1))
  }

  const handleAdminSubmit = async () => {
    if (!adminPassword || isSubmitting) return
    
    if (Date.now() < lockUntil) {
      const secs = Math.ceil((lockUntil - Date.now()) / 1000)
      setError(`Too many attempts — locked for ${secs}s`)
      return
    }

    setIsSubmitting(true)
    setError('')
    
    const success = await loginAsAdmin(adminPassword)
    setIsSubmitting(false)
    
    if (success) {
      setFailCount(0)
      onClose()
      onAdminSuccess()
    } else {
      const newFailCount = failCount + 1
      setFailCount(newFailCount)
      
      if (newFailCount >= PIN_MAX_ATTEMPTS) {
        setLockUntil(Date.now() + PIN_LOCKOUT_MS)
        setFailCount(0)
        setError('Too many attempts — locked for 30s')
      } else {
        setError(`Incorrect passcode — ${PIN_MAX_ATTEMPTS - newFailCount} attempts left`)
      }
      
      setShake(true)
      setAdminPassword('')
      setTimeout(() => setShake(false), 350)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (mode === 'client') {
      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault()
        handlePinDigit(e.key)
      } else if (e.key === 'Backspace') {
        e.preventDefault()
        handlePinBackspace()
      }
    }
    if (e.key === 'Escape') {
      onClose()
    }
  }

  const buildKeypad = () => {
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫']
    return (
      <div className="pin-keypad">
        {keys.map((key, i) => {
          if (key === '') {
            return <div key={i} />
          }
          return (
            <button
              key={i}
              className="pin-key"
              onClick={() => {
                if (key === '⌫') {
                  handlePinBackspace()
                } else {
                  handlePinDigit(key)
                }
              }}
            >
              {key}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div
      className={`pin-overlay ${isOpen ? 'open' : ''}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="pin-box">
        <div className="pin-logo">
          <GTLogoSVG height={40} />
        </div>
        <div className="pin-lock-icon">
          <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <div className="pin-heading">
          {mode === 'admin' ? 'Admin Access' : 'Unlock Editor'}
        </div>
        <div className="pin-sub">
          {mode === 'admin' ? 'Enter your passcode' : 'Enter your PIN'}
        </div>

        {mode === 'client' ? (
          <>
            <div className={`pin-dots ${shake ? 'shake' : ''}`}>
              {[0, 1, 2, 3, 4, 5].map(i => (
                <div
                  key={i}
                  className={`pin-dot ${i < pinCode.length ? 'filled' : ''} ${shake ? 'wrong' : ''}`}
                />
              ))}
            </div>
            {buildKeypad()}
          </>
        ) : (
          <div style={{ width: '100%' }}>
            <div className="admin-pass-wrap">
              <input
                ref={adminInputRef}
                type={showPassword ? 'text' : 'password'}
                className={`admin-pass-input ${shake ? 'shake' : ''}`}
                placeholder="Enter passcode"
                value={adminPassword}
                onChange={(e) => {
                  setAdminPassword(e.target.value)
                  setError('')
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAdminSubmit()
                }}
                autoComplete="current-password"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
                maxLength={20}
              />
              <button
                className="admin-pass-toggle"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                aria-label="Show/hide"
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            <div className="admin-pass-error">{error}</div>
            <button
              className="admin-pass-btn"
              onClick={handleAdminSubmit}
              disabled={!adminPassword || isSubmitting}
            >
              {isSubmitting ? 'Checking...' : 'Unlock'}
            </button>
          </div>
        )}

        <button className="pin-cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  )
}
