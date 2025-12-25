"use client";

import React, { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import GodModeToggle from "@/components/GodModeToggle";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import SnakeGame from "@/components/SnakeGame"; 

const getGithubData = async () => {
  const username = "HesithDashan"; 
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) throw new Error("Failed");
    return await res.json();
  } catch (error) {
    console.log("⚠️ Using Offline Data...");
    return {
      avatar_url: "/profile.png", 
      name: "Heshith Dashan",
      bio: "Code. Learn. Build. Repeat. Software Engineer ⚙️ | Open Source Contributor 🌎 | Always curious 🧘‍♂️",
      location: "Gampaha",
      public_repos: 14,
      followers: 6,
      created_at: "2023-10-23T00:00:00Z", 
      html_url: "https://github.com/HesithDashan"
    };
  }
};

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [showGame, setShowGame] = useState(false); 

  useEffect(() => {

    getGithubData().then((fetchedData) => {
      setData({ ...fetchedData, name: "Heshith Dashan" });
    });
  }, []);

  if (!data) return <div className="min-h-screen bg-black flex items-center justify-center text-green-500 font-mono">Initializing System...</div>;

  return (

    <main className="min-h-screen relative overflow-hidden flex flex-col">
      
      <div className="absolute top-6 right-6 z-50">
         <GodModeToggle />
      </div>

      {showGame && <SnakeGame onClose={() => setShowGame(false)} />}
      
      <div className="flex-1 w-full flex flex-col items-center p-8">
        
        <Hero data={data} />
        
        <ScrollReveal>
          <About 
            repoCount={data.public_repos} 
            joinDate="2023-10-23" 
          />
        </ScrollReveal>
        
        <div className="w-full max-w-4xl mt-12 mb-12">
          <ScrollReveal>
            <TechStack />
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <Projects />
        </ScrollReveal>

        <ScrollReveal>
          <Timeline />
        </ScrollReveal>

        <ScrollReveal>
          <div className="w-full flex justify-center mt-12 mb-8">
            <button
              onClick={() => setShowGame(true)}
              className="px-6 py-2 border border-green-500/30 text-green-500/70 rounded hover:bg-green-500/10 hover:text-green-400 hover:border-green-400 transition-all font-mono text-sm"
            >
              {"> LAUNCH_MINIGAME.exe"}
            </button>
          </div>
        </ScrollReveal>

      </div>

      <ScrollReveal>
        <Footer />
      </ScrollReveal>

    </main>
  );
}