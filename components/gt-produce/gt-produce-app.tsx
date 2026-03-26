"use client"
// Version 3 - GTProduceApp main component

import { useState, useCallback } from 'react'
import { useGTProduce } from '@/contexts/gt-produce-context'
import {
  Toolbar,
  Header,
  SearchBar,
  SectionChooser,
  PriceTable,
  OrderFAB,
  LoadingScreen,
  Toast,
  ConfirmDialog,
  PinOverlay,
  NameModal,
  SalesNameModal,
  OrderOverlay,
  CheckoutOverlay,
  ConfirmationOverlay,
  DashboardOverlay
} from './index'

export function GTProduceApp() {
  const {
    isLoading,
    currentSection,
    DATA,
    editorUnlocked
  } = useGTProduce()

  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      
      <div className={`app-container ${editorUnlocked ? '' : 'view-mode'}`}>
        {currentSection === null ? (
          <SectionChooser />
        ) : (
          <>
            <Toolbar />
            
            <div className="page">
              <Header />
              
              <SearchBar onSearch={handleSearch} />
              
              <div id="categories">
                {DATA.map((category, index) => (
                  <PriceTable
                    key={category.id || index}
                    category={category}
                    categoryIndex={index}
                    searchQuery={searchQuery}
                  />
                ))}
              </div>
              
              <footer className="site-footer">
                <p className="footer-brand">GT Produce</p>
                <p>Prices subject to daily market availability. All prices exclude VAT.</p>
              </footer>
            </div>
            
            {/* Order FAB - Request Quote button */}
            <OrderFAB />
          </>
        )}
      </div>

      {/* Overlays and Modals */}
      <PinOverlay />
      <NameModal />
      <SalesNameModal />
      <OrderOverlay />
      <CheckoutOverlay />
      <ConfirmationOverlay />
      <DashboardOverlay />
      <ConfirmDialog />
      <Toast />
    </>
  )
}
