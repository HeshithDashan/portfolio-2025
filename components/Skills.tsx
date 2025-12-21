"use client"
import React, { useEffect, useState } from 'react';
import { useDevMode } from './DevModeContext';

const getLanguageColor = (language: string) => {
  const colors: { [key: string]: string } = {
    JavaScript: "bg-yellow-400",
    TypeScript: "bg-blue-600",
    Python: "bg-blue-500",
    Java: "bg-orange-500",
    HTML: "bg-orange-600",
    CSS: "bg-blue-400",
    Dart: "bg-cyan-500",
    PHP: "bg-purple-600",
    "C++": "bg-pink-600",
    "C#": "bg-green-600",
    Kotlin: "bg-indigo-500",
    Swift: "bg-red-500",
  };
  return colors[language] || "bg-gray-500";
};

export default function Skills() {
  const { isDevMode } = useDevMode();

  const [skills, setSkills] = useState<{ name: string; level: number; color: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const GITHUB_USERNAME = "HeshithDashan";

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {

        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
        
        if (!response.ok) throw new Error("GitHub Request Failed");
        
        const repos = await response.json();

        const languageCount: { [key: string]: number } = {};
        let totalRepos = 0;

        if (Array.isArray(repos)) {
          repos.forEach((repo: any) => {
            if (repo.language) {
              languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
              totalRepos++;
            }
          });
        }

        const calculatedSkills = Object.keys(languageCount).map((lang) => ({
          name: lang,
          level: Math.round((languageCount[lang] / totalRepos) * 100),
          color: getLanguageColor(lang),
        }));

        calculatedSkills.sort((a, b) => b.level - a.level);

        setSkills(calculatedSkills.slice(0, 6));
        setLoading(false);

      } catch (error) {
        console.error("GitHub API Error:", error);

        setSkills([
          { name: "GitHub API Error", level: 0, color: "bg-red-500" },
          { name: "Check Connection", level: 0, color: "bg-red-500" }
        ]);
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, []);

  return (
    <section className="py-20 px-5 max-w-4xl mx-auto">
      
      {loading ? (
         <div className="text-center text-gray-500 animate-pulse font-mono">
            {isDevMode ? "> ESTABLISHING SECURE CONNECTION TO GITHUB..." : "Loading Skills from GitHub..."}
         </div>
      ) : (
        <>

        {isDevMode ? (
          <div className="border border-green-800 bg-black p-5 font-mono shadow-[0_0_15px_rgba(0,255,0,0.1)]">
            <div className="flex justify-between border-b border-green-900 pb-2 mb-4 text-xs text-green-600">
               <span>SOURCE</span>
               <span>LANGUAGE</span>
               <span>USAGE_RATE</span>
               <span>STATUS</span>
            </div>
            
            <div className="space-y-2">
              {skills.map((skill, index) => (
                <div key={skill.name} className="grid grid-cols-4 text-sm text-green-400 hover:bg-green-900/20 cursor-crosshair transition">
                  <span className="text-gray-500">GH-REPO-{index}</span>
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
                  <span className="text-right text-xs pt-1 text-green-300">LIVE</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-green-700 animate-pulse">
              &gt; DATA SYNCED WITH GITHUB: @{GITHUB_USERNAME}...
            </p>
          </div>
        ) : (

          <div>
            <h2 className="text-3xl font-bold mb-2 text-center">Technical Arsenal</h2>
            <p className="text-center text-gray-500 mb-8 text-sm">
              Real-time stats from my <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" className="text-blue-500 underline">GitHub</a>
            </p>
            
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
        </>
      )}
    </section>
  );
}