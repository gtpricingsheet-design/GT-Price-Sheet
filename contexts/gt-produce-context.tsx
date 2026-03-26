"use client"

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import type { Category, Order, Basket, Section, DashFilter, DeliveryMethod } from '@/lib/types'
import { DEFAULT_FRUIT, DEFAULT_VEG } from '@/lib/default-data'
import { 
  getFirebaseDatabase, 
  getFirebaseAuth,
  ref, 
  onValue, 
  set,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut
} from '@/lib/firebase'

interface GTProduceContextType {
  // Data
  fruitData: Category[]
  vegData: Category[]
  orders: Record<string, Order>
  
  // Current view
  currentSection: Section | null
  setCurrentSection: (section: Section | null) => void
  
  // Auth state
  editorUnlocked: boolean
  salesmanName: string
  setSalesmanName: (name: string) => void
  
  // Client state
  clientName: string
  setClientName: (name: string) => void
  basket: Basket
  setBasket: (basket: Basket) => void
  deliveryMethod: DeliveryMethod
  setDeliveryMethod: (method: DeliveryMethod) => void
  
  // Dashboard
  dashFilter: DashFilter
  setDashFilter: (filter: DashFilter) => void
  
  // Theme
  theme: 'light' | 'dark'
  toggleTheme: () => void
  
  // Firebase operations
  isOnline: boolean
  syncToFirebase: () => void
  updateFruitData: (data: Category[]) => void
  updateVegData: (data: Category[]) => void
  updateOrder: (orderId: string, order: Partial<Order>) => void
  createOrder: (order: Order) => void
  deleteOrder: (orderId: string) => void
  
  // Auth operations
  loginAsAdmin: (password: string) => Promise<boolean>
  loginAsCustomer: (pin: string) => Promise<boolean>
  logout: () => void
}

const GTProduceContext = createContext<GTProduceContextType | undefined>(undefined)

const PIN_MAX_ATTEMPTS = 5
const PIN_LOCKOUT_MS = 30000
const IDLE_TIMEOUT_MS = 20 * 60 * 1000 // 20 minutes

export function GTProduceProvider({ children }: { children: ReactNode }) {
  // Data state
  const [fruitData, setFruitData] = useState<Category[]>(DEFAULT_FRUIT)
  const [vegData, setVegData] = useState<Category[]>(DEFAULT_VEG)
  const [orders, setOrders] = useState<Record<string, Order>>({})
  
  // View state
  const [currentSection, setCurrentSection] = useState<Section | null>(null)
  
  // Auth state
  const [editorUnlocked, setEditorUnlocked] = useState(false)
  const [salesmanName, setSalesmanName] = useState('')
  const [failCount, setFailCount] = useState(0)
  const [lockUntil, setLockUntil] = useState(0)
  
  // Client state
  const [clientName, setClientName] = useState('')
  const [basket, setBasket] = useState<Basket>({})
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('collection')
  
  // Dashboard state
  const [dashFilter, setDashFilter] = useState<DashFilter>('active')
  
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  
  // Connection state
  const [isOnline, setIsOnline] = useState(true)
  
  // Idle timer
  const [idleTimer, setIdleTimer] = useState<NodeJS.Timeout | null>(null)
  
  // Initialize theme
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const stored = localStorage.getItem('gt-theme')
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored)
      document.documentElement.setAttribute('data-theme', stored)
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light')
    }
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('gt-theme')) {
        setTheme(e.matches ? 'dark' : 'light')
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light')
      }
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])
  
  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('gt-theme', newTheme)
  }, [theme])
  
  // Initialize Firebase and subscribe to data
  useEffect(() => {
    const db = getFirebaseDatabase()
    const auth = getFirebaseAuth()
    
    if (!db || !auth) return
    
    // Sign in anonymously
    signInAnonymously(auth).catch(console.error)
    
    // Subscribe to fruit data
    const fruitRef = ref(db, 'FRUIT_DATA')
    const unsubFruit = onValue(fruitRef, (snapshot) => {
      const data = snapshot.val()
      if (data && Array.isArray(data)) {
        setFruitData(data)
      }
    })
    
    // Subscribe to veg data
    const vegRef = ref(db, 'VEG_DATA')
    const unsubVeg = onValue(vegRef, (snapshot) => {
      const data = snapshot.val()
      if (data && Array.isArray(data)) {
        setVegData(data)
      }
    })
    
    // Subscribe to orders
    const ordersRef = ref(db, 'ORDERS')
    const unsubOrders = onValue(ordersRef, (snapshot) => {
      const data = snapshot.val()
      if (data && typeof data === 'object') {
        setOrders(data)
      }
    })
    
    // Subscribe to connection state
    const connRef = ref(db, '.info/connected')
    const unsubConn = onValue(connRef, (snapshot) => {
      setIsOnline(snapshot.val() === true)
    })
    
    return () => {
      unsubFruit()
      unsubVeg()
      unsubOrders()
      unsubConn()
    }
  }, [])
  
  // Idle timer management
  const startIdleTimer = useCallback(() => {
    if (idleTimer) clearTimeout(idleTimer)
    
    const timer = setTimeout(() => {
      if (editorUnlocked) {
        logout()
      }
    }, IDLE_TIMEOUT_MS)
    
    setIdleTimer(timer)
  }, [editorUnlocked, idleTimer])
  
  const resetIdleTimer = useCallback(() => {
    if (editorUnlocked) {
      startIdleTimer()
    }
  }, [editorUnlocked, startIdleTimer])
  
  useEffect(() => {
    if (!editorUnlocked) return
    
    const events = ['click', 'keydown', 'mousemove', 'touchstart', 'scroll']
    events.forEach(event => {
      document.addEventListener(event, resetIdleTimer, { passive: true })
    })
    
    startIdleTimer()
    
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, resetIdleTimer)
      })
      if (idleTimer) clearTimeout(idleTimer)
    }
  }, [editorUnlocked, resetIdleTimer, startIdleTimer, idleTimer])
  
  // Firebase operations
  const syncToFirebase = useCallback(() => {
    const db = getFirebaseDatabase()
    if (!db || !editorUnlocked) return
    
    if (currentSection === 'fruit') {
      set(ref(db, 'FRUIT_DATA'), fruitData).catch(console.error)
    } else if (currentSection === 'veg') {
      set(ref(db, 'VEG_DATA'), vegData).catch(console.error)
    }
  }, [currentSection, fruitData, vegData, editorUnlocked])
  
  const updateFruitData = useCallback((data: Category[]) => {
    setFruitData(data)
    const db = getFirebaseDatabase()
    if (db && editorUnlocked) {
      set(ref(db, 'FRUIT_DATA'), data).catch(console.error)
    }
  }, [editorUnlocked])
  
  const updateVegData = useCallback((data: Category[]) => {
    setVegData(data)
    const db = getFirebaseDatabase()
    if (db && editorUnlocked) {
      set(ref(db, 'VEG_DATA'), data).catch(console.error)
    }
  }, [editorUnlocked])
  
  const updateOrder = useCallback((orderId: string, orderUpdate: Partial<Order>) => {
    const db = getFirebaseDatabase()
    if (!db) return
    
    const existingOrder = orders[orderId]
    if (!existingOrder) return
    
    const updatedOrder = { ...existingOrder, ...orderUpdate }
    set(ref(db, `ORDERS/${orderId}`), updatedOrder).catch(console.error)
  }, [orders])
  
  const createOrder = useCallback((order: Order) => {
    const db = getFirebaseDatabase()
    if (!db) return
    
    set(ref(db, `ORDERS/${order.id}`), order).catch(console.error)
  }, [])
  
  const deleteOrder = useCallback((orderId: string) => {
    const db = getFirebaseDatabase()
    if (!db) return
    
    set(ref(db, `ORDERS/${orderId}`), null).catch(console.error)
  }, [])
  
  // Auth operations
  const loginAsAdmin = useCallback(async (password: string): Promise<boolean> => {
    if (Date.now() < lockUntil) {
      return false
    }
    
    const auth = getFirebaseAuth()
    if (!auth) return false
    
    try {
      await signInWithEmailAndPassword(auth, 'admin@gtproduce.co.uk', password)
      setFailCount(0)
      setEditorUnlocked(true)
      startIdleTimer()
      return true
    } catch {
      const newFailCount = failCount + 1
      setFailCount(newFailCount)
      
      if (newFailCount >= PIN_MAX_ATTEMPTS) {
        setLockUntil(Date.now() + PIN_LOCKOUT_MS)
        setFailCount(0)
      }
      
      return false
    }
  }, [failCount, lockUntil, startIdleTimer])
  
  const loginAsCustomer = useCallback(async (pin: string): Promise<boolean> => {
    if (Date.now() < lockUntil) {
      return false
    }
    
    const auth = getFirebaseAuth()
    if (!auth) return false
    
    try {
      await signInWithEmailAndPassword(auth, 'customer@gtproduce.co.uk', pin)
      setFailCount(0)
      return true
    } catch {
      const newFailCount = failCount + 1
      setFailCount(newFailCount)
      
      if (newFailCount >= PIN_MAX_ATTEMPTS) {
        setLockUntil(Date.now() + PIN_LOCKOUT_MS)
        setFailCount(0)
      }
      
      return false
    }
  }, [failCount, lockUntil])
  
  const logout = useCallback(() => {
    const auth = getFirebaseAuth()
    if (!auth) return
    
    signOut(auth).then(() => {
      signInAnonymously(auth).catch(() => {})
    }).catch(() => {
      signInAnonymously(auth).catch(() => {})
    })
    
    setEditorUnlocked(false)
    setSalesmanName('')
    if (idleTimer) clearTimeout(idleTimer)
  }, [idleTimer])
  
  const value: GTProduceContextType = {
    fruitData,
    vegData,
    orders,
    currentSection,
    setCurrentSection,
    editorUnlocked,
    salesmanName,
    setSalesmanName,
    clientName,
    setClientName,
    basket,
    setBasket,
    deliveryMethod,
    setDeliveryMethod,
    dashFilter,
    setDashFilter,
    theme,
    toggleTheme,
    isOnline,
    syncToFirebase,
    updateFruitData,
    updateVegData,
    updateOrder,
    createOrder,
    deleteOrder,
    loginAsAdmin,
    loginAsCustomer,
    logout
  }
  
  return (
    <GTProduceContext.Provider value={value}>
      {children}
    </GTProduceContext.Provider>
  )
}

export function useGTProduce() {
  const context = useContext(GTProduceContext)
  if (context === undefined) {
    throw new Error('useGTProduce must be used within a GTProduceProvider')
  }
  return context
}
