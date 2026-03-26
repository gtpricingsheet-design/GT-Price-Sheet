"use client";

// GT Produce - Price Sheet Application
import { GTProduceProvider } from "@/contexts/gt-produce-context";
import { GTProduceApp } from "@/components/gt-produce/gt-produce-app";

export default function Home() {
  return (
    <GTProduceProvider>
      <GTProduceApp />
    </GTProduceProvider>
  );
}
