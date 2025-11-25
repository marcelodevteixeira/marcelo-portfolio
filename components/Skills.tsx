import React, { useRef, useState, useEffect } from 'react';
import { Code2, Database, Layout, Server, BarChart3, Cloud, Container, Brain } from 'lucide-react';
import { Skill } from '../types';

const skills: Skill[] = [
  { name: 'Python', icon: <Code2 /> },
  { name: 'SQL', icon: <Database /> },
  { name: 'JavaScript', icon: <Code2 /> },
  { name: 'React', icon: <Layout /> },
  { name: 'Power BI', icon: <BarChart3 /> },
  { name: 'Machine Learning', icon: <Brain /> },
  { name: 'AWS', icon: <Cloud /> },
  { name: 'Docker', icon: <Container /> },
];

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="habilidades" className="py-32 relative bg-background overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div ref={sectionRef} className={`mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Arsenal <span className="text-gradient">Tecnológico</span></h2>
          <p className="text-gray-400 max-w-xl text-lg">
            Um conjunto de ferramentas modernas focadas em escalabilidade, performance e insights de dados.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 group/grid">
          {skills.map((skill, index) => (
            <div 
              key={skill.name}
              className={`
                relative p-6 bg-surface/50 border border-white/5 rounded-2xl 
                transition-all duration-500 ease-out
                hover:bg-white/10 hover:border-primary/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10
                group/card reveal
                ${isVisible ? 'active' : ''}
              `}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <div className="p-4 bg-white/5 rounded-xl text-primary group-hover/card:text-white group-hover/card:scale-110 group-hover/card:bg-primary transition-all duration-300">
                  {React.cloneElement(skill.icon as React.ReactElement<any>, { size: 32 })}
                </div>
                <h3 className="text-gray-300 font-medium group-hover/card:text-white transition-colors">
                  {skill.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;