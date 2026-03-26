"use client";

import { useGTProduce } from "@/contexts/gt-produce-context";
import { PriceTable } from "./price-table";
import { EditorToolbar } from "./editor-toolbar";

export function MainContent() {
  const { currentSection, editorUnlocked } = useGTProduce();

  // Only show content when a section is selected
  if (!currentSection) return null;

  return (
    <main className="main-content">
      {editorUnlocked && <EditorToolbar />}
      
      <div className="tables-container">
        {currentSection === "fruit" && <PriceTable type="fruit" />}
        {currentSection === "veg" && <PriceTable type="veg" />}
      </div>
    </main>
  );
}
