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
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDevMode = () => {
    setIsDevMode((prev) => !prev);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

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
            ? "font-sans bg-[#0a0a0a] text-white" 
            : "font-sans bg-white text-black" // ✅ Light Mode: සම්පූර්ණ සුදු, අකුරු කළු
      }`}>
        
        {/* GOD MODE */}
        {isDevMode && <MatrixRain />}

        {/* NORMAL MODE: Very Subtle Professional Blobs */}
        {!isDevMode && (
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
             {/* Opacity එක ගොඩක් අඩු කරා (20-30%), එතකොට අකුරු යට වෙන්නේ නෑ */}
             <div className={`absolute w-full h-full ${isDarkMode ? 'opacity-30' : 'opacity-30'}`}>
               
               {/* 1. Gray/Blue Blob */}
               <div className={`absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full filter blur-[100px] animate-blob 
                 ${isDarkMode ? 'bg-blue-900' : 'bg-slate-300'}`}></div>
               
               {/* 2. Light Blue Blob */}
               <div className={`absolute top-[20%] right-[-20%] w-[50vw] h-[50vw] rounded-full filter blur-[100px] animate-blob animation-delay-2000 
                 ${isDarkMode ? 'bg-indigo-900' : 'bg-blue-200'}`}></div>
               
               {/* 3. Bottom Gray Blob */}
               <div className={`absolute bottom-[-20%] left-[10%] w-[50vw] h-[50vw] rounded-full filter blur-[100px] animate-blob animation-delay-4000 
                 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
             </div>
          </div>
        )}

        {/* Content Layer */}
        <div className="relative z-10">
            {children}
        </div>
        
        {/* Buttons */}
        <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4 items-end">
          {!isDevMode && (
            <button
              onClick={toggleDarkMode}
              className={`p-4 rounded-full shadow-xl transition-all hover:scale-110 border-2 ${
                isDarkMode 
                ? "bg-gray-800 text-yellow-400 border-gray-700" 
                : "bg-white text-black border-gray-300"
              }`}
            >
              {isDarkMode ? "🌙" : "☀️"}
            </button>
          )}

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