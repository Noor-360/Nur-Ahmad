import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'আসসালামু আলাইকুম! আমি বাংলা নিউজ মিডিয়ার এআই অ্যাসিস্ট্যান্ট। আমি আপনাকে কীভাবে সাহায্য করতে পারি?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Filter out the initial greeting for history to keep context clean, or map properly
      // We map the existing state (excluding the just added user message which is handled by sendMessage)
      const history = messages
        .filter(msg => msg.text !== 'Loading...') // Safety check
        .map(msg => ({
          role: msg.role,
          parts: [{ text: msg.text }]
        }));

      const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        history: history,
        config: {
            systemInstruction: "You are a helpful, polite, and knowledgeable AI assistant for a Bangla News Media app. Your primary language is Bengali. Answer user queries about news, general knowledge, or the app features concisely in Bengali.",
        }
      });

      const result = await chat.sendMessage({ message: userMessage });
      const responseText = result.text;

      if (responseText) {
        setMessages(prev => [...prev, { role: 'model', text: responseText }]);
      } else {
         setMessages(prev => [...prev, { role: 'model', text: "দুঃখিত, কোনো উত্তর পাওয়া যায়নি।" }]);
      }

    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "দুঃখিত, একটি ত্রুটি হয়েছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Chat Window */}
      {isOpen && (
        <div className={`
          mb-4 w-[350px] max-w-[90vw] h-[500px] max-h-[70vh]
          bg-white/90 dark:bg-[#0d0221]/90 backdrop-blur-xl
          border border-gray-200 dark:border-[#00f5ff]/30
          rounded-2xl shadow-2xl flex flex-col overflow-hidden
          animate-[fadeIn_0.3s_ease-out] origin-bottom-right
        `}>
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1a0a52] to-[#4a00e0] p-4 flex justify-between items-center border-b border-[#00f5ff]/30">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <i className="fas fa-robot text-white text-sm"></i>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">এআই অ্যাসিস্ট্যান্ট</h3>
                <span className="flex items-center gap-1 text-[10px] text-[#00f5ff]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#39ff14] animate-pulse"></span>
                  অনলাইন
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`
                  max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed
                  ${msg.role === 'user' 
                    ? 'bg-gradient-to-r from-[#4a00e0] to-[#00b4ff] text-white rounded-tr-none' 
                    : 'bg-gray-100 dark:bg-[#1a0a52] border border-gray-200 dark:border-[#00f5ff]/20 text-gray-800 dark:text-gray-200 rounded-tl-none shadow-sm'}
                `}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                 <div className="bg-gray-100 dark:bg-[#1a0a52] p-3 rounded-2xl rounded-tl-none border border-gray-200 dark:border-[#00f5ff]/20">
                   <div className="flex gap-1">
                     <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                     <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                     <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                   </div>
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 bg-gray-50 dark:bg-[#1a0a52]/50 border-t border-gray-200 dark:border-[#00f5ff]/20 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="এখানে লিখুন..."
              className="flex-1 bg-white dark:bg-[#0a0014] text-gray-800 dark:text-white text-sm rounded-full px-4 py-2 border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-[#00f5ff] transition-colors"
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#4a00e0] text-white flex items-center justify-center shadow-lg hover:shadow-[#00f5ff]/30 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all"
            >
              <i className="fas fa-paper-plane text-xs"></i>
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-14 h-14 rounded-full flex items-center justify-center
          text-white shadow-[0_0_20px_rgba(0,245,255,0.4)]
          transition-all duration-300 hover:scale-110 active:scale-95
          ${isOpen 
            ? 'bg-[#ff0050] rotate-90' 
            : 'bg-gradient-to-r from-[#00f5ff] to-[#4a00e0] animate-bounce-slow'}
        `}
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-comment-dots'} text-2xl`}></i>
      </button>
    </div>
  );
};

export default ChatWidget;