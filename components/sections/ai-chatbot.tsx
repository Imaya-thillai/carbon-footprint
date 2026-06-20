'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your EcoTrack AI Assistant. Ask me how to reduce your carbon footprint!", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    const newMessages = [...messages, { text: userMsg, sender: 'user' }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });
      
      const data = await response.json();
      if (data.reply) {
        setMessages(prev => [...prev, { text: data.reply, sender: 'ai' }]);
      } else {
        setMessages(prev => [...prev, { text: "Sorry, I encountered an error. Please try again.", sender: 'ai' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { text: "Sorry, my servers are currently unreachable.", sender: 'ai' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-emerald-700 hover:scale-105 transition-all z-50 ${isOpen ? 'hidden' : 'block'}`}
        aria-label="Open AI Assistant Chat"
      >
        <span className="text-2xl" aria-hidden="true">🤖</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
            role="dialog"
            aria-label="AI Assistant Chat"
          >
            {/* Header */}
            <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🤖</span>
                <h3 className="font-bold">EcoTrack AI</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-emerald-200 focus:outline-none focus:ring-2 focus:ring-white rounded p-1"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 h-80 overflow-y-auto bg-gray-50 dark:bg-slate-950 flex flex-col gap-3">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-emerald-100 dark:bg-emerald-900/50 self-end text-emerald-900 dark:text-emerald-100 rounded-tr-none'
                      : 'bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 self-start text-gray-800 dark:text-gray-200 rounded-tl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 self-start text-gray-800 dark:text-gray-200 rounded-lg rounded-tl-none shadow-sm max-w-[80%] p-3 text-sm flex gap-1">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about reducing emissions..."
                className="flex-1 px-3 py-2 bg-gray-100 dark:bg-slate-800 rounded-lg text-sm text-gray-900 placeholder-gray-500 dark:text-gray-100 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label="Message AI assistant"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700 disabled:opacity-50 transition-colors flex items-center justify-center min-w-[60px]"
                aria-label="Send message"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
