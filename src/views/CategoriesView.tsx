import React, { useState } from 'react';
import { CATEGORIES, COURSES } from '../data/mockData';
import { SkillCategory, Course } from '../types';
import { CourseCard } from '../components/CourseCard';
import { 
  ArrowLeft, 
  ArrowRight, 
  Search, 
  BookOpen, 
  CheckCircle2,
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
} from 'lucide-react';

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

interface CategoriesViewProps {
  onSelectCategory: (categoryId: string) => void;
  onNavigate: (view: string) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({ onSelectCategory, onNavigate }) => {
  const [search, setSearch] = useState('');

  const filteredCategories = CATEGORIES.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
    c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-8 py-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14213D] dark:text-white tracking-tight">
          Complete Skills Catalogue
        </h1>
        <p className="text-xs sm:text-sm text-[#737B90] dark:text-slate-400 mt-1 max-w-2xl">
          Explore all 15 industry-standard learning categories. Each track is curated with structured curriculum, hands-on exercises, and portfolio deliverables.
        </p>
      </div>

      {/* Filter / Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-[#737B90]" />
        <input
          type="text"
          placeholder="Filter categories (e.g. AI, Mobile, Design, Cloud)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#14213D] border border-[#E5E8F0] dark:border-slate-800 rounded-xl text-xs sm:text-sm text-[#20263A] dark:text-white focus:outline-none focus:border-[#7057D9]"
        />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((cat) => {
          const Icon = CATEGORY_ICON_MAP[cat.iconName] || Brain;
          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 p-6 flex flex-col justify-between hover:border-[#7057D9] hover:shadow-lg hover:shadow-[#7057D9]/5 transition-all cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#7057D9]/10 text-[#7057D9] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#737B90] dark:text-slate-400 bg-[#F8F9FC] dark:bg-slate-800 px-2 py-1 rounded">
                    Category {cat.letter}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#14213D] dark:text-white group-hover:text-[#7057D9] dark:group-hover:text-[#a89af0] transition-colors mb-2">
                  {cat.title}
                </h3>

                <p className="text-xs text-[#737B90] dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                  {cat.fullDescription}
                </p>

                {/* Sample Key Skills */}
                <div className="space-y-1.5 mb-4">
                  <p className="text-[11px] font-semibold text-[#14213D] dark:text-slate-200">
                    Included Skills:
                  </p>
                  <p className="text-xs text-[#737B90] dark:text-slate-400 line-clamp-2">
                    {cat.skills.slice(0, 4).join(' · ')}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E8F0] dark:border-slate-800 flex items-center justify-between text-xs text-[#737B90] dark:text-slate-400">
                <span className="font-semibold text-[#14213D] dark:text-slate-200">{cat.courseCount} Courses</span>
                <span className="font-semibold text-[#7057D9] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore Track <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface CategoryDetailViewProps {
  categoryId: string;
  onBack: () => void;
  onSelectCourse: (course: Course) => void;
  onOpenAiAssistant: (topic?: string) => void;
}

export const CategoryDetailView: React.FC<CategoryDetailViewProps> = ({
  categoryId,
  onBack,
  onSelectCourse,
  onOpenAiAssistant
}) => {
  const category = CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0];
  const courses = COURSES.filter(c => c.categoryId === category.id);
  const Icon = CATEGORY_ICON_MAP[category.iconName] || Brain;

  return (
    <div className="space-y-8 py-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#737B90] hover:text-[#14213D] dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Categories</span>
      </button>

      {/* Hero Category Banner */}
      <div className="bg-gradient-to-br from-[#14213D] to-[#20263A] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-[#35B8A0]">
            <Icon className="w-4 h-4" />
            <span>Category {category.letter}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {category.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {category.fullDescription}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onOpenAiAssistant(category.title)}
              className="px-4 py-2 rounded-xl bg-[#7057D9] hover:bg-[#5f46c6] text-white text-xs font-semibold transition-colors"
            >
              Ask AI about {category.title.split('&')[0]}
            </button>
          </div>
        </div>
      </div>

      {/* Skills Matrix */}
      <div className="bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 p-6 shadow-xs">
        <h2 className="text-sm font-bold text-[#14213D] dark:text-white uppercase tracking-wider mb-3">
          Core Competencies Covered in this Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {category.skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F8F9FC] dark:bg-slate-800/80 border border-[#E5E8F0] dark:border-slate-700/60 text-xs text-[#20263A] dark:text-slate-200"
            >
              <CheckCircle2 className="w-4 h-4 text-[#35B8A0] shrink-0" />
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Courses in this Category */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#14213D] dark:text-white tracking-tight">
            Curated Courses ({courses.length})
          </h2>
        </div>

        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onSelect={onSelectCourse}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 text-xs text-[#737B90]">
            Courses for this specialized track are actively expanding. Check back shortly or browse other categories!
          </div>
        )}
      </div>
    </div>
  );
};
