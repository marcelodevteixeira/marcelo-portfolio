import React, { useEffect, useState, useRef } from 'react';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import { Project } from '../types';
import { portfolioData } from '../data/portfolioData';

// Sub-component to handle individual project card logic (like image loading)
const ProjectCard: React.FC<{ project: Project; index: number; isVisible: boolean }> = ({ project, index, isVisible }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div 
      className={`
        group relative rounded-2xl overflow-hidden bg-surface border border-white/5 
        transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
      `}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Image Wrapper */}
      <div className="h-64 overflow-hidden relative bg-surfaceHighlight">
        <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent z-10 opacity-60"></div>
        
        {/* Placeholder while loading */}
        <div className={`absolute inset-0 flex items-center justify-center bg-surfaceHighlight transition-opacity duration-500 ${imgLoaded ? 'opacity-0' : 'opacity-100'}`}>
          <div className="w-8 h-8 border-2 border-white/10 border-t-white/30 rounded-full animate-spin"></div>
        </div>

        <img 
          src={project.imageUrl || 'https://picsum.photos/600/400'} 
          alt={project.title} 
          onLoad={() => setImgLoaded(true)}
          className={`
            w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700 ease-out
            ${imgLoaded ? 'opacity-100' : 'opacity-0'}
          `}
        />
        
        {/* Floating Action Buttons */}
        <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-white hover:text-black transition-colors">
              <ExternalLink size={18} />
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-white hover:text-black transition-colors">
              <Github size={18} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-20 -mt-12">
        <div className="bg-surface/90 backdrop-blur-sm p-4 rounded-xl border border-white/5 shadow-lg">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">{project.description}</p>
          
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span key={tech} className="text-xs font-medium px-2 py-1 bg-white/5 text-gray-300 rounded-md">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('id', { ascending: false });

        if (error || !data || data.length === 0) {
           console.log("Usando dados do arquivo portfolioData (falha Supabase ou vazio).");
           setProjects(portfolioData.projects);
        } else {
           const mappedProjects: Project[] = data.map((item: any) => ({
             id: item.id,
             title: item.title,
             description: item.description,
             technologies: item.technologies || [],
             imageUrl: item.image_url,
             demoUrl: item.demo_url,
             githubUrl: item.github_url
           }));
           setProjects(mappedProjects);
        }
      } catch (err) {
        console.error("Falha ao buscar projetos:", err);
        setProjects(portfolioData.projects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projetos" className="py-32 bg-surface/20" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex flex-col md:flex-row justify-between items-end mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Projetos <span className="text-gradient">Selecionados</span>
            </h2>
            <div className="h-1 w-20 bg-primary rounded-full"></div>
          </div>
          <a href={portfolioData.personal.github} target="_blank" rel="noreferrer" className="group flex items-center gap-2 text-white border-b border-transparent hover:border-primary pb-1 transition-all mt-4 md:mt-0">
            Ver repositórios <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} isVisible={isVisible} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;