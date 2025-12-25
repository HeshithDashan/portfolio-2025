"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useGodMode } from "./GodModeContext";

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [[5, 5]];
const INITIAL_DIRECTION = { x: 1, y: 0 };

const SnakeGame = ({ onClose }: { onClose: () => void }) => {
  const { isGodMode } = useGodMode();
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState([10, 10]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const generateFood = useCallback(() => {
    let newFood: number[]; 
    while (true) {
      newFood = [
        Math.floor(Math.random() * GRID_SIZE),
        Math.floor(Math.random() * GRID_SIZE),
      ];

      const isOnSnake = snake.some(segment => segment[0] === newFood[0] && segment[1] === newFood[1]);
      if (!isOnSnake) break;
    }
    setFood(newFood);
  }, [snake]);

  useEffect(() => {
    if (gameOver || isPaused) return;

    const moveSnake = setInterval(() => {
      setSnake((prevSnake) => {
        const newHead = [
          prevSnake[0][0] + direction.x,
          prevSnake[0][1] + direction.y,
        ];

        if (
          newHead[0] < 0 ||
          newHead[0] >= GRID_SIZE ||
          newHead[1] < 0 ||
          newHead[1] >= GRID_SIZE
        ) {
          setGameOver(true);
          return prevSnake;
        }

        if (prevSnake.some((seg) => seg[0] === newHead[0] && seg[1] === newHead[1])) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setScore((s) => s + 1);
          generateFood();
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 150);

    return () => clearInterval(moveSnake);
  }, [direction, food, gameOver, isPaused, generateFood]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
          e.preventDefault();
      }

      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction]);

  const restartGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameOver(false);
    generateFood();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className={`
        relative p-6 rounded-xl border-2 shadow-2xl max-w-md w-full
        ${isGodMode ? "bg-black border-green-500 shadow-green-500/20" : "bg-[#1e1e1e] border-white/20"}
      `}>
        
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-xl font-bold font-mono ${isGodMode ? "text-green-500" : "text-white"}`}>
            {">"} SNAKE_GAME.exe 
          </h3>
          <button onClick={onClose} className="text-red-500 hover:text-red-400 font-bold px-2">
             [X]
          </button>
        </div>

        <div 
          className="relative bg-black/50 border border-gray-700 mx-auto"
          style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}
        >
          {snake.map((segment, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: segment[0] * CELL_SIZE,
                top: segment[1] * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
                backgroundColor: i === 0 
                  ? (isGodMode ? "#22c55e" : "#3b82f6") 
                  : (isGodMode ? "#15803d" : "#60a5fa"), 
                border: "1px solid rgba(0,0,0,0.5)"
              }}
            />
          ))}
          <div
            className="absolute rounded-full"
            style={{
              left: food[0] * CELL_SIZE,
              top: food[1] * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
              backgroundColor: "#ef4444", 
              boxShadow: isGodMode ? "0 0 10px #ef4444" : "none"
            }}
          />
          
          {gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white">
               <h2 className="text-2xl font-bold text-red-500 mb-2">GAME OVER</h2>
               <p className="mb-4">Score: {score}</p>
               <button 
                 onClick={restartGame}
                 className={`px-4 py-2 border rounded hover:bg-white/10 ${isGodMode ? "border-green-500 text-green-500" : "border-white text-white"}`}
               >
                 TRY AGAIN
               </button>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-4 font-mono text-sm">
           <span className={isGodMode ? "text-green-500" : "text-gray-300"}>
             SCORE: {score}
           </span>
           <span className="text-gray-500">
             Use Arrow Keys
           </span>
        </div>

      </div>
    </div>
  );
};

export default SnakeGame;