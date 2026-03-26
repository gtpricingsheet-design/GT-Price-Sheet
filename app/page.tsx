"use client";

import { GTProduceProvider } from "@/contexts/gt-produce-context";
import { GTProduceApp } from "@/components/gt-produce";

export default function Home() {
  return (
    <GTProduceProvider>
      <GTProduceApp />
    </GTProduceProvider>
  );
}
