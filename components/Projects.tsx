"use client"
import React from 'react';
import { useDevMode } from './DevModeContext';

// ඔයාගේ Project විස්තර ටික මෙතන වෙනස් කරන්න
const projects = [
  {
    id: 1,
    title: "Business Management System",
    desc: "A complete POS & Inventory system with Flask, SQLAlchemy and TailwindCSS.",
    tech: ["Python", "Flask", "SQLAlchemy", "Tailwind"],
    status: "Completed",
    type: "Web App"
  },
  {
    id: 2,
    title: "MR Companion App",
    desc: "Mobile application for sales reps to track daily activities and check-ins.",
    tech: ["Flutter", "Dart", "PHP Backend"],
    status: "Live",
    type: "Mobile App"
  },
  {
    id: 3,
    title: "CodePal Assistant",
    desc: "AI-powered chatbot assistant for developers to debug code snippets.",
    tech: ["Python", "OpenAI API", "React"],
    status: "Prototype",
    type: "AI Tool"
  },
  {
    id: 4,
    title: "Portfolio 2025",
    desc: "My personal portfolio with Dual-Mode (God Mode) interaction.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    status: "In Progress",
    type: "Web Site"
  }
];

export default function Projects() {
  const { isDevMode } = useDevMode();

  return (
    <section className="py-20 px-5 max-w-6xl mx-auto">
      
      {/* ----------------- GOD MODE (Database Query Style) ----------------- */}
      {isDevMode ? (
        <div className="font-mono text-green-400">
           <div className="mb-6 border-b border-green-800 pb-2">
             <p className="text-gray-500">// Querying database for projects...</p>
             <p className="text-yellow-400">$ SELECT * FROM projects WHERE developer = 'Heshith' ORDER BY date DESC;</p>
           </div>

           <div className="grid grid-cols-1 gap-6">
             {projects.map((project) => (
               <div key={project.id} className="bg-black/80 border border-green-900 p-4 hover:border-green-500 transition-colors group">
                  <div className="flex gap-2 text-sm text-gray-500 mb-2">
                    <span>ID: {project.id}</span>
                    <span>|</span>
                    <span>TYPE: {project.type.toUpperCase()}</span>
                  </div>
                  <div className="text-green-300">
                    <span className="text-purple-400">const</span> <span className="text-yellow-300">{project.title.replace(/\s+/g, '_')}</span> = <span className="text-blue-400">{'{'}</span>
                  </div>
                  <div className="pl-6 text-sm text-gray-300 space-y-1">
                    <p>description: <span className="text-orange-300">"{project.desc}"</span>,</p>
                    <p>stack: [<span className="text-orange-300">{project.tech.map(t => `'${t}'`).join(', ')}</span>],</p>
                    <p>status: <span className="text-red-400">"{project.status}"</span></p>
                  </div>
                  <div className="text-blue-400">{'}'}</div>
               </div>
             ))}
             <p className="text-gray-500 mt-4 animate-pulse">_ 4 rows returned in 0.02s</p>
           </div>
        </div>
      ) : (

      /* ----------------- NORMAL MODE (Modern Cards) ----------------- */
        <div>
          <h2 className="text-4xl font-bold mb-4 text-center">Featured Projects</h2>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each one was a new challenge and a learning experience.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-white/5 border border-gray-200 rounded-2xl p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group bg-gradient-to-br from-white to-gray-50">
                <div className="flex justify-between items-start mb-4">
                   <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                     {project.type}
                   </span>
                   <span className="text-gray-400 text-xs">{project.status}</span>
                </div>
                
                <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((tech) => (
                    <span key={tech} className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-md border border-gray-200">
                      # {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </section>
  );
}