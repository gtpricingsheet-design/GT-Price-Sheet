"use client"

import { useGTProduce } from '@/contexts/gt-produce-context'

export function ConfirmDialog() {
  const { 
    confirmDialogVisible, 
    confirmMessage, 
    confirmCallback,
    closeConfirmDialog 
  } = useGTProduce()

  const handleConfirm = () => {
    if (confirmCallback) {
      confirmCallback()
    }
    closeConfirmDialog()
  }

  return (
    <div 
      id="confirmDialog" 
      className={`confirm-overlay ${confirmDialogVisible ? 'open' : ''}`}
      onClick={(e) => e.target === e.currentTarget && closeConfirmDialog()}
    >
      <div className="confirm-box">
        <p id="confirmMsg">{confirmMessage}</p>
        <div className="confirm-actions">
          <button 
            className="btn btn-secondary" 
            onClick={closeConfirmDialog}
          >
            Cancel
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
