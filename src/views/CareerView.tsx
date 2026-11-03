import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CareerPath } from '../types';
import { CAREER_PATHS } from '../data/opportunitiesData';
import { 
  Compass, 
  TrendingUp, 
  DollarSign, 
  Award, 
  CheckCircle2, 
  Briefcase, 
  HelpCircle, 
  Sparkles, 
  FileText, 
  ArrowRight, 
  BookOpen, 
  FolderGit2, 
  ChevronDown, 
  ChevronUp, 
  Globe2, 
  Building2 
} from 'lucide-react';

interface CareerViewProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenAiAssistant: (topic?: string) => void;
}

export const CareerView: React.FC<CareerViewProps> = ({ onNavigate, onOpenAiAssistant }) => {
  const { user, currency } = useAuth();
  const [selectedPath, setSelectedPath] = useState<CareerPath>(CAREER_PATHS[0]);
  const [expandedInterviewIdx, setExpandedInterviewIdx] = useState<number | null>(0);

  return (
    <div className="space-y-8 py-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#14213D] via-[#1a2c52] to-[#2e1d52] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-lg border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#7057D9]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#35B8A0]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7057D9]/20 border border-[#7057D9]/40 text-xs font-semibold text-[#a89af0]">
            <Compass className="w-3.5 h-3.5 text-[#35B8A0]" />
            <span>Career Development & Employability Accelerator</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Map Your Path From Beginner to High-Earning Professional
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            SkillUp Academy connects what you study directly to high-paying careers, jobs, and freelance clients. Explore structured career roadmaps, salary benchmarks for Nigeria and global remote work, portfolio blueprints, and real technical interview questions.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onOpenAiAssistant(`Career guidance: I am currently learning ${user.interests.join(', ')}. What career trajectory has the best salary and freelance prospects for me in Nigeria or globally?`)}
              className="px-4 py-2 rounded-xl bg-[#7057D9] text-white text-xs font-bold hover:bg-[#5f47c8] transition-colors flex items-center gap-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#35B8A0]" />
              <span>Get Personalised Career Advice from AI Mentor</span>
            </button>
          </div>
        </div>
      </div>

      {/* Career Path Selector Pills */}
      <div className="space-y-3">
        <h2 className="text-sm font-extrabold text-[#737B90] dark:text-slate-400 uppercase tracking-wider">
          Select Target Career Track
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {CAREER_PATHS.map((path) => {
            const isSelected = selectedPath.id === path.id;
            return (
              <button
                key={path.id}
                onClick={() => setSelectedPath(path)}
                className={`text-left p-4 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-white dark:bg-[#14213D] border-[#7057D9] shadow-md ring-2 ring-[#7057D9]/20'
                    : 'bg-white/80 dark:bg-[#14213D]/70 border-[#E5E8F0] dark:border-slate-800 hover:border-[#7057D9]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    path.demandLevel === 'Explosive'
                      ? 'bg-rose-500/10 text-rose-500'
                      : 'bg-[#35B8A0]/10 text-[#35B8A0]'
                  }`}>
                    {path.demandLevel} Demand
                  </span>
                </div>
                <h3 className="font-extrabold text-sm text-[#14213D] dark:text-white leading-snug">
                  {path.title}
                </h3>
                <span className="text-xs text-[#737B90] dark:text-slate-400 block mt-1">
                  {currency === 'NGN' ? path.averageSalaryNGN : path.averageSalaryUSD}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed Selected Career Path View */}
      <div className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-8">
        {/* Header of selected track */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E5E8F0] dark:border-slate-800">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-[#7057D9] dark:text-[#a89af0] uppercase tracking-wider">
              Career Profile
            </span>
            <h2 className="text-2xl font-extrabold text-[#14213D] dark:text-white">
              {selectedPath.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#737B90] dark:text-slate-300 max-w-2xl leading-relaxed">
              {selectedPath.summary}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            <button
              onClick={() => onNavigate('jobs')}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-[#7057D9] text-white hover:bg-[#5f47c8] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Browse {selectedPath.roleName} Jobs</span>
            </button>
            <button
              onClick={() => onNavigate('freelance')}
              className="px-4 py-2 text-xs font-bold rounded-xl border border-[#7057D9] text-[#7057D9] dark:text-[#a89af0] hover:bg-[#7057D9]/10 transition-colors flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Freelance Gigs</span>
            </button>
          </div>
        </div>

        {/* 3-Column Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#F8F9FC] dark:bg-slate-800/50 border border-[#E5E8F0] dark:border-slate-800 space-y-1">
            <span className="text-[11px] font-semibold text-[#737B90] dark:text-slate-400 block">
              Market Compensation Range
            </span>
            <div className="text-base sm:text-lg font-extrabold text-[#35B8A0]">
              {currency === 'NGN' ? selectedPath.averageSalaryNGN : selectedPath.averageSalaryUSD}
            </div>
            <span className="text-[11px] text-[#737B90] dark:text-slate-400">
              Nigeria Mid/Senior & Global Remote Entry
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8F9FC] dark:bg-slate-800/50 border border-[#E5E8F0] dark:border-slate-800 space-y-1">
            <span className="text-[11px] font-semibold text-[#737B90] dark:text-slate-400 block">
              Freelance & Client Potential
            </span>
            <div className="text-xs font-bold text-[#14213D] dark:text-white">
              {selectedPath.freelancePotential}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8F9FC] dark:bg-slate-800/50 border border-[#E5E8F0] dark:border-slate-800 space-y-1">
            <span className="text-[11px] font-semibold text-[#737B90] dark:text-slate-400 block">
              Remote Work Feasibility
            </span>
            <div className="text-xs font-bold text-[#14213D] dark:text-white">
              {selectedPath.remoteFeasibility}
            </div>
          </div>
        </div>

        {/* 3-Stage Milestone Progression Roadmap */}
        <div className="space-y-4">
          <h3 className="text-base font-extrabold text-[#14213D] dark:text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#7057D9]" />
            Career Milestone Roadmap (Step-by-Step)
          </h3>

          <div className="space-y-4">
            {selectedPath.milestones.map((ms, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-[#E5E8F0] dark:border-slate-800 bg-[#F8F9FC] dark:bg-slate-900/40 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#7057D9] text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-extrabold text-sm sm:text-base text-[#14213D] dark:text-white">
                      {ms.title}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[#7057D9] dark:text-[#a89af0] bg-[#7057D9]/10 px-2.5 py-0.5 rounded-full w-fit">
                    {ms.level}
                  </span>
                </div>

                {/* Skills Learned */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {ms.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-[11px] font-medium text-[#20263A] dark:text-slate-300 border border-[#E5E8F0] dark:border-slate-700"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>

                {/* Milestone Capstone Project */}
                <div className="flex items-center gap-2 text-xs pt-1 text-[#737B90] dark:text-slate-300">
                  <FolderGit2 className="w-4 h-4 text-[#35B8A0] shrink-0" />
                  <span className="font-bold text-[#14213D] dark:text-white">Portfolio Milestone:</span>
                  <span>{ms.projectTitle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2 Columns: Resume Best Practices + Interview Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          {/* Resume & Portfolio Tips */}
          <div className="space-y-4">
            <h3 className="text-base font-extrabold text-[#14213D] dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#35B8A0]" />
              Resume & Portfolio Advice for Remote Hiring
            </h3>
            <div className="space-y-2.5">
              {selectedPath.resumeTips.map((tip, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#F8F9FC] dark:bg-slate-800/40 border border-[#E5E8F0] dark:border-slate-800 flex items-start gap-2.5 text-xs text-[#737B90] dark:text-slate-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#35B8A0] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onOpenAiAssistant(`Audit my resume and portfolio for a ${selectedPath.roleName} role. What are recruiters in Nigeria and US/Europe looking for?`)}
              className="w-full py-2.5 rounded-xl border border-[#7057D9] text-[#7057D9] dark:text-[#a89af0] text-xs font-bold hover:bg-[#7057D9]/10 transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI Mentor to Review Your Resume</span>
            </button>
          </div>

          {/* Real Interview Q&A Practice */}
          <div className="space-y-4">
            <h3 className="text-base font-extrabold text-[#14213D] dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#7057D9]" />
              Interview Simulator & Sample Questions
            </h3>

            <div className="space-y-2.5">
              {selectedPath.interviewQuestions.map((q, idx) => {
                const isOpen = expandedInterviewIdx === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-[#E5E8F0] dark:border-slate-800 bg-[#F8F9FC] dark:bg-slate-800/40 overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedInterviewIdx(isOpen ? null : idx)}
                      className="w-full p-3.5 text-left flex items-center justify-between gap-3 text-xs font-bold text-[#14213D] dark:text-white hover:text-[#7057D9]"
                    >
                      <span>Q: {q.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 shrink-0 text-[#737B90]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 shrink-0 text-[#737B90]" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-3.5 pb-3.5 text-xs text-[#737B90] dark:text-slate-300 border-t border-[#E5E8F0] dark:border-slate-800/60 pt-2.5 leading-relaxed space-y-1">
                        <span className="font-bold text-[#35B8A0] block">Recommended Answer Framework:</span>
                        <p>{q.answerGuidance}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => onOpenAiAssistant(`Conduct a mock interview for the role of ${selectedPath.roleName}. Ask me one question at a time and critique my answer.`)}
              className="w-full py-2.5 rounded-xl bg-[#7057D9] text-white text-xs font-bold hover:bg-[#5f47c8] transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start Interactive AI Mock Interview</span>
            </button>
          </div>
        </div>
      </div>

      {/* Creator Credit */}
      <div className="text-center pt-6 border-t border-[#E5E8F0] dark:border-slate-800 text-xs text-[#737B90] dark:text-slate-500">
        Created by Tayo Verse Studios · SkillUp Academy Career System
      </div>
    </div>
  );
};
