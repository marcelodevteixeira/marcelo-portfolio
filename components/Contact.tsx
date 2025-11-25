import React, { useState, useRef, useEffect } from 'react';
import { Send, Linkedin, Github, Mail, CheckCircle } from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import { ContactForm } from '../types';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const { error } = await supabase.from('messages').insert([formData]);
      if (error) throw error;
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const inputClasses = "w-full bg-surfaceHighlight/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary focus:bg-surfaceHighlight transition-all duration-300 placeholder-transparent peer";
  const labelClasses = "absolute left-4 top-4 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-background peer-focus:px-2 pointer-events-none";

  return (
    <section id="contato" className="py-32 bg-background relative overflow-hidden" ref={sectionRef}>
      {/* Background Glow */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Vamos Construir o <span className="text-gradient">Futuro?</span></h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Tenho interesse em desafios que envolvam big data, automação inteligente e arquiteturas modernas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Info Column */}
          <div className={`space-y-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="bg-surface/30 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6">Canais Diretos</h3>
              
              <div className="space-y-6">
                <a href="mailto:contato@marcelo.ai" className="flex items-center gap-4 text-gray-300 hover:text-white group transition-colors">
                  <div className="p-3 bg-white/5 rounded-full group-hover:bg-primary/20 transition-colors">
                    <Mail className="text-primary" />
                  </div>
                  <span className="text-lg">contato@marcelo.ai</span>
                </a>
                
                <a href="#" className="flex items-center gap-4 text-gray-300 hover:text-white group transition-colors">
                  <div className="p-3 bg-white/5 rounded-full group-hover:bg-[#0077b5]/20 transition-colors">
                    <Linkedin className="text-[#0077b5]" />
                  </div>
                  <span className="text-lg">linkedin.com/in/marcelo</span>
                </a>
                
                <a href="#" className="flex items-center gap-4 text-gray-300 hover:text-white group transition-colors">
                  <div className="p-3 bg-white/5 rounded-full group-hover:bg-white/20 transition-colors">
                    <Github className="text-white" />
                  </div>
                  <span className="text-lg">github.com/marcelo</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Nome"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClasses}
                />
                <label htmlFor="name" className={labelClasses}>Seu Nome</label>
              </div>
              
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClasses}
                />
                <label htmlFor="email" className={labelClasses}>Seu Email</label>
              </div>

              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Mensagem"
                  value={formData.message}
                  onChange={handleChange}
                  className={`${inputClasses} resize-none`}
                />
                <label htmlFor="message" className={labelClasses}>Mensagem</label>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting' || status === 'success'}
                className={`
                  w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2
                  ${status === 'success' ? 'bg-green-600' : 'bg-gradient-to-r from-primary to-blue-600 hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02]'}
                  disabled:opacity-70 disabled:cursor-not-allowed
                `}
              >
                {status === 'submitting' ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : status === 'success' ? (
                  <>Enviado <CheckCircle size={20} /></>
                ) : (
                  <>Enviar Mensagem <Send size={18} /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;