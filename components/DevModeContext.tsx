"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

type DevModeContextType = {
  isGodMode: boolean;
  toggleGodMode: () => void;
};

const DevModeContext = createContext<DevModeContextType | undefined>(undefined);

export const DevModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isGodMode, setIsGodMode] = useState(false);

  useEffect(() => {
    if (isGodMode) {
      document.body.classList.add('god-mode'); 
    } else {
      document.body.classList.remove('god-mode'); 
    }
  }, [isGodMode]);

  const toggleGodMode = () => {
    setIsGodMode((prev) => !prev);
  };

  return (
    <DevModeContext.Provider value={{ isGodMode, toggleGodMode }}>
      {children}
    </DevModeContext.Provider>
  );
};

export const useDevMode = () => {
  const context = useContext(DevModeContext);
  if (!context) {
    throw new Error('useDevMode must be used within a DevModeProvider');
  }
  return context;
};