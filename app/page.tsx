"use client"

import { GTProduceProvider } from "@/contexts/gt-produce-context"
import { GTProduceApp } from "@/components/gt-produce/gt-produce-app"

// GT Produce - Price Sheet Application v3
// Force fresh module load

export default function HomePage() {
  return (
    <GTProduceProvider>
      <GTProduceApp />
    </GTProduceProvider>
  )
}
