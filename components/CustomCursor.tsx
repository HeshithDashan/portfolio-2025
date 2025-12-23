"use client"
import React, { useEffect, useState } from 'react';
import { useDevMode } from './DevModeContext';

const CustomCursor = () => {
  const { isDevMode } = useDevMode();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {

    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };


    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>

      {isDevMode ? (
        <div 
          className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)` 
          }}
        >

          <div className={`relative transition-all duration-100 ${isHovering ? 'scale-150' : 'scale-100'}`}>
             <div className="w-[40px] h-[40px] border border-green-500 rounded-full animate-spin-slow"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-4 bg-green-500"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-1 bg-green-500"></div>
          </div>
        </div>
      ) : (

        <div 
          className="fixed top-0 left-0 pointer-events-none z-[9999]"
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)` 
          }}
        >

          <div 
            className={`border rounded-full transition-all duration-200 ease-out 
            ${isHovering 
              ? 'w-16 h-16 border-white bg-white/10 mix-blend-difference' 
              : 'w-8 h-8 border-black' 
            }`}
          ></div>

          <div className={`w-2 h-2 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            ${isHovering ? 'bg-white mix-blend-difference' : 'bg-black'}`}>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomCursor;