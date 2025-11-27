import { Project, ExperienceItem, Skill } from '../types';
import React from 'react';

// Dados Pessoais e de Configuração do Site
export const portfolioData = {
  personal: {
    name: "Marcelo Teixeira",
    role: "Analista de Dados e Engenheiro",
    shortRole: "Dados e IA", // Usado no título da página e meta tags
    email: "contato@marcelo.ai",
    linkedin: "https://linkedin.com/in/marcelo",
    github: "https://github.com/marcelo",
    location: "São Paulo, Brasil",
    profileImage: "https://github.com/marcelodevteixeira/imagens/blob/2efa837102ba0645ffea36ebd316450015c91e96/unnamed%20(1).png?raw=true",
  },
  hero: {
    headlinePrefix: "Marcelo",
    headlineSuffix: "Teixeira",
    subHeadline: "Análise e Ciência de Dados, Dev & Inteligência Artificial",
    description: "Transformo dados brutos em decisões estratégicas através de pipelines robustos, dashboards intuitivos e modelos preditivos."
  },
  about: {
    title: "Além do Código",
    paragraphs: [
      "Sou um Analista de Dados e Engenheiro apaixonado por descobrir a história escondida nos números. Minha trajetória não é apenas sobre escrever algoritmos, mas sobre resolver problemas reais de negócios com precisão matemática e criatividade.",
      "Atualmente, foco em construir arquiteturas de dados escaláveis na nuvem e desenvolver modelos de IA que saem do laboratório para gerar valor direto ao usuário final."
    ],
    hobbies: ['Automação Residencial', 'Xadrez', 'Animes', 'Leitura']
  },
  skills: [
    "Python", "SQL", "JavaScript", "React", "Power BI", "Machine Learning", "AWS", "Docker"
  ],
  projects: [
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
  ] as Project[],
  experience: [
    {
      id: 1,
      company: "Tech Solutions Inc.",
      role: "Engenheiro de Dados Pleno",
      period: "2022 - Presente",
      responsibilities: [
        "Arquitetura de Data Lake na AWS processando TBs de dados.",
        "Redução de custos de infraestrutura em 30% via otimização Spark.",
        "Liderança técnica de squad focado em Machine Learning Ops."
      ]
    },
    {
      id: 2,
      company: "DataCorp",
      role: "Analista de BI",
      period: "2020 - 2022",
      responsibilities: [
        "Desenvolvimento de dashboards estratégicos para C-Level.",
        "Implementação de cultura Data-Driven em 4 departamentos.",
        "Modelagem de dados (Star Schema) para Data Warehouse."
      ]
    }
  ] as ExperienceItem[],
  certificates: [
    { id: 1, title: "AWS Solutions Architect", issuer: "Amazon Web Services", year: "2023", color: "from-orange-500 to-yellow-500" },
    { id: 2, title: "Google Data Engineer", issuer: "Google Cloud", year: "2023", color: "from-blue-500 to-cyan-500" },
    { id: 3, title: "TensorFlow Developer", issuer: "TensorFlow Certificate", year: "2022", color: "from-orange-600 to-red-600" },
    { id: 4, title: "Azure AI Engineer", issuer: "Microsoft", year: "2022", color: "from-blue-600 to-indigo-600" },
    { id: 5, title: "Professional Data Analyst", issuer: "IBM", year: "2021", color: "from-blue-400 to-blue-600" },
    { id: 6, title: "Meta Database Engineer", issuer: "Meta", year: "2021", color: "from-gray-500 to-gray-700" },
    { id: 7, title: "Spark & Hadoop Big Data", issuer: "Udacity", year: "2020", color: "from-yellow-400 to-orange-400" },
  ]
};
