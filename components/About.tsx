import React, { useEffect, useRef, useState } from 'react';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // 👇 COLE O LINK DA SUA FOTO DENTRO DAS ASPAS ABAIXO 👇
  const profileImageSrc = "https://github.com/marcelodevteixeira/imagens/blob/2efa837102ba0645ffea36ebd316450015c91e96/unnamed%20(1).png?raw=true";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="sobre" className="py-32 bg-background relative" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          {/* Image Side */}
          <div className={`w-full md:w-5/12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative group">
              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-700 animate-pulse-slow"></div>
              
              {/* Image Container - Loader removed to guarantee visibility */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-surfaceHighlight aspect-[4/5] animate-float">
                <img 
                  src={profileImageSrc}
                  alt="Marcelo Teixeira" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className={`w-full md:w-7/12 space-y-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Além do <span className="text-gradient">Código</span>
              </h2>
              <div className="h-1 w-20 bg-primary rounded-full"></div>
            </div>
            
            <p className="text-gray-300 leading-relaxed text-lg">
              Sou um <strong className="text-white">Analista de Dados e Engenheiro</strong> apaixonado por descobrir a história escondida nos números. 
              Minha trajetória não é apenas sobre escrever algoritmos, mas sobre resolver problemas reais de negócios com precisão matemática e criatividade.
            </p>
            
            <p className="text-gray-300 leading-relaxed text-lg">
              Atualmente, foco em construir arquiteturas de dados escaláveis na nuvem e desenvolver modelos de IA que saem do laboratório para gerar valor direto ao usuário final.
            </p>

            <div className="pt-4">
              <p className="text-sm text-gray-500 uppercase tracking-widest mb-4">Interesses & Hobbies</p>
              <div className="flex flex-wrap gap-3">
                {['Automação Residencial', 'Xadrez Competitivo', 'Fotografia Urbana', 'Smart Cities'].map((hobby, idx) => (
                  <span 
                    key={hobby} 
                    className="px-4 py-2 bg-white/5 border border-white/5 rounded-full text-sm text-gray-300 hover:bg-white/10 hover:border-primary/50 hover:text-white transition-all duration-300 cursor-default"
                    style={{ transitionDelay: `${idx * 50}ms` }}
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;