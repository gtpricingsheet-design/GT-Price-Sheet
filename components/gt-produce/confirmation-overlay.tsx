"use client"

import { useGTProduce } from '@/contexts/gt-produce-context'
import { Check } from 'lucide-react'

export function ConfirmationOverlay() {
  const {
    showConfirmation,
    setShowConfirmation,
    lastOrderSummary,
    clientName
  } = useGTProduce()

  if (!showConfirmation || !lastOrderSummary) return null

  const { fruitItems, vegItems, total } = lastOrderSummary

  return (
    <div 
      className="confirmation-overlay open"
      onClick={(e) => e.target === e.currentTarget && setShowConfirmation(false)}
    >
      <div className="confirmation-box">
        <div className="confirm-icon">
          <Check className="w-6 h-6" />
        </div>
        <h2>Quote Submitted</h2>
        <p className="conf-sub">Thank you, {clientName}!</p>

        <div className="checkout-summary">
          {fruitItems.length > 0 && (
            <>
              <div className="checkout-section-label">Fruit</div>
              {fruitItems.map((item: any, idx: number) => (
                <div key={idx} className="checkout-summary-item">
                  <span>
                    {item.name}
                    <span className="item-detail"> x{item.qty}</span>
                  </span>
                  <span>£{(item.qty * item.price).toFixed(2)}</span>
                </div>
              ))}
            </>
          )}

          {vegItems.length > 0 && (
            <>
              <div className="checkout-section-label">Vegetables</div>
              {vegItems.map((item: any, idx: number) => (
                <div key={idx} className="checkout-summary-item">
                  <span>
                    {item.name}
                    <span className="item-detail"> x{item.qty}</span>
                  </span>
                  <span>£{(item.qty * item.price).toFixed(2)}</span>
                </div>
              ))}
            </>
          )}

          <div className="checkout-summary-total">
            <span>Total</span>
            <span>£{total.toFixed(2)}</span>
          </div>
        </div>

        <p className="conf-note">
          We&apos;ll be in touch shortly with your quote.
        </p>

        <button 
          className="btn btn-primary"
          onClick={() => setShowConfirmation(false)}
          style={{ width: '100%', marginTop: '16px' }}
        >
          Done
        </button>
      </div>
    </div>
  )
}
