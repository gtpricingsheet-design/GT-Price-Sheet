"use client";

import { useGTProduce } from "@/contexts/gt-produce-context";
import { PriceTable } from "./price-table";
import { EditorToolbar } from "./editor-toolbar";

export function MainContent() {
  const { activeSection, isAdmin } = useGTProduce();

  return (
    <main className="main-content">
      {isAdmin && <EditorToolbar />}
      
      <div className="tables-container">
        {(activeSection === "both" || activeSection === "fruit") && (
          <PriceTable type="fruit" />
        )}
        {(activeSection === "both" || activeSection === "veg") && (
          <PriceTable type="veg" />
        )}
      </div>
    </main>
  );
}
