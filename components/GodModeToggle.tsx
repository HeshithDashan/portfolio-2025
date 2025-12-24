"use client";

import { useGodMode } from "./GodModeContext";

const GodModeToggle = () => {
  const { isGodMode, toggleGodMode } = useGodMode();

  return (
    <button
      onClick={toggleGodMode}
      className={`px-8 py-3 rounded-full font-bold border-2 transition-all duration-300 cursor-pointer ${
        isGodMode
          ? "border-green-500 text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)] bg-black"
          : "border-white text-white hover:bg-white hover:text-black"
      }`}
    >
      {isGodMode ? "DISABLE GOD MODE" : "ENABLE GOD MODE"}
    </button>
  );
};

export default GodModeToggle;