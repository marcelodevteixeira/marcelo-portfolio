import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from '../data/portfolioData';

const Experience: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const experiences = portfolioData.experience;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { 
        // Atualiza o estado com base na visibilidade (true ou false)
        setIsVisible(entry.isIntersecting); 
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experiencia" className="py-32 bg-background relative" ref={sectionRef}>
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className={`mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Jornada <span className="text-gray-500">Profissional</span>
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full"></div>
        </div>
        
        <div className="relative border-l border-white/10 ml-4 md:ml-0 md:pl-0 space-y-16">
          {experiences.map((exp, idx) => (
            <div 
              key={exp.id} 
              className={`
                relative pl-8 md:pl-0 transition-all duration-1000 ease-out
                ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-20px]'}
              `}
              style={{ transitionDelay: `${idx * 200}ms` }}
            >
               {/* Timeline Dot with Pulse */}
              <div className="absolute -left-[5px] top-0 md:left-1/2 md:-translate-x-[6px] z-10">
                <div className="w-3 h-3 bg-primary rounded-full relative">
                  <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75"></div>
                </div>
              </div>
              
              <div className={`md:flex justify-between items-start w-full ${exp.id % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                <div className="hidden md:block w-5/12 text-right">
                   {/* Empty or Date for alternative layout */}
                </div>

                {/* Content Card */}
                <div className={`
                  w-full md:w-5/12 bg-surface/40 backdrop-blur-sm p-8 rounded-2xl border border-white/5 
                  hover:bg-surface/60 hover:border-primary/20 transition-all duration-300 group
                  ${exp.id % 2 === 0 ? 'md:text-right' : 'md:text-left'}
                `}>
                  <span className="inline-block py-1 px-3 bg-white/5 rounded-full text-xs font-semibold tracking-wide text-primary mb-3">
                    {exp.period}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{exp.role}</h3>
                  <h4 className="text-lg text-gray-400 mb-6">{exp.company}</h4>
                  
                  <ul className={`space-y-3 ${exp.id % 2 === 0 ? 'md:flex md:flex-col md:items-end' : ''}`}>
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start text-gray-300 text-sm leading-relaxed group-hover:text-gray-200">
                         <span className={`mr-3 text-primary mt-1 ${exp.id % 2 === 0 ? 'md:order-2 md:ml-3 md:mr-0' : ''}`}>•</span>
                         {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;