"use client";

import { useGodMode } from "./GodModeContext";

const skills = [
  "Java", "React", "Next.js", "TypeScript", "JavaScript", "Python",
  "Tailwind CSS", "Node.js", "MySQL", "Firebase", "Git", "Figma"
];

const TechStack = () => {
  const { isGodMode } = useGodMode();

  return (
    <div className="w-full overflow-hidden py-10 relative z-10">
      <div className="flex w-[200%] animate-scroll">
        {/* Infinite Loop එකක් එන්න නම් ලිස්ට් එක දෙපාරක් රෙන්ඩර් කරන්න ඕන */}
        {[...skills, ...skills].map((skill, index) => (
          <div
            key={index}
            className={`
              flex items-center justify-center mx-4 px-6 py-3 rounded-lg border-2 font-bold text-lg whitespace-nowrap transition-all duration-300
              ${isGodMode 
                ? "border-green-500 text-green-500 bg-black shadow-[0_0_10px_rgba(34,197,94,0.3)] hover:shadow-[0_0_20px_rgba(34,197,94,0.8)]" 
                : "border-white/20 text-white/80 bg-white/5 hover:bg-white/10 hover:border-white"
              }
            `}
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;