"use client"

import { useGTProduce } from '@/contexts/gt-produce-context'
import { ChevronLeft, Minus, Plus } from 'lucide-react'
import type { Category, ProduceItem } from '@/lib/types'

export function OrderOverlay() {
  const {
    showOrderOverlay,
    setShowOrderOverlay,
    FRUIT_DATA,
    VEG_DATA,
    basket,
    changeQty,
    orderBrowseSection,
    setOrderBrowseSection,
    setShowCheckout,
    clientName
  } = useGTProduce()

  const data = orderBrowseSection === 'fruit' ? FRUIT_DATA : VEG_DATA
  const basketCount = Object.values(basket).reduce((sum, item) => sum + item.qty, 0)
  const basketTotal = Object.values(basket).reduce((sum, item) => sum + item.qty * item.price, 0)

  const getItemKey = (catId: string, itemName: string) => `${catId}__${itemName}`

  const renderOrderItem = (cat: Category, item: ProduceItem) => {
    if (!item.available) return null
    
    const key = getItemKey(cat.id, item.name)
    const basketItem = basket[key]
    const qty = basketItem?.qty || 0
    const inBasket = qty > 0

    return (
      <div 
        key={key}
        className={`order-item ${inBasket ? 'in-basket' : ''}`}
      >
        <div className="order-item-info">
          <div className="order-item-name">{item.name}</div>
          <div className="order-item-price">£{item.price.toFixed(2)}</div>
        </div>
        <div className="qty-controls">
          <button 
            className="qty-btn"
            onClick={() => changeQty(key, item.name, item.price, -1, orderBrowseSection)}
          >
            <Minus className="w-4 h-4" />
          </button>
          <div className={`qty-display ${qty > 0 ? 'bump' : ''}`}>{qty}</div>
          <button 
            className="qty-btn"
            onClick={() => changeQty(key, item.name, item.price, 1, orderBrowseSection)}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  if (!showOrderOverlay) return null

  return (
    <div className="order-overlay open">
      <div className="order-header">
        <button 
          className="order-back"
          onClick={() => setShowOrderOverlay(false)}
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        <span className="order-header-title">Build Your Quote</span>
        {basketCount > 0 && (
          <button 
            className="order-basket-count"
            onClick={() => setShowCheckout(true)}
          >
            {basketCount} items
          </button>
        )}
      </div>

      <div className="order-section-tabs">
        <button
          className={`order-section-tab ${orderBrowseSection === 'fruit' ? 'active' : ''}`}
          onClick={() => setOrderBrowseSection('fruit')}
        >
          🍎 Fruit
        </button>
        <button
          className={`order-section-tab ${orderBrowseSection === 'veg' ? 'active' : ''}`}
          onClick={() => setOrderBrowseSection('veg')}
        >
          🥬 Vegetables
        </button>
      </div>

      <div className="order-content" id="orderContent">
        {data.map(cat => {
          const items = cat.subSections 
            ? cat.subSections.flatMap(s => s.items)
            : (cat.items || [])
          
          const availableItems = items.filter(item => item.available)
          if (availableItems.length === 0) return null

          return (
            <div key={cat.id}>
              <div className="order-cat-title">
                {cat.icon} {cat.name}
              </div>
              {availableItems.map(item => renderOrderItem(cat, item))}
            </div>
          )
        })}
      </div>

      {basketCount > 0 && (
        <div className="basket-footer">
          <div className="basket-footer-inner">
            <div className="basket-total">
              Total: <span>£{basketTotal.toFixed(2)}</span>
            </div>
            <button 
              className="basket-submit-btn"
              onClick={() => setShowCheckout(true)}
            >
              Review Quote
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
