"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import MatrixRain from './MatrixRain';

interface DevModeContextType {
  isDevMode: boolean;
  toggleDevMode: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DevModeContext = createContext<DevModeContextType | undefined>(undefined);

export const DevModeProvider = ({ children }: { children: ReactNode }) => {
  const [isDevMode, setIsDevMode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Standard Dark Mode

  // God Mode Toggle
  const toggleDevMode = () => {
    setIsDevMode((prev) => !prev);
  };

  // Standard Dark Mode Toggle
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Dark Mode එක HTML එකට add කරනවා
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <DevModeContext.Provider value={{ isDevMode, toggleDevMode, isDarkMode, toggleDarkMode }}>
      <div className={`min-h-screen transition-all duration-500 ease-in-out relative ${
        isDevMode 
          ? "font-mono bg-black text-green-400 border-[10px] border-green-900 overflow-x-hidden" 
          : isDarkMode
            ? "font-sans bg-gray-950 text-white" // Standard Dark Mode Colors
            : "font-sans bg-gray-50 text-gray-900" // Light Mode Colors
      }`}>
        
        {/* GOD MODE: Matrix Rain */}
        {isDevMode && <MatrixRain />}

        {/* NORMAL MODES: Animated Background Blobs (Empty ගතිය යවන්න) */}
        {!isDevMode && (
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
             <div className={`absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob 
               ${isDarkMode ? 'bg-purple-900' : 'bg-purple-300'}`}></div>
             <div className={`absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 
               ${isDarkMode ? 'bg-blue-900' : 'bg-yellow-300'}`}></div>
             <div className={`absolute bottom-[-20%] left-[20%] w-[40vw] h-[40vw] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 
               ${isDarkMode ? 'bg-indigo-900' : 'bg-pink-300'}`}></div>
          </div>
        )}

        {/* Content Layer */}
        <div className="relative z-10">
            {children}
        </div>
        
        {/* Buttons Container */}
        <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4 items-end">
          
          {/* 1. Theme Toggle Button (Light/Dark) - God Mode නැති වෙලාවට විතරයි පේන්නේ */}
          {!isDevMode && (
            <button
              onClick={toggleDarkMode}
              className={`p-4 rounded-full shadow-xl transition-all hover:scale-110 ${
                isDarkMode ? "bg-white text-black" : "bg-gray-900 text-white"
              }`}
            >
              {isDarkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          )}

          {/* 2. God Mode Switch */}
          <button
            onClick={toggleDevMode}
            className={`px-6 py-3 font-bold rounded-full shadow-2xl transition-all border-2 ${
              isDevMode 
              ? "bg-red-600 text-white border-red-400 hover:scale-110 animate-pulse" 
              : "bg-black text-white border-transparent hover:scale-110"
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
  if (!context) {
    throw new Error("useDevMode must be used within a DevModeProvider");
  }
  return context;
};