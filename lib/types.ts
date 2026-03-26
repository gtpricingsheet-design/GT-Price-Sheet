// GT Produce - Type Definitions

export interface ProduceItem {
  name: string
  price: number
  available: boolean
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

export interface OrderItem {
  name: string
  qty: number
  price: string
  section?: string
  checked?: boolean
  lineTotal?: number
}

export interface Order {
  id: string
  customerName: string
  salesPerson: string
  deliveryType: 'collection' | 'delivery'
  items: OrderItem[]
  total: number
  status: 'uncompleted' | 'pending' | 'completed'
  timestamp: number | string
  section: 'fruit' | 'veg'
  notes?: string
}

export interface BasketItem {
  name: string
  price: number
  qty: number
  section: 'fruit' | 'veg'
}

export interface Basket {
  [key: string]: BasketItem
}

export type Section = 'fruit' | 'veg'
export type DashFilter = 'active' | 'all' | 'completed'
export type DeliveryMethod = 'collection' | 'delivery'
