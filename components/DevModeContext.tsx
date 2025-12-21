"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

// 1. Context Type එක
interface DevModeContextType {
  isDevMode: boolean;
  toggleDevMode: () => void;
}

const DevModeContext = createContext<DevModeContextType | undefined>(undefined);

// 2. Provider Logic
export const DevModeProvider = ({ children }: { children: ReactNode }) => {
  const [isDevMode, setIsDevMode] = useState(false);

  const toggleDevMode = () => {
    setIsDevMode((prev) => !prev);
  };

  return (
    <DevModeContext.Provider value={{ isDevMode, toggleDevMode }}>
      <div className={`min-h-screen transition-all duration-500 ease-in-out ${
        isDevMode 
          ? "font-mono bg-black text-green-400 border-[10px] border-green-900" 
          : "font-sans bg-white text-black"
      }`}>
        {children}
        
        {/* The Magic Button */}
        <button
          onClick={toggleDevMode}
          className={`fixed bottom-8 right-8 z-50 px-6 py-3 font-bold rounded-full shadow-2xl transition-all border-2 ${
            isDevMode 
            ? "bg-red-600 text-white border-red-400 hover:scale-110" 
            : "bg-black text-white border-transparent hover:scale-110"
          }`}
        >
          {isDevMode ? "⚠️ EXIT GOD MODE" : "🚀 ENTER GOD MODE"}
        </button>
      </div>
    </DevModeContext.Provider>
  );
};

// 3. Custom Hook
export const useDevMode = () => {
  const context = useContext(DevModeContext);
  if (!context) {
    throw new Error("useDevMode must be used within a DevModeProvider");
  }
  return context;
};