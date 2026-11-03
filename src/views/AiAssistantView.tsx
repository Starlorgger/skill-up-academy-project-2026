import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User as UserIcon, 
  RefreshCw, 
  Lightbulb, 
  Code, 
  HelpCircle,
  Compass,
  ArrowRight
} from 'lucide-react';

export const AiAssistantView: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Array<{ id: string; sender: 'user' | 'assistant'; text: string }>>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: `Hello ${user.name}! I am your dedicated SkillUp AI Learning Assistant powered by Gemini 3.8. 

I'm here to accelerate your journey in AI engineering, software coding, Figma design, data science, and freelancing. Ask me to:
• Explain difficult technical concepts with simple real-world analogies
• Provide debugging hints when your code errors out
• Generate customized practice quiz questions
• Review your portfolio project ideas or proposal drafts`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState<'beginner' | 'advanced'>('beginner');

  const handleSend = async (customPrompt?: string) => {
    const text = customPrompt || input;
    if (!text.trim() || loading) return;

    const userMsg = { id: `u-${Date.now()}`, sender: 'user' as const, text };
    setMessages(prev => [...prev, userMsg]);
    if (!customPrompt) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          userLevel: level,
          contextTopic: 'Full Platform AI Assistant'
        })
      });

      const data = await res.json();
      setMessages(prev => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          sender: 'assistant' as const,
          text: data.reply || 'Here to support your learning!'
        }
      ]);
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          sender: 'assistant' as const,
          text: 'Remember: continuous small practice sessions beat long gaps. What specific topic should we break down together?'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const topicShortcuts = [
    { title: 'Explain RAG vs Fine-tuning', prompt: 'What is the practical difference between Retrieval-Augmented Generation (RAG) and Fine-Tuning in simple language?' },
    { title: 'React State vs Props', prompt: 'Can you explain the difference between Props and State in React with an everyday real-world analogy?' },
    { title: 'Win Freelance Proposal Hook', prompt: 'Write a 3-sentence high-converting opening hook for an Upwork job posting looking for a React developer.' },
    { title: 'Figma Auto-Layout Mental Model', prompt: 'How does Figma Auto-Layout correspond to CSS Flexbox? Explain simply.' }
  ];

  return (
    <div className="py-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E8F0] dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7057D9]/10 text-xs font-semibold text-[#7057D9] dark:text-[#a89af0] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Learning Assistant · Gemini 3.8</span>
          </div>
          <h1 className="text-2xl font-bold text-[#14213D] dark:text-white">
            SkillUp AI Learning Mentor
          </h1>
        </div>

        {/* Level Toggle */}
        <div className="flex items-center p-1 bg-white dark:bg-[#14213D] rounded-xl border border-[#E5E8F0] dark:border-slate-800 text-xs">
          <button
            onClick={() => setLevel('beginner')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              level === 'beginner' ? 'bg-[#7057D9] text-white' : 'text-[#737B90]'
            }`}
          >
            Beginner Explanations
          </button>
          <button
            onClick={() => setLevel('advanced')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              level === 'advanced' ? 'bg-[#7057D9] text-white' : 'text-[#737B90]'
            }`}
          >
            Advanced Technical Depth
          </button>
        </div>
      </div>

      {/* Suggested Topics Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {topicShortcuts.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(item.prompt)}
            className="p-3 bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 text-left hover:border-[#7057D9] transition-all flex items-center justify-between text-xs group"
          >
            <span className="font-semibold text-[#20263A] dark:text-white group-hover:text-[#7057D9]">
              {item.title}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[#737B90] group-hover:text-[#7057D9] group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>

      {/* Chat Window */}
      <div className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 shadow-sm flex flex-col h-[520px] overflow-hidden">
        {/* Messages Stream */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-[#7057D9]/10 text-[#7057D9] flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                  m.sender === 'user'
                    ? 'bg-[#7057D9] text-white rounded-tr-xs'
                    : 'bg-[#F8F9FC] dark:bg-slate-800/80 text-[#20263A] dark:text-slate-100 border border-[#E5E8F0] dark:border-slate-700/60 rounded-tl-xs'
                }`}
              >
                {m.text}
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-[#14213D] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <UserIcon className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#7057D9]/10 text-[#7057D9] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-[#F8F9FC] dark:bg-slate-800 p-3.5 rounded-xl border border-[#E5E8F0] dark:border-slate-700 flex items-center gap-2 text-xs text-[#737B90]">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#7057D9]" />
                <span>Formulating tailored pedagogical guidance...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-[#E5E8F0] dark:border-slate-800 bg-[#F8F9FC]/60 dark:bg-slate-900/40">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask anything about coding, AI, projects, or digital freelancing..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-3 bg-white dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-xs sm:text-sm text-[#20263A] dark:text-white focus:outline-none focus:border-[#7057D9]"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-5 py-3 bg-[#7057D9] hover:bg-[#5f46c6] disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
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
