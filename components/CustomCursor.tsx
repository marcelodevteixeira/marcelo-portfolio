
import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null); // Seta Retro
  const followerRef = useRef<HTMLDivElement>(null); // Luz Principal (Foco)
  const trailRef = useRef<HTMLDivElement>(null); // Luz Secundária (Rastro)
  
  const mouseRef = useRef({ x: 0, y: 0 });
  const followerPosRef = useRef({ x: 0, y: 0 });
  const trailPosRef = useRef({ x: 0, y: 0 });
  
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

    // Loop de Animação
    let animationFrameId: number;
    const animate = () => {
      // Configuração da Física
      // Follower: Resposta rápida (Foco da luz)
      const followerFactor = 0.2; 
      // Trail: Resposta lenta (Cria o efeito de rastro/arrasto)
      const trailFactor = 0.06;

      // Atualiza Luz Principal
      followerPosRef.current.x += (mouseRef.current.x - followerPosRef.current.x) * followerFactor;
      followerPosRef.current.y += (mouseRef.current.y - followerPosRef.current.y) * followerFactor;

      // Atualiza Luz de Rastro
      trailPosRef.current.x += (mouseRef.current.x - trailPosRef.current.x) * trailFactor;
      trailPosRef.current.y += (mouseRef.current.y - trailPosRef.current.y) * trailFactor;

      // Aplica transformações
      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerPosRef.current.x}px, ${followerPosRef.current.y}px, 0)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trailPosRef.current.x}px, ${trailPosRef.current.y}px, 0)`;
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
      
      {/* 
         EFEITO DE NEON EM DUAS CAMADAS 
         O uso de mix-blend-mode: screen permite que as luzes se somem quando sobrepostas.
      */}

      {/* Camada 1: O Rastro (Maior, mais difuso, segue devagar) */}
      <div 
        ref={trailRef}
        className={`
          fixed top-0 left-0 pointer-events-none z-[9997]
          w-[800px] h-[800px] -ml-[400px] -mt-[400px]
          rounded-full
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          // Reduzi a opacidade de 0.15 para 0.10 e aumentei o blur de 60px para 80px
          background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, rgba(59,130,246,0.03) 50%, transparent 70%)',
          filter: 'blur(80px)',
          mixBlendMode: 'screen',
          transition: 'opacity 0.5s ease',
          willChange: 'transform' // Otimização de performance
        }}
      />

      {/* Camada 2: O Foco (Menor, mais brilhante, segue rápido) */}
      <div 
        ref={followerRef}
        className={`
          fixed top-0 left-0 pointer-events-none z-[9998]
          w-[500px] h-[500px] -ml-[250px] -mt-[250px]
          rounded-full
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          // Reduzi a opacidade de 0.25 para 0.18 e aumentei o blur de 50px para 70px
          background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(6,182,212,0.08) 40%, transparent 70%)',
          filter: 'blur(70px)',
          mixBlendMode: 'screen',
          transition: 'opacity 0.5s ease',
          willChange: 'transform'
        }}
      />
    </>
  );
};

export default CustomCursor;
