"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type GodModeContextType = {
  isGodMode: boolean;
  toggleGodMode: () => void;
};

const GodModeContext = createContext<GodModeContextType | undefined>(undefined);

export function GodModeProvider({ children }: { children: React.ReactNode }) {
  const [isGodMode, setIsGodMode] = useState(false);

  useEffect(() => {
    // God Mode ඔන් වුනාම body එකට class එකක් දානවා
    if (isGodMode) {
      document.body.classList.add("god-mode");
    } else {
      document.body.classList.remove("god-mode");
    }
  }, [isGodMode]);

  const toggleGodMode = () => setIsGodMode(!isGodMode);

  return (
    <GodModeContext.Provider value={{ isGodMode, toggleGodMode }}>
      {children}
    </GodModeContext.Provider>
  );
}

export function useGodMode() {
  const context = useContext(GodModeContext);
  if (!context) throw new Error("useGodMode must be used within a GodModeProvider");
  return context;
}