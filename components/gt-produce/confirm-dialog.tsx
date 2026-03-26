"use client"

import { useEffect, useState, useCallback } from 'react'

interface ConfirmState {
  isOpen: boolean
  message: string
  onConfirm: (() => void) | null
}

let showConfirmFn: ((message: string, onConfirm: () => void) => void) | null = null

export function showConfirm(message: string, onConfirm: () => void) {
  if (showConfirmFn) {
    showConfirmFn(message, onConfirm)
  }
}

export function ConfirmDialog() {
  const [state, setState] = useState<ConfirmState>({
    isOpen: false,
    message: '',
    onConfirm: null
  })

  const openConfirm = useCallback((message: string, onConfirm: () => void) => {
    setState({
      isOpen: true,
      message,
      onConfirm
    })
  }, [])

  useEffect(() => {
    showConfirmFn = openConfirm
    return () => {
      showConfirmFn = null
    }
  }, [openConfirm])

  const handleYes = () => {
    if (state.onConfirm) {
      state.onConfirm()
    }
    setState({ isOpen: false, message: '', onConfirm: null })
  }

  const handleNo = () => {
    setState({ isOpen: false, message: '', onConfirm: null })
  }

  return (
    <div className={`confirm-dialog ${state.isOpen ? 'open' : ''}`} onClick={(e) => {
      if (e.target === e.currentTarget) handleNo()
    }}>
      <div className="confirm-dialog-box">
        <p>{state.message}</p>
        <div className="confirm-dialog-actions">
          <button className="btn btn-secondary" onClick={handleNo}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleYes}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
