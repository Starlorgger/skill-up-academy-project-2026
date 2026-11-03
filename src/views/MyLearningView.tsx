import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { COURSES, PROJECTS } from '../data/mockData';
import { Course, Certificate, ProjectSubmission } from '../types';
import { CourseCard } from '../components/CourseCard';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  PieChart,
  Pie,
  ReferenceLine
} from 'recharts';
import { 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Clock, 
  Play, 
  Bookmark, 
  Target, 
  Plus,
  ArrowRight,
  Briefcase,
  Sparkles,
  BarChart3,
  FolderGit2,
  TrendingUp,
  Check,
  AlertCircle,
  ExternalLink,
  Github
} from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';
import { Badges } from '../components/Badges';

interface MyLearningViewProps {
  onSelectCourse: (course: Course) => void;
  onNavigate: (view: string) => void;
  onOpenCertificateModal: (cert: Certificate) => void;
}

export const MyLearningView: React.FC<MyLearningViewProps> = ({
  onSelectCourse,
  onNavigate,
  onOpenCertificateModal
}) => {
  const { user, progress, certificates, submissions, updateUser, toggleSaveLesson } = useAuth();
  const [activeTab, setActiveTab] = useState<'in_progress' | 'analytics' | 'badges' | 'completed' | 'certificates' | 'saved' | 'goals'>('in_progress');
  const [newGoalText, setNewGoalText] = useState('');

  const enrolledCourseObjects = COURSES.filter(c => user.enrolledCourses.includes(c.id));

  // Determine which courses are completed (e.g. 100% or 80%+)
  const completedCourses = enrolledCourseObjects.filter(c => {
    const key = `${user.id}:${c.id}`;
    const p = progress[key];
    const totalLessons = c.modules.reduce((sum, m) => sum + m.lessons.length, 0);
    return p && totalLessons > 0 && p.completedLessonIds.length >= totalLessons;
  });

  const inProgressCourses = enrolledCourseObjects.filter(c => !completedCourses.some(cc => cc.id === c.id));

  // Recharts Dataset 1: Course Completion Percentage across active & enrolled courses
  const courseProgressChartData = useMemo(() => {
    return enrolledCourseObjects.map(course => {
      const key = `${user.id}:${course.id}`;
      const p = progress[key];
      const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
      const completedCount = p ? p.completedLessonIds.length : 0;
      const percent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
      const shortName = course.title.length > 20 ? course.title.substring(0, 18) + '...' : course.title;

      return {
        id: course.id,
        name: shortName,
        fullName: course.title,
        completionPercent: percent,
        completedLessons: completedCount,
        totalLessons,
        category: course.categoryName,
        isCertified: percent >= 80,
        rawCourse: course
      };
    });
  }, [enrolledCourseObjects, progress, user.id]);

  // Recharts Dataset 2: Project Submission Status Breakdown
  const projectStatusChartData = useMemo(() => {
    let approved = 0;
    let underReview = 0;
    let revisionRequested = 0;

    submissions.forEach(s => {
      if (s.status === 'approved') approved++;
      else if (s.status === 'pending') underReview++;
      else if (s.status === 'needs_work') revisionRequested++;
    });

    const totalProjects = PROJECTS.length;
    const submittedCount = submissions.length;
    const notStarted = Math.max(0, totalProjects - submittedCount);

    return [
      { name: 'Approved & Verified', count: approved, color: '#35B8A0' },
      { name: 'Under Review', count: underReview, color: '#F59E0B' },
      { name: 'Revision Needed', count: revisionRequested, color: '#EF4444' },
      { name: 'Not Started', count: notStarted, color: '#64748B' }
    ].filter(item => item.count > 0 || item.name === 'Approved & Verified');
  }, [submissions]);

  // Calculated overall metrics
  const totalLessonsFinished = useMemo(() => {
    return Object.values(progress).reduce((sum, p) => sum + (p.completedLessonIds?.length || 0), 0);
  }, [progress]);

  const avgCompletionPercent = useMemo(() => {
    if (courseProgressChartData.length === 0) return 0;
    const sum = courseProgressChartData.reduce((acc, c) => acc + c.completionPercent, 0);
    return Math.round(sum / courseProgressChartData.length);
  }, [courseProgressChartData]);

  const approvedProjectsCount = useMemo(() => {
    return submissions.filter(s => s.status === 'approved').length;
  }, [submissions]);

  // Count unlocked achievement badges dynamically
  const unlockedBadgesCount = useMemo(() => {
    let count = 0;
    if (user.enrolledCourses.length >= 1) count++;
    if (totalLessonsFinished >= 5) count++;
    if (user.studyMinutes >= 60) count++;
    const aiCourses = COURSES.filter(c => 
      c.title.toLowerCase().includes('ai') || 
      c.title.toLowerCase().includes('prompt') || 
      c.categoryName.toLowerCase().includes('ai')
    );
    const hasAiLessons = aiCourses.some(c => {
      const key = `${user.id}:${c.id}`;
      return (progress[key]?.completedLessonIds?.length || 0) >= 1;
    });
    if (hasAiLessons) count++;
    const hasPerfectQuiz = Object.values(progress).some(p =>
      p.quizScores && Object.values(p.quizScores).some(score => score === 100)
    );
    if (hasPerfectQuiz) count++;
    if (submissions.length >= 1) count++;
    if (approvedProjectsCount >= 1) count++;
    const hasHighCompletion = courseProgressChartData.some(c => c.completionPercent >= 80);
    if (hasHighCompletion) count++;
    if (certificates.length >= 1) count++;
    const uniqueCategories = new Set(enrolledCourseObjects.map(c => c.categoryId)).size;
    if (uniqueCategories >= 2) count++;
    return count;
  }, [user, totalLessonsFinished, progress, submissions, approvedProjectsCount, courseProgressChartData, certificates, enrolledCourseObjects]);

  // Find all saved lessons across all courses
  const allSavedLessons = COURSES.flatMap(c =>
    c.modules.flatMap(m =>
      m.lessons
        .filter(l => user.savedLessons?.includes(l.id))
        .map(l => ({ lesson: l, course: c }))
    )
  );

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoalText.trim()) {
      updateUser({
        learningGoals: [...user.learningGoals, newGoalText.trim()]
      });
      setNewGoalText('');
    }
  };

  const handleRemoveGoal = (index: number) => {
    const updated = [...user.learningGoals];
    updated.splice(index, 1);
    updateUser({ learningGoals: updated });
  };

  return (
    <div className="space-y-8 py-6">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14213D] dark:text-white tracking-tight">
            My Learning Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#737B90] dark:text-slate-400 mt-1">
            Track your course progress, study time, bookmarked lessons, and verified certifications.
          </p>
        </div>

        <button
          onClick={() => onNavigate('explore')}
          className="px-4 py-2 bg-[#7057D9] hover:bg-[#5f46c6] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
        >
          Explore More Courses
        </button>
      </div>

      {/* Skill-to-Opportunity Active Match Callout */}
      <div className="bg-gradient-to-r from-[#14213D] to-[#241c49] text-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#35B8A0]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Opportunities Matched to Your Skills</span>
          </div>
          <h2 className="text-base sm:text-lg font-extrabold text-white">
            {enrolledCourseObjects.length} Active Courses · Matching 15+ Verified Jobs & Gigs
          </h2>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            As you complete lessons and publish projects to your portfolio, employers and freelance clients can discover and review your verified competencies.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onNavigate('jobs')}
            className="px-4 py-2 rounded-xl bg-[#7057D9] hover:bg-[#5f47c8] text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Briefcase className="w-3.5 h-3.5 text-[#35B8A0]" />
            <span>View Job Matches</span>
          </button>
          <button
            onClick={() => onNavigate('freelance')}
            className="px-4 py-2 rounded-xl border border-white/20 hover:bg-white/10 text-white text-xs font-bold transition-colors"
          >
            Freelance Gigs
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5E8F0] dark:border-slate-800 pb-px overflow-x-auto no-scrollbar">
        <button
          onClick={() => {
            triggerHaptic.selectionChanged();
            setActiveTab('in_progress');
          }}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 whitespace-nowrap px-1 ${
            activeTab === 'in_progress'
              ? 'border-[#7057D9] text-[#7057D9] dark:text-[#a89af0]'
              : 'border-transparent text-[#737B90] hover:text-[#14213D] dark:hover:text-white'
          }`}
        >
          In Progress ({inProgressCourses.length})
        </button>

        <button
          onClick={() => {
            triggerHaptic.selectionChanged();
            setActiveTab('analytics');
          }}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 whitespace-nowrap px-1 flex items-center gap-1.5 ${
            activeTab === 'analytics'
              ? 'border-[#7057D9] text-[#7057D9] dark:text-[#a89af0]'
              : 'border-transparent text-[#737B90] hover:text-[#14213D] dark:hover:text-white'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-[#35B8A0]" />
          <span>Learning Progress</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#35B8A0]/15 text-[#35B8A0] font-bold">
            {avgCompletionPercent}%
          </span>
        </button>

        <button
          onClick={() => {
            triggerHaptic.selectionChanged();
            setActiveTab('badges');
          }}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 whitespace-nowrap px-1 flex items-center gap-1.5 ${
            activeTab === 'badges'
              ? 'border-[#7057D9] text-[#7057D9] dark:text-[#a89af0]'
              : 'border-transparent text-[#737B90] hover:text-[#14213D] dark:hover:text-white'
          }`}
        >
          <Award className="w-4 h-4 text-amber-500" />
          <span>Badges & Honors</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold">
            {unlockedBadgesCount}/10
          </span>
        </button>

        <button
          onClick={() => {
            triggerHaptic.selectionChanged();
            setActiveTab('completed');
          }}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 whitespace-nowrap px-1 ${
            activeTab === 'completed'
              ? 'border-[#7057D9] text-[#7057D9] dark:text-[#a89af0]'
              : 'border-transparent text-[#737B90] hover:text-[#14213D] dark:hover:text-white'
          }`}
        >
          Completed ({completedCourses.length})
        </button>

        <button
          onClick={() => {
            triggerHaptic.selectionChanged();
            setActiveTab('certificates');
          }}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 whitespace-nowrap px-1 ${
            activeTab === 'certificates'
              ? 'border-[#7057D9] text-[#7057D9] dark:text-[#a89af0]'
              : 'border-transparent text-[#737B90] hover:text-[#14213D] dark:hover:text-white'
          }`}
        >
          Certificates ({certificates.length})
        </button>

        <button
          onClick={() => {
            triggerHaptic.selectionChanged();
            setActiveTab('saved');
          }}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 whitespace-nowrap px-1 ${
            activeTab === 'saved'
              ? 'border-[#7057D9] text-[#7057D9] dark:text-[#a89af0]'
              : 'border-transparent text-[#737B90] hover:text-[#14213D] dark:hover:text-white'
          }`}
        >
          Saved Lessons ({allSavedLessons.length})
        </button>

        <button
          onClick={() => {
            triggerHaptic.selectionChanged();
            setActiveTab('goals');
          }}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 whitespace-nowrap px-1 ${
            activeTab === 'goals'
              ? 'border-[#7057D9] text-[#7057D9] dark:text-[#a89af0]'
              : 'border-transparent text-[#737B90] hover:text-[#14213D] dark:hover:text-white'
          }`}
        >
          Goals & Reminders
        </button>
      </div>

      {/* Tab 1: In Progress */}
      {activeTab === 'in_progress' && (
        <div className="space-y-6">
          {/* Quick Overview Widgets: Progress Analytics & Badges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courseProgressChartData.length > 0 && (
              <div className="bg-white dark:bg-[#14213D] rounded-2xl p-4 sm:p-5 border border-[#E5E8F0] dark:border-slate-800 shadow-xs flex flex-col justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#7057D9]" />
                    <h3 className="text-sm font-bold text-[#14213D] dark:text-white">Curriculum Progression</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#35B8A0]/15 text-[#35B8A0]">
                      {avgCompletionPercent}% Average
                    </span>
                  </div>
                  <p className="text-xs text-[#737B90] dark:text-slate-400">
                    {totalLessonsFinished} lessons finished across {enrolledCourseObjects.length} active courses · {approvedProjectsCount} portfolio project(s) approved.
                  </p>
                </div>
                <button
                  onClick={() => {
                    triggerHaptic.selectionChanged();
                    setActiveTab('analytics');
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#7057D9]/10 hover:bg-[#7057D9]/20 text-[#7057D9] dark:text-[#a89af0] text-xs font-bold transition-colors self-start"
                >
                  <span>View Progress Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="bg-white dark:bg-[#14213D] rounded-2xl p-4 sm:p-5 border border-[#E5E8F0] dark:border-slate-800 shadow-xs flex flex-col justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  <h3 className="text-sm font-bold text-[#14213D] dark:text-white">Milestones & Honor Badges</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400">
                    {unlockedBadgesCount} / 10 Unlocked
                  </span>
                </div>
                <p className="text-xs text-[#737B90] dark:text-slate-400">
                  Earn distinctive titles and unlockable icons by finishing modules, acing quizzes, and shipping projects.
                </p>
              </div>
              <button
                onClick={() => {
                  triggerHaptic.selectionChanged();
                  setActiveTab('badges');
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-bold transition-colors self-start"
              >
                <span>View All Badges</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {inProgressCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inProgressCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onSelect={onSelectCourse}
                />
              ))}
            </div>
          ) : (
            <div className="p-10 text-center bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800">
              <BookOpen className="w-10 h-10 text-[#737B90] mx-auto mb-3" />
              <h3 className="text-sm font-bold text-[#14213D] dark:text-white mb-1">
                No courses currently in progress
              </h3>
              <p className="text-xs text-[#737B90] dark:text-slate-400 mb-4">
                Explore our catalog to enroll in high-demand skills courses today.
              </p>
              <button
                onClick={() => onNavigate('explore')}
                className="px-5 py-2.5 rounded-xl bg-[#7057D9] text-white text-xs font-semibold hover:bg-[#5f46c6]"
              >
                Browse Catalog
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab: Learning Progress Dashboard (Recharts Visualizations) */}
      {activeTab === 'analytics' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#14213D] border border-[#E5E8F0] dark:border-slate-800 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-[#737B90]">
                <span className="text-[11px] font-semibold uppercase tracking-wider">Average Completion</span>
                <TrendingUp className="w-4 h-4 text-[#35B8A0]" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#14213D] dark:text-white">
                {avgCompletionPercent}%
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#35B8A0] h-full rounded-full transition-all duration-500"
                  style={{ width: `${avgCompletionPercent}%` }}
                />
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#14213D] border border-[#E5E8F0] dark:border-slate-800 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-[#737B90]">
                <span className="text-[11px] font-semibold uppercase tracking-wider">Finished Lessons</span>
                <CheckCircle2 className="w-4 h-4 text-[#7057D9]" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#14213D] dark:text-white">
                {totalLessonsFinished}
              </div>
              <p className="text-[11px] text-[#737B90] dark:text-slate-400">
                Across {enrolledCourseObjects.length} active syllabus modules
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#14213D] border border-[#E5E8F0] dark:border-slate-800 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-[#737B90]">
                <span className="text-[11px] font-semibold uppercase tracking-wider">Capstone Projects</span>
                <FolderGit2 className="w-4 h-4 text-[#35B8A0]" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#14213D] dark:text-white">
                {approvedProjectsCount} <span className="text-xs font-normal text-[#737B90]">/ {submissions.length} submitted</span>
              </div>
              <p className="text-[11px] text-[#737B90] dark:text-slate-400">
                Verified portfolio deliverables
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#14213D] border border-[#E5E8F0] dark:border-slate-800 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-[#737B90]">
                <span className="text-[11px] font-semibold uppercase tracking-wider">Certificates Unlocked</span>
                <Award className="w-4 h-4 text-[#F59E0B]" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#14213D] dark:text-white">
                {certificates.length}
              </div>
              <p className="text-[11px] text-[#737B90] dark:text-slate-400">
                Requires 80%+ course completion
              </p>
            </div>
          </div>

          {/* Dual Recharts Visualizations Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Chart 1: Course Completion Percentage Across Active Courses */}
            <div className="lg:col-span-7 bg-white dark:bg-[#14213D] rounded-2xl p-5 sm:p-6 border border-[#E5E8F0] dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#14213D] dark:text-white flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#7057D9]" />
                    <span>Course Completion Percentage</span>
                  </h3>
                  <p className="text-xs text-[#737B90] dark:text-slate-400">
                    Active courses vs. 80% certification eligibility line
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-[#35B8A0] bg-[#35B8A0]/10 px-2 py-0.5 rounded-lg border border-[#35B8A0]/20 hidden sm:inline-block">
                  Target: 80% to Certify
                </span>
              </div>

              {courseProgressChartData.length > 0 ? (
                <div className="h-72 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={courseProgressChartData}
                      margin={{ top: 15, right: 15, left: -10, bottom: 25 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E8F0" opacity={0.5} />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 11, fill: '#737B90' }}
                        interval={0}
                        angle={-15}
                        textAnchor="end"
                      />
                      <YAxis
                        domain={[0, 100]}
                        tick={{ fontSize: 11, fill: '#737B90' }}
                        unit="%"
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-[#14213D] text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1">
                                <p className="font-bold text-white">{data.fullName}</p>
                                <p className="text-[#35B8A0] font-semibold">
                                  {data.completionPercent}% Complete ({data.completedLessons}/{data.totalLessons} lessons)
                                </p>
                                <p className="text-[10px] text-slate-300">Category: {data.category}</p>
                                <p className={`text-[10px] font-bold ${data.isCertified ? 'text-emerald-400' : 'text-amber-400'}`}>
                                  {data.isCertified ? '✓ Certificate Ready' : '• Reach 80% to unlock certification'}
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <ReferenceLine
                        y={80}
                        stroke="#35B8A0"
                        strokeDasharray="4 4"
                        strokeWidth={1.5}
                        label={{
                          value: '80% Pass Threshold',
                          position: 'top',
                          fill: '#35B8A0',
                          fontSize: 10,
                          fontWeight: 'bold'
                        }}
                      />
                      <Bar
                        dataKey="completionPercent"
                        name="Completion %"
                        radius={[6, 6, 0, 0]}
                        maxBarSize={48}
                      >
                        {courseProgressChartData.map((entry) => (
                          <Cell
                            key={entry.id}
                            fill={entry.completionPercent >= 80 ? '#35B8A0' : '#7057D9'}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-[#737B90]">
                  <BookOpen className="w-8 h-8 mb-2 opacity-50" />
                  <p className="text-xs">Enroll in courses to start charting your completion analytics.</p>
                </div>
              )}

              <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#E5E8F0] dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7057D9]" />
                    <span className="text-[#737B90] dark:text-slate-400">In Progress (&lt;80%)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#35B8A0]" />
                    <span className="text-[#737B90] dark:text-slate-400">Certified Eligible (80%+)</span>
                  </span>
                </div>
                <span className="text-[#737B90] dark:text-slate-400">
                  {enrolledCourseObjects.length} Course(s)
                </span>
              </div>
            </div>

            {/* Chart 2: Project Submission Status Breakdown */}
            <div className="lg:col-span-5 bg-white dark:bg-[#14213D] rounded-2xl p-5 sm:p-6 border border-[#E5E8F0] dark:border-slate-800 shadow-xs space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#14213D] dark:text-white flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-[#35B8A0]" />
                  <span>Project Deliverable Status</span>
                </h3>
                <p className="text-xs text-[#737B90] dark:text-slate-400">
                  Portfolio review pipeline for career readiness
                </p>
              </div>

              <div className="h-64 w-full relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={projectStatusChartData}
                      dataKey="count"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={4}
                    >
                      {projectStatusChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0];
                          return (
                            <div className="bg-[#14213D] text-white p-2.5 rounded-xl shadow-xl border border-slate-700 text-xs">
                              <span className="font-bold">{data.name}: </span>
                              <span className="font-mono text-[#35B8A0] font-bold">{data.value} project(s)</span>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      iconSize={8}
                      formatter={(value) => <span className="text-[11px] text-[#737B90] dark:text-slate-300">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>

                {/* Center Ring Stat */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-12 text-center pointer-events-none">
                  <div className="text-xl font-extrabold text-[#14213D] dark:text-white leading-none">
                    {submissions.length}
                  </div>
                  <div className="text-[9px] uppercase tracking-wider text-[#737B90] dark:text-slate-400 font-semibold mt-0.5">
                    Submissions
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F8F9FC] dark:bg-slate-800/80 border border-[#E5E8F0] dark:border-slate-700/60 text-xs flex items-center justify-between">
                <span className="text-[#737B90] dark:text-slate-300">Portfolio Verification Rate</span>
                <span className="font-bold text-[#35B8A0]">
                  {submissions.length > 0 ? Math.round((approvedProjectsCount / submissions.length) * 100) : 0}%
                </span>
              </div>
            </div>

          </div>

          {/* Project Submissions Details Table / Cards */}
          <div className="bg-white dark:bg-[#14213D] rounded-2xl p-5 sm:p-6 border border-[#E5E8F0] dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#14213D] dark:text-white">
                  Capstone Project Deliverables Log
                </h3>
                <p className="text-xs text-[#737B90] dark:text-slate-400">
                  Track the submission review pipeline and public portfolio links.
                </p>
              </div>

              <button
                onClick={() => onNavigate('projects')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#7057D9] text-white text-xs font-semibold hover:bg-[#5f46c6] transition-colors self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Submit New Project</span>
              </button>
            </div>

            {submissions.length > 0 ? (
              <div className="space-y-3">
                {submissions.map((sub) => {
                  const statusColors: Record<ProjectSubmission['status'], string> = {
                    approved: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
                    pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
                    needs_work: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
                  };

                  const statusLabels: Record<ProjectSubmission['status'], string> = {
                    approved: 'Approved & Live in Portfolio',
                    pending: 'Pending Instructor Review',
                    needs_work: 'Revision Requested'
                  };

                  return (
                    <div
                      key={sub.id}
                      className="p-4 rounded-xl bg-[#F8F9FC] dark:bg-slate-800/60 border border-[#E5E8F0] dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-[#14213D] dark:text-white">
                            {sub.projectTitle}
                          </h4>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusColors[sub.status] || 'bg-slate-500/10 text-slate-400'}`}>
                            {statusLabels[sub.status] || sub.status}
                          </span>
                        </div>
                        {sub.notes && (
                          <p className="text-[11px] text-[#737B90] dark:text-slate-400 line-clamp-1">
                            {sub.notes}
                          </p>
                        )}
                        <div className="flex items-center gap-3 text-[11px] text-[#737B90] pt-1">
                          {sub.repoUrl && (
                            <a
                              href={sub.repoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:text-[#7057D9] flex items-center gap-1 font-mono"
                            >
                              <Github className="w-3 h-3" />
                              <span>Code Repo</span>
                            </a>
                          )}
                          {sub.liveUrl && (
                            <a
                              href={sub.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:text-[#35B8A0] flex items-center gap-1 font-mono"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span>Live Preview</span>
                            </a>
                          )}
                          {sub.score && (
                            <span className="font-bold text-[#35B8A0]">
                              Score: {sub.score}/100
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        {sub.isPublicInPortfolio && (
                          <span className="px-2 py-1 rounded-lg bg-[#35B8A0]/10 text-[#35B8A0] text-[10px] font-bold flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            <span>Public Portfolio</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center bg-[#F8F9FC] dark:bg-slate-800/40 rounded-xl border border-dashed border-[#E5E8F0] dark:border-slate-700">
                <FolderGit2 className="w-8 h-8 text-[#737B90] mx-auto mb-2" />
                <h4 className="text-xs font-bold text-[#14213D] dark:text-white">
                  No capstone project deliverables submitted yet
                </h4>
                <p className="text-[11px] text-[#737B90] dark:text-slate-400 max-w-sm mx-auto mt-1 mb-3">
                  Complete real-world projects to build your verified portfolio and attract employers.
                </p>
                <button
                  onClick={() => onNavigate('projects')}
                  className="px-4 py-2 rounded-xl bg-[#7057D9] text-white text-xs font-semibold hover:bg-[#5f46c6]"
                >
                  Browse Projects
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab: Badges & Achievements */}
      {activeTab === 'badges' && (
        <Badges
          user={user}
          progress={progress}
          certificates={certificates}
          submissions={submissions}
          courses={COURSES}
          onNavigate={onNavigate}
        />
      )}

      {/* Tab 2: Completed */}
      {activeTab === 'completed' && (
        <div className="space-y-6">
          {completedCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onSelect={onSelectCourse}
                />
              ))}
            </div>
          ) : (
            <div className="p-10 text-center bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800">
              <Award className="w-10 h-10 text-[#737B90] mx-auto mb-3" />
              <h3 className="text-sm font-bold text-[#14213D] dark:text-white mb-1">
                No courses fully completed yet
              </h3>
              <p className="text-xs text-[#737B90] dark:text-slate-400 mb-4">
                Finish all required lessons and assessments in a course to earn your distinction certificate.
              </p>
              <button
                onClick={() => setActiveTab('in_progress')}
                className="px-5 py-2.5 rounded-xl bg-[#7057D9] text-white text-xs font-semibold hover:bg-[#5f46c6]"
              >
                Continue Active Courses
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Certificates */}
      {activeTab === 'certificates' && (
        <div className="space-y-6">
          {certificates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 p-6 flex flex-col justify-between hover:border-[#7057D9] transition-all shadow-xs"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#35B8A0]/10 text-[#35B8A0] flex items-center justify-center shrink-0">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-[#35B8A0] uppercase tracking-wider">
                        Official Credential
                      </span>
                      <h3 className="text-sm font-bold text-[#14213D] dark:text-white mt-0.5">
                        {cert.courseTitle}
                      </h3>
                      <p className="text-xs text-[#737B90] dark:text-slate-400 mt-1">
                        Issued on {new Date(cert.issuedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E5E8F0] dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] text-[#737B90] truncate max-w-[160px]">
                      {cert.verificationCode}
                    </span>
                    <button
                      onClick={() => onOpenCertificateModal(cert)}
                      className="px-3 py-1.5 rounded-lg bg-[#7057D9] text-white font-semibold hover:bg-[#5f46c6] transition-colors"
                    >
                      View Certificate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800">
              <Award className="w-10 h-10 text-[#737B90] mx-auto mb-3" />
              <h3 className="text-sm font-bold text-[#14213D] dark:text-white mb-1">
                No certificates earned yet
              </h3>
              <p className="text-xs text-[#737B90] dark:text-slate-400 max-w-sm mx-auto mb-4">
                Complete at least 80% of lessons in any enrolled course to unlock your verified digital certificate.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab: Saved Lessons & Bookmarks */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          {allSavedLessons.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allSavedLessons.map(({ lesson, course }) => (
                <div
                  key={lesson.id}
                  className="p-5 bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-[#737B90]">
                      <span className="font-semibold text-[#7057D9] truncate max-w-[180px]">{course.title}</span>
                      <span>{lesson.durationMinutes} mins</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#14213D] dark:text-white leading-snug">
                      {lesson.title}
                    </h4>
                    <p className="text-xs text-[#737B90] dark:text-slate-400 line-clamp-2">
                      {lesson.objective}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#E5E8F0] dark:border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => onSelectCourse(course)}
                      className="text-xs font-semibold text-[#7057D9] hover:underline flex items-center gap-1"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Study Now</span>
                    </button>
                    <button
                      onClick={() => toggleSaveLesson(lesson.id)}
                      className="text-[11px] text-rose-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800">
              <Bookmark className="w-10 h-10 text-[#737B90] mx-auto mb-3" />
              <h3 className="text-sm font-bold text-[#14213D] dark:text-white mb-1">
                No bookmarked lessons
              </h3>
              <p className="text-xs text-[#737B90] dark:text-slate-400 max-w-sm mx-auto mb-4">
                Click the Bookmark icon while studying any lesson to quickly save it for revision.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Goals & Reminders */}
      {activeTab === 'goals' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Goals Card */}
          <div className="bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-[#7057D9]" />
              <h3 className="text-base font-bold text-[#14213D] dark:text-white">
                Personal Learning Goals
              </h3>
            </div>

            <form onSubmit={handleAddGoal} className="flex gap-2">
              <input
                type="text"
                placeholder="Add a new goal (e.g. Finish Module 2 this week)..."
                value={newGoalText}
                onChange={(e) => setNewGoalText(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-[#20263A] dark:text-white focus:outline-none focus:border-[#7057D9]"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-[#7057D9] text-white rounded-xl text-xs font-semibold hover:bg-[#5f46c6]"
              >
                Add
              </button>
            </form>

            <div className="space-y-2 pt-2">
              {user.learningGoals.map((goal, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 text-xs text-[#20263A] dark:text-slate-200"
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#35B8A0]" />
                    {goal}
                  </span>
                  <button
                    onClick={() => handleRemoveGoal(idx)}
                    className="text-rose-500 hover:text-rose-600 font-bold px-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Study Reminder Card */}
          <div className="bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-[#35B8A0]" />
              <h3 className="text-base font-bold text-[#14213D] dark:text-white">
                Daily Study Cadence
              </h3>
            </div>

            <p className="text-xs text-[#737B90] dark:text-slate-400 leading-relaxed">
              Consistent daily practice of 25–45 minutes produces stronger long-term retention than weekend cramming.
            </p>

            <div className="p-4 rounded-xl bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#14213D] dark:text-white">Active Streak:</span>
                <span className="text-[#35B8A0] font-bold">4 Days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#14213D] dark:text-white">Daily Target:</span>
                <span>30 minutes / day</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#14213D] dark:text-white">Reminders:</span>
                <span className="text-emerald-600 font-medium">Enabled (8:00 PM WAT)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
