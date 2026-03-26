"use client"

import { useGTProduce } from '@/contexts/gt-produce-context'
import { ChevronLeft, Trash2, Check } from 'lucide-react'
import type { Order } from '@/lib/types'

export function DashboardOverlay() {
  const {
    dashboardOpen,
    setDashboardOpen,
    ORDERS,
    dashFilter,
    setDashFilter,
    updateOrderStatus,
    deleteOrder,
    toggleItemCheck,
    showConfirmDialog
  } = useGTProduce()

  const ordersList = Object.values(ORDERS).sort((a, b) => {
    const aTime = typeof a.timestamp === 'number' ? a.timestamp : new Date(a.timestamp).getTime()
    const bTime = typeof b.timestamp === 'number' ? b.timestamp : new Date(b.timestamp).getTime()
    return bTime - aTime
  })

  const filteredOrders = ordersList.filter(order => {
    if (dashFilter === 'active') return order.status !== 'completed'
    if (dashFilter === 'completed') return order.status === 'completed'
    return true
  })

  const formatTime = (timestamp: number | string) => {
    const date = typeof timestamp === 'number' ? new Date(timestamp) : new Date(timestamp)
    return date.toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleStatusChange = (orderId: string, newStatus: 'uncompleted' | 'pending' | 'completed') => {
    updateOrderStatus(orderId, newStatus)
  }

  const handleDelete = (orderId: string) => {
    showConfirmDialog('Remove this quote request?', () => {
      deleteOrder(orderId)
    })
  }

  if (!dashboardOpen) return null

  return (
    <div className="dashboard-overlay open">
      <div className="dash-header">
        <button 
          className="order-back"
          onClick={() => setDashboardOpen(false)}
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        <h1 className="dash-title">Quote Requests</h1>
        
        <div className="dash-filters">
          <button
            className={`dash-filter ${dashFilter === 'active' ? 'active' : ''}`}
            onClick={() => setDashFilter('active')}
          >
            Active
          </button>
          <button
            className={`dash-filter ${dashFilter === 'all' ? 'active' : ''}`}
            onClick={() => setDashFilter('all')}
          >
            All
          </button>
          <button
            className={`dash-filter ${dashFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setDashFilter('completed')}
          >
            Done
          </button>
        </div>
      </div>

      <div className="dash-content" id="dashContent">
        {filteredOrders.length === 0 ? (
          <div className="dash-empty">
            <div className="dash-empty-icon">📋</div>
            <p>No quotes to display</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
              onToggleItem={toggleItemCheck}
              formatTime={formatTime}
            />
          ))
        )}
      </div>
    </div>
  )
}

interface OrderCardProps {
  order: Order
  onStatusChange: (orderId: string, status: 'uncompleted' | 'pending' | 'completed') => void
  onDelete: (orderId: string) => void
  onToggleItem: (orderId: string, itemIdx: number) => void
  formatTime: (timestamp: number | string) => string
}

function OrderCard({ order, onStatusChange, onDelete, onToggleItem, formatTime }: OrderCardProps) {
  const fruitItems = order.items?.filter(item => item.section === 'fruit') || []
  const vegItems = order.items?.filter(item => item.section === 'veg') || []
  const otherItems = order.items?.filter(item => !item.section) || []

  return (
    <div 
      id={`card_${order.id}`}
      className={`order-card status-${order.status}`}
    >
      <div 
        className="order-card-header"
        onClick={(e) => {
          const card = (e.currentTarget.parentElement as HTMLElement)
          card.classList.toggle('expanded')
        }}
      >
        <span className="order-customer-name">{order.customerName}</span>
        <span className="order-meta-info">{formatTime(order.timestamp)}</span>
        
        {(order.deliveryType || order.deliveryMethod) && (
          <span className={`order-type-badge ${order.deliveryType || order.deliveryMethod}`}>
            {order.deliveryType || order.deliveryMethod}
          </span>
        )}

        <select
          className={`order-status-badge ${order.status}`}
          value={order.status}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => onStatusChange(order.id, e.target.value as any)}
        >
          <option value="uncompleted">New</option>
          <option value="pending">Pending</option>
          <option value="completed">Done</option>
        </select>

        <button
          className="order-delete-btn"
          onClick={(e) => {
            e.stopPropagation()
            onDelete(order.id)
          }}
          aria-label="Delete order"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="order-card-body">
        {fruitItems.length > 0 && (
          <>
            <div className="order-section-group">Fruit</div>
            {fruitItems.map((item, idx) => {
              const itemIdx = order.items?.indexOf(item) ?? idx
              return (
                <div key={idx} className="order-detail-item">
                  <div 
                    className={`order-detail-check ${item.checked ? 'checked' : ''}`}
                    onClick={() => onToggleItem(order.id, itemIdx)}
                  >
                    {item.checked && <Check className="w-3 h-3" />}
                  </div>
                  <div className={`order-detail-name ${item.checked ? 'checked-off' : ''}`}>
                    {item.name}
                  </div>
                  <div className="order-detail-qty">x{item.qty}</div>
                  <div className="order-detail-price">£{(item.price ?? 0).toFixed(2)}</div>
                </div>
              )
            })}
          </>
        )}

        {vegItems.length > 0 && (
          <>
            <div className="order-section-group">Vegetables</div>
            {vegItems.map((item, idx) => {
              const itemIdx = order.items?.indexOf(item) ?? idx
              return (
                <div key={idx} className="order-detail-item">
                  <div 
                    className={`order-detail-check ${item.checked ? 'checked' : ''}`}
                    onClick={() => onToggleItem(order.id, itemIdx)}
                  >
                    {item.checked && <Check className="w-3 h-3" />}
                  </div>
                  <div className={`order-detail-name ${item.checked ? 'checked-off' : ''}`}>
                    {item.name}
                  </div>
                  <div className="order-detail-qty">x{item.qty}</div>
                  <div className="order-detail-price">£{(item.price ?? 0).toFixed(2)}</div>
                </div>
              )
            })}
          </>
        )}

        {otherItems.length > 0 && otherItems.map((item, idx) => {
          const itemIdx = order.items?.indexOf(item) ?? idx
          return (
            <div key={idx} className="order-detail-item">
              <div 
                className={`order-detail-check ${item.checked ? 'checked' : ''}`}
                onClick={() => onToggleItem(order.id, itemIdx)}
              >
                {item.checked && <Check className="w-3 h-3" />}
              </div>
              <div className={`order-detail-name ${item.checked ? 'checked-off' : ''}`}>
                {item.name}
              </div>
              <div className="order-detail-qty">x{item.qty}</div>
              <div className="order-detail-price">£{(item.price ?? 0).toFixed(2)}</div>
            </div>
          )
        })}

        {order.notes && (
          <div className="order-notes">📝 {order.notes}</div>
        )}

        <div className="order-total-line">
          <span>Total</span>
          <span>£{(order.total ?? 0).toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
