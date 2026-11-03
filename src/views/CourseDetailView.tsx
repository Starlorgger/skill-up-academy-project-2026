import React, { useState } from 'react';
import { Course, CourseModule, Lesson } from '../types';
import { useAuth } from '../context/AuthContext';
import { 
  ArrowLeft, 
  Clock, 
  Star, 
  Users, 
  CheckCircle2, 
  PlayCircle, 
  Award, 
  FileText, 
  FolderGit2, 
  ShieldCheck, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  Briefcase,
  ArrowRight
} from 'lucide-react';
import { JOB_LISTINGS, FREELANCE_GIGS } from '../data/opportunitiesData';

interface CourseDetailViewProps {
  course: Course;
  onBack: () => void;
  onStartLesson: (course: Course, lessonId: string) => void;
  onOpenPricing: () => void;
  onOpenAiAssistant: (topic?: string) => void;
  onNavigate?: (view: string, param?: string) => void;
}

export const CourseDetailView: React.FC<CourseDetailViewProps> = ({
  course,
  onBack,
  onStartLesson,
  onOpenPricing,
  onOpenAiAssistant,
  onNavigate
}) => {
  const { user, progress, enrollInCourse, formatPrice } = useAuth();
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    [course.modules[0]?.id || '']: true
  });

  const isEnrolled = user.enrolledCourses.includes(course.id);
  const key = `${user.id}:${course.id}`;
  const userProg = progress[key];
  const completedLessonIds = userProg ? userProg.completedLessonIds : [];

  const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const percentComplete = totalLessons > 0 ? Math.round((completedLessonIds.length / totalLessons) * 100) : 0;

  // First lesson to launch
  const firstLessonId = course.modules[0]?.lessons[0]?.id || '';
  const resumeLessonId = userProg?.lastAccessedLessonId || firstLessonId;

  const toggleModule = (modId: string) => {
    setExpandedModules(prev => ({ ...prev, [modId]: !prev[modId] }));
  };

  const handleEnroll = () => {
    if (course.isPremium && user.plan === 'free') {
      onOpenPricing();
      return;
    }
    enrollInCourse(course.id);
  };

  return (
    <div className="space-y-8 py-6">
      {/* Top back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#737B90] hover:text-[#14213D] dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      {/* Main Course Header Hero Split */}
      <div className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12">
        {/* Left Information */}
        <div className="p-6 sm:p-8 lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            {/* Unboxed Metadata: Category · Level · Duration */}
            <div className="flex items-center gap-2 text-xs text-[#737B90] dark:text-slate-400">
              <span className="font-semibold text-[#7057D9] dark:text-[#a89af0]">{course.categoryName}</span>
              <span aria-hidden="true">·</span>
              <span>{course.level} Level</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {course.durationHours} Total Hours
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14213D] dark:text-white tracking-tight leading-snug">
              {course.title}
            </h1>

            <p className="text-xs sm:text-sm text-[#737B90] dark:text-slate-300 leading-relaxed">
              {course.description}
            </p>

            {/* Ratings & Social Proof */}
            <div className="flex items-center gap-4 text-xs pt-1">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-500" />
                <span>{course.rating.toFixed(1)}</span>
                <span className="text-[#737B90] dark:text-slate-400 font-normal">({course.reviewsCount} reviews)</span>
              </div>
              <span className="text-[#737B90] dark:text-slate-400">·</span>
              <div className="flex items-center gap-1 text-[#737B90] dark:text-slate-400">
                <Users className="w-3.5 h-3.5" />
                <span>{course.studentsCount.toLocaleString()} Students Enrolled</span>
              </div>
            </div>
          </div>

          {/* Instructor Block */}
          <div className="p-4 rounded-2xl bg-[#F8F9FC] dark:bg-slate-800/80 border border-[#E5E8F0] dark:border-slate-700 flex items-center gap-3">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="w-12 h-12 rounded-full object-cover border border-[#E5E8F0]"
            />
            <div>
              <p className="text-xs text-[#737B90] dark:text-slate-400">Taught by</p>
              <h4 className="text-sm font-bold text-[#14213D] dark:text-white">{course.instructor.name}</h4>
              <p className="text-[11px] text-[#737B90] dark:text-slate-400">{course.instructor.role}</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {isEnrolled ? (
              <button
                onClick={() => onStartLesson(course, resumeLessonId)}
                className="px-6 py-3 rounded-xl bg-[#7057D9] hover:bg-[#5f46c6] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Resume Lesson ({percentComplete}% complete)</span>
              </button>
            ) : (
              <button
                onClick={handleEnroll}
                className="px-6 py-3 rounded-xl bg-[#7057D9] hover:bg-[#5f46c6] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <span>Enroll Now ({formatPrice(course.priceNGN, course.priceUSD)})</span>
              </button>
            )}

            <button
              onClick={() => onOpenAiAssistant(course.title)}
              className="px-4 py-3 rounded-xl bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 hover:border-[#7057D9] text-xs font-semibold text-[#14213D] dark:text-white flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#7057D9]" />
              <span>Ask AI About Curriculum</span>
            </button>
          </div>
        </div>

        {/* Right Preview Card */}
        <div className="p-6 sm:p-8 lg:col-span-5 bg-[#F8F9FC] dark:bg-slate-900 border-t lg:border-t-0 lg:border-l border-[#E5E8F0] dark:border-slate-800 flex flex-col justify-between">
          <div>
            <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-5 shadow-sm border border-[#E5E8F0] dark:border-slate-800">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3 text-xs">
              <h4 className="font-bold text-[#14213D] dark:text-white uppercase tracking-wider text-[11px]">
                This Course Includes:
              </h4>
              <ul className="space-y-2 text-[#737B90] dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <PlayCircle className="w-4 h-4 text-[#35B8A0]" />
                  <span>{totalLessons} in-depth written & video lessons</span>
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#35B8A0]" />
                  <span>Practical code exercises and quizzes</span>
                </li>
                <li className="flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-[#35B8A0]" />
                  <span>Verified Capstone Project ({course.finalProjectTitle})</span>
                </li>
                <li className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#35B8A0]" />
                  <span>Official Certificate of Completion</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#7057D9]" />
                  <span>Lifetime access & mobile learning</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-[#E5E8F0] dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-[#737B90] dark:text-slate-400">Prerequisites</span>
            <span className="font-semibold text-[#14213D] dark:text-white">
              {course.prerequisites.join(', ')}
            </span>
          </div>
        </div>
      </div>

      {/* Learning Objectives Grid */}
      <div className="bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 p-6 shadow-xs">
        <h2 className="text-base font-bold text-[#14213D] dark:text-white mb-4">
          What You Will Learn
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {course.objectives.map((obj, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-[#20263A] dark:text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-[#35B8A0] shrink-0 mt-0.5" />
              <span className="leading-relaxed">{obj}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Structured Curriculum Breakdown */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#14213D] dark:text-white tracking-tight">
            Curriculum & Modules
          </h2>
          <span className="text-xs text-[#737B90] dark:text-slate-400">
            {course.modules.length} Modules · {totalLessons} Lessons
          </span>
        </div>

        <div className="space-y-3">
          {course.modules.map((mod, modIdx) => {
            const isExpanded = expandedModules[mod.id] ?? false;
            return (
              <div
                key={mod.id}
                className="bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 overflow-hidden shadow-xs"
              >
                {/* Module Header */}
                <button
                  onClick={() => toggleModule(mod.id)}
                  className="w-full p-5 text-left flex items-center justify-between hover:bg-[#F8F9FC] dark:hover:bg-slate-800/50 transition-colors focus:outline-none"
                >
                  <div>
                    <h3 className="text-sm font-bold text-[#14213D] dark:text-white">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-[#737B90] dark:text-slate-400 mt-0.5">
                      {mod.lessons.length} lessons
                    </p>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[#737B90]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#737B90]" />
                  )}
                </button>

                {/* Lessons List */}
                {isExpanded && (
                  <div className="border-t border-[#E5E8F0] dark:border-slate-800 divide-y divide-[#E5E8F0] dark:divide-slate-800/60">
                    {mod.lessons.map((lesson, lesIdx) => {
                      const isCompleted = completedLessonIds.includes(lesson.id);
                      return (
                        <div
                          key={lesson.id}
                          onClick={() => {
                            if (!isEnrolled) handleEnroll();
                            else onStartLesson(course, lesson.id);
                          }}
                          className="p-4 pl-6 flex items-center justify-between text-xs hover:bg-[#F8F9FC] dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-[#35B8A0] shrink-0" />
                            ) : (
                              <PlayCircle className="w-4 h-4 text-[#7057D9] shrink-0" />
                            )}
                            <div>
                              <p className={`font-semibold ${isCompleted ? 'text-[#35B8A0]' : 'text-[#20263A] dark:text-white'}`}>
                                {lesson.title}
                              </p>
                              <p className="text-[11px] text-[#737B90] dark:text-slate-400 mt-0.5 line-clamp-1">
                                {lesson.objective}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0 text-[#737B90] dark:text-slate-400">
                            <span>{lesson.durationMinutes} min</span>
                            <span className="text-[#7057D9] font-semibold text-xs">Start</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Skill-to-Opportunity: Live Jobs & Freelance Gigs Connected to this Course */}
      <div className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7057D9] dark:text-[#a89af0] uppercase tracking-wider mb-1">
              <Briefcase className="w-3.5 h-3.5 text-[#35B8A0]" />
              <span>Skill-to-Opportunity Connection</span>
            </div>
            <h2 className="text-xl font-extrabold text-[#14213D] dark:text-white">
              Careers & Jobs You Can Apply For With These Skills
            </h2>
            <p className="text-xs text-[#737B90] dark:text-slate-400 mt-0.5">
              Completing this course qualifies you for the following verified job openings and client contracts.
            </p>
          </div>

          {onNavigate && (
            <button
              onClick={() => onNavigate('jobs')}
              className="text-xs font-bold text-[#7057D9] dark:text-[#a89af0] hover:underline flex items-center gap-1 shrink-0"
            >
              <span>View All 15+ Jobs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 2 matching cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {JOB_LISTINGS.filter(j => j.categoryId === course.categoryId || j.categoryName === course.categoryName).slice(0, 2).map((job) => (
            <div
              key={job.id}
              onClick={() => onNavigate && onNavigate('jobs')}
              className="p-4 rounded-2xl border border-[#E5E8F0] dark:border-slate-800 bg-[#F8F9FC] dark:bg-slate-900/50 hover:border-[#7057D9] transition-all cursor-pointer flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-[#737B90] dark:text-slate-400">
                    {job.company} · {job.location}
                  </span>
                  <h3 className="font-bold text-sm text-[#14213D] dark:text-white mt-0.5">
                    {job.title}
                  </h3>
                </div>
                <span className="text-xs font-extrabold text-[#35B8A0] shrink-0">
                  {user.currency === 'NGN' 
                    ? `₦${(job.salaryMinNGN/1000).toFixed(0)}k - ₦${(job.salaryMaxNGN/1000).toFixed(0)}k` 
                    : `$${job.salaryMinUSD} - $${job.salaryMaxUSD}`}
                </span>
              </div>

              <div className="flex flex-wrap gap-1">
                {job.skillsRequired.slice(0, 3).map((s, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white dark:bg-slate-800 text-[#7057D9] dark:text-[#a89af0] border border-[#E5E8F0] dark:border-slate-700">
                    ✓ {s}
                  </span>
                ))}
              </div>

              <div className="pt-2 border-t border-[#E5E8F0] dark:border-slate-800 text-[11px] text-[#7057D9] dark:text-[#a89af0] font-bold flex items-center justify-between">
                <span>Direct Application Available</span>
                <span className="flex items-center gap-1">Apply on Jobs Hub <ArrowRight className="w-3 h-3" /></span>
              </div>
            </div>
          ))}

          {FREELANCE_GIGS.filter(g => g.categoryId === course.categoryId || g.categoryName === course.categoryName).slice(0, 2).map((gig) => (
            <div
              key={gig.id}
              onClick={() => onNavigate && onNavigate('freelance')}
              className="p-4 rounded-2xl border border-[#E5E8F0] dark:border-slate-800 bg-[#F8F9FC] dark:bg-slate-900/50 hover:border-[#35B8A0] transition-all cursor-pointer flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-[#737B90] dark:text-slate-400">
                    Client: {gig.clientName} ({gig.clientCountry})
                  </span>
                  <h3 className="font-bold text-sm text-[#14213D] dark:text-white mt-0.5">
                    {gig.title}
                  </h3>
                </div>
                <span className="text-xs font-extrabold text-[#35B8A0] shrink-0">
                  {user.currency === 'NGN' ? `₦${gig.budgetNGN.toLocaleString()}` : `$${gig.budgetUSD}`}
                </span>
              </div>

              <div className="flex flex-wrap gap-1">
                {gig.skillsRequired.slice(0, 3).map((s, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white dark:bg-slate-800 text-[#35B8A0] border border-[#E5E8F0] dark:border-slate-700">
                    ✓ {s}
                  </span>
                ))}
              </div>

              <div className="pt-2 border-t border-[#E5E8F0] dark:border-slate-800 text-[11px] text-[#35B8A0] font-bold flex items-center justify-between">
                <span>Verified Client Funds</span>
                <span className="flex items-center gap-1">Bid on Freelance Hub <ArrowRight className="w-3 h-3" /></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
