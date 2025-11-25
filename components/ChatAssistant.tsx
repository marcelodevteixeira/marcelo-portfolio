import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Paperclip, Image as ImageIcon, Briefcase, Mail, Phone, Globe, MapPin } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage, ContactCardData } from '../types';

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Olá! Sou a IA do Marcelo. Posso analisar imagens de cartões de visita ou responder perguntas sobre o portfólio.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if (!input.trim() && !selectedImage) return;

    const currentImage = selectedImage;
    const currentInput = input;

    // Reset inputs immediately
    setInput('');
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';

    // Add user message
    const userMsg: ChatMessage = { 
      role: 'user', 
      text: currentInput || (currentImage ? "Analisar imagem anexada" : ""),
      attachment: currentImage || undefined
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Prepare history (simplified)
    const history = messages.map(m => `${m.role}: ${m.text}`);
    
    // Call API
    const responseText = await sendMessageToGemini(userMsg.text, history, currentImage || undefined);
    
    // Parse response for JSON (Contact Card)
    let finalResponseText = responseText;
    let cardData: ContactCardData | undefined = undefined;

    try {
      // Clean markdown code blocks if present (e.g. ```json ... ```)
      const cleanText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      
      // Look for JSON pattern
      const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed.cardData) {
          cardData = parsed.cardData;
          finalResponseText = "Analisei a imagem e extraí os seguintes dados:";
        }
      }
    } catch (e) {
      // Failed to parse JSON, stick to text
      console.log("Not a JSON response or failed to parse", e);
    }

    setIsTyping(false);
    setMessages(prev => [...prev, { 
      role: 'model', 
      text: finalResponseText,
      cardData: cardData
    }]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-surface border border-gray-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[600px] animate-fade-in-up">
          {/* Header */}
          <div className="bg-background border-b border-gray-800 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="text-primary w-5 h-5" />
              <span className="font-semibold text-white">Assistente Virtual IA</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-surface/50 space-y-6 scrollbar-thin scrollbar-thumb-gray-700">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                
                {/* Image Attachment (User) */}
                {msg.attachment && (
                  <div className="mb-2 max-w-[85%] rounded-xl overflow-hidden border border-gray-700">
                    <img src={msg.attachment} alt="Upload" className="w-full h-auto max-h-48 object-cover" />
                  </div>
                )}

                {/* Text Bubble */}
                <div 
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-primary text-white rounded-br-none' 
                      : 'bg-background border border-gray-700 text-gray-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Floating Contact Card (Model) */}
                {msg.cardData && (
                  <div className="mt-3 w-full max-w-[90%] bg-surfaceHighlight/50 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-lg relative overflow-hidden group hover:border-primary/40 transition-all">
                    {/* Decorative Gradient */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                          {msg.cardData.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-base leading-tight">{msg.cardData.name}</h4>
                          <p className="text-primary text-xs font-medium">{msg.cardData.role}</p>
                        </div>
                      </div>

                      {msg.cardData.company && (
                         <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                           <Briefcase size={12} />
                           <span>{msg.cardData.company}</span>
                         </div>
                      )}

                      <div className="h-px bg-white/10 w-full my-3"></div>

                      <div className="space-y-2">
                        {msg.cardData.email && (
                          <div className="flex items-center gap-2 text-gray-300 text-xs hover:text-white transition-colors cursor-pointer">
                            <Mail size={12} className="text-primary/70" />
                            <span>{msg.cardData.email}</span>
                          </div>
                        )}
                         {msg.cardData.phone && (
                          <div className="flex items-center gap-2 text-gray-300 text-xs hover:text-white transition-colors">
                            <Phone size={12} className="text-primary/70" />
                            <span>{msg.cardData.phone}</span>
                          </div>
                        )}
                        {msg.cardData.website && (
                          <div className="flex items-center gap-2 text-gray-300 text-xs hover:text-white transition-colors">
                            <Globe size={12} className="text-primary/70" />
                            <span>{msg.cardData.website}</span>
                          </div>
                        )}
                        {msg.cardData.location && (
                          <div className="flex items-center gap-2 text-gray-300 text-xs">
                            <MapPin size={12} className="text-primary/70" />
                            <span>{msg.cardData.location}</span>
                          </div>
                        )}
                      </div>
                      
                      {msg.cardData.summary && (
                         <div className="mt-3 p-2 bg-black/20 rounded-lg text-xs text-gray-400 italic">
                           "{msg.cardData.summary}"
                         </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-background border border-gray-700 p-3 rounded-2xl rounded-bl-none flex items-center gap-1">
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-background border-t border-gray-800 p-3">
            {/* Image Preview */}
            {selectedImage && (
              <div className="relative inline-block mb-2">
                <img src={selectedImage} alt="Preview" className="h-16 w-16 object-cover rounded-lg border border-gray-600" />
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                >
                  <X size={12} />
                </button>
              </div>
            )}

            <div className="flex gap-2 items-center">
              <input 
                type="file" 
                accept="image/*" 
                hidden 
                ref={fileInputRef}
                onChange={handleFileSelect}
              />
              
              <button 
                onClick={() => fileInputRef.current?.click()}
                className={`p-2 rounded-full transition-colors ${selectedImage ? 'text-primary bg-primary/10' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                title="Adicionar imagem"
              >
                <Paperclip size={20} />
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={selectedImage ? "Adicione um comentário..." : "Digite sua pergunta..."}
                className="flex-1 bg-surface border border-gray-700 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-primary placeholder-gray-500"
              />
              
              <button 
                onClick={handleSend}
                disabled={(!input.trim() && !selectedImage) || isTyping}
                className="p-2 bg-primary text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? 'bg-gray-700 text-white rotate-90' : 'bg-primary text-white hover:scale-110 hover:bg-blue-600'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
};

export default ChatAssistant;