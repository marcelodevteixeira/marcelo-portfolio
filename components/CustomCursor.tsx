import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show cursor only when mouse moves (prevents it showing on initial load in wrong spot)
    const onFirstMove = () => {
      setIsVisible(true);
      window.removeEventListener('mousemove', onFirstMove);
    };
    window.addEventListener('mousemove', onFirstMove);

    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current && glowRef.current) {
        // Direct DOM manipulation for 60fps performance
        const { clientX, clientY } = e;
        
        // The main cursor moves instantly
        cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
        
        // The glow follows with the same coordinates
        glowRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    // Hide cursor when leaving window
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onFirstMove);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* The Glow / Flashlight Effect (Background Layer) */}
      <div 
        ref={glowRef}
        className="fixed top-0 left-0 w-64 h-64 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-20 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 will-change-transform mix-blend-screen animate-morph animate-spin-slow blur-[60px]"
      />

      {/* The Retro Cursor (Foreground Layer) */}
      <div 
        ref={cursorRef}
        className={`
          fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform -mt-1 -ml-1
          ${isClicking ? 'scale-90' : 'scale-100'} transition-transform duration-100 ease-out
        `}
      >
        {/* SVG Arrow representing a Retro Cursor */}
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" // Neon Blue Glow
        >
          <path 
            d="M5.5 3.5L19 12.5L12.5 14L15.5 20L13.5 21L10.5 15L5.5 19V3.5Z" 
            fill="white" 
            stroke="white" 
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  );
};

export default CustomCursor;