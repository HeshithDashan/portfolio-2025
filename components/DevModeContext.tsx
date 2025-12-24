"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

// Context Type එක නිර්වචනය කිරීම
type DevModeContextType = {
  isGodMode: boolean;
  toggleGodMode: () => void;
};

const DevModeContext = createContext<DevModeContextType | undefined>(undefined);

export const DevModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isGodMode, setIsGodMode] = useState(false);

  // 🔥 වැදගත්ම කොටස: මේකෙන් තමයි CSS Class එක Body එකට දාන්නේ
  useEffect(() => {
    if (isGodMode) {
      document.body.classList.add('god-mode'); // God Mode ON වුනාම class එක දානවා
    } else {
      document.body.classList.remove('god-mode'); // OFF වුනාම අයින් කරනවා
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