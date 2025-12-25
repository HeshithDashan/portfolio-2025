"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useGodMode } from "./GodModeContext";

// --- Configuration ---
const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [[5, 5], [4, 5], [3, 5]]; // පටන් ගන්නකොටම කොටස් 3ක් දිගයි
const INITIAL_DIRECTION = { x: 1, y: 0 };
const GAME_SPEED = 120; // වේගය ටිකක් වැඩි කළා

const SnakeGame = ({ onClose }: { onClose: () => void }) => {
  const { isGodMode } = useGodMode();
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const directionRef = useRef(INITIAL_DIRECTION); // Ref එකක් පාවිච්චි කරනවා ඉක්මන් හැරවීම් වලට
  const [food, setFood] = useState([10, 10]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  // Theme Colors
  const theme = isGodMode
    ? { primary: "#22c55e", secondary: "#166534", danger: "#ef4444", bg: "bg-black", glow: "shadow-green-500/50" }
    : { primary: "#3b82f6", secondary: "#1e40af", danger: "#f97316", bg: "bg-[#0a0a0a]", glow: "shadow-blue-500/50" };

  // Generate random food
  const generateFood = useCallback(() => {
    let newFood: number[];
    while (true) {
      newFood = [
        Math.floor(Math.random() * GRID_SIZE),
        Math.floor(Math.random() * GRID_SIZE),
      ];
      // eslint-disable-next-line no-loop-func
      const isOnSnake = snake.some(segment => segment[0] === newFood[0] && segment[1] === newFood[1]);
      if (!isOnSnake) break;
    }
    setFood(newFood);
  }, [snake]);

  // Game Loop
  useEffect(() => {
    if (gameOver || isPaused) return;

    gameLoopRef.current = setInterval(() => {
      setSnake((prevSnake) => {
        const currentDir = directionRef.current;
        const newHead = [
          prevSnake[0][0] + currentDir.x,
          prevSnake[0][1] + currentDir.y,
        ];

        // Check Collision (Walls or Self)
        if (
          newHead[0] < 0 || newHead[0] >= GRID_SIZE ||
          newHead[1] < 0 || newHead[1] >= GRID_SIZE ||
          prevSnake.some((seg) => seg[0] === newHead[0] && seg[1] === newHead[1])
        ) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check Food
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setScore((s) => s + 1);
          generateFood();
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, GAME_SPEED);

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [food, gameOver, isPaused, generateFood]);

  // Controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Pause Game
      if (e.code === "Space") {
        setIsPaused(prev => !prev);
        return;
      }

      if (gameOver || isPaused) return;

      // Prevent scrolling
      if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
          e.preventDefault();
      }

      const currentDir = directionRef.current;

      switch (e.key) {
        case "ArrowUp":
          if (currentDir.y === 0) directionRef.current = { x: 0, y: -1 };
          break;
        case "ArrowDown":
          if (currentDir.y === 0) directionRef.current = { x: 0, y: 1 };
          break;
        case "ArrowLeft":
          if (currentDir.x === 0) directionRef.current = { x: -1, y: 0 };
          break;
        case "ArrowRight":
          if (currentDir.x === 0) directionRef.current = { x: 1, y: 0 };
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameOver, isPaused]);

  const restartGame = () => {
    setSnake(INITIAL_SNAKE);
    directionRef.current = INITIAL_DIRECTION;
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    generateFood();
  };

  // Custom Styles for Glow Effects
  const headStyle = {
    backgroundColor: theme.primary,
    boxShadow: `0 0 10px ${theme.primary}, 0 0 20px ${theme.primary}`,
    zIndex: 10
  };
  
  const bodyStyle = {
    backgroundColor: theme.secondary,
    boxShadow: `0 0 5px ${theme.secondary}`,
    opacity: 0.8
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <div className={`
        relative p-6 rounded-xl border-2 shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-md w-full transition-colors duration-500
        ${theme.bg} border-${isGodMode ? 'green' : 'blue'}-500/50 ${theme.glow}
      `}>
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-xl font-bold font-mono tracking-wider flex items-center gap-2 ${isGodMode ? "text-green-400" : "text-blue-400"}`}>
            <span className="animate-pulse">{">"}</span> NEURAL_SNAKE.exe
          </h3>
          <button onClick={onClose} className="text-white/50 hover:text-red-500 font-bold px-2 transition-colors font-mono">
             [EXIT]
          </button>
        </div>

        {/* Game Board Area */}
        <div className="relative p-1 rounded-lg border border-white/10 bg-black overflow-hidden">
          
          {/* CRT Scanline Effect Overlay */}
          <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-30"></div>
          
          {/* Grid Background Pattern */}
          <div 
            className="absolute inset-0 opacity-20 z-0"
            style={{
              backgroundImage: `linear-gradient(${theme.primary}33 1px, transparent 1px), linear-gradient(90deg, ${theme.primary}33 1px, transparent 1px)`,
              backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`
            }}
          ></div>

          {/* The Game Grid Itself */}
          <div 
            className="relative mx-auto z-10"
            style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}
          >
            {/* Snake Segments */}
            {snake.map((segment, i) => (
              <div
                key={i}
                className="absolute rounded-[4px] transition-all duration-75"
                style={{
                  left: segment[0] * CELL_SIZE,
                  top: segment[1] * CELL_SIZE,
                  width: CELL_SIZE - 2, // පොඩි ගැප් එකක් තියනවා
                  height: CELL_SIZE - 2,
                  transform: 'translate(1px, 1px)', // මැදට ගන්නවා
                  ...(i === 0 ? headStyle : bodyStyle) // Head එකට වැඩි Glow එකක්
                }}
              />
            ))}

            {/* Food (Data Packet) - pulsing animation */}
            <div
              className="absolute rounded-sm animate-pulse"
              style={{
                left: food[0] * CELL_SIZE,
                top: food[1] * CELL_SIZE,
                width: CELL_SIZE - 4,
                height: CELL_SIZE - 4,
                transform: 'translate(2px, 2px)',
                backgroundColor: theme.danger,
                boxShadow: `0 0 15px ${theme.danger}, inset 0 0 5px white`
              }}
            >
              {/* Microchip detail on food */}
              <div className="absolute inset-[3px] border border-white/40 rounded-sm"></div>
            </div>
            
            {/* Overlays (Game Over / Paused) */}
            {(gameOver || isPaused) && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-30 text-white font-mono font-bold">
                 {gameOver ? (
                   <>
                     <h2 className="text-3xl text-red-500 mb-2 tracking-widest animate-pulse">SYSTEM FAILURE</h2>
                     <p className="mb-6 text-lg">DATA COLLECTED: {score}</p>
                   </>
                 ) : (
                   <h2 className="text-3xl text-yellow-500 mb-6 tracking-widest animate-pulse">SYSTEM PAUSED</h2>
                 )}
                 
                 <button 
                   onClick={gameOver ? restartGame : () => setIsPaused(false)}
                   className={`px-6 py-3 border-2 rounded-md transition-all hover:bg-white/10 tracking-wider
                     ${isGodMode ? "border-green-500 text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]" : "border-blue-500 text-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]"}`}
                 >
                   {gameOver ? "REBOOT SYSTEM" : "RESUME"}
                 </button>
                 <p className="mt-4 text-xs opacity-50">Press SPACE to Resume</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-end mt-4 font-mono text-sm font-bold">
           <div className={`flex flex-col ${isGodMode ? "text-green-500" : "text-blue-400"}`}>
             <span className="text-xs opacity-70">SCORE_DATA:</span>
             <span className="text-2xl">{score.toString().padStart(3, '0')}</span>
           </div>
           <div className="text-right text-gray-500 text-xs leading-relaxed">
             <p>[↑↓←→] MOVE</p>
             <p>[SPACE] PAUSE</p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default SnakeGame;