import React, { useState, useMemo } from 'react';
import { 
  Award, 
  Trophy, 
  Sparkles, 
  ShieldCheck, 
  Code, 
  FolderGit2, 
  Rocket, 
  BookOpen, 
  Clock, 
  Target, 
  Flame, 
  Star, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  Share2, 
  X, 
  Check, 
  ChevronRight,
  Zap,
  Layers
} from 'lucide-react';
import { User, UserProgress, Certificate, ProjectSubmission, Course } from '../types';
import { triggerHaptic } from '../utils/haptics';

export type BadgeRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';
export type BadgeCategory = 'milestone' | 'project' | 'course' | 'mastery';

export interface BadgeItem {
  id: string;
  title: string;
  category: BadgeCategory;
  rarity: BadgeRarity;
  description: string;
  milestoneCriteria: string;
  icon: React.ElementType;
  gradient: string;
  borderClass: string;
  glowColor: string;
  points: number;
  currentValue: number;
  targetValue: number;
  unit: string;
  isUnlocked: boolean;
  unlockedAt?: string;
}

interface BadgesProps {
  user: User;
  progress: Record<string, UserProgress>;
  certificates: Certificate[];
  submissions: ProjectSubmission[];
  courses: Course[];
  onNavigate?: (view: string) => void;
}

export const Badges: React.FC<BadgesProps> = ({
  user,
  progress,
  certificates,
  submissions,
  courses,
  onNavigate
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | BadgeCategory>('all');
  const [selectedBadge, setSelectedBadge] = useState<BadgeItem | null>(null);
  const [copiedShare, setCopiedShare] = useState(false);

  // Compute all badge metrics dynamically based on current user progress
  const badgesList = useMemo<BadgeItem[]>(() => {
    // 1. Total lessons finished
    const totalLessonsFinished = Object.values(progress).reduce(
      (sum, p) => sum + (p.completedLessonIds?.length || 0),
      0
    );

    // 2. Approved projects
    const approvedProjects = submissions.filter(s => s.status === 'approved').length;

    // 3. Quiz 100% check
    const hasPerfectQuiz = Object.values(progress).some(p =>
      p.quizScores && Object.values(p.quizScores).some(score => score === 100)
    );

    // 4. Max course completion percentage
    let maxCoursePercent = 0;
    courses.forEach(c => {
      if (user.enrolledCourses.includes(c.id)) {
        const key = `${user.id}:${c.id}`;
        const p = progress[key];
        const totalLessons = c.modules.reduce((sum, m) => sum + m.lessons.length, 0);
        if (p && totalLessons > 0) {
          const pct = Math.round((p.completedLessonIds.length / totalLessons) * 100);
          if (pct > maxCoursePercent) maxCoursePercent = pct;
        }
      }
    });

    // 5. AI Track progress (Prompt engineering / Gen AI / Machine Learning)
    const aiCourses = courses.filter(c => 
      c.title.toLowerCase().includes('ai') || 
      c.title.toLowerCase().includes('prompt') || 
      c.categoryName.toLowerCase().includes('ai')
    );
    const completedAiLessons = aiCourses.reduce((sum, c) => {
      const key = `${user.id}:${c.id}`;
      const p = progress[key];
      return sum + (p?.completedLessonIds?.length || 0);
    }, 0);

    // 6. Multi-discipline count across distinct categories
    const enrolledCoursesObjs = courses.filter(c => user.enrolledCourses.includes(c.id));
    const uniqueCategories = new Set(enrolledCoursesObjs.map(c => c.categoryId)).size;

    return [
      {
        id: 'pioneer_builder',
        title: 'Pioneer Builder',
        category: 'milestone',
        rarity: 'Common',
        description: 'Began the learning journey by enrolling in your first SkillUp Academy curriculum.',
        milestoneCriteria: 'Enroll in 1 or more academy courses.',
        icon: Rocket,
        gradient: 'from-blue-500 to-indigo-600',
        borderClass: 'border-blue-400/40 text-blue-500',
        glowColor: 'rgba(59, 130, 246, 0.25)',
        points: 50,
        currentValue: user.enrolledCourses.length,
        targetValue: 1,
        unit: 'course',
        isUnlocked: user.enrolledCourses.length >= 1,
        unlockedAt: user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Verified'
      },
      {
        id: 'knowledge_seeker',
        title: 'Knowledge Seeker',
        category: 'milestone',
        rarity: 'Common',
        description: 'Dived deep into coursework by finishing 5 structured video or coding lessons.',
        milestoneCriteria: 'Complete at least 5 lessons across any course.',
        icon: BookOpen,
        gradient: 'from-emerald-500 to-teal-600',
        borderClass: 'border-emerald-400/40 text-emerald-500',
        glowColor: 'rgba(16, 185, 129, 0.25)',
        points: 100,
        currentValue: totalLessonsFinished,
        targetValue: 5,
        unit: 'lessons',
        isUnlocked: totalLessonsFinished >= 5,
        unlockedAt: totalLessonsFinished >= 5 ? 'Active' : undefined
      },
      {
        id: 'deep_work_scholar',
        title: 'Deep Work Scholar',
        category: 'milestone',
        rarity: 'Rare',
        description: 'Demonstrated high learning discipline by investing over 60 minutes of active study.',
        milestoneCriteria: 'Log 60+ minutes of dedicated curriculum study.',
        icon: Clock,
        gradient: 'from-amber-500 to-orange-600',
        borderClass: 'border-amber-400/40 text-amber-500',
        glowColor: 'rgba(245, 158, 11, 0.25)',
        points: 150,
        currentValue: user.studyMinutes,
        targetValue: 60,
        unit: 'minutes',
        isUnlocked: user.studyMinutes >= 60,
        unlockedAt: user.studyMinutes >= 60 ? 'Active' : undefined
      },
      {
        id: 'ai_visionary',
        title: 'AI Visionary',
        category: 'mastery',
        rarity: 'Rare',
        description: 'Pioneered modern workflows by completing lessons in generative AI & prompt engineering tracks.',
        milestoneCriteria: 'Complete at least 1 lesson in an AI or Prompt Engineering course.',
        icon: Sparkles,
        gradient: 'from-violet-500 to-purple-600',
        borderClass: 'border-purple-400/40 text-purple-500',
        glowColor: 'rgba(168, 85, 247, 0.25)',
        points: 200,
        currentValue: completedAiLessons,
        targetValue: 1,
        unit: 'AI lesson',
        isUnlocked: completedAiLessons >= 1,
        unlockedAt: completedAiLessons >= 1 ? 'Active' : undefined
      },
      {
        id: 'quiz_ace',
        title: 'Quiz Ace',
        category: 'mastery',
        rarity: 'Rare',
        description: 'Mastered concept comprehension with a flawless 100% score on a module quiz.',
        milestoneCriteria: 'Score 100% on any course assessment quiz.',
        icon: Award,
        gradient: 'from-pink-500 to-rose-600',
        borderClass: 'border-rose-400/40 text-rose-500',
        glowColor: 'rgba(244, 63, 94, 0.25)',
        points: 150,
        currentValue: hasPerfectQuiz ? 1 : 0,
        targetValue: 1,
        unit: 'quiz',
        isUnlocked: hasPerfectQuiz,
        unlockedAt: hasPerfectQuiz ? 'Verified' : undefined
      },
      {
        id: 'code_artisan',
        title: 'Code Artisan',
        category: 'project',
        rarity: 'Rare',
        description: 'Shifted from theory to practical reality by submitting a capstone project for peer review.',
        milestoneCriteria: 'Submit at least 1 capstone project for review.',
        icon: Code,
        gradient: 'from-cyan-500 to-blue-600',
        borderClass: 'border-cyan-400/40 text-cyan-500',
        glowColor: 'rgba(6, 182, 212, 0.25)',
        points: 200,
        currentValue: submissions.length,
        targetValue: 1,
        unit: 'project',
        isUnlocked: submissions.length >= 1,
        unlockedAt: submissions.length >= 1 ? submissions[0]?.submittedAt?.substring(0, 10) : undefined
      },
      {
        id: 'portfolio_master',
        title: 'Portfolio Master',
        category: 'project',
        rarity: 'Epic',
        description: 'Earned public industry validation with an approved capstone showcased in your portfolio.',
        milestoneCriteria: 'Receive an approved mentor evaluation on a capstone project.',
        icon: FolderGit2,
        gradient: 'from-teal-500 to-emerald-600',
        borderClass: 'border-teal-400/40 text-teal-500',
        glowColor: 'rgba(20, 184, 166, 0.25)',
        points: 300,
        currentValue: approvedProjects,
        targetValue: 1,
        unit: 'approved project',
        isUnlocked: approvedProjects >= 1,
        unlockedAt: approvedProjects >= 1 ? 'Approved' : undefined
      },
      {
        id: 'curriculum_conqueror',
        title: 'Curriculum Conqueror',
        category: 'course',
        rarity: 'Epic',
        description: 'Reached 80% or greater curriculum mastery on an intensive vocational course track.',
        milestoneCriteria: 'Achieve ≥80% completion in any enrolled course.',
        icon: Target,
        gradient: 'from-indigo-500 to-violet-700',
        borderClass: 'border-indigo-400/40 text-indigo-500',
        glowColor: 'rgba(99, 102, 241, 0.25)',
        points: 350,
        currentValue: maxCoursePercent,
        targetValue: 80,
        unit: '% completed',
        isUnlocked: maxCoursePercent >= 80,
        unlockedAt: maxCoursePercent >= 80 ? 'Completed' : undefined
      },
      {
        id: 'certified_champion',
        title: 'Certified Champion',
        category: 'course',
        rarity: 'Legendary',
        description: 'Earned an official, cryptographically verifiable SkillUp Academy Certificate of Excellence.',
        milestoneCriteria: 'Graduate and earn 1 verifiable course certificate.',
        icon: ShieldCheck,
        gradient: 'from-amber-400 via-orange-500 to-red-600',
        borderClass: 'border-amber-400/60 text-amber-500',
        glowColor: 'rgba(245, 158, 11, 0.4)',
        points: 500,
        currentValue: certificates.length,
        targetValue: 1,
        unit: 'certificate',
        isUnlocked: certificates.length >= 1,
        unlockedAt: certificates.length >= 1 ? certificates[0]?.issuedAt?.substring(0, 10) : undefined
      },
      {
        id: 'polymath_pioneer',
        title: 'Polymath Pioneer',
        category: 'mastery',
        rarity: 'Legendary',
        description: 'Broadened career horizons by enrolling across multiple distinct technical fields.',
        milestoneCriteria: 'Enroll in courses across 2 or more distinct skill categories.',
        icon: Flame,
        gradient: 'from-fuchsia-600 via-purple-600 to-indigo-600',
        borderClass: 'border-fuchsia-400/50 text-fuchsia-500',
        glowColor: 'rgba(217, 70, 239, 0.35)',
        points: 400,
        currentValue: uniqueCategories,
        targetValue: 2,
        unit: 'categories',
        isUnlocked: uniqueCategories >= 2,
        unlockedAt: uniqueCategories >= 2 ? 'Mastered' : undefined
      }
    ];
  }, [user, progress, certificates, submissions, courses]);

  // Metrics summary
  const unlockedBadges = useMemo(() => badgesList.filter(b => b.isUnlocked), [badgesList]);
  const totalPointsEarned = useMemo(() => unlockedBadges.reduce((sum, b) => sum + b.points, 0), [unlockedBadges]);
  const totalPossiblePoints = useMemo(() => badgesList.reduce((sum, b) => sum + b.points, 0), [badgesList]);
  const completionPercentage = Math.round((unlockedBadges.length / badgesList.length) * 100);

  // Filtered list
  const filteredBadges = useMemo(() => {
    return badgesList.filter(badge => {
      // Status filter
      if (activeFilter === 'unlocked' && !badge.isUnlocked) return false;
      if (activeFilter === 'locked' && badge.isUnlocked) return false;

      // Category filter
      if (categoryFilter !== 'all' && badge.category !== categoryFilter) return false;

      return true;
    });
  }, [badgesList, activeFilter, categoryFilter]);

  const handleOpenBadge = (badge: BadgeItem) => {
    if (badge.isUnlocked) {
      triggerHaptic.success();
    } else {
      triggerHaptic.selectionChanged();
    }
    setSelectedBadge(badge);
    setCopiedShare(false);
  };

  const handleCopyShare = (badge: BadgeItem) => {
    const text = `🏆 I unlocked the "${badge.title}" badge on SkillUp Academy! ${badge.description} Learn in-demand AI, coding, and design skills with me!`;
    navigator.clipboard.writeText(text);
    triggerHaptic.light();
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const getRarityBadgeStyle = (rarity: BadgeRarity) => {
    switch (rarity) {
      case 'Legendary':
        return 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-500 dark:text-amber-400 border border-amber-500/30';
      case 'Epic':
        return 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30';
      case 'Rare':
        return 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30';
      case 'Common':
      default:
        return 'bg-slate-500/15 text-slate-600 dark:text-slate-300 border border-slate-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Hero Banner */}
      <div className="bg-gradient-to-br from-[#14213D] via-[#1E2E4F] to-[#2B1B54] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md border border-slate-800">
        {/* Subtle Decorative Backdrop Elements */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-[#7057D9]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 bg-[#35B8A0]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/10 backdrop-blur-xs text-[#35B8A0] border border-white/10">
              <Trophy className="w-3.5 h-3.5" />
              <span>SkillUp Milestones & Badges</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Unlockable Achievements & Badges
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Earn distinctive honor badges and titles as you finish interactive modules, ace technical quizzes, and ship production-ready capstones to your portfolio.
            </p>
          </div>

          {/* Quick Metrics Pillar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
              <span className="block text-[11px] text-slate-300 font-medium">Unlocked</span>
              <span className="text-xl sm:text-2xl font-black text-[#35B8A0]">
                {unlockedBadges.length} <span className="text-xs text-slate-400 font-normal">/ {badgesList.length}</span>
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
              <span className="block text-[11px] text-slate-300 font-medium">Achievement XP</span>
              <span className="text-xl sm:text-2xl font-black text-amber-400">
                {totalPointsEarned} <span className="text-xs text-slate-400 font-normal">pts</span>
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center col-span-2 sm:col-span-1">
              <span className="block text-[11px] text-slate-300 font-medium">Completion</span>
              <span className="text-xl sm:text-2xl font-black text-purple-300">
                {completionPercentage}%
              </span>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="relative z-10 mt-6 pt-5 border-t border-white/10">
          <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
            <span className="flex items-center gap-1.5 font-medium">
              <Star className="w-3.5 h-3.5 text-amber-400" />
              <span>Overall Achievement Progress</span>
            </span>
            <span className="font-bold text-white">
              {totalPointsEarned} of {totalPossiblePoints} XP Earned
            </span>
          </div>
          <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-[#35B8A0] via-[#7057D9] to-amber-400 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#14213D] p-4 rounded-2xl border border-[#E5E8F0] dark:border-slate-800 shadow-xs">
        {/* Status Filters (All / Unlocked / Locked) */}
        <div className="flex items-center gap-1 bg-[#F8F9FC] dark:bg-slate-800/80 p-1 rounded-xl border border-[#E5E8F0] dark:border-slate-700/60 overflow-x-auto">
          <button
            onClick={() => {
              triggerHaptic.selectionChanged();
              setActiveFilter('all');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-[#7057D9] text-white shadow-xs'
                : 'text-[#737B90] dark:text-slate-400 hover:text-[#14213D] dark:hover:text-white'
            }`}
          >
            All Badges ({badgesList.length})
          </button>
          <button
            onClick={() => {
              triggerHaptic.selectionChanged();
              setActiveFilter('unlocked');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeFilter === 'unlocked'
                ? 'bg-[#35B8A0] text-white shadow-xs'
                : 'text-[#737B90] dark:text-slate-400 hover:text-[#14213D] dark:hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Unlocked ({unlockedBadges.length})</span>
          </button>
          <button
            onClick={() => {
              triggerHaptic.selectionChanged();
              setActiveFilter('locked');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeFilter === 'locked'
                ? 'bg-slate-700 text-white shadow-xs'
                : 'text-[#737B90] dark:text-slate-400 hover:text-[#14213D] dark:hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>In Progress ({badgesList.length - unlockedBadges.length})</span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
          <span className="text-[#737B90] dark:text-slate-400 text-[11px] font-medium hidden sm:inline mr-1">
            Category:
          </span>
          {(['all', 'milestone', 'mastery', 'project', 'course'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => {
                triggerHaptic.selectionChanged();
                setCategoryFilter(cat);
              }}
              className={`px-2.5 py-1 rounded-lg capitalize transition-colors text-xs font-medium ${
                categoryFilter === cat
                  ? 'bg-[#7057D9]/15 text-[#7057D9] dark:text-[#a89af0] font-bold border border-[#7057D9]/30'
                  : 'bg-transparent text-[#737B90] dark:text-slate-400 hover:text-[#14213D] dark:hover:text-white'
              }`}
            >
              {cat === 'all' ? 'All Tracks' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBadges.map(badge => {
          const IconComp = badge.icon;
          const progressPercent = Math.min(100, Math.round((badge.currentValue / badge.targetValue) * 100));

          return (
            <div
              key={badge.id}
              onClick={() => handleOpenBadge(badge)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer relative flex flex-col justify-between overflow-hidden group ${
                badge.isUnlocked
                  ? 'bg-white dark:bg-[#14213D] border-[#E5E8F0] dark:border-slate-800 hover:border-[#7057D9]/50 hover:shadow-lg dark:hover:border-[#7057D9]/60'
                  : 'bg-[#F8F9FC]/80 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800/80 opacity-80 hover:opacity-100 hover:border-slate-400 dark:hover:border-slate-700'
              }`}
            >
              {/* Subtle Ambient Hover Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-300 rounded-3xl"
                style={{ backgroundColor: badge.isUnlocked ? '#7057D9' : '#94A3B8' }}
              />

              {/* Top row: Icon emblem & Badges info */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  {/* Emblem Icon */}
                  <div className="relative">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-transform group-hover:scale-105 duration-300 ${
                        badge.isUnlocked
                          ? `bg-gradient-to-br ${badge.gradient} text-white ring-2 ring-white/20 dark:ring-white/10`
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      <IconComp className="w-7 h-7" />
                    </div>

                    {/* Status Pill overlay */}
                    <div className="absolute -bottom-1 -right-1">
                      {badge.isUnlocked ? (
                        <div className="w-5 h-5 rounded-full bg-[#35B8A0] text-white flex items-center justify-center shadow-xs border-2 border-white dark:border-[#14213D]">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-slate-400 dark:bg-slate-700 text-white flex items-center justify-center shadow-xs border-2 border-white dark:border-[#14213D]">
                          <Lock className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Badges Tags */}
                  <div className="flex flex-col items-end gap-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${getRarityBadgeStyle(badge.rarity)}`}>
                      {badge.rarity}
                    </span>
                    <span className="text-[11px] font-extrabold text-amber-500 dark:text-amber-400 flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      +{badge.points} XP
                    </span>
                  </div>
                </div>

                {/* Badge Titles & Description */}
                <div>
                  <h3 className={`text-base font-extrabold transition-colors ${
                    badge.isUnlocked
                      ? 'text-[#14213D] dark:text-white group-hover:text-[#7057D9] dark:group-hover:text-[#a89af0]'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}>
                    {badge.title}
                  </h3>
                  <p className="text-xs text-[#737B90] dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>

              {/* Bottom Progress Row */}
              <div className="pt-4 mt-4 border-t border-[#E5E8F0] dark:border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#737B90] dark:text-slate-400 font-medium">
                    {badge.isUnlocked ? (
                      <span className="text-[#35B8A0] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Unlocked
                      </span>
                    ) : (
                      <span>
                        Progress: <strong className="text-[#14213D] dark:text-slate-200">{badge.currentValue}</strong> / {badge.targetValue} {badge.unit}
                      </span>
                    )}
                  </span>
                  <span className="font-bold text-[#14213D] dark:text-white">
                    {progressPercent}%
                  </span>
                </div>

                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      badge.isUnlocked
                        ? 'bg-[#35B8A0]'
                        : 'bg-[#7057D9]'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredBadges.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 p-8">
          <Award className="w-12 h-12 text-[#737B90] mx-auto mb-3 opacity-40" />
          <h4 className="text-sm font-bold text-[#14213D] dark:text-white">No badges match your active filter</h4>
          <p className="text-xs text-[#737B90] dark:text-slate-400 mt-1">
            Try switching filter options above to view all achievements.
          </p>
          <button
            onClick={() => {
              setActiveFilter('all');
              setCategoryFilter('all');
            }}
            className="mt-4 px-4 py-2 bg-[#7057D9] text-white text-xs font-semibold rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Interactive Badge Details Celebratory Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="bg-white dark:bg-[#14213D] w-full max-w-md rounded-3xl border border-[#E5E8F0] dark:border-slate-800 shadow-2xl overflow-hidden relative"
            onClick={e => e.stopPropagation()}
          >
            {/* Header banner glow */}
            <div className={`h-28 w-full bg-gradient-to-r ${selectedBadge.gradient} relative overflow-hidden flex items-center justify-center`}>
              <div className="absolute inset-0 bg-black/15" />
              <button
                onClick={() => setSelectedBadge(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Large Icon Emblem */}
              <div className="relative -bottom-6 w-20 h-20 rounded-3xl bg-white dark:bg-[#14213D] p-1.5 shadow-xl border border-white/20 dark:border-slate-700">
                <div className={`w-full h-full rounded-2xl flex items-center justify-center ${
                  selectedBadge.isUnlocked
                    ? `bg-gradient-to-br ${selectedBadge.gradient} text-white`
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                }`}>
                  <selectedBadge.icon className="w-10 h-10" />
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="pt-10 p-6 text-center space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${getRarityBadgeStyle(selectedBadge.rarity)}`}>
                    {selectedBadge.rarity}
                  </span>
                  <span className="text-xs font-extrabold text-amber-500 dark:text-amber-400 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" />
                    +{selectedBadge.points} XP
                  </span>
                </div>
                <h3 className="text-xl font-black text-[#14213D] dark:text-white">
                  {selectedBadge.title}
                </h3>
                <p className="text-xs text-[#737B90] dark:text-slate-400 leading-relaxed px-4">
                  {selectedBadge.description}
                </p>
              </div>

              {/* Requirement & Criteria box */}
              <div className="bg-[#F8F9FC] dark:bg-slate-800/60 p-4 rounded-2xl border border-[#E5E8F0] dark:border-slate-700 text-left space-y-2 text-xs">
                <div className="flex items-center justify-between text-[11px] font-bold text-[#737B90] dark:text-slate-400 uppercase tracking-wider">
                  <span>Milestone Criteria</span>
                  <span className={selectedBadge.isUnlocked ? 'text-[#35B8A0]' : 'text-amber-500'}>
                    {selectedBadge.isUnlocked ? 'Completed' : 'In Progress'}
                  </span>
                </div>
                <p className="text-xs font-semibold text-[#14213D] dark:text-white">
                  {selectedBadge.milestoneCriteria}
                </p>

                {/* Progress breakdown */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-[#737B90] dark:text-slate-400">Current Progress</span>
                    <span className="font-bold text-[#14213D] dark:text-white">
                      {selectedBadge.currentValue} / {selectedBadge.targetValue} {selectedBadge.unit}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        selectedBadge.isUnlocked ? 'bg-[#35B8A0]' : 'bg-[#7057D9]'
                      }`}
                      style={{
                        width: `${Math.min(100, Math.round((selectedBadge.currentValue / selectedBadge.targetValue) * 100))}%`
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Actions & Sharing */}
              <div className="flex items-center gap-3 pt-2">
                {selectedBadge.isUnlocked ? (
                  <button
                    onClick={() => handleCopyShare(selectedBadge)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#7057D9] hover:bg-[#5f47c8] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    {copiedShare ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4" />
                        <span>Share Achievement</span>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedBadge(null);
                      if (onNavigate) onNavigate('explore');
                    }}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#7057D9] hover:bg-[#5f47c8] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Go to Courses & Learn</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => setSelectedBadge(null)}
                  className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-[#737B90] dark:text-slate-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
