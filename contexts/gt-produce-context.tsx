"use client"

// GT Produce - Main Application Context
// Variable names match exactly the original HTML JavaScript

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { ref, onValue, set, update, remove } from 'firebase/database'
import { signInAnonymously, signInWithEmailAndPassword, signOut, onAuthStateChanged, type User } from 'firebase/auth'
import { initFirebase, getFirebaseDb, getFirebaseAuth } from '@/lib/firebase'
import { DEFAULT_FRUIT, DEFAULT_VEG } from '@/lib/default-data'
import type { Category, Order, Basket, Section, PinMode, DashFilter, DeliveryMethod, Theme, ProduceItem } from '@/lib/types'

// Security constants from original
const PIN_MAX_ATTEMPTS = 5
const PIN_LOCKOUT_MS = 30000
const IDLE_TIMEOUT_MS = 20 * 60 * 1000 // 20 minutes

interface GTProduceContextType {
  // Loading
  isLoading: boolean
  
  // Data - matches original variable names exactly
  FRUIT_DATA: Category[]
  VEG_DATA: Category[]
  DATA: Category[]
  ORDERS: Record<string, Order>
  activeOrdersCount: number
  
  // Section state
  currentSection: Section
  setCurrentSection: (s: Section) => void
  chooseSection: (s: 'fruit' | 'veg') => void
  goBackToChooser: () => void
  
  // Auth state - matches original
  editorUnlocked: boolean
  pinMode: PinMode
  clientName: string
  setClientName: (name: string) => void
  salesmanName: string
  setSalesmanName: (name: string) => void
  
  // PIN/Auth
  pinCode: string
  setPinCode: (code: string) => void
  failCount: number
  lockUntil: number
  openPinPad: (mode: PinMode) => void
  closePinPad: () => void
  pinDigit: (d: string) => void
  pinBackspace: () => void
  adminPassSubmit: (password: string) => Promise<boolean>
  lockAdmin: () => void
  
  // Basket/Order flow
  basket: Basket
  setBasket: (b: Basket) => void
  deliveryMethod: DeliveryMethod
  setDeliveryMethod: (m: DeliveryMethod) => void
  orderBrowseSection: 'fruit' | 'veg'
  setOrderBrowseSection: (s: 'fruit' | 'veg') => void
  changeQty: (key: string, name: string, price: number, delta: number, section: 'fruit' | 'veg') => void
  submitOrder: (notes: string) => Promise<void>
  startOrderFlow: () => void
  
  // Dashboard
  dashboardOpen: boolean
  setDashboardOpen: (open: boolean) => void
  dashFilter: DashFilter
  setDashFilter: (f: DashFilter) => void
  updateOrderStatus: (orderId: string, status: 'uncompleted' | 'pending' | 'completed') => void
  deleteOrder: (orderId: string) => void
  toggleItemCheck: (orderId: string, itemIdx: number) => void
  
  // Theme
  theme: Theme
  toggleTheme: () => void
  
  // Connection
  isConnected: boolean
  
  // Data operations
  updateItem: (catIdx: number, itemIdx: number, field: 'name' | 'price' | 'available', value: string | number | boolean, subIdx?: number) => void
  addItem: (catIdx: number) => void
  deleteItem: (catIdx: number, itemIdx: number, subIdx?: number) => void
  addCategory: () => void
  deleteCategory: (catIdx: number) => void
  updateCategory: (catIdx: number, field: 'icon' | 'name' | 'color', value: string) => void
  syncToFirebase: () => void
  
  // UI state
  showPinOverlay: boolean
  showNameModal: boolean
  setShowNameModal: (show: boolean) => void
  showSalesNameModal: boolean
  setShowSalesNameModal: (show: boolean) => void
  showCheckout: boolean
  setShowCheckout: (show: boolean) => void
  showConfirmation: boolean
  setShowConfirmation: (show: boolean) => void
  showOrderOverlay: boolean
  setShowOrderOverlay: (show: boolean) => void
  showCatEditor: boolean
  setShowCatEditor: (show: boolean) => void
  
  // Toast
  showToast: (msg: string, type: 'success' | 'error') => void
  toastMessage: string
  toastType: 'success' | 'error'
  toastVisible: boolean
  
  // Confirm dialog
  showConfirmDialog: (msg: string, onConfirm: () => void) => void
  confirmMessage: string
  confirmCallback: (() => void) | null
  confirmDialogVisible: boolean
  closeConfirmDialog: () => void
  
  // Last order for confirmation
  lastOrderSummary: { fruitItems: any[], vegItems: any[], total: number } | null
  
  // Helpers
  getAllItems: (cat: Category) => ProduceItem[]
  countAll: () => number
}

const GTProduceContext = createContext<GTProduceContextType | null>(null)

export function GTProduceProvider({ children }: { children: ReactNode }) {
  // Loading
  const [isLoading, setIsLoading] = useState(true)
  
  // Data state - matches original variable names
  const [FRUIT_DATA, setFRUIT_DATA] = useState<Category[]>(DEFAULT_FRUIT)
  const [VEG_DATA, setVEG_DATA] = useState<Category[]>(DEFAULT_VEG)
  const [DATA, setDATA] = useState<Category[]>([])
  const [ORDERS, setORDERS] = useState<Record<string, Order>>({})
  
  // Computed: active orders count
  const activeOrdersCount = Object.values(ORDERS).filter(
    o => o.status === 'pending' || o.status === 'confirmed'
  ).length
  
  // Section state
  const [currentSection, setCurrentSection] = useState<Section>(null)
  
  // Auth state
  const [editorUnlocked, setEditorUnlocked] = useState(false)
  const [pinMode, setPinMode] = useState<PinMode>('client')
  const [clientName, setClientName] = useState('')
  const [salesmanName, setSalesmanName] = useState('')
  const [pinCode, setPinCode] = useState('')
  const [failCount, setFailCount] = useState(0)
  const [lockUntil, setLockUntil] = useState(0)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  
  // Basket/Order
  const [basket, setBasket] = useState<Basket>({})
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('collection')
  const [orderBrowseSection, setOrderBrowseSection] = useState<'fruit' | 'veg'>('fruit')
  
  // Dashboard
  const [dashboardOpen, setDashboardOpen] = useState(false)
  const [dashFilter, setDashFilter] = useState<DashFilter>('active')
  
  // Theme
  const [theme, setTheme] = useState<Theme>('light')
  
  // Connection
  const [isConnected, setIsConnected] = useState(false)
  
  // UI state
  const [showPinOverlay, setShowPinOverlay] = useState(false)
  const [showNameModal, setShowNameModal] = useState(false)
  const [showSalesNameModal, setShowSalesNameModal] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showOrderOverlay, setShowOrderOverlay] = useState(false)
  const [showCatEditor, setShowCatEditor] = useState(false)
  
  // Toast
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')
  const [toastVisible, setToastVisible] = useState(false)
  
  // Confirm dialog
  const [confirmMessage, setConfirmMessage] = useState('')
  const [confirmCallback, setConfirmCallback] = useState<(() => void) | null>(null)
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false)
  
  // Last order
  const [lastOrderSummary, setLastOrderSummary] = useState<{ fruitItems: any[], vegItems: any[], total: number } | null>(null)
  
  // Idle timer
  const [idleTimer, setIdleTimer] = useState<NodeJS.Timeout | null>(null)
  
  // Sync timeout
  const [syncTimeout, setSyncTimeout] = useState<NodeJS.Timeout | null>(null)
  
  // Initialize theme
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('gt-theme')
      if (saved === 'dark' || saved === 'light') {
        setTheme(saved)
        document.documentElement.setAttribute('data-theme', saved)
      }
    }
  }, [])
  
  // Initialize Firebase
  useEffect(() => {
    initFirebase()
    const db = getFirebaseDb()
    const auth = getFirebaseAuth()
    
    if (!db || !auth) {
      setIsLoading(false)
      return
    }
    
    // Sign in anonymously first
    signInAnonymously(auth).then(() => {
      setIsLoading(false)
    }).catch(() => {
      setIsLoading(false)
    })
    
    // Listen for auth state changes
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      
      // Only listen to orders when admin
      if (user?.email === 'admin@gtproduce.co.uk') {
        const ordersRef = ref(db, 'orders')
        onValue(ordersRef, (snapshot) => {
          const val = snapshot.val()
          setORDERS(val || {})
        })
      } else {
        setORDERS({})
      }
    })
    
    // Listen for connection state
    const connRef = ref(db, '.info/connected')
    onValue(connRef, (snapshot) => {
      setIsConnected(snapshot.val() === true)
    })
    
    // Listen for fruit data
    const fruitRef = ref(db, 'pricing')
    onValue(fruitRef, (snapshot) => {
      const val = snapshot.val()
      if (val) {
        const data = val.categories || (Array.isArray(val) ? val : null)
        if (data) {
          setFRUIT_DATA(JSON.parse(JSON.stringify(data)))
        }
      } else {
        // Initialize with defaults
        set(fruitRef, { categories: DEFAULT_FRUIT })
      }
      setIsLoading(false)
    })
    
    // Listen for veg data
    const vegRef = ref(db, 'pricing_veg')
    onValue(vegRef, (snapshot) => {
      const val = snapshot.val()
      if (val) {
        const data = val.categories || (Array.isArray(val) ? val : null)
        if (data) {
          setVEG_DATA(JSON.parse(JSON.stringify(data)))
        }
      } else {
        // Initialize with defaults
        set(vegRef, { categories: DEFAULT_VEG })
      }
    })
    
    // Safety timeout
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 8000)
    
    return () => {
      clearTimeout(timeout)
      unsubAuth()
    }
  }, [])
  
  // Update DATA when section or data changes
  useEffect(() => {
    if (currentSection === 'fruit') {
      setDATA(FRUIT_DATA)
    } else if (currentSection === 'veg') {
      setDATA(VEG_DATA)
    }
  }, [currentSection, FRUIT_DATA, VEG_DATA])
  
  // Idle timer management
  const startIdleTimer = useCallback(() => {
    if (idleTimer) clearTimeout(idleTimer)
    const timer = setTimeout(() => {
      if (editorUnlocked) {
        lockAdmin()
        showToast('Session expired \u2014 re-enter code', 'error')
      }
    }, IDLE_TIMEOUT_MS)
    setIdleTimer(timer)
  }, [idleTimer, editorUnlocked])
  
  const resetIdleTimer = useCallback(() => {
    if (editorUnlocked) startIdleTimer()
  }, [editorUnlocked, startIdleTimer])
  
  // Toast function
  const showToast = useCallback((msg: string, type: 'success' | 'error') => {
    setToastMessage(msg)
    setToastType(type)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 2500)
  }, [])
  
  // Confirm dialog
  const showConfirmDialog = useCallback((msg: string, onConfirm: () => void) => {
    setConfirmMessage(msg)
    setConfirmCallback(() => onConfirm)
    setConfirmDialogVisible(true)
  }, [])
  
  const closeConfirmDialog = useCallback(() => {
    setConfirmDialogVisible(false)
    setConfirmCallback(null)
  }, [])
  
  // Theme toggle
  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('gt-theme', newTheme)
  }, [theme])
  
  // Section chooser
  const chooseSection = useCallback((s: 'fruit' | 'veg') => {
    setCurrentSection(s)
    setDATA(s === 'veg' ? VEG_DATA : FRUIT_DATA)
  }, [FRUIT_DATA, VEG_DATA])
  
  const goBackToChooser = useCallback(() => {
    setCurrentSection(null)
  }, [])
  
  // PIN functions
  const openPinPad = useCallback((mode: PinMode) => {
    setPinMode(mode)
    setPinCode('')
    setShowPinOverlay(true)
  }, [])
  
  const closePinPad = useCallback(() => {
    setShowPinOverlay(false)
    setPinCode('')
  }, [])
  
  const pinDigit = useCallback((d: string) => {
    if (pinMode !== 'client') return
    if (pinCode.length >= 6) return
    
    if (Date.now() < lockUntil) {
      const secs = Math.ceil((lockUntil - Date.now()) / 1000)
      showToast(`Too many attempts. Wait ${secs}s`, 'error')
      return
    }
    
    const newCode = pinCode + d
    setPinCode(newCode)
    
    if (newCode.length === 6) {
      const auth = getFirebaseAuth()
      if (!auth) return
      
      setTimeout(() => {
        signInWithEmailAndPassword(auth, 'customer@gtproduce.co.uk', newCode)
          .then(() => {
            setFailCount(0)
            closePinPad()
            setShowNameModal(true)
          })
          .catch(() => {
            const newFailCount = failCount + 1
            setFailCount(newFailCount)
            if (newFailCount >= PIN_MAX_ATTEMPTS) {
              setLockUntil(Date.now() + PIN_LOCKOUT_MS)
              setFailCount(0)
              showToast('Too many attempts \u2014 locked for 30s', 'error')
            } else {
              showToast(`Incorrect code (${PIN_MAX_ATTEMPTS - newFailCount} left)`, 'error')
            }
            setPinCode('')
          })
      }, 80)
    }
  }, [pinMode, pinCode, lockUntil, failCount, closePinPad, showToast])
  
  const pinBackspace = useCallback(() => {
    if (pinMode !== 'client') return
    if (pinCode.length > 0) {
      setPinCode(pinCode.slice(0, -1))
    }
  }, [pinMode, pinCode])
  
  const adminPassSubmit = useCallback(async (password: string): Promise<boolean> => {
    const auth = getFirebaseAuth()
    if (!auth || !password) return false
    
    try {
      await signInWithEmailAndPassword(auth, 'admin@gtproduce.co.uk', password)
      setFailCount(0)
      closePinPad()
      setEditorUnlocked(true)
      startIdleTimer()
      setShowSalesNameModal(true)
      return true
    } catch {
      const newFailCount = failCount + 1
      setFailCount(newFailCount)
      if (newFailCount >= PIN_MAX_ATTEMPTS) {
        setLockUntil(Date.now() + PIN_LOCKOUT_MS)
        setFailCount(0)
        showToast('Too many attempts \u2014 locked for 30s', 'error')
      }
      return false
    }
  }, [failCount, closePinPad, startIdleTimer, showToast])
  
  const lockAdmin = useCallback(() => {
    const auth = getFirebaseAuth()
    if (auth) {
      signOut(auth).then(() => {
        signInAnonymously(auth).catch(() => {})
      }).catch(() => {
        signInAnonymously(auth).catch(() => {})
      })
    }
    setEditorUnlocked(false)
    setSalesmanName('')
    if (idleTimer) clearTimeout(idleTimer)
    setIdleTimer(null)
    setDashboardOpen(false)
    showToast('Locked', 'success')
  }, [idleTimer, showToast])
  
  // Basket functions
  const changeQty = useCallback((key: string, name: string, price: number, delta: number, section: 'fruit' | 'veg') => {
    setBasket(prev => {
      const newBasket = { ...prev }
      if (!newBasket[key]) {
        newBasket[key] = { name, price, qty: 0, section }
      }
      newBasket[key].qty = Math.max(0, newBasket[key].qty + delta)
      if (newBasket[key].qty === 0) {
        delete newBasket[key]
      }
      return newBasket
    })
  }, [])
  
  const submitOrder = useCallback(async (notes: string) => {
    const db = getFirebaseDb()
    if (!db) return
    
    const keys = Object.keys(basket)
    if (!keys.length) {
      showToast('Add items to your quote', 'error')
      return
    }
    
    const vegItems: any[] = []
    const fruitItems: any[] = []
    let total = 0
    
    keys.forEach(k => {
      const it = basket[k]
      const line = it.qty * it.price
      total += line
      const obj = { name: it.name, qty: it.qty, price: it.price, section: it.section }
      if (it.section === 'veg') vegItems.push(obj)
      else fruitItems.push(obj)
    })
    
    const orderId = 'order_' + Date.now()
    const order: Order = {
      id: orderId,
      customerName: clientName,
      items: [...fruitItems, ...vegItems],
      total,
      status: 'uncompleted',
      timestamp: Date.now(),
      deliveryType: deliveryMethod,
      notes: notes || undefined
    }
    
    const ordersRef = ref(db, `orders/${orderId}`)
    await set(ordersRef, order)
    
    setLastOrderSummary({ fruitItems, vegItems, total })
    setShowCheckout(false)
    setShowOrderOverlay(false)
    setShowConfirmation(true)
    setBasket({})
    showToast('Quote submitted', 'success')
  }, [basket, clientName, deliveryMethod, showToast])
  
  // Start order flow - matches original HTML logic
  const startOrderFlow = useCallback(() => {
    if (editorUnlocked) {
      setShowNameModal(true)
    } else {
      openPinPad('client')
    }
  }, [editorUnlocked, openPinPad])
  
  // Dashboard functions
  const updateOrderStatus = useCallback((orderId: string, status: 'uncompleted' | 'pending' | 'completed') => {
    const db = getFirebaseDb()
    if (!db) return
    const orderRef = ref(db, `orders/${orderId}`)
    update(orderRef, { status })
    showToast(`Status: ${status}`, 'success')
  }, [showToast])
  
  const deleteOrder = useCallback((orderId: string) => {
    const db = getFirebaseDb()
    if (!db) return
    const orderRef = ref(db, `orders/${orderId}`)
    remove(orderRef)
    showToast('Quote removed', 'success')
  }, [showToast])
  
  const toggleItemCheck = useCallback((orderId: string, itemIdx: number) => {
    const order = ORDERS[orderId]
    if (!order?.items?.[itemIdx]) return
    
    // Update locally for immediate feedback
    setORDERS(prev => {
      const newOrders = { ...prev }
      if (newOrders[orderId]?.items?.[itemIdx]) {
        newOrders[orderId].items[itemIdx].checked = !newOrders[orderId].items[itemIdx].checked
      }
      return newOrders
    })
  }, [ORDERS])
  
  // Data operations
  const getAllItems = useCallback((cat: Category): ProduceItem[] => {
    return cat.subSections 
      ? cat.subSections.flatMap(s => s.items)
      : (cat.items || [])
  }, [])
  
  const countAll = useCallback(() => {
    return DATA.reduce((sum, cat) => sum + getAllItems(cat).length, 0)
  }, [DATA, getAllItems])
  
  const syncToFirebase = useCallback(() => {
    if (syncTimeout) clearTimeout(syncTimeout)
    
    const timeout = setTimeout(() => {
      const db = getFirebaseDb()
      if (!db) return
      
      const dataRef = ref(db, currentSection === 'veg' ? 'pricing_veg' : 'pricing')
      set(dataRef, { categories: JSON.parse(JSON.stringify(DATA)) })
    }, 500)
    
    setSyncTimeout(timeout)
  }, [syncTimeout, currentSection, DATA])
  
  const updateItem = useCallback((catIdx: number, itemIdx: number, field: 'name' | 'price' | 'available', value: string | number | boolean, subIdx?: number) => {
    const updateData = (data: Category[]) => {
      const newData = [...data]
      const item = subIdx !== undefined 
        ? newData[catIdx].subSections?.[subIdx].items[itemIdx]
        : newData[catIdx].items?.[itemIdx]
      if (item) {
        (item as any)[field] = value
      }
      return newData
    }
    
    if (currentSection === 'fruit') {
      setFRUIT_DATA(prev => updateData(prev))
    } else if (currentSection === 'veg') {
      setVEG_DATA(prev => updateData(prev))
    }
    syncToFirebase()
  }, [currentSection, syncToFirebase])
  
  const addItem = useCallback((catIdx: number) => {
    const newItem: ProduceItem = { name: "New Product", price: 0, available: true }
    
    const updateData = (data: Category[]) => {
      const newData = [...data]
      const cat = newData[catIdx]
      if (cat.subSections) {
        cat.subSections[0].items.push(newItem)
      } else {
        if (!cat.items) cat.items = []
        cat.items.push(newItem)
      }
      return newData
    }
    
    if (currentSection === 'fruit') {
      setFRUIT_DATA(prev => updateData(prev))
    } else if (currentSection === 'veg') {
      setVEG_DATA(prev => updateData(prev))
    }
    syncToFirebase()
  }, [currentSection, syncToFirebase])
  
  const deleteItem = useCallback((catIdx: number, itemIdx: number, subIdx?: number) => {
    const updateData = (data: Category[]) => {
      const newData = [...data]
      if (subIdx !== undefined) {
        newData[catIdx].subSections?.[subIdx].items.splice(itemIdx, 1)
      } else {
        newData[catIdx].items?.splice(itemIdx, 1)
      }
      return newData
    }
    
    if (currentSection === 'fruit') {
      setFRUIT_DATA(prev => updateData(prev))
    } else if (currentSection === 'veg') {
      setVEG_DATA(prev => updateData(prev))
    }
    syncToFirebase()
  }, [currentSection, syncToFirebase])
  
  const addCategory = useCallback(() => {
    const newCat: Category = {
      id: 'cat_' + Date.now(),
      icon: '\uD83D\uDCE6',
      name: 'New Category',
      color: '#508c1a',
      items: []
    }
    
    if (currentSection === 'fruit') {
      setFRUIT_DATA(prev => [...prev, newCat])
    } else if (currentSection === 'veg') {
      setVEG_DATA(prev => [...prev, newCat])
    }
    syncToFirebase()
  }, [currentSection, syncToFirebase])
  
  const deleteCategory = useCallback((catIdx: number) => {
    if (currentSection === 'fruit') {
      setFRUIT_DATA(prev => prev.filter((_, i) => i !== catIdx))
    } else if (currentSection === 'veg') {
      setVEG_DATA(prev => prev.filter((_, i) => i !== catIdx))
    }
    syncToFirebase()
  }, [currentSection, syncToFirebase])
  
  const updateCategory = useCallback((catIdx: number, field: 'icon' | 'name' | 'color', value: string) => {
    const updateData = (data: Category[]) => {
      const newData = [...data]
      newData[catIdx][field] = value
      return newData
    }
    
    if (currentSection === 'fruit') {
      setFRUIT_DATA(prev => updateData(prev))
    } else if (currentSection === 'veg') {
      setVEG_DATA(prev => updateData(prev))
    }
    syncToFirebase()
  }, [currentSection, syncToFirebase])
  
  const value: GTProduceContextType = {
    isLoading,
    FRUIT_DATA,
    VEG_DATA,
    DATA,
    ORDERS,
    activeOrdersCount,
    currentSection,
    setCurrentSection,
    chooseSection,
    goBackToChooser,
    editorUnlocked,
    pinMode,
    clientName,
    setClientName,
    salesmanName,
    setSalesmanName,
    pinCode,
    setPinCode,
    failCount,
    lockUntil,
    openPinPad,
    closePinPad,
    pinDigit,
    pinBackspace,
    adminPassSubmit,
    lockAdmin,
    basket,
    setBasket,
    deliveryMethod,
    setDeliveryMethod,
    orderBrowseSection,
    setOrderBrowseSection,
    changeQty,
    submitOrder,
    startOrderFlow,
    dashboardOpen,
    setDashboardOpen,
    dashFilter,
    setDashFilter,
    updateOrderStatus,
    deleteOrder,
    toggleItemCheck,
    theme,
    toggleTheme,
    isConnected,
    updateItem,
    addItem,
    deleteItem,
    addCategory,
    deleteCategory,
    updateCategory,
    syncToFirebase,
    showPinOverlay,
    showNameModal,
    setShowNameModal,
    showSalesNameModal,
    setShowSalesNameModal,
    showCheckout,
    setShowCheckout,
    showConfirmation,
    setShowConfirmation,
    showOrderOverlay,
    setShowOrderOverlay,
    showCatEditor,
    setShowCatEditor,
    showToast,
    toastMessage,
    toastType,
    toastVisible,
    showConfirmDialog,
    confirmMessage,
    confirmCallback,
    confirmDialogVisible,
    closeConfirmDialog,
    lastOrderSummary,
    getAllItems,
    countAll,
  }
  
  return (
    <GTProduceContext.Provider value={value}>
      {children}
    </GTProduceContext.Provider>
  )
}

export function useGTProduce() {
  const context = useContext(GTProduceContext)
  if (!context) {
    throw new Error('useGTProduce must be used within GTProduceProvider')
  }
  return context
}
