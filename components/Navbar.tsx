import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = ['sobre', 'habilidades', 'projetos', 'experiencia', 'contato'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Detecta se a seção está visível na parte superior da tela
          return rect.top >= -100 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: 'Sobre', href: '#sobre', id: 'sobre' },
    { name: 'Habilidades', href: '#habilidades', id: 'habilidades' },
    { name: 'Projetos', href: '#projetos', id: 'projetos' },
    { name: 'Experiência', href: '#experiencia', id: 'experiencia' },
    { name: 'Contato', href: '#contato', id: 'contato' },
  ];

  return (
    <>
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 border-b ${
          scrolled 
            ? 'bg-background/80 backdrop-blur-xl border-white/5 py-4' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-2xl font-bold tracking-tighter text-white z-50">
            M<span className="text-primary">.</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full hover:bg-white/5 ${
                  activeSection === link.id ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span>
                )}
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white focus:outline-none z-50 p-2 rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay Menu */}
      <div 
        className={`fixed inset-0 bg-black/95 backdrop-blur-3xl z-40 flex flex-col items-center justify-center space-y-8 md:hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {navLinks.map((link, idx) => (
          <a
            key={link.name}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.id)}
            className={`text-3xl font-light text-white transition-all duration-300 transform ${
              isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: `${idx * 50}ms` }}
          >
            {link.name}
          </a>
        ))}
      </div>
    </>
  );
};

export default Navbar;