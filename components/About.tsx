import React, { useEffect, useRef, useState } from 'react';
import { portfolioData } from '../data/portfolioData';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { 
        // Atualiza o estado com base na visibilidade (true ou false)
        setIsVisible(entry.isIntersecting); 
      },
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
              
              {/* Image Container */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-surfaceHighlight aspect-[4/5] animate-float">
                <img 
                  src={portfolioData.personal.profileImage}
                  alt={portfolioData.personal.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className={`w-full md:w-7/12 space-y-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {portfolioData.about.title.split(' ').map((word, i) => 
                  i === portfolioData.about.title.split(' ').length - 1 ? 
                  <span key={i} className="text-gradient">{word}</span> : 
                  <span key={i}>{word} </span>
                )}
              </h2>
              <div className="h-1 w-20 bg-primary rounded-full"></div>
            </div>
            
            {portfolioData.about.paragraphs.map((paragraph, index) => (
               <p key={index} className="text-gray-300 leading-relaxed text-lg" dangerouslySetInnerHTML={{ 
                  __html: paragraph.replace(/(Analista de Dados|Engenheiro|IA|Código)/g, '<strong class="text-white">$1</strong>')
               }} />
            ))}

            <div className="pt-4">
              <p className="text-sm text-gray-500 uppercase tracking-widest mb-4">Interesses & Hobbies</p>
              <div className="flex flex-wrap gap-3">
                {portfolioData.about.hobbies.map((hobby, idx) => (
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