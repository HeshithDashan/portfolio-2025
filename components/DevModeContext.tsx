"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface DevModeContextType {
  isDevMode: boolean;
  toggleDevMode: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DevModeContext = createContext<DevModeContextType | undefined>(undefined);

export const DevModeProvider = ({ children }: { children: ReactNode }) => {
  const [isDevMode, setIsDevMode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDevMode = () => setIsDevMode((prev) => !prev);
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <DevModeContext.Provider value={{ isDevMode, toggleDevMode, isDarkMode, toggleDarkMode }}>
      <div className={`min-h-screen transition-all duration-300 ${
        isDevMode 
          ? "bg-black text-green-400 font-mono border-8 border-green-900" 
          : isDarkMode
            ? "bg-gray-950 text-white font-sans" 
            : "bg-white text-black font-sans" 
      }`}>
        
        <div className="relative z-10 p-4">
            {children}
        </div>

        <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4 items-end">

          {!isDevMode && (
            <button
              onClick={toggleDarkMode}
              className="px-4 py-2 rounded-full shadow-lg border border-gray-300 bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600 hover:scale-105 transition"
            >
              {isDarkMode ? "🌙 Dark" : "☀️ Light"}
            </button>
          )}

          <button
            onClick={toggleDevMode}
            className={`px-6 py-3 font-bold rounded-full shadow-xl border-2 transition hover:scale-105 ${
              isDevMode 
              ? "bg-red-600 text-white border-red-500 animate-pulse" 
              : "bg-black text-white border-transparent"
            }`}
          >
            {isDevMode ? "⚠️ EXIT GOD MODE" : "🚀 ENTER GOD MODE"}
          </button>
        </div>

      </div>
    </DevModeContext.Provider>
  );
};

export const useDevMode = () => {
  const context = useContext(DevModeContext);
  if (!context) throw new Error("useDevMode must be used within a DevModeProvider");
  return context;
};