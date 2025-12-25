"use client";

import React from "react";
import { useGodMode } from "./GodModeContext";

const timelineData = [
  {
    year: "2021",
    command: "init_career.exe --force",
    output: "Finished O/Ls & Joined Java Institute for Software Engineering directly [Fast Track]",
    status: "STARTED",
    color: "text-blue-400"
  },
  {
    year: "2022",
    command: "sudo apt-get install knowledge",
    output: "Deep dive into Java, OOP, Data Structures & Algorithms",
    status: "LEARNING",
    color: "text-yellow-400"
  },
  {
    year: "2023",
    command: "deploy_tool.sh --project='Email_Drafter'",
    output: "Deployed 'Sinhala Email Drafter' (Python/AI Tool)",
    status: "DEPLOYED",
    color: "text-purple-400"
  },
  {
    year: "2024",
    command: "build_saas.bat --ongoing",
    output: "Developing 'Inventory SaaS' & 'MR Companion' (Flutter/React)",
    status: "BUILDING",
    color: "text-orange-400"
  },
  {
    year: "2025",
    command: "enable_god_mode.sh",
    output: "Launching Ultimate Portfolio... System Ready.",
    status: "ONLINE",
    color: "text-green-400"
  }
];

const Timeline = () => {
  const { isGodMode } = useGodMode();

  return (
    <div className="w-full max-w-4xl px-6 py-20 z-10">
      <h2 className={`text-4xl font-bold text-center mb-12 font-mono ${isGodMode ? "text-green-500" : "text-white"}`}>
        {isGodMode ? "> SYSTEM_LOGS" : "< My Journey />"}
      </h2>

      <div className={`w-full rounded-lg border-2 p-6 font-mono text-sm md:text-base overflow-hidden relative
        ${isGodMode 
          ? "bg-black border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.2)]" 
          : "bg-[#1e1e1e] border-white/10 shadow-2xl"
        }`}
      >

        <div className="flex gap-2 mb-6 opacity-50">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>

        <div className="flex flex-col gap-6">
          {timelineData.map((item, index) => (
            <div key={index} className="group flex flex-col md:flex-row md:items-start gap-2 md:gap-4 hover:bg-white/5 p-2 rounded transition-colors">
              
              <span className={`opacity-50 min-w-[80px] pt-1 ${isGodMode ? "text-green-700" : "text-gray-500"}`}>
                [{item.year}]
              </span>

              <div className="flex-1 flex flex-col">
                <span className={`${isGodMode ? "text-green-500" : "text-white"} font-bold flex items-center gap-2`}>
                   <span className="opacity-50">$</span> {item.command}
                </span>
                <span className={`ml-4 mt-1 opacity-80 ${isGodMode ? "text-green-400/70" : "text-gray-400"}`}>
                  {isGodMode ? ">>" : "↳"} {item.output}
                </span>
              </div>

              <span className={`
                px-3 py-1 text-xs font-bold border rounded md:ml-auto w-fit mt-2 md:mt-0
                ${isGodMode 
                  ? "border-green-500 text-green-500 bg-green-500/10 animate-pulse" 
                  : `border-opacity-20 bg-opacity-10 ${item.color.replace("text-", "border-").replace("text-", "bg-")} ${item.color}`
                }
              `}>
                {item.status}
              </span>

            </div>
          ))}

          <div className={`mt-4 ${isGodMode ? "text-green-500" : "text-white"} animate-pulse`}>
            <span>$</span> <span className="w-2 h-4 bg-current inline-block align-middle ml-1"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;