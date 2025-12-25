"use client";

import React, { useEffect, useState } from "react";
import { useGodMode } from "./GodModeContext";

interface Project {
    id: number;
    name: string;
    description: string;
    html_url: string;
    language: string;
    stargazers_count: number;
}

const Projects = () => {
    const { isGodMode } = useGodMode();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {

                const res = await fetch("https://api.github.com/users/HesithDashan/repos?sort=updated&per_page=100");

                if (!res.ok) throw new Error("Failed to fetch");

                const data = await res.json();

                const myProjects = data.filter((repo: any) => !repo.fork).slice(0, 6); 
                setProjects(myProjects);

            } catch (error) {
                console.log("⚠️ GitHub API Error. Using Backup Projects...");

                setProjects([
                    {
                        id: 1,
                        name: "MR Companion",
                        description: "Mobile application for Unilever sales representatives to manage daily tasks.",
                        html_url: "https://github.com/HesithDashan",
                        language: "React Native",
                        stargazers_count: 5
                    },
                    {
                        id: 2,
                        name: "CodePal",
                        description: "AI-powered chat application designed to assist developers with coding queries.",
                        html_url: "https://github.com/HesithDashan",
                        language: "TypeScript",
                        stargazers_count: 8
                    },
                    {
                        id: 3,
                        name: "Inventory System",
                        description: "Web-based inventory and billing system built with Python and Flask.",
                        html_url: "https://github.com/HesithDashan",
                        language: "Python",
                        stargazers_count: 3
                    },
                    {
                        id: 4,
                        name: "Portfolio 2025",
                        description: "Personal portfolio website with God Mode matrix theme.",
                        html_url: "https://github.com/HesithDashan/portfolio-2025",
                        language: "Next.js",
                        stargazers_count: 10
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="w-full max-w-6xl px-6 py-20 z-10">
            <h2 className={`text-4xl font-bold text-center mb-12 ${isGodMode ? "text-green-500" : "text-white"}`}>
                Featured Projects
            </h2>

            {loading ? (
                <p className="text-center opacity-50">Loading Projects...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <a
                            key={project.id}
                            href={project.html_url}
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
                                <span className="text-xs px-2 py-1 rounded-full border border-opacity-30 opacity-70">
                                    ⭐ {project.stargazers_count}
                                </span>
                            </div>

                            <p className="text-sm opacity-70 mb-6 h-12 overflow-hidden line-clamp-2">
                                {project.description || "No description available for this project."}
                            </p>

                            <div className="flex items-center gap-2 text-xs font-mono opacity-60">
                                <span className={`w-3 h-3 rounded-full ${isGodMode ? "bg-green-500" : "bg-blue-400"}`}></span>
                                {project.language || "Code"}
                            </div>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Projects;