"use client"

import { GTProduceProvider } from "@/contexts/gt-produce-context"
import { GTProduceApp } from "@/components/gt-produce/gt-produce-app"

// GT Produce - Price Sheet Application v4
// Force fresh module load - no cart, no MainContent, no ProduceApp

export default function HomePage() {
  return (
    <GTProduceProvider>
      <GTProduceApp />
    </GTProduceProvider>
  )
}
