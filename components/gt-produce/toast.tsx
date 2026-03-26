"use client"

import { useGTProduce } from '@/contexts/gt-produce-context'

export function Toast() {
  const { toastMessage, toastType, toastVisible } = useGTProduce()

  return (
    <div 
      id="toast" 
      className={`toast ${toastType} ${toastVisible ? 'show' : ''}`}
    >
      {toastMessage}
    </div>
  )
}
