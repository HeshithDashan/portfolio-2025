"use client";

import React, { useMemo } from "react";
import { useGodMode } from "./GodModeContext";

// පිටින් එන ඩේටා වලට Type එකක්
interface AboutProps {
  repoCount: number;
  joinDate: string; // GitHub එකෙන් එන දිනය (උදා: "2021-10-20T...")
}

const About = ({ repoCount, joinDate }: AboutProps) => {
  const { isGodMode } = useGodMode();

  // Experience එක ඔටෝම ගණන් හදන ලොජික් එක
  const experienceYears = useMemo(() => {
    const startYear = new Date(joinDate).getFullYear();
    const currentYear = new Date().getFullYear();
    const years = currentYear - startYear;
    return years > 0 ? years : 1; // අඩුම තරමේ අවුරුද්දක්වත් පෙන්වන්න
  }, [joinDate]);

  return (
    <div className="w-full max-w-4xl px-6 py-12 z-10">
      <div className={`
        relative p-8 rounded-2xl border-2 transition-all duration-500
        ${isGodMode 
          ? "bg-black border-green-500 shadow-[0_0_50px_rgba(34,197,94,0.15)]" 
          : "bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10"
        }
      `}>
        {/* God Mode Decoration Lines */}
        {isGodMode && (
          <>
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-green-500 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-green-500 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-green-500 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-green-500 rounded-br-lg"></div>
          </>
        )}

        <h2 className={`text-3xl font-bold mb-6 ${isGodMode ? "text-green-500 font-mono" : "text-white"}`}>
          {isGodMode ? "> USER_PROFILE" : "About Me"}
        </h2>

        <div className="space-y-4 text-lg leading-relaxed">
          <p className={`${isGodMode ? "text-green-400 font-mono" : "text-gray-300"}`}>
            Hello! I'm <span className="font-bold text-white">Heshith Dashan</span>, a passionate Software Engineer from Sri Lanka. 🇱🇰
          </p>
          
          <p className={`${isGodMode ? "text-green-400/80 font-mono" : "text-gray-400"}`}>
            I don't follow the traditional path. While others were busy with A/Ls, I chose the <span className={`${isGodMode ? "text-green-500" : "text-blue-400"} font-bold`}>Fast Track</span>.
            Straight after my O/Ls, I dove headfirst into professional Software Engineering at the <b>Java Institute</b>, accelerating my career years ahead of my peers.
          </p>

          <p className={`${isGodMode ? "text-green-400/80 font-mono" : "text-gray-400"}`}>
            I specialize in building full-stack applications, from AI-powered tools like <b>Sinhala Email Drafter</b> to complex SaaS platforms like my ongoing <b>Inventory System</b>. 
            When I'm not coding, I'm probably exploring new tech, contributing to open source, or planning my next big project.
          </p>
        </div>

        {/* Dynamic Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-700/50">
          
          {/* 🔥 මෙන්න මෙතන තමයි Live Update වෙන්නේ */}
          <StatBox label="Experience" value={`${experienceYears}+ Years`} isGodMode={isGodMode} />
          <StatBox label="Projects" value={`${repoCount}+`} isGodMode={isGodMode} />
          
          <StatBox label="Coffee" value="∞" isGodMode={isGodMode} />
          <StatBox label="Status" value="Available" isGodMode={isGodMode} />
        </div>

      </div>
    </div>
  );
};

const StatBox = ({ label, value, isGodMode }: { label: string, value: string, isGodMode: boolean }) => (
  <div className="text-center">
    <div className={`text-2xl font-bold mb-1 ${isGodMode ? "text-green-500" : "text-white"}`}>
      {value}
    </div>
    <div className={`text-sm uppercase tracking-wider ${isGodMode ? "text-green-700" : "text-gray-500"}`}>
      {label}
    </div>
  </div>
);

export default About;