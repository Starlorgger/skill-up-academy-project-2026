import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Course } from '../types';
import { COURSES, CATEGORIES } from '../data/mockData';
import { CourseCard } from '../components/CourseCard';
import { Search, Filter, SlidersHorizontal, BookOpen, Mic, MicOff, X, Sparkles, Volume2 } from 'lucide-react';
import { startVoiceRecognition } from '../utils/speechRecognition';
import { triggerHaptic } from '../utils/haptics';

interface ExploreViewProps {
  initialSearchQuery?: string;
  onSelectCourse: (course: Course) => void;
  onNavigate: (view: string, param?: string) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  initialSearchQuery = '',
  onSelectCourse,
  onNavigate
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedPricing, setSelectedPricing] = useState<string>('all');

  // Voice Search State
  const [isListening, setIsListening] = useState(false);
  const [voiceStatusMsg, setVoiceStatusMsg] = useState<string | null>(null);
  const stopVoiceRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    return () => {
      if (stopVoiceRef.current) {
        stopVoiceRef.current();
      }
    };
  }, []);

  const handleToggleVoiceSearch = async () => {
    if (isListening) {
      if (stopVoiceRef.current) {
        stopVoiceRef.current();
        stopVoiceRef.current = null;
      }
      setIsListening(false);
      setVoiceStatusMsg(null);
      triggerHaptic.light();
      return;
    }

    setVoiceStatusMsg('Listening... speak a course topic');
    setIsListening(true);
    triggerHaptic.medium();

    const stopFn = await startVoiceRecognition({
      onStart: () => {
        setIsListening(true);
        setVoiceStatusMsg('Listening... speak now (e.g. Python, AI, React)');
      },
      onResult: (transcript: string, isFinal: boolean) => {
        setSearchQuery(transcript);
        if (isFinal) {
          triggerHaptic.success();
          setIsListening(false);
          setVoiceStatusMsg(`Voice search: "${transcript}"`);
          setTimeout(() => setVoiceStatusMsg(null), 3000);
        } else {
          setVoiceStatusMsg(`Hearing: "${transcript}"...`);
        }
      },
      onError: (errMessage: string) => {
        setIsListening(false);
        setVoiceStatusMsg(errMessage);
        triggerHaptic.warning();
        setTimeout(() => setVoiceStatusMsg(null), 4000);
      },
      onEnd: () => {
        setIsListening(false);
      }
    });

    stopVoiceRef.current = stopFn;
  };

  const filteredCourses = useMemo(() => {
    return COURSES.filter((course) => {
      // Category filter
      if (selectedCategory !== 'all' && course.categoryId !== selectedCategory) {
        return false;
      }
      // Level filter
      if (selectedLevel !== 'all' && course.level.toLowerCase() !== selectedLevel.toLowerCase()) {
        return false;
      }
      // Pricing filter
      if (selectedPricing === 'free' && course.isPremium) return false;
      if (selectedPricing === 'premium' && !course.isPremium) return false;

      // Query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = course.title.toLowerCase().includes(q);
        const matchDesc = course.description.toLowerCase().includes(q);
        const matchCat = course.categoryName.toLowerCase().includes(q);
        const matchObj = course.objectives.some(o => o.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchCat && !matchObj) return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedLevel, selectedPricing]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSelectedPricing('all');
  };

  return (
    <div className="space-y-8 py-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14213D] dark:text-white tracking-tight">
          Explore Digital Skills Courses
        </h1>
        <p className="text-xs sm:text-sm text-[#737B90] dark:text-slate-400 mt-1">
          Search over 15 categories, filter by difficulty, and learn at your own pace.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 p-4 sm:p-5 shadow-xs space-y-4">
        {/* Search input with Voice-to-Text Button */}
        <div className="space-y-2">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-[#737B90]" />
            <input
              type="text"
              placeholder={isListening ? "Listening... speak now..." : "Search by skill name, course title, or topic (e.g. Prompt Engineering, React, Figma)..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-11 pr-24 py-3 bg-[#F8F9FC] dark:bg-slate-800 border rounded-xl text-xs sm:text-sm text-[#20263A] dark:text-white focus:outline-none transition-all ${
                isListening
                  ? 'border-[#7057D9] ring-2 ring-[#7057D9]/30 bg-purple-500/5'
                  : 'border-[#E5E8F0] dark:border-slate-700 focus:border-[#7057D9]'
              }`}
            />

            <div className="absolute right-2.5 flex items-center gap-1.5">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    triggerHaptic.light();
                  }}
                  className="p-1.5 text-[#737B90] hover:text-[#14213D] dark:hover:text-white rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors"
                  aria-label="Clear search"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Voice-to-Text Button */}
              <button
                type="button"
                onClick={handleToggleVoiceSearch}
                className={`relative flex items-center justify-center p-2 rounded-xl transition-all ${
                  isListening
                    ? 'bg-[#7057D9] text-white shadow-md shadow-[#7057D9]/30 scale-105'
                    : 'bg-[#F8F9FC] dark:bg-slate-700 text-[#737B90] hover:text-[#7057D9] dark:hover:text-[#a89af0] border border-[#E5E8F0] dark:border-slate-600'
                }`}
                title={isListening ? "Stop voice search" : "Search courses by voice"}
                aria-label={isListening ? "Stop voice search" : "Search courses by voice"}
              >
                {isListening && (
                  <span className="absolute inset-0 rounded-xl bg-[#7057D9] animate-ping opacity-40 pointer-events-none" />
                )}
                {isListening ? (
                  <MicOff className="w-4 h-4 text-white relative z-10" />
                ) : (
                  <Mic className="w-4 h-4 relative z-10" />
                )}
              </button>
            </div>
          </div>

          {/* Voice Search Status Notification */}
          {voiceStatusMsg && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs bg-[#7057D9]/10 text-[#7057D9] dark:text-[#a89af0] border border-[#7057D9]/20 animate-in fade-in duration-200">
              {isListening ? (
                <span className="w-2 h-2 rounded-full bg-[#7057D9] animate-ping shrink-0" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 shrink-0" />
              )}
              <span className="font-medium text-[11px] truncate">{voiceStatusMsg}</span>
            </div>
          )}
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {/* Category Dropdown */}
          <div className="min-w-[180px]">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 text-[#20263A] dark:text-white focus:outline-none focus:border-[#7057D9]"
            >
              <option value="all">All Categories (15)</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.letter}. {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Level Segmented Tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#F8F9FC] dark:bg-slate-800 rounded-xl border border-[#E5E8F0] dark:border-slate-700">
            {['all', 'beginner', 'intermediate', 'advanced'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
                  selectedLevel === lvl
                    ? 'bg-white dark:bg-slate-700 text-[#14213D] dark:text-white shadow-xs'
                    : 'text-[#737B90] hover:text-[#14213D] dark:hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Pricing Tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#F8F9FC] dark:bg-slate-800 rounded-xl border border-[#E5E8F0] dark:border-slate-700">
            {['all', 'free', 'premium'].map((prc) => (
              <button
                key={prc}
                onClick={() => setSelectedPricing(prc)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
                  selectedPricing === prc
                    ? 'bg-white dark:bg-slate-700 text-[#14213D] dark:text-white shadow-xs'
                    : 'text-[#737B90] hover:text-[#14213D] dark:hover:text-white'
                }`}
              >
                {prc}
              </button>
            ))}
          </div>

          {(searchQuery || selectedCategory !== 'all' || selectedLevel !== 'all' || selectedPricing !== 'all') && (
            <button
              onClick={resetFilters}
              className="text-xs text-[#7057D9] hover:underline font-semibold ml-auto"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-[#737B90] dark:text-slate-400">
        <span>
          Showing <strong className="text-[#14213D] dark:text-white font-semibold tabular-nums">{filteredCourses.length}</strong> courses
        </span>
      </div>

      {/* Course Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onSelect={onSelectCourse}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 p-12 text-center max-w-lg mx-auto">
          <BookOpen className="w-12 h-12 text-[#737B90] mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#14213D] dark:text-white mb-1">
            No courses match your search
          </h3>
          <p className="text-xs text-[#737B90] dark:text-slate-400 mb-5 leading-relaxed">
            Try adjusting your search terms or clearing your category and difficulty filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-xl bg-[#7057D9] text-white text-xs font-semibold hover:bg-[#5f46c6] transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
