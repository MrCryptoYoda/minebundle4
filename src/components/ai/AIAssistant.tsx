import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Bot, X, Send, Sparkles, Plus, Mic, AudioLines } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { AiOrb } from './AiOrb';

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    { role: 'assistant', text: 'Hello, How can I help you?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', text: inputValue }]);
    const userQuery = inputValue;
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      let response = "I can help with that. Could you provide more specific details?";
      
      if (userQuery.toLowerCase().includes('lithium')) {
        response = "I found 12 active Lithium projects in Western Australia. Would you like to filter by 'Hard Rock' or 'Brine'?";
      } else if (userQuery.toLowerCase().includes('drill')) {
        response = "We have 5 verified drilling contractors available for projects in Q3. Shall I show you their profiles?";
      } else if (userQuery.toLowerCase().includes('price') || userQuery.toLowerCase().includes('cost')) {
        response = "Our Pro plan starts at $199/mo. It includes unlimited data room access and advanced AI alerts.";
      }

      setMessages(prev => [...prev, { role: 'assistant', text: response }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl flex items-center justify-center z-50 group p-0 overflow-hidden border-2 border-white/10 bg-black hover:scale-105 transition-transform duration-300"
          >
            <div className="relative w-full h-full">
              <AiOrb className="w-full h-full absolute inset-0" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 w-[380px] z-50"
          >
            <div className="relative bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-[32px] flex flex-col h-[600px] overflow-hidden">
              
              {/* Header */}
              <div className="flex items-center justify-between p-6 pb-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-slate-900 rounded-full flex items-center justify-center shadow-sm overflow-hidden border border-slate-800">
                    <AiOrb className="w-full h-full scale-150" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Minexchange AI</h3>
                    <p className="text-xs text-slate-500 font-medium">Digital assistant</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-slate-800 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    key={idx}
                    className={cn(
                      "flex w-full",
                      msg.role === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] px-5 py-3 text-sm shadow-sm",
                        msg.role === 'user' 
                          ? "bg-brand-orange text-white rounded-2xl rounded-tr-sm" 
                          : "bg-white text-slate-700 rounded-2xl rounded-tl-sm"
                      )}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 pb-6">
                <form onSubmit={handleSend} className="flex items-center gap-3">
                  {/* Plus Button */}
                  <button 
                    type="button"
                    className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-400 hover:text-slate-600 transition-colors shrink-0"
                  >
                    <Plus className="h-5 w-5" />
                  </button>

                  {/* Input Field */}
                  <div className="flex-1 relative">
                    <input 
                      className="w-full h-10 bg-white rounded-full pl-4 pr-10 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none shadow-sm focus:ring-2 focus:ring-brand-orange/20"
                      placeholder="Chat here.."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <Mic className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Send/Audio Button */}
                  <button 
                    type="submit"
                    className="h-10 w-10 bg-black text-white rounded-full flex items-center justify-center shadow-md hover:bg-slate-800 transition-colors shrink-0"
                  >
                    {inputValue.trim() ? <Send className="h-4 w-4 ml-0.5" /> : <AudioLines className="h-4 w-4" />}
                  </button>
                </form>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
