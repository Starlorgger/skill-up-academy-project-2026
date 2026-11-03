import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CATEGORIES, COURSES, PROJECTS, LEARNING_PATHS } from '../data/mockData';
import { CourseCard } from '../components/CourseCard';
import { Course, SkillCategory } from '../types';
import { 
  Search, 
  ArrowRight, 
  Play, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  FolderGit2, 
  Compass, 
  TrendingUp,
  Brain,
  Code,
  Smartphone,
  Layout,
  BarChart2,
  Shield,
  Figma,
  Video,
  Briefcase,
  Globe,
  PenTool,
  ShoppingBag,
  CheckSquare,
  Zap
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: string, param?: string) => void;
  onSelectCourse: (course: Course) => void;
  onOpenAiAssistant: (topic?: string) => void;
}

const CATEGORY_ICON_MAP: Record<string, React.ElementType> = {
  Brain,
  Code,
  Smartphone,
  Layout,
  BarChart2,
  Shield,
  Figma,
  Video,
  TrendingUp,
  Briefcase,
  Globe,
  PenTool,
  ShoppingBag,
  CheckSquare,
  Zap
};

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectCourse,
  onOpenAiAssistant
}) => {
  const { user, progress } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const enrolledCourseObjects = COURSES.filter(c => user.enrolledCourses.includes(c.id));
  const popularCourses = COURSES.slice(0, 3);
  const trendingCourses = COURSES.filter(c => c.trending).slice(0, 3);

  // Overall calculated metrics
  const totalCompletedLessons = Object.values(progress).reduce(
    (sum, p) => sum + (p.completedLessonIds ? p.completedLessonIds.length : 0),
    0
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onNavigate('explore', searchTerm.trim());
    }
  };

  return (
    <div className="space-y-16 py-6 sm:py-10">
      {/* 1. Welcoming Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#14213D] via-[#1a2d54] to-[#14213D] text-white p-6 sm:p-12 lg:p-16 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Zone */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-[#35B8A0] border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-[#35B8A0]" />
              <span>SkillUp Academy · Created by Tayo Verse Studios</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-balance">
              Learn Skills. Build Projects. <span className="text-[#35B8A0]">Create Your Future.</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Master high-demand digital skills through structured written lessons, video tutorials, and hands-on portfolio projects. Built for ambitious learners in Nigeria and worldwide.
            </p>

            {/* Prominent Search Field */}
            <form onSubmit={handleSearchSubmit} className="max-w-xl">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="What would you like to learn today? (e.g. AI, React, Figma, SQL)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-28 py-3.5 rounded-2xl bg-white text-[#20263A] text-sm focus:outline-none focus:ring-2 focus:ring-[#7057D9] placeholder:text-slate-400 shadow-md"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-4 py-2 bg-[#7057D9] hover:bg-[#5f46c6] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors"
                >
                  Explore
                </button>
              </div>
            </form>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('explore')}
                className="px-6 py-3 rounded-xl bg-[#7057D9] hover:bg-[#5f46c6] text-white font-semibold text-sm transition-all shadow-md shadow-[#7057D9]/25 flex items-center gap-2"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('mylearning')}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md border border-white/10 transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-[#35B8A0]" />
                <span>Continue Learning</span>
              </button>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/3] lg:aspect-auto lg:h-[380px]">
              <img
                src="/src/assets/images/hero_learning_students_1793158877350.jpg"
                alt="SkillUp Academy students learning digital skills"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14213D]/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating Real-Time Learning Tag */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-white/90 dark:bg-[#14213D]/90 backdrop-blur-md border border-white/20 text-[#14213D] dark:text-white flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#35B8A0]/20 text-[#35B8A0] flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-tight">Practical Learning by Doing</p>
                    <p className="text-[11px] text-[#737B90] dark:text-slate-300">Quizzes, code hints, verified certificates</p>
                  </div>
                </div>
                <button
                  onClick={() => onOpenAiAssistant('Getting Started')}
                  className="px-2.5 py-1 text-[11px] font-semibold text-[#7057D9] bg-[#7057D9]/10 rounded-md hover:bg-[#7057D9]/20 transition-colors"
                >
                  Ask AI
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Personal Learning Progress Summary */}
      <section className="bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 p-6 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#E5E8F0] dark:divide-slate-800">
          <div className="px-3 pt-2 md:pt-0">
            <p className="text-xs font-medium text-[#737B90] dark:text-slate-400">Enrolled Courses</p>
            <p className="text-2xl font-bold text-[#14213D] dark:text-white mt-1 tabular-nums">
              {user.enrolledCourses.length}
            </p>
            <p className="text-[11px] text-[#35B8A0] mt-0.5">Active enrollments</p>
          </div>

          <div className="px-3 pt-2 md:pt-0">
            <p className="text-xs font-medium text-[#737B90] dark:text-slate-400">Completed Lessons</p>
            <p className="text-2xl font-bold text-[#14213D] dark:text-white mt-1 tabular-nums">
              {totalCompletedLessons}
            </p>
            <p className="text-[11px] text-[#737B90] mt-0.5">Calculated from activity</p>
          </div>

          <div className="px-3 pt-2 md:pt-0">
            <p className="text-xs font-medium text-[#737B90] dark:text-slate-400">Portfolio Deliverables</p>
            <p className="text-2xl font-bold text-[#14213D] dark:text-white mt-1 tabular-nums">
              1
            </p>
            <p className="text-[11px] text-[#35B8A0] mt-0.5">1 approved submission</p>
          </div>

          <div className="px-3 pt-2 md:pt-0">
            <p className="text-xs font-medium text-[#737B90] dark:text-slate-400">Learning Plan</p>
            <p className="text-2xl font-bold text-[#7057D9] dark:text-[#a89af0] mt-1 capitalize">
              {user.plan.replace('_', ' ')}
            </p>
            <p className="text-[11px] text-[#737B90] mt-0.5">Nigeria & International access</p>
          </div>
        </div>
      </section>

      {/* 3. Continue Learning Section (if enrolled in any) */}
      {enrolledCourseObjects.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#14213D] dark:text-white tracking-tight">
                Continue Learning
              </h2>
              <p className="text-xs text-[#737B90] dark:text-slate-400">
                Pick up right where you left off in your curriculum.
              </p>
            </div>
            <button
              onClick={() => onNavigate('mylearning')}
              className="text-xs font-semibold text-[#7057D9] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrolledCourseObjects.map((course) => {
              const key = `${user.id}:${course.id}`;
              const userProg = progress[key];
              const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
              const completedCount = userProg ? userProg.completedLessonIds.length : 0;
              const percent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

              return (
                <div
                  key={course.id}
                  className="bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 p-5 flex flex-col justify-between hover:border-[#7057D9]/40 transition-all shadow-xs"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-20 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <span className="text-[11px] font-semibold text-[#7057D9] uppercase tracking-wider">
                        {course.categoryName.split('&')[0]}
                      </span>
                      <h3 className="text-sm font-bold text-[#14213D] dark:text-white line-clamp-1 mt-0.5">
                        {course.title}
                      </h3>
                      <p className="text-xs text-[#737B90] dark:text-slate-400 mt-1">
                        {completedCount} of {totalLessons} lessons completed
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-[#737B90] dark:text-slate-400 font-medium">Progress</span>
                      <span className="font-bold text-[#35B8A0]">{percent}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#E5E8F0] dark:bg-slate-800 rounded-full overflow-hidden mb-4">
                      <div
                        className="h-full bg-[#35B8A0] rounded-full transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <button
                      onClick={() => onSelectCourse(course)}
                      className="w-full py-2.5 rounded-xl bg-[#7057D9] hover:bg-[#5f46c6] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Resume Course</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. Complete Skills Catalogue (15 Categories Overview) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#14213D] dark:text-white tracking-tight">
              Explore 15 Learning Categories
            </h2>
            <p className="text-xs text-[#737B90] dark:text-slate-400">
              Structured paths from beginner fundamentals to commercial production.
            </p>
          </div>
          <button
            onClick={() => onNavigate('categories')}
            className="text-xs font-semibold text-[#7057D9] hover:underline flex items-center gap-1"
          >
            <span>See All 15</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.slice(0, 6).map((cat) => {
            const Icon = CATEGORY_ICON_MAP[cat.iconName] || Brain;
            return (
              <div
                key={cat.id}
                onClick={() => onNavigate('category-detail', cat.id)}
                className="group bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 p-5 hover:border-[#7057D9] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#7057D9]/10 text-[#7057D9] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#737B90] dark:text-slate-400">
                      Category {cat.letter}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#14213D] dark:text-white group-hover:text-[#7057D9] dark:group-hover:text-[#a89af0] transition-colors mb-1.5">
                    {cat.title}
                  </h3>

                  <p className="text-xs text-[#737B90] dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {cat.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E5E8F0] dark:border-slate-800 flex items-center justify-between text-xs text-[#737B90] dark:text-slate-400">
                  <span>{cat.courseCount} Courses Available</span>
                  <span className="font-semibold text-[#7057D9] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Popular Courses Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#14213D] dark:text-white tracking-tight">
              Popular Courses
            </h2>
            <p className="text-xs text-[#737B90] dark:text-slate-400">
              The most enrolled and highest-rated skills this month.
            </p>
          </div>
          <button
            onClick={() => onNavigate('explore')}
            className="text-xs font-semibold text-[#7057D9] hover:underline flex items-center gap-1"
          >
            <span>Browse All Courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onSelect={onSelectCourse}
            />
          ))}
        </div>
      </section>

      {/* 6. Learn by Doing Section (Projects Showcase) */}
      <section className="bg-gradient-to-br from-[#14213D] to-[#20263A] rounded-3xl p-6 sm:p-10 text-white shadow-xl">
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#35B8A0] mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Practical Portfolios</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Learn by Doing: Real-World Projects
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            Theory without practice doesn't land jobs or clients. Complete verified projects with rubric grading, instructor feedback, and showcase them in your public portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.slice(0, 3).map((project) => (
            <div
              key={project.id}
              onClick={() => onNavigate('project-detail', project.id)}
              className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-5 flex flex-col justify-between hover:bg-white/15 transition-all cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
                  <span className="font-medium text-[#35B8A0]">{project.difficulty}</span>
                  <span>~{project.estimatedHours} Hours</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-[#35B8A0] transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                  {project.objective}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400">4 Rubric Criteria</span>
                <span className="font-semibold text-[#35B8A0] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Start Project <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Guided Learning Paths Preview */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#14213D] dark:text-white tracking-tight">
              Guided Career Paths
            </h2>
            <p className="text-xs text-[#737B90] dark:text-slate-400">
              Clear roadmaps taking you from beginner to job-ready specialist.
            </p>
          </div>
          <button
            onClick={() => onNavigate('paths')}
            className="text-xs font-semibold text-[#7057D9] hover:underline flex items-center gap-1"
          >
            <span>Explore All Paths</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LEARNING_PATHS.slice(0, 2).map((path) => (
            <div
              key={path.id}
              onClick={() => onNavigate('paths')}
              className="bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 p-6 flex flex-col justify-between hover:border-[#7057D9] transition-all cursor-pointer shadow-xs"
            >
              <div>
                <span className="text-[11px] font-semibold text-[#7057D9] uppercase tracking-wider">
                  {path.level} Roadmap · {path.totalDurationWeeks} Weeks
                </span>
                <h3 className="text-lg font-bold text-[#14213D] dark:text-white mt-1 mb-2">
                  {path.title}
                </h3>
                <p className="text-xs text-[#737B90] dark:text-slate-400 leading-relaxed mb-4">
                  {path.description}
                </p>

                <div className="space-y-1.5 mb-4">
                  <p className="text-[11px] font-semibold text-[#14213D] dark:text-slate-200">
                    Career Outcomes:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {path.careerOutcomes.map((career, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2.5 py-1 rounded-md bg-[#F8F9FC] dark:bg-slate-800 text-[#20263A] dark:text-slate-300 border border-[#E5E8F0] dark:border-slate-700"
                      >
                        {career}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E8F0] dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[#737B90] dark:text-slate-400">
                  {path.courseIds.length} Courses + Capstone Project
                </span>
                <span className="font-semibold text-[#7057D9] flex items-center gap-1">
                  View Roadmap <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Online Jobs & Freelance Opportunities Hub Preview */}
      <section className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7057D9]/10 text-xs font-semibold text-[#7057D9] dark:text-[#a89af0] mb-2">
              <Briefcase className="w-3.5 h-3.5 text-[#35B8A0]" />
              <span>Skill-to-Work Ecosystem</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#14213D] dark:text-white tracking-tight">
              Turn Your Skills into Income: Jobs & Freelance Gigs
            </h2>
            <p className="text-xs text-[#737B90] dark:text-slate-400 mt-1 max-w-xl">
              We connect your course progress and portfolio directly to verified employers in Nigeria, international remote teams, and high-paying freelance clients.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('jobs')}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-[#7057D9] text-white hover:bg-[#5f47c8] transition-colors shadow-sm"
            >
              Browse Jobs
            </button>
            <button
              onClick={() => onNavigate('freelance')}
              className="px-4 py-2 text-xs font-bold rounded-xl border border-[#7057D9] text-[#7057D9] dark:text-[#a89af0] hover:bg-[#7057D9]/10 transition-colors"
            >
              Freelance Gigs
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Feature 1 */}
          <div
            onClick={() => onNavigate('jobs')}
            className="p-4 rounded-2xl border border-[#E5E8F0] dark:border-slate-800 bg-[#F8F9FC] dark:bg-slate-900/50 hover:border-[#7057D9] transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#7057D9]/10 flex items-center justify-center text-[#7057D9] dark:text-[#a89af0] mb-3 group-hover:scale-105 transition-transform">
              <Briefcase className="w-4 h-4 text-[#7057D9]" />
            </div>
            <h3 className="font-extrabold text-sm text-[#14213D] dark:text-white mb-1">
              Verified Digital Jobs
            </h3>
            <p className="text-xs text-[#737B90] dark:text-slate-400 leading-relaxed mb-3">
              Full-time and hybrid roles in Lagos, Abuja, and worldwide remote teams paying in NGN and USD.
            </p>
            <span className="text-xs font-bold text-[#7057D9] dark:text-[#a89af0] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Explore 15+ Openings <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          {/* Feature 2 */}
          <div
            onClick={() => onNavigate('freelance')}
            className="p-4 rounded-2xl border border-[#E5E8F0] dark:border-slate-800 bg-[#F8F9FC] dark:bg-slate-900/50 hover:border-[#35B8A0] transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#35B8A0]/10 flex items-center justify-center text-[#35B8A0] mb-3 group-hover:scale-105 transition-transform">
              <Globe className="w-4 h-4 text-[#35B8A0]" />
            </div>
            <h3 className="font-extrabold text-sm text-[#14213D] dark:text-white mb-1">
              Freelance Gig Network
            </h3>
            <p className="text-xs text-[#737B90] dark:text-slate-400 leading-relaxed mb-3">
              Bid on international client projects with verified escrow funds, fixed prices, and hourly contracts.
            </p>
            <span className="text-xs font-bold text-[#35B8A0] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Submit Client Bids <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          {/* Feature 3 */}
          <div
            onClick={() => onNavigate('career')}
            className="p-4 rounded-2xl border border-[#E5E8F0] dark:border-slate-800 bg-[#F8F9FC] dark:bg-slate-900/50 hover:border-[#7057D9] transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#7057D9]/10 flex items-center justify-center text-[#7057D9] dark:text-[#a89af0] mb-3 group-hover:scale-105 transition-transform">
              <Compass className="w-4 h-4 text-[#7057D9]" />
            </div>
            <h3 className="font-extrabold text-sm text-[#14213D] dark:text-white mb-1">
              Career Roadmaps & Salaries
            </h3>
            <p className="text-xs text-[#737B90] dark:text-slate-400 leading-relaxed mb-3">
              Benchmark your compensation, practice real technical interview questions, and optimize your resume.
            </p>
            <span className="text-xs font-bold text-[#7057D9] dark:text-[#a89af0] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              View Roadmaps <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </section>

      {/* 8. AI Learning Assistant CTA Banner */}
      <section className="bg-gradient-to-r from-[#7057D9] to-[#35B8A0] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>24/7 AI Learning Assistant</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            Stuck on a concept or code error?
          </h3>
          <p className="text-xs sm:text-sm text-white/90 max-w-md">
            Our Gemini-powered assistant explains topics simply, generates practice exercises, and helps debug your projects anytime.
          </p>
        </div>

        <button
          onClick={() => onOpenAiAssistant('General Question')}
          className="px-6 py-3 rounded-xl bg-[#14213D] hover:bg-[#0c1426] text-white text-xs sm:text-sm font-bold shadow-lg transition-transform hover:scale-105 shrink-0"
        >
          Chat with AI Assistant
        </button>
      </section>
    </div>
  );
};
