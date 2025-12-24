"use client";

import Image from "next/image";
import { useGodMode } from "./GodModeContext";

interface HeroProps {
  data: {
    avatar_url: string;
    name: string;
    bio: string;
    location: string;
    public_repos: number;
    followers: number;
    html_url: string;
  };
}

const Hero = ({ data }: HeroProps) => {
  const { isGodMode } = useGodMode();

  return (
    <div className="flex flex-col items-center justify-center text-center z-10 p-6 animate-fade-in mt-10">
      {/* Profile Image */}
      <div className="relative mb-8 group">
        <div
          className={`absolute -inset-1 rounded-full blur transition duration-500 ${
            isGodMode ? "bg-green-500 opacity-75" : "bg-white opacity-30"
          }`}
        ></div>
        <Image
          src={data.avatar_url}
          alt={data.name}
          width={200}
          height={200}
          className={`relative rounded-full border-4 transition-all duration-500 ${
            isGodMode ? "border-green-500 grayscale hover:grayscale-0" : "border-white"
          }`}
          priority
        />
      </div>

      {/* Name */}
      <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter">
        {data.name}
      </h1>

      {/* Bio */}
      <p
        className={`text-lg md:text-xl max-w-2xl mb-8 transition-colors duration-300 ${
          isGodMode ? "text-green-400 font-mono" : "text-gray-300"
        }`}
      >
        {data.bio}
      </p>

      {/* Stats Grid */}
      <div className="flex gap-8 mb-8 text-center justify-center">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold">{data.public_repos}</span>
          <span className="text-sm opacity-60 uppercase tracking-widest">Repos</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold">{data.followers}</span>
          <span className="text-sm opacity-60 uppercase tracking-widest">Followers</span>
        </div>
      </div>
      
      <p className="mb-8 opacity-50 flex items-center gap-2">
        📍 {data.location}
      </p>

      {/* GitHub Button */}
      <a
        href={data.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className={`px-8 py-3 rounded-full font-bold transition-all duration-300 border hover:scale-105 inline-block ${
          isGodMode
            ? "border-green-500 text-green-500 hover:bg-green-500 hover:text-black"
            : "border-white text-white hover:bg-white hover:text-black"
        }`}
      >
        View GitHub Profile
      </a>
    </div>
  );
};

export default Hero;