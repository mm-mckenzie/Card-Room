import React, { useState, useEffect, useRef } from 'react';
import { Send, X, Bot, Loader2, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

interface ChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  contextGameTitle?: string;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({ isOpen, onClose, contextGameTitle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hey there! 👋 I\'m your Game Buddy. Need any tips or help?', timestamp: Date.now() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: inputText, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      let prompt = inputText;
      if (contextGameTitle) {
        prompt = `[Context: Playing ${contextGameTitle}] ${inputText}`;
      }
      
      const responseText = await sendMessageToGemini(prompt);
      const aiMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[400px] bg-white border-l-4 border-hub-text/10 shadow-2xl z-50 flex flex-col font-sans">
      {/* Header */}
      <div className="p-5 border-b-2 border-gray-100 flex items-center justify-between bg-white">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-hub-secondary text-white rounded-xl shadow-sm rotate-3">
            <Bot size={24} />
          </div>
          <div>
            <h2 className="font-black text-hub-text text-lg">Game Buddy</h2>
            <p className="text-xs text-gray-500 font-bold">Always here to help!</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 text-gray-400 hover:text-hub-text hover:bg-gray-100 rounded-full transition-colors">
          <X size={24} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-grow overflow-y-auto p-5 space-y-6 custom-scrollbar bg-hub-bg">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[85%] p-4 text-sm font-medium shadow-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-hub-primary text-white rounded-3xl rounded-br-none' 
                  : 'bg-white text-hub-text border-2 border-gray-100 rounded-3xl rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-400 border-2 border-gray-100 rounded-3xl rounded-bl-none p-4 flex items-center space-x-2">
              <Loader2 size={18} className="animate-spin text-hub-primary" />
              <span className="text-xs font-bold">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-5 border-t-2 border-gray-100 bg-white">
        <div className="relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={contextGameTitle ? `Ask about ${contextGameTitle}...` : "Ask for a tip..."}
            className="w-full bg-gray-50 border-2 border-gray-200 focus:border-hub-primary rounded-2xl py-3.5 pl-5 pr-14 text-sm font-bold focus:outline-none focus:bg-white text-hub-text placeholder-gray-400 transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={!inputText.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-hub-primary text-white rounded-xl hover:bg-violet-600 disabled:opacity-50 disabled:hover:bg-hub-primary transition-colors shadow-sm"
          >
            <Send size={18} />
          </button>
        </div>
        <div className="flex justify-center items-center mt-3 gap-1 text-gray-400">
           <Sparkles size={12} />
           <p className="text-[10px] font-bold uppercase tracking-wider">
            Powered by Gemini
          </p>
        </div>
      </div>
    </div>
  );
};