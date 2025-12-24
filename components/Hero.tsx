"use client"
import React from 'react';
import { useDevMode } from './DevModeContext';

export default function Hero() {

    const { isGodMode } = useDevMode();

  return (
    <section className="min-h-[80vh] flex flex-col justify-center items-center text-center p-5 relative z-10">
      
      {isGodMode ? (
        <div className="text-left space-y-4 max-w-3xl w-full font-mono">
          <p className="text-gray-500 text-sm">// Initializing Portfolio Protocol...</p>
          <div className="bg-black/80 p-6 rounded-lg border border-green-800 shadow-[0_0_20px_rgba(0,255,0,0.3)]">
            <p className="text-green-400 text-xl">
              <span className="text-purple-400">const</span> <span className="text-yellow-400">dev</span> = <span className="text-blue-400">{"{"}</span>
            </p>
            <div className="pl-8 text-green-300">
              <p>name: <span className="text-orange-400">"Heshith Dashan"</span>,</p>
              <p>role: <span className="text-orange-400">"Fullstack Engineer"</span>,</p>
              <p>status: <span className="text-red-400 animate-pulse">"Coding..."</span></p>
            </div>
            <p className="text-blue-400 text-xl">{"}"};</p>
          </div>
        </div>
      ) : (
      
        <div className="space-y-6">
           <div className="text-sm font-bold tracking-[0.2em] text-blue-600 uppercase">
             Software Engineering Student
           </div>
           
           {/* ✅ Light Mode = Black Text | Dark Mode = White Text */}
           <h1 className="text-5xl md:text-8xl font-extrabold text-black dark:text-white mb-6">
             Heshith Dashan
           </h1>
           
           <p className="text-xl text-black dark:text-gray-300 max-w-2xl mx-auto font-medium">
             I build things for the web using modern technologies. 
             Currently studying SE and mastering Fullstack Development.
           </p>
           
           <div className="flex gap-4 justify-center mt-8">
             <button className="px-8 py-3 rounded-full font-bold bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition">
               View Projects
             </button>
             <button className="px-8 py-3 rounded-full font-bold border-2 border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black transition">
               Contact Me
             </button>
           </div>
        </div>
      )}
    </section>
  );
}