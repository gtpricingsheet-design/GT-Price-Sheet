"use client"

import { useState, useEffect, useRef } from 'react'
import { showToast } from './toast'

interface NameModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (name: string) => void
  title?: string
  subtitle?: string
  icon?: string
  placeholder?: string
  buttonText?: string
  initialValue?: string
}

export function NameModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Your Details',
  subtitle = 'Enter your business or contact name',
  icon = '👋',
  placeholder = 'Business or contact name',
  buttonText = 'Continue',
  initialValue = ''
}: NameModalProps) {
  const [name, setName] = useState(initialValue)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setName(initialValue)
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [isOpen, initialValue])

  const handleSubmit = () => {
    const trimmed = name.trim()
    if (!trimmed) {
      showToast('Please enter a name', 'error')
      return
    }
    onConfirm(trimmed)
  }

  return (
    <div
      className={`name-overlay ${isOpen ? 'open' : ''}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="name-box">
        <div className="name-icon">{icon}</div>
        <h2>{title}</h2>
        <div className="name-sub">{subtitle}</div>
        <input
          ref={inputRef}
          type="text"
          className="name-input"
          placeholder={placeholder}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit()
          }}
          autoComplete="off"
          spellCheck={false}
        />
        <button className="name-submit" onClick={handleSubmit}>
          {buttonText}
        </button>
        <button className="name-cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  )
}
