import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { COURSES, CATEGORIES } from '../data/mockData';
import { Course, ProjectSubmission } from '../types';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  Users, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Check, 
  Clock, 
  AlertTriangle,
  FolderGit2,
  DollarSign,
  TrendingUp,
  CreditCard,
  Sparkles,
  Lock,
  Search,
  FileText,
  Download,
  ArrowUpRight
} from 'lucide-react';

interface AdminDashboardViewProps {
  onNavigate: (view: string) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ onNavigate }) => {
  const { user, switchRole, submissions, transactions, currency } = useAuth();
  const [courses, setCourses] = useState<Course[]>([...COURSES]);
  const [activeTab, setActiveTab] = useState<'courses' | 'submissions' | 'revenue'>('revenue');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [revenueSearch, setRevenueSearch] = useState('');
  const [revenuePlanFilter, setRevenuePlanFilter] = useState<'all' | 'pro_monthly' | 'pro_annual'>('all');

  // New Course Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState(CATEGORIES[0].id);
  const [newLevel, setNewLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [newDuration, setNewDuration] = useState(10);
  const [newPriceNGN, setNewPriceNGN] = useState(12000);
  const [newDesc, setNewDesc] = useState('');

  // Project Review Modal State
  const [selectedSub, setSelectedSub] = useState<ProjectSubmission | null>(null);
  const [reviewScore, setReviewScore] = useState(90);
  const [reviewFeedback, setReviewFeedback] = useState('Excellent project deliverable with clean code!');

  // Role Gate Enforcement
  if (user.role !== 'admin') {
    return (
      <div className="py-16 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-[#14213D] dark:text-white mb-2">
          Administrator Area Protected
        </h2>
        <p className="text-xs sm:text-sm text-[#737B90] dark:text-slate-400 mb-6 leading-relaxed">
          You are currently signed in as a student (<strong>{user.name}</strong>). To test administrative course creation and project grading, switch your preview role to Admin below.
        </p>
        <button
          onClick={() => switchRole('admin')}
          className="px-6 py-3 rounded-xl bg-[#7057D9] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-[#5f46c6] transition-colors"
        >
          Switch to Administrator Role (Preview Mode)
        </button>
      </div>
    );
  }

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const catObj = CATEGORIES.find(c => c.id === newCategory) || CATEGORIES[0];
    const created: Course = {
      id: `course-${Date.now()}`,
      title: newTitle,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      categoryId: newCategory,
      categoryName: catObj.title,
      level: newLevel,
      durationHours: Number(newDuration),
      priceNGN: Number(newPriceNGN),
      priceUSD: Math.round(Number(newPriceNGN) / 1250),
      isPremium: Number(newPriceNGN) > 0,
      rating: 5.0,
      reviewsCount: 1,
      studentsCount: 1,
      instructor: {
        name: user.name,
        role: 'SkillUp Staff Instructor',
        avatar: user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        bio: 'Staff instructor and practitioner.'
      },
      thumbnail: '/src/assets/images/category_ai_engineering_1793158877489.jpg',
      description: newDesc || 'Comprehensive curriculum designed for practical digital skill mastery.',
      objectives: ['Master fundamental syntax and tools', 'Complete real portfolio deliverables', 'Deploy live software'],
      prerequisites: ['Basic computer literacy'],
      modules: [
        {
          id: `mod-${Date.now()}`,
          title: 'Module 1: Getting Started with Core Skills',
          lessons: [
            {
              id: `les-${Date.now()}-1`,
              title: 'Introduction & Environment Setup',
              objective: 'Configure your local workspace.',
              durationMinutes: 20,
              type: 'text',
              writtenContent: 'Welcome to this curriculum! Start by configuring your development environment.',
              keyTakeaways: ['Setup tools', 'Verify connection']
            }
          ]
        }
      ],
      certificateAvailable: true
    };

    setCourses(prev => [created, ...prev]);
    setShowCreateModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourses(prev => prev.filter(c => c.id !== courseId));
  };

  return (
    <div className="space-y-8 py-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E8F0] dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7057D9]/10 text-xs font-semibold text-[#7057D9] dark:text-[#a89af0] mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Authorized Administration Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14213D] dark:text-white tracking-tight">
            SkillUp Academy Management
          </h1>
          <p className="text-xs text-[#737B90] dark:text-slate-400 mt-0.5">
            Manage course catalog, review project deliverables, and track platform metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => switchRole('student')}
            className="px-3.5 py-2 rounded-xl border border-[#E5E8F0] dark:border-slate-700 text-xs font-semibold text-[#737B90] hover:text-[#14213D] transition-colors"
          >
            Exit to Student View
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-[#7057D9] hover:bg-[#5f46c6] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>New Course</span>
          </button>
        </div>
      </div>

      {/* Analytics KPI Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 shadow-xs">
          <p className="text-xs text-[#737B90] dark:text-slate-400 font-medium">Published Courses</p>
          <p className="text-2xl font-extrabold text-[#14213D] dark:text-white mt-1 tabular-nums">
            {courses.length}
          </p>
          <p className="text-[11px] text-[#35B8A0] mt-0.5">Across 15 categories</p>
        </div>

        <div className="p-5 bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 shadow-xs">
          <p className="text-xs text-[#737B90] dark:text-slate-400 font-medium">Active Learners</p>
          <p className="text-2xl font-extrabold text-[#14213D] dark:text-white mt-1 tabular-nums">
            22,830
          </p>
          <p className="text-[11px] text-[#35B8A0] mt-0.5">Nigeria & International</p>
        </div>

        <div className="p-5 bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 shadow-xs">
          <p className="text-xs text-[#737B90] dark:text-slate-400 font-medium">Project Deliverables</p>
          <p className="text-2xl font-extrabold text-[#14213D] dark:text-white mt-1 tabular-nums">
            {submissions.length}
          </p>
          <p className="text-[11px] text-[#7057D9] mt-0.5">Ready for review</p>
        </div>

        <div className="p-5 bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 shadow-xs">
          <p className="text-xs text-[#737B90] dark:text-slate-400 font-medium">Certificates Issued</p>
          <p className="text-2xl font-extrabold text-[#14213D] dark:text-white mt-1 tabular-nums">
            3,410
          </p>
          <p className="text-[11px] text-[#35B8A0] mt-0.5">Verified credentials</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-[#E5E8F0] dark:border-slate-800 pb-px">
        <button
          onClick={() => setActiveTab('revenue')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'revenue'
              ? 'border-[#7057D9] text-[#7057D9] dark:text-[#a89af0]'
              : 'border-transparent text-[#737B90] hover:text-[#14213D] dark:hover:text-white'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5 text-[#35B8A0]" />
          <span>Revenue & Subscriptions</span>
        </button>

        <button
          onClick={() => setActiveTab('courses')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 ${
            activeTab === 'courses'
              ? 'border-[#7057D9] text-[#7057D9] dark:text-[#a89af0]'
              : 'border-transparent text-[#737B90] hover:text-[#14213D] dark:hover:text-white'
          }`}
        >
          Courses Catalog ({courses.length})
        </button>

        <button
          onClick={() => setActiveTab('submissions')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 ${
            activeTab === 'submissions'
              ? 'border-[#7057D9] text-[#7057D9] dark:text-[#a89af0]'
              : 'border-transparent text-[#737B90] hover:text-[#14213D] dark:hover:text-white'
          }`}
        >
          Project Review Queue ({submissions.length})
        </button>
      </div>

      {/* Tab: Courses Management */}
      {activeTab === 'courses' && (
        <div className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-[#E5E8F0] dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#14213D] dark:text-white">
              All Courses
            </h3>
            <span className="text-xs text-[#737B90]">Manage curriculum and pricing</span>
          </div>

          <div className="divide-y divide-[#E5E8F0] dark:divide-slate-800">
            {courses.map((course) => (
              <div
                key={course.id}
                className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#F8F9FC] dark:hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-16 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-[#7057D9] uppercase tracking-wider">
                      {course.categoryName.split('&')[0]} · {course.level}
                    </span>
                    <h4 className="text-sm font-bold text-[#14213D] dark:text-white">
                      {course.title}
                    </h4>
                    <p className="text-xs text-[#737B90] dark:text-slate-400">
                      Instructor: {course.instructor.name} · {course.durationHours}h · {course.priceNGN > 0 ? `₦${course.priceNGN.toLocaleString()}` : 'Free'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                    course.isPremium ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                  }`}>
                    {course.isPremium ? 'Premium' : 'Free'}
                  </span>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-colors"
                    title="Delete course"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Project Submissions Queue */}
      {activeTab === 'submissions' && (
        <div className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-[#E5E8F0] dark:border-slate-800">
            <h3 className="text-sm font-bold text-[#14213D] dark:text-white">
              Student Deliverables Review
            </h3>
            <p className="text-xs text-[#737B90] dark:text-slate-400">
              Grade portfolio submissions and supply personalized feedback.
            </p>
          </div>

          <div className="divide-y divide-[#E5E8F0] dark:divide-slate-800">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#14213D] dark:text-white">
                      {sub.userName}
                    </span>
                    <span className="text-xs text-[#737B90]">·</span>
                    <span className="text-xs text-[#7057D9] font-medium">
                      {sub.projectTitle}
                    </span>
                  </div>
                  <p className="text-xs text-[#737B90] dark:text-slate-300 line-clamp-2">
                    {sub.notes}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-[#737B90] pt-1">
                    {sub.liveUrl && (
                      <a href={sub.liveUrl} target="_blank" rel="noreferrer" className="underline text-[#7057D9]">
                        Live Demo Link
                      </a>
                    )}
                    {sub.repoUrl && (
                      <a href={sub.repoUrl} target="_blank" rel="noreferrer" className="underline">
                        Repository
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-bold text-[#35B8A0]">
                    Score: {sub.score || 90}/100
                  </span>
                  <button
                    onClick={() => setSelectedSub(sub)}
                    className="px-3 py-1.5 rounded-lg bg-[#7057D9] text-white text-xs font-semibold hover:bg-[#5f46c6]"
                  >
                    Grade / Feedback
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Revenue & Subscriptions Tracking */}
      {activeTab === 'revenue' && (
        <div className="space-y-6">
          {/* Executive Revenue Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-gradient-to-br from-[#14213D] to-[#1d2745] text-white rounded-2xl border border-slate-800 shadow-md">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-xs font-semibold">Monthly Recurring Revenue</span>
                <TrendingUp className="w-4 h-4 text-[#35B8A0]" />
              </div>
              <div className="text-2xl font-extrabold text-white">
                {currency === 'NGN' ? '₦6,850,000' : '$5,420'}
              </div>
              <p className="text-[11px] text-[#35B8A0] mt-1 font-medium flex items-center gap-1">
                <span>+18.4% vs last month</span>
              </p>
            </div>

            <div className="p-5 bg-gradient-to-br from-[#14213D] to-[#1d2745] text-white rounded-2xl border border-slate-800 shadow-md">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-xs font-semibold">Annual Run Rate (ARR)</span>
                <DollarSign className="w-4 h-4 text-[#7057D9]" />
              </div>
              <div className="text-2xl font-extrabold text-white">
                {currency === 'NGN' ? '₦82,200,000' : '$65,040'}
              </div>
              <p className="text-[11px] text-[#a89af0] mt-1 font-medium">
                Annual contracts baseline
              </p>
            </div>

            <div className="p-5 bg-gradient-to-br from-[#14213D] to-[#1d2745] text-white rounded-2xl border border-slate-800 shadow-md">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-xs font-semibold">Paying Subscribers</span>
                <CreditCard className="w-4 h-4 text-[#35B8A0]" />
              </div>
              <div className="text-2xl font-extrabold text-white">
                385
              </div>
              <p className="text-[11px] text-[#35B8A0] mt-1 font-medium">
                313 Monthly · 72 Annual
              </p>
            </div>

            <div className="p-5 bg-gradient-to-br from-[#14213D] to-[#1d2745] text-white rounded-2xl border border-slate-800 shadow-md">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-xs font-semibold">Paystack Gateway</span>
                <Lock className="w-4 h-4 text-[#35B8A0]" />
              </div>
              <div className="text-xl font-extrabold text-[#35B8A0]">
                100% Operational
              </div>
              <p className="text-[11px] text-slate-300 mt-1">
                Test Sandbox · 256-Bit SSL
              </p>
            </div>
          </div>

          {/* Revenue Breakdown & Gateway Status Card */}
          <div className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5E8F0] dark:border-slate-800">
              <div>
                <h3 className="font-extrabold text-base text-[#14213D] dark:text-white">
                  Payment Gateway & Monetization Status
                </h3>
                <p className="text-xs text-[#737B90] dark:text-slate-400">
                  Real-time Paystack webhook simulation and multi-currency billing (NGN ₦ & USD $).
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert('Exporting sanitized Paystack transactions CSV report...')}
                  className="px-3.5 py-1.5 rounded-xl border border-[#E5E8F0] dark:border-slate-700 text-xs font-semibold text-[#737B90] dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Transactions</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#F8F9FC] dark:bg-slate-800/60 border border-[#E5E8F0] dark:border-slate-700 space-y-1">
                <span className="text-[#737B90] dark:text-slate-400">Total NGN Revenue Collected:</span>
                <span className="font-extrabold text-base text-[#35B8A0] block">
                  ₦{(transactions.filter(t => t.currency === 'NGN').reduce((sum, t) => sum + t.amount, 0) + 1850000).toLocaleString()}
                </span>
                <span className="text-[11px] text-[#737B90]">Via Paystack Card, Virtual Account, & USSD</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F9FC] dark:bg-slate-800/60 border border-[#E5E8F0] dark:border-slate-700 space-y-1">
                <span className="text-[#737B90] dark:text-slate-400">Total USD Revenue Collected:</span>
                <span className="font-extrabold text-base text-[#7057D9] dark:text-[#a89af0] block">
                  ${(transactions.filter(t => t.currency === 'USD').reduce((sum, t) => sum + t.amount, 0) + 1480).toLocaleString()}
                </span>
                <span className="text-[11px] text-[#737B90]">International remote subscribers</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F9FC] dark:bg-slate-800/60 border border-[#E5E8F0] dark:border-slate-700 space-y-1">
                <span className="text-[#737B90] dark:text-slate-400">Churn Rate & Retention:</span>
                <span className="font-extrabold text-base text-[#14213D] dark:text-white block">
                  2.1% Monthly Churn
                </span>
                <span className="text-[11px] text-[#35B8A0]">97.9% 30-day renewal retention</span>
              </div>
            </div>
          </div>

          {/* Transactions Ledger */}
          <div className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 overflow-hidden shadow-xs">
            {/* Table Controls */}
            <div className="p-5 border-b border-[#E5E8F0] dark:border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-[#14213D] dark:text-white">
                  Live Transactions Ledger
                </h3>
                <p className="text-xs text-[#737B90] dark:text-slate-400">
                  Verified payments processed through Paystack in Test Mode.
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-48">
                  <Search className="w-3.5 h-3.5 text-[#737B90] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={revenueSearch}
                    onChange={(e) => setRevenueSearch(e.target.value)}
                    placeholder="Search transactions..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-[#E5E8F0] dark:border-slate-700 bg-[#F8F9FC] dark:bg-slate-800 text-xs focus:outline-none focus:border-[#7057D9]"
                  />
                </div>

                <select
                  value={revenuePlanFilter}
                  onChange={(e) => setRevenuePlanFilter(e.target.value as any)}
                  className="px-2.5 py-1.5 rounded-xl border border-[#E5E8F0] dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:outline-none"
                >
                  <option value="all">All Plans</option>
                  <option value="pro_monthly">Monthly Only</option>
                  <option value="pro_annual">Annual Only</option>
                </select>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#F8F9FC] dark:bg-slate-800/60 border-b border-[#E5E8F0] dark:border-slate-800 text-[#737B90] dark:text-slate-400">
                  <tr>
                    <th className="py-3 px-5 font-semibold">Reference & Invoice</th>
                    <th className="py-3 px-4 font-semibold">Subscriber</th>
                    <th className="py-3 px-4 font-semibold">Plan</th>
                    <th className="py-3 px-4 font-semibold">Amount</th>
                    <th className="py-3 px-4 font-semibold">Channel</th>
                    <th className="py-3 px-4 font-semibold">Gateway</th>
                    <th className="py-3 px-4 font-semibold">Date</th>
                    <th className="py-3 px-5 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E8F0] dark:divide-slate-800">
                  {transactions
                    .filter((tx) => {
                      const matchesSearch = 
                        tx.reference.toLowerCase().includes(revenueSearch.toLowerCase()) ||
                        tx.userName.toLowerCase().includes(revenueSearch.toLowerCase()) ||
                        tx.userEmail.toLowerCase().includes(revenueSearch.toLowerCase()) ||
                        tx.invoiceNumber.toLowerCase().includes(revenueSearch.toLowerCase());
                      const matchesPlan = revenuePlanFilter === 'all' || tx.plan === revenuePlanFilter;
                      return matchesSearch && matchesPlan;
                    })
                    .map((tx) => (
                      <tr key={tx.id} className="hover:bg-[#F8F9FC] dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-5 font-mono">
                          <span className="font-bold text-[#14213D] dark:text-white block">{tx.invoiceNumber}</span>
                          <span className="text-[10px] text-[#737B90] dark:text-slate-400">{tx.reference}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-[#14213D] dark:text-white block">{tx.userName}</span>
                          <span className="text-[11px] text-[#737B90]">{tx.userEmail}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="capitalize font-semibold text-[#7057D9] dark:text-[#a89af0]">
                            {tx.plan.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-[#35B8A0]">
                          {tx.currency === 'NGN' ? `₦${tx.amount.toLocaleString()}` : `$${tx.amount}`}
                        </td>
                        <td className="py-3.5 px-4 capitalize text-[#737B90] dark:text-slate-300">
                          {tx.channel.replace('_', ' ')}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#7057D9]/10 text-[#7057D9] dark:text-[#a89af0]">
                            Paystack Test
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-[#737B90]">
                          {new Date(tx.paidAt).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 px-5 text-right">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#35B8A0]/15 text-[#35B8A0] border border-[#35B8A0]/30 inline-flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            <span>Verified</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}


      {/* Modal: Create New Course */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white dark:bg-[#14213D] rounded-3xl shadow-2xl border border-[#E5E8F0] dark:border-slate-800 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-[#14213D] dark:text-white mb-4">
              Add New Course
            </h3>

            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#737B90] dark:text-slate-300 mb-1">
                  Course Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Advanced Prompt Engineering with Gemini 3.8"
                  className="w-full px-3.5 py-2.5 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-xs text-[#20263A] dark:text-white focus:outline-none focus:border-[#7057D9]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#737B90] dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-xs text-[#20263A] dark:text-white focus:outline-none"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.letter}. {c.title.split('&')[0]}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#737B90] dark:text-slate-300 mb-1">
                    Difficulty Level
                  </label>
                  <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-xs text-[#20263A] dark:text-white focus:outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#737B90] dark:text-slate-300 mb-1">
                    Duration (Hours)
                  </label>
                  <input
                    type="number"
                    value={newDuration}
                    onChange={(e) => setNewDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-xs text-[#20263A] dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#737B90] dark:text-slate-300 mb-1">
                    Price (₦ NGN, 0 for Free)
                  </label>
                  <input
                    type="number"
                    value={newPriceNGN}
                    onChange={(e) => setNewPriceNGN(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-xs text-[#20263A] dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#737B90] dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Outline what students will master..."
                  className="w-full px-3 py-2 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-xs text-[#20263A] dark:text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border rounded-xl text-xs font-medium text-[#737B90]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#7057D9] text-white rounded-xl text-xs font-bold hover:bg-[#5f46c6]"
                >
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Grade Submission */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-[#14213D] rounded-3xl shadow-2xl border border-[#E5E8F0] dark:border-slate-800 p-6">
            <h3 className="text-base font-bold text-[#14213D] dark:text-white mb-2">
              Grade Submission: {selectedSub.userName}
            </h3>
            <p className="text-xs text-[#737B90] mb-4">{selectedSub.projectTitle}</p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#737B90] mb-1">
                  Score (out of 100)
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={reviewScore}
                  onChange={(e) => setReviewScore(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-xs text-[#20263A] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#737B90] mb-1">
                  Instructor Feedback
                </label>
                <textarea
                  rows={3}
                  value={reviewFeedback}
                  onChange={(e) => setReviewFeedback(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-xs text-[#20263A] dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedSub(null)}
                  className="px-4 py-2 border rounded-xl text-xs font-medium text-[#737B90]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    selectedSub.score = reviewScore;
                    selectedSub.feedback = reviewFeedback;
                    selectedSub.status = 'approved';
                    setSelectedSub(null);
                  }}
                  className="px-4 py-2 bg-[#35B8A0] text-white rounded-xl text-xs font-bold hover:bg-[#2fa38e]"
                >
                  Approve & Submit Grade
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
