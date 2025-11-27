import React, { useRef, useState, useEffect } from 'react';
import { BadgeCheck } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

// Tripling the data to create a seamless infinite loop buffer
const infiniteCertificates = [...portfolioData.certificates, ...portfolioData.certificates, ...portfolioData.certificates];

const Certificates: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Reveal Animation Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    
    return () => observer.disconnect();
  }, []);

  // Auto-scroll logic (slow drift) with infinite loop reset
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (!isDown && !isHovering && sliderRef.current) {
        sliderRef.current.scrollLeft += 0.5; // Speed of drift

        // Infinite Loop Logic:
        const oneSetWidth = sliderRef.current.scrollWidth / 3;
        
        if (sliderRef.current.scrollLeft >= oneSetWidth) {
          sliderRef.current.scrollLeft = 0; 
        } 
        else if (sliderRef.current.scrollLeft <= 0) {
           sliderRef.current.scrollLeft = oneSetWidth;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDown, isHovering]);

  // Drag Logic
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    setIsHovering(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast multiplier
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section ref={sectionRef} className="py-20 bg-background relative border-b border-white/5 overflow-hidden">
      
      {/* Container aligned with the rest of the site (Skills, Projects, etc.) */}
      <div className={`max-w-6xl mx-auto px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        {/* Standardized Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Certificações & <span className="text-gradient">Licenças</span>
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-6"></div>
          
          <p className="text-gray-400 max-w-xl text-lg">
            Validações oficiais de expertise em nuvem, dados e inteligência artificial.
          </p>
        </div>

        {/* Carousel Wrapper with relative positioning for masks */}
        <div className="relative group">
          
          {/* Fade Edges Masks - Now inside the container limits */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

          {/* Slider */}
          <div 
            ref={sliderRef}
            className={`
              flex gap-6 overflow-x-auto no-scrollbar py-4
              select-none
            `}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
          >
            {infiniteCertificates.map((cert, index) => (
              <div 
                key={`${cert.id}-${index}`}
                className="flex-shrink-0 w-96 bg-surface/30 backdrop-blur-md border border-white/5 rounded-2xl p-5 flex items-center gap-5 hover:bg-surface/50 hover:border-primary/20 transition-all duration-300 group"
              >
                {/* Image Placeholder - Increased size for better visibility */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                  <BadgeCheck className="text-white drop-shadow-md" size={32} />
                </div>

                {/* Content */}
                <div className="flex flex-col">
                  <span className="text-white font-semibold text-base leading-tight group-hover:text-primary transition-colors">
                    {cert.title}
                  </span>
                  <span className="text-gray-500 text-sm mt-1.5">
                    {cert.issuer} • {cert.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;