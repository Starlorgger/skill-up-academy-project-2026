import React from 'react';
import { LEARNING_PATHS, COURSES, PROJECTS } from '../data/mockData';
import { LearningPath, Course } from '../types';
import { ArrowRight, Compass, Clock, CheckCircle2, Award, FolderGit2, Sparkles } from 'lucide-react';

interface LearningPathsViewProps {
  onSelectCourse: (course: Course) => void;
  onSelectProject: (projectId: string) => void;
  onOpenAiAssistant: (topic?: string) => void;
}

export const LearningPathsView: React.FC<LearningPathsViewProps> = ({
  onSelectCourse,
  onSelectProject,
  onOpenAiAssistant
}) => {
  return (
    <div className="space-y-8 py-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7057D9]/10 text-xs font-semibold text-[#7057D9] dark:text-[#a89af0] mb-2">
          <Compass className="w-3.5 h-3.5" />
          <span>Curated Roadmaps</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14213D] dark:text-white tracking-tight">
          Guided Learning Paths
        </h1>
        <p className="text-xs sm:text-sm text-[#737B90] dark:text-slate-400 mt-1 max-w-2xl">
          Don't guess what to study next. Follow our structured sequential tracks built to prepare you for global tech employment, freelancing, and digital business.
        </p>
      </div>

      {/* Paths List */}
      <div className="space-y-8">
        {LEARNING_PATHS.map((path, idx) => {
          const pathCourses = COURSES.filter(c => path.courseIds.includes(c.id));
          const primaryProject = PROJECTS.find(p => p.id === path.primaryProjectId);

          return (
            <div
              key={path.id}
              className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6"
            >
              {/* Path Header */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2 text-xs text-[#737B90] dark:text-slate-400">
                    <span className="font-bold text-[#7057D9] dark:text-[#a89af0] uppercase tracking-wider">
                      Path 0{idx + 1}
                    </span>
                    <span>·</span>
                    <span>{path.level} Level</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {path.totalDurationWeeks} Weeks
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-[#14213D] dark:text-white tracking-tight">
                    {path.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#737B90] dark:text-slate-300 leading-relaxed">
                    {path.description}
                  </p>
                </div>

                <button
                  onClick={() => onOpenAiAssistant(`Can you explain the learning roadmap for "${path.title}"?`)}
                  className="px-4 py-2 rounded-xl bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 hover:border-[#7057D9] text-xs font-semibold text-[#14213D] dark:text-white flex items-center gap-1.5 transition-colors shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#7057D9]" />
                  <span>Ask AI About This Path</span>
                </button>
              </div>

              {/* Career Outcomes Tags */}
              <div className="pt-2">
                <p className="text-[11px] font-bold text-[#14213D] dark:text-white uppercase tracking-wider mb-2">
                  Target Career Outcomes:
                </p>
                <div className="flex flex-wrap gap-2">
                  {path.careerOutcomes.map((career, cIdx) => (
                    <span
                      key={cIdx}
                      className="px-3 py-1 rounded-lg bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 text-xs font-medium text-[#20263A] dark:text-slate-200 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#35B8A0]" />
                      {career}
                    </span>
                  ))}
                </div>
              </div>

              {/* Step Sequence: Courses & Projects */}
              <div className="pt-4 border-t border-[#E5E8F0] dark:border-slate-800">
                <p className="text-xs font-bold text-[#14213D] dark:text-white uppercase tracking-wider mb-4">
                  Curriculum Sequence:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pathCourses.map((c, cIdx) => (
                    <div
                      key={c.id}
                      onClick={() => onSelectCourse(c)}
                      className="p-4 rounded-2xl bg-[#F8F9FC] dark:bg-slate-800/80 border border-[#E5E8F0] dark:border-slate-700 hover:border-[#7057D9] transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-[#7057D9] uppercase tracking-wider">
                          Course {cIdx + 1}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-[#14213D] dark:text-white mt-0.5 line-clamp-1">
                          {c.title}
                        </h4>
                        <p className="text-[11px] text-[#737B90] dark:text-slate-400 mt-1 line-clamp-2">
                          {c.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#E5E8F0] dark:border-slate-700/80 mt-3 flex items-center justify-between text-[11px] text-[#737B90]">
                        <span>{c.durationHours} Hours</span>
                        <span className="text-[#7057D9] font-semibold flex items-center gap-1">
                          View <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Primary Capstone Project Card */}
                  {primaryProject && (
                    <div
                      onClick={() => onSelectProject(primaryProject.id)}
                      className="p-4 rounded-2xl bg-gradient-to-br from-[#7057D9]/10 to-[#35B8A0]/10 border border-[#7057D9]/30 hover:border-[#7057D9] transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-1 text-[#7057D9] text-[10px] font-bold uppercase tracking-wider">
                          <FolderGit2 className="w-3 h-3" />
                          <span>Capstone Deliverable</span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#14213D] dark:text-white mt-0.5 line-clamp-1">
                          {primaryProject.title}
                        </h4>
                        <p className="text-[11px] text-[#737B90] dark:text-slate-300 mt-1 line-clamp-2">
                          {primaryProject.objective}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#7057D9]/20 mt-3 flex items-center justify-between text-[11px]">
                        <span className="text-[#35B8A0] font-semibold">Rubric Graded</span>
                        <span className="text-[#7057D9] font-bold flex items-center gap-1">
                          Open Project <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
