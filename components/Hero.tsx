"use client"
import React from 'react';
import { useDevMode } from './DevModeContext';

export default function Hero() {
  const { isDevMode } = useDevMode();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-[80vh] flex flex-col justify-center items-center text-center p-5">
      
      {isDevMode ? (
        <div className="text-left space-y-4 max-w-3xl w-full">
          <p className="text-gray-500 text-sm">// Initializing Portfolio Protocol v2.0...</p>
          
          <div className="bg-black/50 p-6 rounded-lg border border-green-800 shadow-[0_0_20px_rgba(0,255,0,0.2)]">
            <p className="text-green-400 font-mono text-xl">
              <span className="text-purple-400">const</span> <span className="text-yellow-400">developer</span> = <span className="text-blue-400">{"{"}</span>
            </p>
            <div className="pl-8 text-green-300 font-mono">
              <p>name: <span className="text-orange-400">"Heshith Dashan"</span>,</p>
              <p>role: <span className="text-orange-400">"Fullstack Software Engineer"</span>,</p>
              <p>skills: [<span className="text-orange-400">"Next.js"</span>, <span className="text-orange-400">"Java"</span>, <span className="text-orange-400">"Python"</span>],</p>
              <p>status: <span className="text-red-400 animate-pulse">"Ready to Code..."</span></p>
            </div>
            <p className="text-blue-400 font-mono text-xl">{"}"};</p>
          </div>

          <p className="text-gray-500 text-xs mt-4">Running on localhost:3000 | System Optimal</p>
        </div>
      ) : (
      
        <div className="space-y-6 animate-fade-in-up">
           <div className="text-sm font-bold tracking-widest text-blue-600 uppercase">
             Software Engineering Student
           </div>
           <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
             Heshith Dashan
           </h1>
           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
             I build things for the web using modern technologies. 
             Currently studying SE and mastering Fullstack Development.
           </p>
           
           <div className="flex gap-4 justify-center mt-8">
             <button 
               onClick={() => scrollToSection('projects')}
               className="px-8 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition transform hover:scale-105"
             >
               View Projects
             </button>
             <button 
               onClick={() => scrollToSection('contact')}
               className="px-8 py-3 border border-gray-300 rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105"
             >
               Contact Me
             </button>
           </div>
        </div>
      )}

    </section>
  );
}