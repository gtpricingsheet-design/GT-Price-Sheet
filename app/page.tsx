"use client"

import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    window.location.href = '/index.html'
  }, [])
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <p>Loading GT Produce...</p>
    </div>
  )
}
