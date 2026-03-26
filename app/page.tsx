import { GTProduceProvider } from "@/contexts/gt-produce-context"
import { GTProduceApp } from "@/components/gt-produce/gt-produce-app"

// GT Produce - Price Sheet Application
// Updated: Fresh component tree

export default function Home() {
  return (
    <GTProduceProvider>
      <GTProduceApp />
    </GTProduceProvider>
  )
}
