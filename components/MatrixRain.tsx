"use client"
import React, { useEffect, useRef } from 'react';

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Screen එකේ සයිස් එකට Canvas එක හදාගන්නවා
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // වැස්සට පාවිච්චි කරන අකුරු (Matrix Characters)
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ';
    const splitLetters = letters.split('');

    const fontSize = 14;
    const columns = canvas.width / fontSize;

    // වැහි බිංදු (Drops)
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      // කළු පාටින් මකනවා (පොඩි opacity එකක් තියලා, එතකොට අර "Trail" එක පේනවා)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // කොළ පාට අකුරු
      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = splitLetters[Math.floor(Math.random() * splitLetters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // වැස්ස පහළට ගියාම ආයේ උඩට එවනවා (Random විදියට)
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    // මිලි තත්පර 33කට සැරයක් (FPS 30) මේක රන් වෙනවා
    const interval = setInterval(draw, 33);

    // Resize වුනාම හදාගන්න
    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', handleResize);

    return () => {
        clearInterval(interval);
        window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-0 opacity-20 pointer-events-none"
    />
  );
};

export default MatrixRain;