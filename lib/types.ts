// GT Produce - Type Definitions
// Matches exactly the data structures in the original HTML

export interface ProduceItem {
  name: string
  price: number
  available: boolean
  checked?: boolean // Used in orders
}

export interface SubSection {
  label: string
  items: ProduceItem[]
}

export interface Category {
  id: string
  icon: string
  name: string
  color: string
  items?: ProduceItem[]
  subSections?: SubSection[]
}

export interface BasketItem {
  name: string
  price: number
  qty: number
  section: 'fruit' | 'veg'
}

export type Basket = Record<string, BasketItem>

export interface OrderItem {
  name: string
  price: number
  qty: number
  section?: 'fruit' | 'veg'
  checked?: boolean
}

export interface Order {
  id: string
  customerName: string
  items: OrderItem[]
  total: number
  status: 'uncompleted' | 'pending' | 'completed'
  timestamp: number | string
  deliveryType?: 'collection' | 'delivery'
  deliveryMethod?: 'collection' | 'delivery'
  notes?: string
  claimedBy?: string
}

export type Section = 'fruit' | 'veg' | null
export type PinMode = 'client' | 'admin' | 'editor'
export type DashFilter = 'active' | 'all' | 'completed'
export type DeliveryMethod = 'collection' | 'delivery'
export type Theme = 'light' | 'dark'
