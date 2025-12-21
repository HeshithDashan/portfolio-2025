"use client"
import React from 'react';
import { useDevMode } from './DevModeContext';

const skills = [
  { name: "Python", level: 100, color: "bg-blue-500" },
  { name: "Java", level: 96, color: "bg-orange-500" },
  { name: "PHP", level: 97, color: "bg-purple-500" },
  { name: "Dart (Flutter)", level: 50, color: "bg-cyan-500" },
  { name: "Kotlin", level: 60, color: "bg-indigo-500" },
  { name: "React / Next.js", level: 85, color: "bg-teal-500" },
];

export default function Skills() {
  const { isDevMode } = useDevMode();

  return (
    <section className="py-20 px-5 max-w-4xl mx-auto">
      
      {isDevMode ? (
        <div className="border border-green-800 bg-black p-5 font-mono shadow-[0_0_15px_rgba(0,255,0,0.1)]">
          <div className="flex justify-between border-b border-green-900 pb-2 mb-4 text-xs text-green-600">
             <span>PID</span>
             <span>PROCESS_NAME</span>
             <span>MEMORY_USAGE</span>
             <span>STATUS</span>
          </div>
          
          <div className="space-y-2">
            {skills.map((skill, index) => (
              <div key={skill.name} className="grid grid-cols-4 text-sm text-green-400 hover:bg-green-900/20 cursor-crosshair transition">
                <span className="text-gray-500">202{index}</span>
                <span>{skill.name.toUpperCase()}</span>
                <div className="w-full bg-gray-900 h-4 mt-1 border border-green-900 relative">
                    <div 
                      className="h-full bg-green-600 animate-pulse" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                    <span className="absolute inset-0 flex items-center justify-center text-xs text-white mix-blend-difference">
                      {skill.level}%
                    </span>
                </div>
                <span className="text-right text-xs pt-1">RUNNING</span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-green-700 animate-pulse">
            &gt; SYSTEM RESOURCES OPTIMIZED FOR FULLSTACK DEVELOPMENT...
          </p>
        </div>
      ) : (

        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">Technical Arsenal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill) => (
              <div key={skill.name} className="space-y-2 group">
                <div className="flex justify-between font-medium">
                  <span className="group-hover:text-blue-600 transition">{skill.name}</span>
                  <span className="text-gray-400">{skill.level}%</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${skill.color} transition-all duration-1000 ease-out`} 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </section>
  );
}