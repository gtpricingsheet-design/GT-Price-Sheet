"use client"

import { useEffect, useState, useCallback } from 'react'

interface ToastMessage {
  id: number
  message: string
  type: 'success' | 'error'
}

let toastId = 0
let addToastFn: ((message: string, type: 'success' | 'error') => void) | null = null

export function showToast(message: string, type: 'success' | 'error' = 'success') {
  if (addToastFn) {
    addToastFn(message, type)
  }
}

export function Toast() {
  const [toast, setToast] = useState<ToastMessage | null>(null)

  const addToast = useCallback((message: string, type: 'success' | 'error') => {
    const id = ++toastId
    setToast({ id, message, type })
    
    setTimeout(() => {
      setToast(prev => prev?.id === id ? null : prev)
    }, 2500)
  }, [])

  useEffect(() => {
    addToastFn = addToast
    return () => {
      addToastFn = null
    }
  }, [addToast])

  if (!toast) return null

  return (
    <div 
      className={`toast show ${toast.type}`}
      key={toast.id}
    >
      {toast.message}
    </div>
  )
}
