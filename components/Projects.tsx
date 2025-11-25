import React, { useEffect, useState, useRef } from 'react';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import { Project } from '../types';

const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    title: "Sales Forecast AI",
    description: "Plataforma de inteligência preditiva que analisa tendências históricas para projetar receitas futuras com 94% de precisão.",
    technologies: ["Python", "TensorFlow", "FastAPI"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: 2,
    title: "Data Lakehouse Core",
    description: "Arquitetura unificada de dados processando 5TB+ diariamente com pipelines streaming em tempo real.",
    technologies: ["Spark", "Delta Lake", "AWS Glue"],
    imageUrl: "https://images.unsplash.com/photo-1558494949-efdeb6bf80d1?q=80&w=2682&auto=format&fit=crop",
    githubUrl: "#"
  },
  {
    id: 3,
    title: "Neural Vision Dashboard",
    description: "Dashboard analítico para monitoramento de sistemas de visão computacional em linhas de produção industriais.",
    technologies: ["React", "D3.js", "YOLOv8"],
    imageUrl: "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?q=80&w=2532&auto=format&fit=crop",
    demoUrl: "#",
    githubUrl: "#"
  }
];

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
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
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
           console.log("Usando mock data devido a erro ou base vazia:", error?.message);
           setProjects(MOCK_PROJECTS);
        } else {
           // Mapear campos do banco (snake_case) para o frontend (camelCase)
           const mappedProjects: Project[] = data.map((item: any) => ({
             id: item.id,
             title: item.title,
             description: item.description,
             technologies: item.technologies || [],
             imageUrl: item.image_url, // map snake_case to camelCase
             demoUrl: item.demo_url,   // map snake_case to camelCase
             githubUrl: item.github_url // map snake_case to camelCase
           }));
           setProjects(mappedProjects);
        }
      } catch (err) {
        console.error("Falha ao buscar projetos:", err);
        setProjects(MOCK_PROJECTS);
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
            <span className="text-primary font-medium tracking-wider uppercase text-sm">Portfólio</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">Projetos Selecionados</h2>
          </div>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="group flex items-center gap-2 text-white border-b border-transparent hover:border-primary pb-1 transition-all">
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