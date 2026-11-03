import React, { useState, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User as UserIcon, RefreshCw, Lightbulb, Code, HelpCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  contextTopic?: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  contextTopic
}) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello ${user.name}! I am your SkillUp Learning Assistant. Ask me anything about ${
        contextTopic || 'AI engineering, web coding, design, or freelancing'
      }. I can explain difficult topics simply, guide you through code, or test your comprehension!`,
      timestamp: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [assistantLevel, setAssistantLevel] = useState<'beginner' | 'advanced'>('beginner');
  const [aiStatus, setAiStatus] = useState<{ available: boolean; model: string; mode: string }>({
    available: true,
    model: 'gemini-3.8-flash',
    mode: 'live'
  });

  useEffect(() => {
    if (isOpen) {
      fetch('/api/assistant/status')
        .then(r => r.json())
        .then(data => {
          if (data) {
            setAiStatus({
              available: data.available ?? true,
              model: data.model || 'gemini-3.8-flash',
              mode: data.mode || (data.available ? 'live' : 'demo')
            });
          }
        })
        .catch(() => {
          setAiStatus({ available: false, model: 'Pedagogical Engine', mode: 'demo' });
        });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || inputValue;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!messageText) setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          contextTopic: contextTopic || 'General Digital Skills',
          userLevel: assistantLevel
        })
      });

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'I am processing your question. Please try again.',
        timestamp: 'Just now'
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `ast-${Date.now()}`,
          sender: 'assistant',
          text: 'I ran into a temporary connection issue. However, remember: the best way to master digital skills is by breaking down each concept and testing code step-by-step.',
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const currentTopic = contextTopic || 'this topic';

  const quickPrompts = [
    { label: 'Explain this topic simply', text: `Explain ${currentTopic} simply in plain language with a beginner-friendly analogy.` },
    { label: 'Give me an example', text: `Give me a clear, realistic example illustrating how ${currentTopic} works in practice.` },
    { label: 'Test my understanding', text: `Test my understanding of ${currentTopic} with a practice question and explanation.` },
    { label: 'Help me fix my code', text: `Help me fix my code: What are the most common syntax errors and bugs when implementing ${currentTopic}?` },
    { label: 'Give me a practical project', text: `Give me a practical, portfolio-ready project challenge for ${currentTopic}.` },
    { label: 'What should I learn next?', text: `What should I learn next after mastering ${currentTopic} to advance my digital career?` }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl h-[620px] bg-white dark:bg-[#14213D] rounded-2xl shadow-2xl border border-[#E5E8F0] dark:border-slate-800 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E5E8F0] dark:border-slate-800 flex items-center justify-between bg-[#F8F9FC] dark:bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7057D9] to-[#35B8A0] flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#14213D] dark:text-white">AI Learning Mentor</h3>
                {aiStatus.available && aiStatus.mode === 'live' ? (
                  <span className="text-[11px] font-semibold text-[#35B8A0] bg-[#35B8A0]/10 px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#35B8A0]"></span>
                    Gemini 3.8 Flash (Live)
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Pedagogical Engine (Demo Mode)
                  </span>
                )}
              </div>
              <p className="text-xs text-[#737B90] dark:text-slate-400 truncate max-w-xs">
                Context: {contextTopic || 'Digital Skills Mentorship'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Level Toggle */}
            <div className="flex items-center p-0.5 bg-white dark:bg-slate-800 rounded-lg border border-[#E5E8F0] dark:border-slate-700 text-xs">
              <button
                onClick={() => setAssistantLevel('beginner')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  assistantLevel === 'beginner'
                    ? 'bg-[#7057D9] text-white shadow-xs'
                    : 'text-[#737B90] hover:text-[#14213D] dark:hover:text-white'
                }`}
              >
                Beginner
              </button>
              <button
                onClick={() => setAssistantLevel('advanced')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  assistantLevel === 'advanced'
                    ? 'bg-[#7057D9] text-white shadow-xs'
                    : 'text-[#737B90] hover:text-[#14213D] dark:hover:text-white'
                }`}
              >
                Advanced
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#737B90] hover:text-[#14213D] dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-[#7057D9]/10 text-[#7057D9] flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#7057D9] text-white rounded-tr-xs'
                    : 'bg-[#F8F9FC] dark:bg-slate-800/80 text-[#20263A] dark:text-slate-100 border border-[#E5E8F0] dark:border-slate-700/60 rounded-tl-xs whitespace-pre-line'
                }`}
              >
                {msg.text}
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-[#14213D] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <UserIcon className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#7057D9]/10 text-[#7057D9] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-[#F8F9FC] dark:bg-slate-800 p-3 rounded-xl border border-[#E5E8F0] dark:border-slate-700 flex items-center gap-2 text-xs text-[#737B90]">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#7057D9]" />
                <span>Thinking carefully and drafting explanation...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Prompts Strip */}
        <div className="px-5 py-2 border-t border-[#E5E8F0] dark:border-slate-800 bg-[#F8F9FC]/60 dark:bg-slate-900/40 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qp.text)}
              className="text-[11px] font-medium text-[#7057D9] dark:text-[#a89af0] bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-[#E5E8F0] dark:border-slate-700 hover:border-[#7057D9] whitespace-nowrap transition-colors flex items-center gap-1.5"
            >
              <Lightbulb className="w-3 h-3 text-amber-500" />
              {qp.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-[#E5E8F0] dark:border-slate-800 bg-white dark:bg-[#14213D]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask a question about this lesson, code, or project..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-xs sm:text-sm text-[#20263A] dark:text-white focus:outline-none focus:border-[#7057D9]"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="px-4 py-2.5 bg-[#7057D9] hover:bg-[#5f46c6] disabled:opacity-50 text-white rounded-xl font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-colors focus:outline-none"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
