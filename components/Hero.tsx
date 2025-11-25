import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background"
    >
      {/* Interactive Spotlight Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`
        }}
      />
      
      {/* Static Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] animate-pulse-slow delay-1000"></div>

      <div className="max-w-5xl mx-auto px-6 text-center z-10 relative">
        
        {/* Badge Neon - Disponível para projetos */}
        <div className={`transition-all duration-1000 ease-out transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-surface/50 border border-accent/20 shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:border-accent/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] transition-all duration-500 cursor-default mb-8 group">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-accent text-sm font-medium tracking-wide drop-shadow-[0_0_5px_rgba(6,182,212,0.4)] group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.6)] transition-all">
              Disponível para novos projetos
            </span>
          </div>
        </div>

        <h1 
          className={`text-6xl md:text-8xl font-bold tracking-tighter mb-6 transition-all duration-1000 delay-100 ease-out transform ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-white">Marcelo</span> <span className="text-gray-500">Teixeira</span>
        </h1>
        
        <p 
          className={`text-xl md:text-2xl text-muted font-light mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-200 ease-out transform ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Engenharia de Dados & <span className="text-gradient font-medium">Inteligência Artificial</span>
        </p>

        <p 
          className={`text-lg text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ease-out transform ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Transformo dados brutos em decisões estratégicas através de pipelines robustos, dashboards intuitivos e modelos preditivos.
        </p>

        <div 
          className={`flex flex-col md:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-500 ease-out transform ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <a
            href="#projetos"
            className="group relative px-8 py-3 bg-white text-black rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Ver Projetos <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </a>

          <a
            href="#contato"
            className="px-8 py-3 rounded-full font-medium text-white border border-white/10 hover:bg-white/5 transition-all hover:border-white/30"
          >
            Entrar em Contato
          </a>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-1000 delay-1000 ${loaded ? 'opacity-70' : 'opacity-0'}`}>
         <span className="text-xs uppercase tracking-widest text-muted">Scroll</span>
         <ChevronDown className="animate-bounce text-primary" size={20} />
      </div>
    </section>
  );
};

export default Hero;