"use client";

import { useDevMode } from "@/components/DevModeContext";

export default function Home() {
  const { isGodMode, toggleGodMode } = useDevMode();

  return (
    <main 

    className={`flex min-h-screen flex-col items-center justify-center gap-6 p-4 transition-all duration-700 ease-in-out ${
        isGodMode ? "bg-black" : "bg-slate-900"
      }`}
    >
      
      <div className="relative z-10 text-center">
        <h1 
          className={`text-4xl md:text-6xl font-bold mb-4 transition-all duration-500 ${
            isGodMode 
              ? "font-mono text-green-500 drop-shadow-[0_0_10px_rgba(0,255,65,0.8)]" 
              : "font-sans text-slate-100"
          }`}
        >
          {isGodMode ? "SYSTEM_ROOT_ACCESS_GRANTED" : "Hesith Dashan"}
        </h1>

        <p 
          className={`text-xl transition-all duration-500 ${
            isGodMode 
              ? "font-mono text-green-400/80 tracking-widest" 
              : "font-sans text-slate-400 font-medium"
          }`}
        >
          {isGodMode 
            ? "> Initializing protocol... Target acquired." 
            : "Fullstack Engineer | UI/UX Enthusiast"}
        </p>
      </div>

      <button
        onClick={toggleGodMode}
        className={`
          relative mt-8 px-8 py-3 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-300 transform hover:scale-105 active:scale-95 border-2
          ${isGodMode 
            ? "border-green-500 text-green-500 hover:bg-green-500 hover:text-black shadow-[0_0_20px_rgba(0,255,65,0.4)] font-mono" 
            : "border-slate-600 text-slate-300 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-100 shadow-lg font-sans"
          }
        `}
      >
        {isGodMode ? "[ DISABLE_GOD_MODE ]" : "Enable God Mode"}
      </button>

      {isGodMode && (
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06)_1px,transparent_1px),linear-gradient(rgba(255,0,0,0.06)_1px,transparent_1px)] bg-[length:100%_2px,20px_20px,20px_20px] opacity-20"></div>
      )}

    </main>
  );
}