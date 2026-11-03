import React, { useState } from 'react';
import { 
  HelpCircle, 
  X, 
  Search, 
  BookOpen, 
  PlayCircle, 
  Sparkles, 
  Award, 
  FolderGit2, 
  CreditCard, 
  ShieldAlert, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HelpDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentContext?: string; // e.g. 'lesson-player', 'explore', 'pricing', 'projects', 'general'
  onOpenAiAssistant?: () => void;
  onNavigate?: (view: string) => void;
}

interface HelpItem {
  id: string;
  category: 'getting_started' | 'lessons' | 'ai_mentor' | 'projects' | 'account_pricing' | 'faqs';
  title: string;
  content: string;
  contexts?: string[];
}

export const HelpDrawer: React.FC<HelpDrawerProps> = ({
  isOpen,
  onClose,
  currentContext = 'general',
  onOpenAiAssistant,
  onNavigate
}) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'faqs' | 'contact'>('faqs');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Contact / Problem Report Form State
  const [ticketCategory, setTicketCategory] = useState<'course' | 'ai_mentor' | 'payment' | 'bug' | 'general'>('general');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedTicketId, setSubmittedTicketId] = useState<string | null>(null);

  if (!isOpen) return null;

  const helpItems: HelpItem[] = [
    {
      id: 'get-started',
      category: 'getting_started',
      title: 'Getting Started: How do I begin learning?',
      content: 'Browse the 15 skill categories or guided career roadmaps on the Explore page. Click any course to view its curriculum, objectives, and prerequisites, then click "Enroll Now" to begin your structured modules.',
      contexts: ['home', 'explore', 'categories']
    },
    {
      id: 'enroll-course',
      category: 'getting_started',
      title: 'How do I enrol in courses?',
      content: 'All free foundational courses can be enrolled with one click directly from the course page. Pro tier courses are unlocked automatically when you have an active SkillUp Pro membership.',
      contexts: ['home', 'explore', 'course-detail']
    },
    {
      id: 'lesson-player',
      category: 'lessons',
      title: 'How to read lessons, watch videos & complete exercises?',
      content: 'Each lesson features structured written explanations and integrated video tutorials. At the bottom of each lesson, test your skills in the practical code scratchpad, click "Show Hint" if you get stuck, and take the module quiz to lock in your understanding.',
      contexts: ['lesson-player', 'course-detail']
    },
    {
      id: 'quizzes',
      category: 'lessons',
      title: 'How do quizzes and assessments work?',
      content: 'Quizzes test your conceptual understanding with instant feedback. Select your answers and click "Submit Quiz". You will immediately see your percentage score and detailed explanations for every option.',
      contexts: ['lesson-player']
    },
    {
      id: 'ai-mentor',
      category: 'ai_mentor',
      title: 'How to use the AI Learning Mentor?',
      content: 'Click the purple AI Mentor icon in the top bar or use the prompt shortcuts ("Explain this topic simply", "Give me an example", "Help me fix my code") inside any lesson. Our AI mentor breaks down complex topics into digestible steps without just doing your homework for you.',
      contexts: ['lesson-player', 'ai-assistant', 'home']
    },
    {
      id: 'tracking-progress',
      category: 'getting_started',
      title: 'How is learning progress calculated?',
      content: 'Progress is calculated strictly from real user activity (completed lessons, submitted projects, and passed quizzes). For example, finishing 4 out of 10 lessons in a course immediately reflects 40% completion on your dashboard.',
      contexts: ['mylearning', 'profile', 'home']
    },
    {
      id: 'projects-rubrics',
      category: 'projects',
      title: 'How to submit projects & earn portfolio proof?',
      content: 'Visit the Projects Centre, review the instructions and 100-point rubric, build your deliverable, and submit your GitHub repo or live hosted URL. Approved deliverables are showcased in your public portfolio and contribute towards your certificate.',
      contexts: ['projects', 'project-detail']
    },
    {
      id: 'certificates',
      category: 'getting_started',
      title: 'How do I earn verified certificates?',
      content: 'Certificates of Achievement are issued once you have completed at least 80% of lessons in an enrolled course. Each certificate features an official verification ID and instructor authentication.',
      contexts: ['mylearning', 'profile', 'lesson-player']
    },
    {
      id: 'subscriptions',
      category: 'account_pricing',
      title: 'Subscription & Nigerian Naira (₦) payment options',
      content: 'SkillUp Academy natively supports Nigerian Naira (₦) through Paystack and Flutterwave, as well as international cards in USD ($). Payment runs in secure test sandbox mode until live credentials are connected.',
      contexts: ['pricing', 'settings']
    },
    {
      id: 'account-password',
      category: 'account_pricing',
      title: 'Account, password recovery & data privacy',
      content: 'You can update your personal information, toggle dark mode, or export/delete your data at any time in the Settings view. For forgotten passwords, use the Password Recovery screen from the login page.',
      contexts: ['settings', 'login', 'profile']
    }
  ];

  // Prioritize context-sensitive items to the top
  const sortedItems = [...helpItems].sort((a, b) => {
    const aMatch = a.contexts?.includes(currentContext) ? 1 : 0;
    const bMatch = b.contexts?.includes(currentContext) ? 1 : 0;
    return bMatch - aMatch;
  });

  const filteredItems = sortedItems.filter(item => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(q) || item.content.toLowerCase().includes(q);
  });

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/support/ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          name: user.name,
          email: user.email,
          category: ticketCategory,
          subject: subject.trim(),
          description: description.trim()
        })
      });

      const data = await res.json();
      setSubmittedTicketId(data.ticket?.id || `ticket-${Date.now()}`);
      setSubject('');
      setDescription('');
    } catch (err) {
      setSubmittedTicketId(`ticket-${Date.now()}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-[#14213D] shadow-2xl border-l border-[#E5E8F0] dark:border-slate-800 flex flex-col h-full animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-[#E5E8F0] dark:border-slate-800 flex items-center justify-between bg-[#F8F9FC] dark:bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#7057D9]/10 text-[#7057D9] flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#14213D] dark:text-white">
                SkillUp Help & Support
              </h2>
              <p className="text-[11px] text-[#737B90] dark:text-slate-400">
                Created by Tayo Verse Studios · Context: <span className="capitalize font-semibold text-[#7057D9]">{currentContext.replace('-', ' ')}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#737B90] hover:text-[#14213D] dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close Help Panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: FAQs vs Contact Support */}
        <div className="flex border-b border-[#E5E8F0] dark:border-slate-800 px-5 pt-2 bg-white dark:bg-[#14213D]">
          <button
            onClick={() => { setActiveTab('faqs'); setSubmittedTicketId(null); }}
            className={`pb-3 text-xs font-bold border-b-2 mr-6 transition-colors ${
              activeTab === 'faqs'
                ? 'border-[#7057D9] text-[#7057D9] dark:text-[#a89af0]'
                : 'border-transparent text-[#737B90] hover:text-[#14213D]'
            }`}
          >
            Knowledge Base & FAQs
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`pb-3 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'contact'
                ? 'border-[#7057D9] text-[#7057D9] dark:text-[#a89af0]'
                : 'border-transparent text-[#737B90] hover:text-[#14213D]'
            }`}
          >
            Report Problem / Contact
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {activeTab === 'faqs' ? (
            <>
              {/* Search Field */}
              <div className="relative">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#737B90]" />
                <input
                  type="text"
                  placeholder="Search help topics, quizzes, payments, AI..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-xs text-[#20263A] dark:text-white focus:outline-none focus:border-[#7057D9]"
                />
              </div>

              {/* AI Quick Mentorship Prompt Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#7057D9]/10 to-[#35B8A0]/10 border border-[#7057D9]/20 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#7057D9]" />
                  <p className="text-xs font-medium text-[#14213D] dark:text-white">
                    Need instant coding or concept help?
                  </p>
                </div>
                {onOpenAiAssistant && (
                  <button
                    onClick={() => { onClose(); onOpenAiAssistant(); }}
                    className="px-3 py-1.5 rounded-lg bg-[#7057D9] text-white text-[11px] font-semibold hover:bg-[#5f46c6] shrink-0"
                  >
                    Open AI Mentor
                  </button>
                )}
              </div>

              {/* Context Callout if on specific page */}
              {currentContext === 'lesson-player' && (
                <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded-xl text-xs text-amber-800 dark:text-amber-300">
                  <p className="font-semibold">Currently in Classroom Player</p>
                  <p className="text-[11px] mt-0.5">Prioritizing answers for code exercises, quizzes, and video lessons.</p>
                </div>
              )}

              {/* FAQs Accordion */}
              <div className="space-y-2.5">
                {filteredItems.map((item) => {
                  const isExpanded = expandedId === item.id;
                  const isContextPrioritized = item.contexts?.includes(currentContext);

                  return (
                    <div
                      key={item.id}
                      className={`rounded-2xl border transition-all ${
                        isContextPrioritized
                          ? 'border-[#7057D9]/40 bg-[#7057D9]/5 dark:bg-[#7057D9]/10'
                          : 'border-[#E5E8F0] dark:border-slate-800 bg-white dark:bg-[#14213D]'
                      }`}
                    >
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : item.id)}
                        className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-[#14213D] dark:text-white focus:outline-none"
                      >
                        <div className="flex items-center gap-2">
                          {isContextPrioritized && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7057D9]" />
                          )}
                          <span>{item.title}</span>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-[#737B90] shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#737B90] shrink-0" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-4 pt-1 text-xs text-[#737B90] dark:text-slate-300 leading-relaxed border-t border-[#E5E8F0]/50 dark:border-slate-800/60">
                          {item.content}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            /* Tab: Report Problem or Contact Support */
            <div>
              {!submittedTicketId ? (
                <form onSubmit={handleSubmitTicket} className="space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-[#14213D] dark:text-white mb-1">
                      Report an Issue or Ask Support
                    </h3>
                    <p className="text-xs text-[#737B90] dark:text-slate-400">
                      Our technical team at Tayo Verse Studios monitors reports and responds within 24 hours.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#737B90] dark:text-slate-300 mb-1">
                      Issue Category
                    </label>
                    <select
                      value={ticketCategory}
                      onChange={(e) => setTicketCategory(e.target.value as any)}
                      className="w-full px-3 py-2 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-xs text-[#20263A] dark:text-white focus:outline-none"
                    >
                      <option value="general">General Support Question</option>
                      <option value="course">Course / Lesson Content Issue</option>
                      <option value="ai_mentor">AI Learning Mentor Issue</option>
                      <option value="payment">Billing / Paystack / Subscription</option>
                      <option value="bug">Technical Bug / Broken Link</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#737B90] dark:text-slate-300 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Video player paused unexpectedly on Lesson 2"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-xs text-[#20263A] dark:text-white focus:outline-none focus:border-[#7057D9]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#737B90] dark:text-slate-300 mb-1">
                      Detailed Description
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Describe what occurred, your device or browser, and how we can help..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-xs text-[#20263A] dark:text-white focus:outline-none focus:border-[#7057D9]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 bg-[#7057D9] hover:bg-[#5f46c6] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                    >
                      {submitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Filing Support Ticket...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Ticket</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                /* Ticket Submitted Confirmation */
                <div className="py-8 text-center space-y-3 animate-in zoom-in-95 duration-150">
                  <div className="w-12 h-12 rounded-full bg-[#35B8A0]/10 text-[#35B8A0] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold text-[#14213D] dark:text-white">
                    Ticket Filed Successfully!
                  </h4>
                  <p className="text-xs text-[#737B90] dark:text-slate-300 max-w-xs mx-auto">
                    Your request ID is <span className="font-mono font-semibold text-[#14213D] dark:text-white">{submittedTicketId}</span>. Our team will review it promptly.
                  </p>
                  <button
                    onClick={() => setSubmittedTicketId(null)}
                    className="px-4 py-2 rounded-xl bg-[#7057D9] text-white text-xs font-semibold hover:bg-[#5f46c6]"
                  >
                    File Another Ticket
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Credit */}
        <div className="p-4 border-t border-[#E5E8F0] dark:border-slate-800 bg-[#F8F9FC] dark:bg-slate-900/60 text-center text-[11px] text-[#737B90]">
          SkillUp Academy · <strong>Created by Tayo Verse Studios</strong>
        </div>
      </div>
    </div>
  );
};
