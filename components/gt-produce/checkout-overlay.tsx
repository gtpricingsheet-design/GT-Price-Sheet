"use client"

import { useState } from 'react'
import { useGTProduce } from '@/contexts/gt-produce-context'

export function CheckoutOverlay() {
  const {
    showCheckout,
    setShowCheckout,
    basket,
    clientName,
    deliveryMethod,
    setDeliveryMethod,
    submitOrder
  } = useGTProduce()

  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fruitItems = Object.entries(basket)
    .filter(([_, item]) => item.section === 'fruit')
    .map(([key, item]) => ({ key, ...item }))

  const vegItems = Object.entries(basket)
    .filter(([_, item]) => item.section === 'veg')
    .map(([key, item]) => ({ key, ...item }))

  const total = Object.values(basket).reduce((sum, item) => sum + item.qty * item.price, 0)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await submitOrder(notes)
    setIsSubmitting(false)
    setNotes('')
  }

  if (!showCheckout) return null

  return (
    <div 
      className="checkout-overlay open"
      onClick={(e) => e.target === e.currentTarget && setShowCheckout(false)}
    >
      <div className="checkout-box">
        <h2>Review Your Quote</h2>
        <p className="checkout-customer">
          Order for: <strong>{clientName}</strong>
        </p>

        <div className="checkout-field">
          <label>Delivery Method</label>
          <div className="delivery-toggle">
            <button
              className={`delivery-option ${deliveryMethod === 'collection' ? 'active' : ''}`}
              onClick={() => setDeliveryMethod('collection')}
            >
              Collection
            </button>
            <button
              className={`delivery-option ${deliveryMethod === 'delivery' ? 'active' : ''}`}
              onClick={() => setDeliveryMethod('delivery')}
            >
              Delivery
            </button>
          </div>
        </div>

        <div className="checkout-field">
          <label>Notes (optional)</label>
          <textarea
            placeholder="Any special requests..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="checkout-summary">
          {fruitItems.length > 0 && (
            <>
              <div className="checkout-section-label">Fruit</div>
              {fruitItems.map(item => (
                <div key={item.key} className="checkout-summary-item">
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
              {vegItems.map(item => (
                <div key={item.key} className="checkout-summary-item">
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

        <div className="checkout-actions">
          <button 
            className="btn btn-secondary"
            onClick={() => setShowCheckout(false)}
          >
            Back
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Quote'}
          </button>
        </div>
      </div>
    </div>
  )
}
