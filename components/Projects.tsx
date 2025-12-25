"use client";

import React, { useState } from "react";
import { useGodMode } from "./GodModeContext";

const Projects = () => {
  const { isGodMode } = useGodMode();

  const allProjects = [
    {
      name: "MR Companion",
      description: "Mobile application for Unilever sales representatives to manage daily tasks and targets.",
      language: "Flutter / Dart",
      stars: 5,
      url: "https://github.com/HesithDashan", 
      isPrivate: true
    },
    {
      name: "CodePal Assistant",
      description: "AI-powered personal coding assistant built to help developers with real-time queries.",
      language: "TypeScript / Python",
      stars: 8,
      url: "https://github.com/HesithDashan",
      isPrivate: true
    },
    {
      name: "Inventory SaaS",
      description: "Complete inventory and billing system for small businesses with stock management.",
      language: "Python / Flask",
      stars: 3,
      url: "https://github.com/HesithDashan/inventory-saas",
      isPrivate: false
    },
    {
      name: "Sinhala Email Drafter",
      description: "Automated tool to draft professional emails from Sinhala input using AI.",
      language: "Python",
      stars: 2,
      url: "https://github.com/HesithDashan/sinhala-email-drafter",
      isPrivate: false
    },
    {
      name: "Unilever Field App",
      description: "Field sales management application tailored for enterprise usage.",
      language: "Kotlin",
      stars: 1,
      url: "https://github.com/HesithDashan",
      isPrivate: true
    },
    {
      name: "FitLog",
      description: "Health and fitness tracking web application built from scratch with OOP principles.",
      language: "Java / React",
      stars: 2,
      url: "https://github.com/HesithDashan/FitLog",
      isPrivate: false
    },
    {
      name: "VehicleMate",
      description: "Vehicle management system backend services and API.",
      language: "Java",
      stars: 1,
      url: "https://github.com/HesithDashan/VehicleMate",
      isPrivate: false
    },
    {
      name: "iPhone Shop",
      description: "E-commerce platform for mobile phone sales and inventory.",
      language: "PHP",
      stars: 1,
      url: "https://github.com/HesithDashan",
      isPrivate: true
    },
    {
      name: "Rust Scanlog",
      description: "Real-time log watcher and analyzer tool built for performance.",
      language: "Rust",
      stars: 1,
      url: "https://github.com/HesithDashan/rust-scanlog",
      isPrivate: false
    }
  ];

  return (
    <div className="w-full max-w-6xl px-6 py-20 z-10">
      <h2 className={`text-4xl font-bold text-center mb-12 ${isGodMode ? "text-green-500" : "text-white"}`}>
        Featured Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allProjects.map((project, index) => (
          <a
            key={index}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block p-6 border-2 rounded-xl transition-all duration-300 group relative overflow-hidden
              ${isGodMode 
                ? "border-green-500/50 bg-black hover:border-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]" 
                : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/50"
              }
            `}
          >

            <div className="flex justify-between items-start mb-4">
              <h3 className={`text-xl font-bold ${isGodMode ? "text-green-400" : "text-white"}`}>
                {project.name}
              </h3>
              <div className="flex items-center gap-2">
                {project.isPrivate && (
                   <span className="text-[10px] uppercase border px-1 rounded opacity-60">Pvt</span>
                )}
                <span className="text-xs px-2 py-1 rounded-full border border-opacity-30 opacity-70">
                   ⭐ {project.stars}
                </span>
              </div>
            </div>
            
            <p className="text-sm opacity-70 mb-6 h-12 overflow-hidden line-clamp-2">
              {project.description}
            </p>

            <div className="flex items-center gap-2 text-xs font-mono opacity-60">
              <span className={`w-3 h-3 rounded-full ${isGodMode ? "bg-green-500" : "bg-blue-400"}`}></span>
              {project.language}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Projects;