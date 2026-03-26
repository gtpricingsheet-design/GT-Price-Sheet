"use client"

import { useGTProduce } from '@/contexts/gt-produce-context'
import { ShoppingCart } from 'lucide-react'

export function OrderFAB() {
  const { 
    basket, 
    openPinPad,
    setShowOrderOverlay,
    clientName 
  } = useGTProduce()

  const basketCount = Object.values(basket).reduce((sum, item) => sum + item.qty, 0)
  const basketTotal = Object.values(basket).reduce((sum, item) => sum + item.qty * item.price, 0)

  const handleClick = () => {
    if (clientName) {
      setShowOrderOverlay(true)
    } else {
      openPinPad('client')
    }
  }

  return (
    <button 
      className="order-fab"
      onClick={handleClick}
    >
      <ShoppingCart className="w-5 h-5" />
      <span>
        {basketCount > 0 
          ? `£${basketTotal.toFixed(2)} (${basketCount})`
          : 'Start Order'
        }
      </span>
    </button>
  )
}
