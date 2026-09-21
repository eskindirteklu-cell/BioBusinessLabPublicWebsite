import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Send, Sparkles, Loader2, BookOpen, RefreshCw } from 'lucide-react';
import { Button } from './Buttons.tsx';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

interface FloatingAIWidgetProps {
  enabled?: boolean;
}

export const FloatingAIWidget: React.FC<FloatingAIWidgetProps> = ({ enabled = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Hello! I am the **BioBusiness AI Learning Assistant**, trained on circular bioeconomy venture strategies, European Green Deal directives, and BioBusiness Lab course modules. How can I assist your entrepreneurial journey today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!enabled) return null;

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: query.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query }),
      });

      if (!res.ok) {
        throw new Error('Server returned an error');
      }

      const data = await res.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.reply || 'I am sorry, but I could not generate a response.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content:
            'I encountered an issue connecting to the AI learning service. Please check that your network is available, or review our Course Catalog and Resources directly.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    'Which course should I take for circular bio-refineries?',
    'What EU grants are available for bioeconomy startups?',
    'How do I perform an ISO-compliant LCA?',
  ];

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Floating Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 bg-[#007360] text-white rounded-full shadow-lg hover:bg-[#43AB98] hover:shadow-xl transition-colors duration-200 border border-white/20 focus:outline-hidden focus:ring-4 focus:ring-[#007360]/30 cursor-pointer group"
            aria-label="Open BioBusiness AI Learning Assistant"
          >
            <div className="relative">
              <Bot className="w-5 h-5 text-[#FFDE00]" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#38B942] rounded-full border border-[#007360] animate-pulse" />
            </div>
            <span className="text-xs font-bold tracking-wide">AI Learning Assistant</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-[90vw] sm:w-[380px] h-[520px] max-h-[85vh] bg-white border border-[#007360]/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-[#FFFBF3] border-b border-[#007360]/15 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#007360]/10 flex items-center justify-center text-[#007360]">
                  <Bot className="w-4 h-4 text-[#007360]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#333333] flex items-center gap-1.5">
                    BioBusiness AI Assistant
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#38B942]/20 text-[#008C45] font-semibold">
                      Online
                    </span>
                  </h4>
                  <p className="text-[10px] text-[#333333]/70">
                    Erasmus+ Circular Bioeconomy Tutor
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-[#333333]/60 hover:text-[#007360] hover:bg-[#007360]/10 transition-colors cursor-pointer"
                aria-label="Close assistant window"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Conversation list */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FFFBF3]/40 text-xs">
              {messages.map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex flex-col ${
                    m.role === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl p-3 leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-[#007360] text-white rounded-br-none shadow-xs'
                        : 'bg-white border border-[#007360]/15 text-[#333333] rounded-bl-none shadow-2xs'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{m.content}</div>
                  </div>
                  <span className="text-[9px] text-[#333333]/50 mt-1 px-1">{m.time}</span>
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-xs text-[#007360] p-2 bg-white rounded-lg border border-[#007360]/10 w-fit"
                >
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Formulating bioeconomy insights...</span>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Sample Prompts */}
            <div className="p-2 bg-white border-t border-[#007360]/10 overflow-x-auto flex gap-1.5 no-scrollbar">
              {samplePrompts.map((p, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSend(p)}
                  disabled={loading}
                  className="shrink-0 text-[10px] font-medium px-2 py-1 rounded-md bg-[#43AB98]/15 text-[#007360] hover:bg-[#43AB98]/25 transition-colors cursor-pointer"
                >
                  {p}
                </motion.button>
              ))}
            </div>

            {/* Input field */}
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-[#FFFBF3] border-t border-[#007360]/15 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about courses, LCA, funding..."
                className="flex-1 text-xs px-3 py-2 bg-white border border-[#007360]/20 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30 text-[#333333] placeholder-[#333333]/50"
                disabled={loading}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2 bg-[#007360] text-white rounded-lg hover:bg-[#43AB98] disabled:opacity-50 transition-colors shadow-xs cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
