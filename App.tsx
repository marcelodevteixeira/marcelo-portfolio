import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import ChatAssistant from './components/ChatAssistant';
import Certificates from './components/Certificates';
import CustomCursor from './components/CustomCursor';

function App() {
  useEffect(() => {
    console.log("System Checkpoint: save02");
  }, []);

  return (
    <div className="bg-background min-h-screen text-text font-sans antialiased selection:bg-primary selection:text-white">
      <CustomCursor />
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Certificates />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <footer className="py-8 border-t border-gray-800 text-center text-gray-500 text-sm bg-background">
        <p>© {new Date().getFullYear()} Marcelo Teixeira. Todos os direitos reservados.</p>
        <p className="mt-2 text-xs">Desenvolvido com React, Tailwind, Supabase & Gemini AI.</p>
        <p className="mt-1 text-[10px] text-gray-700 font-mono">v.save02</p>
      </footer>

      <ChatAssistant />
    </div>
  );
}

export default App;