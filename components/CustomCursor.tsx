
import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null); // Seta Retro
  const followerRef = useRef<HTMLDivElement>(null); // Luz Neon
  
  const mouseRef = useRef({ x: 0, y: 0 });
  const followerPosRef = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Listener de movimento do mouse
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
      
      // Cursor principal (Seta) atualiza instantaneamente
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseLeave = () => setIsVisible(false);

    // Loop de Animação para o seguidor (Luz Suave)
    let animationFrameId: number;
    const animate = () => {
      // Lerp (Linear Interpolation)
      // Aumentei para 0.15 para ficar mais responsivo e "colado" no mouse, sem perder a elegância
      const factor = 0.15; 
      
      followerPosRef.current.x += (mouseRef.current.x - followerPosRef.current.x) * factor;
      followerPosRef.current.y += (mouseRef.current.y - followerPosRef.current.y) * factor;

      if (followerRef.current) {
        // Move o elemento. A centralização é feita via margin negativa no CSS
        followerRef.current.style.transform = `translate3d(${followerPosRef.current.x}px, ${followerPosRef.current.y}px, 0)`;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  return (
    <>
      {/* Retro Cursor (Seta Clássica) */}
      <div 
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ marginTop: '-2px', marginLeft: '-2px' }} 
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md"
        >
          <path 
            d="M5.5 3.5L11.5 20.5L14.5 13.5L21.5 10.5L5.5 3.5Z" 
            fill="white" 
            stroke="#18181B" 
            strokeWidth="1.5" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
      
      {/* Neon Follower (Luz Ambiente Suave) */}
      <div 
        ref={followerRef}
        className={`
          fixed top-0 left-0 pointer-events-none z-[9998]
          w-[600px] h-[600px] -ml-[300px] -mt-[300px]
          rounded-full
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          // Gradiente radial muito suave (alpha baixo) para não ofuscar o conteúdo
          background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0.05) 40%, transparent 70%)',
          // Blur alto para difundir a luz
          filter: 'blur(80px)',
          // Mix blend mode ajuda a luz a se somar ao fundo sem lavar as cores escuras
          mixBlendMode: 'screen',
          // Transição APENAS na opacidade. Transform é controlado via JS para performance máxima.
          transition: 'opacity 0.5s ease',
        }}
      />
    </>
  );
};

export default CustomCursor;
