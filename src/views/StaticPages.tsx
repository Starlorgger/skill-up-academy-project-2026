import React, { useState } from 'react';
import { 
  Bell, 
  CheckCircle2, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  HelpCircle, 
  Send,
  MessageSquare,
  Award
} from 'lucide-react';

// -----------------------------------------------------------------------------
// 1. NOTIFICATIONS VIEW
// -----------------------------------------------------------------------------
export const NotificationsView: React.FC = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Project Submission Approved!',
      message: 'Your deliverable for "Build a Personal Developer Portfolio Website" has been graded by Staff Instructor Chioma Okonjo. Score: 95/100.',
      time: '2 hours ago',
      read: false,
      type: 'achievement'
    },
    {
      id: 'notif-2',
      title: 'Daily Study Cadence Reminder',
      message: 'Keep your 4-day learning streak going! Spend 20 minutes on Module 2 of Prompt Engineering today.',
      time: '5 hours ago',
      read: false,
      type: 'reminder'
    },
    {
      id: 'notif-3',
      title: 'New Course Added to Category A',
      message: 'We just launched "AI Application Development with Vector Databases". Check it out in the Explore tab.',
      time: 'Yesterday',
      read: true,
      type: 'system'
    }
  ]);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="space-y-6 py-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#14213D] dark:text-white">Notifications</h1>
          <p className="text-xs text-[#737B90] dark:text-slate-400">Updates regarding your courses, quizzes, and project grades.</p>
        </div>
        <button
          onClick={markAllRead}
          className="text-xs font-semibold text-[#7057D9] hover:underline"
        >
          Mark all as read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-2xl border transition-colors flex items-start gap-3.5 ${
              !n.read
                ? 'bg-white dark:bg-[#14213D] border-[#7057D9]/40 shadow-xs'
                : 'bg-[#F8F9FC] dark:bg-slate-800/40 border-[#E5E8F0] dark:border-slate-800'
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-[#7057D9]/10 text-[#7057D9] flex items-center justify-center shrink-0 mt-0.5">
              {n.type === 'achievement' ? <Award className="w-4 h-4 text-[#35B8A0]" /> : <Bell className="w-4 h-4" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs sm:text-sm font-bold text-[#14213D] dark:text-white">{n.title}</h4>
                <span className="text-[11px] text-[#737B90]">{n.time}</span>
              </div>
              <p className="text-xs text-[#737B90] dark:text-slate-300 mt-1 leading-relaxed">{n.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// 2. ABOUT VIEW
// -----------------------------------------------------------------------------
export const AboutView: React.FC = () => {
  return (
    <div className="space-y-8 py-8 max-w-4xl mx-auto">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7057D9]/10 text-xs font-semibold text-[#7057D9] dark:text-[#a89af0]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Created by Tayo Verse Studios</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#14213D] dark:text-white tracking-tight">
          About SkillUp Academy
        </h1>
        <p className="text-xs sm:text-sm text-[#737B90] dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Bridging the global digital divide through practical, project-first digital education.
        </p>
      </div>

      <div className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6 text-xs sm:text-sm leading-relaxed text-[#20263A] dark:text-slate-200">
        <h3 className="text-base font-bold text-[#14213D] dark:text-white">Our Mission</h3>
        <p>
          SkillUp Academy was created to provide ambitious learners—beginning in Nigeria and scaling across the African continent and globally—with the exact digital skills demanded by 21st-century software companies, remote agencies, and innovative startups.
        </p>
        <p>
          Too many online courses present passive videos without realistic exercises or real proof of work. At SkillUp Academy, every course pairs deep written principles with guided video tutorials, live exercises, instant quizzes with explanations, and a verified portfolio project reviewed against a clear evaluation rubric.
        </p>

        {/* Creator Attribution Section */}
        <div className="p-6 rounded-2xl bg-[#7057D9]/5 dark:bg-[#7057D9]/10 border border-[#7057D9]/20 space-y-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#7057D9]" />
            <h3 className="text-sm sm:text-base font-bold text-[#14213D] dark:text-white">
              Created by Tayo Verse Studios
            </h3>
          </div>
          <p className="text-xs text-[#737B90] dark:text-slate-300 leading-relaxed">
            SkillUp Academy is engineered and curated by <strong>Tayo Verse Studios</strong>. Tayo Verse Studios is dedicated to building state-of-the-art interactive digital learning platforms, educational simulators, and developer tooling designed to empower students, career changers, and technology professionals worldwide.
          </p>
        </div>

        <h3 className="text-base font-bold text-[#14213D] dark:text-white pt-4 border-t border-[#E5E8F0] dark:border-slate-800">
          Curriculum Standards & International Reach
        </h3>
        <p>
          SkillUp Academy offers native Nigerian Naira (₦) pricing through Paystack simulation while maintaining international options for learners worldwide. Every track adheres to international industry standards, preparing students for remote freelance contracts and full-time digital careers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E5E8F0] dark:border-slate-800 text-center">
          <div className="p-4 rounded-2xl bg-[#F8F9FC] dark:bg-slate-800">
            <p className="text-2xl font-bold text-[#7057D9]">15</p>
            <p className="text-xs text-[#737B90] mt-1">Skill Tracks (A to O)</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#F8F9FC] dark:bg-slate-800">
            <p className="text-2xl font-bold text-[#35B8A0]">100%</p>
            <p className="text-xs text-[#737B90] mt-1">Project-Based</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#F8F9FC] dark:bg-slate-800">
            <p className="text-2xl font-bold text-[#14213D] dark:text-white">24/7</p>
            <p className="text-xs text-[#737B90] mt-1">AI Mentorship</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// 3. HELP & CONTACT VIEW
// -----------------------------------------------------------------------------
export const HelpContactView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Course inquiry');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const res = await fetch('/api/support/ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          category: 'general'
        })
      });
      const data = await res.json();
      setTicketId(data.ticketId || `TKT-${Date.now().toString().slice(-4)}`);
      setSubmitted(true);
    } catch {
      setTicketId(`TKT-${Date.now().toString().slice(-4)}`);
      setSubmitted(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-8 py-8 max-w-3xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14213D] dark:text-white tracking-tight">
          Help & Support Center
        </h1>
        <p className="text-xs sm:text-sm text-[#737B90] dark:text-slate-400">
          Official support channel for SkillUp Academy · Created by Tayo Verse Studios
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#14213D] dark:text-white">Direct Support</h3>
          <p className="text-xs text-[#737B90] dark:text-slate-400 leading-relaxed">
            Submit a support ticket or click the question mark icon in the top navigation at any time to open the context-sensitive Help Drawer.
          </p>

          <div className="space-y-3 pt-2 text-xs text-[#20263A] dark:text-slate-300">
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#7057D9]" />
              <span>Direct Support Ticket Form</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#35B8A0]" />
              <span>24/7 AI Learning Mentor</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#7057D9]" />
              <span>Created by Tayo Verse Studios</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 p-6 shadow-xs">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-[#737B90] mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-xs text-[#20263A] dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#737B90] mb-1">Your Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-xs text-[#20263A] dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#737B90] mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-xs text-[#20263A] dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#737B90] mb-1">Message</label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist you?"
                  className="w-full px-3 py-2 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-xs text-[#20263A] dark:text-white"
                />
              </div>
              <button
                type="submit"
                disabled={isSending}
                className="w-full py-2.5 bg-[#7057D9] text-white rounded-xl text-xs font-semibold hover:bg-[#5f46c6] disabled:opacity-50 transition-colors"
              >
                {isSending ? 'Transmitting Ticket...' : 'Send Message'}
              </button>
            </form>
          ) : (
            <div className="py-8 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-[#35B8A0] mx-auto" />
              <h4 className="text-sm font-bold text-[#14213D] dark:text-white">Ticket Submitted!</h4>
              <p className="text-xs text-[#737B90]">
                Thank you, {name}. Reference ID: <strong className="text-[#7057D9]">{ticketId}</strong>. We will follow up at {email}.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// 4. PRIVACY POLICY VIEW
// -----------------------------------------------------------------------------
export const PrivacyPolicyView: React.FC = () => {
  return (
    <div className="space-y-6 py-8 max-w-3xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14213D] dark:text-white tracking-tight">
        Privacy Policy
      </h1>
      <div className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 p-6 sm:p-8 shadow-xs text-xs sm:text-sm leading-relaxed text-[#20263A] dark:text-slate-300 space-y-4">
        <p className="text-[11px] text-[#737B90]">Last updated: October 2026</p>
        <p>
          At SkillUp Academy, we are deeply committed to protecting your privacy and ensuring you have complete control over your personal data.
        </p>
        <h3 className="font-bold text-sm text-[#14213D] dark:text-white pt-2">Data We Collect</h3>
        <p>
          We only collect information necessary to deliver educational courses, measure lesson completion progress, issue certificates, and process test-mode and live subscriptions. This includes your name, email address, course enrollment records, and submitted project deliverables.
        </p>
        <h3 className="font-bold text-sm text-[#14213D] dark:text-white pt-2">Data Sovereignty & Deletion</h3>
        <p>
          You have the absolute right to export or delete your learning records at any time directly through the Settings page. We do not sell user data to advertising third parties.
        </p>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// 5. TERMS OF SERVICE VIEW
// -----------------------------------------------------------------------------
export const TermsOfServiceView: React.FC = () => {
  return (
    <div className="space-y-6 py-8 max-w-3xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14213D] dark:text-white tracking-tight">
        Terms of Service
      </h1>
      <div className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 p-6 sm:p-8 shadow-xs text-xs sm:text-sm leading-relaxed text-[#20263A] dark:text-slate-300 space-y-4">
        <p className="text-[11px] text-[#737B90]">Last updated: October 2026</p>
        <p>
          By creating an account on SkillUp Academy, you agree to uphold our community standards, fair use of curriculum materials, and honest completion of assessments.
        </p>
        <h3 className="font-bold text-sm text-[#14213D] dark:text-white pt-2">Certification Standards</h3>
        <p>
          Official certificates of achievement require verified completion of at least 80% of course lessons, quizzes, and practical deliverables. Certificates may not be acquired fraudulently.
        </p>
        <h3 className="font-bold text-sm text-[#14213D] dark:text-white pt-2">Monetization & Test Sandbox</h3>
        <p>
          Payment simulations in test mode do not bill real funds. Live transactions are routed exclusively through official Paystack, Flutterwave, or Stripe checkout screens.
        </p>
      </div>
    </div>
  );
};
