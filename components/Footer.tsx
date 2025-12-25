"use client";

import React from "react";
import { useGodMode } from "./GodModeContext";

const Footer = () => {
  const { isGodMode } = useGodMode();

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/HesithDashan", godName: "ACCESS_REPO" },
    { name: "LinkedIn", url: "#", godName: "LINK_NETWORK" }, // 🔥 මෙතනට ඔයාගේ LinkedIn Link එක දාන්න
    { name: "Facebook", url: "#", godName: "SOCIAL_FEED" },   // 🔥 මෙතනට Facebook Link එක දාන්න
    { name: "Email", url: "mailto:heshithdashan24@gmail.com", godName: "SEND_PACKET" }
  ];

  return (
    <footer className={`w-full py-10 mt-20 border-t transition-colors duration-500 z-10
      ${isGodMode ? "bg-black border-green-900" : "bg-black/20 border-white/10"}`}>
      
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        {/* Connection Header */}
        <h2 className={`text-2xl font-bold mb-8 ${isGodMode ? "text-green-500 font-mono" : "text-white"}`}>
          {isGodMode ? "> INITIATE_CONNECTION_PROTOCOL" : "Let's Connect"}
        </h2>

        {/* Links Container */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                px-6 py-3 rounded-full font-bold transition-all duration-300 border-2
                ${isGodMode 
                  ? "border-green-500 text-green-500 hover:bg-green-500 hover:text-black font-mono shadow-[0_0_10px_rgba(34,197,94,0.3)]" 
                  : "border-white/20 text-gray-300 hover:border-white hover:text-white hover:bg-white/5"
                }
              `}
            >
              {isGodMode ? `> ${link.godName}` : link.name}
            </a>
          ))}
        </div>

        {/* System Status / Copyright */}
        <div className={`text-sm ${isGodMode ? "text-green-700 font-mono" : "text-gray-600"}`}>
          {isGodMode ? (
            <div className="animate-pulse">
              <p>SYSTEM_ID: HESHITH_DASHAN_V1</p>
              <p>STATUS: ONLINE</p>
              <p className="mt-2 text-xs opacity-50">ENCRYPTED CONNECTION ESTABLISHED</p>
            </div>
          ) : (
            <p>© 2025 Heshith Dashan. All rights reserved.</p>
          )}
        </div>

      </div>
    </footer>
  );
};

export default Footer;