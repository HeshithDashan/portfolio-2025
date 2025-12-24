"use client";

import { useGodMode } from "@/components/GodModeContext";

export default function Home() {
  const { isGodMode, toggleGodMode } = useGodMode();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-5xl font-bold mb-4">Hesith Dashan</h1>
      <p className="text-xl opacity-80 mb-8">Fullstack Engineer</p>
      
      <button
        onClick={toggleGodMode}
        className={`px-8 py-3 rounded-full font-bold border-2 transition-all duration-300 ${
          isGodMode 
            ? "border-green-500 text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)] bg-black" 
            : "border-white text-white hover:bg-white hover:text-black"
        }`}
      >
        {isGodMode ? "DISABLE GOD MODE" : "ENABLE GOD MODE"}
      </button>
    </main>
  );
}