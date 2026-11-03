import React, { useState } from 'react';
import { PROJECTS } from '../data/mockData';
import { Project, ProjectSubmission } from '../types';
import { useAuth } from '../context/AuthContext';
import { 
  FolderGit2, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Globe, 
  ExternalLink, 
  Send, 
  Award, 
  Clock, 
  ShieldCheck,
  Code
} from 'lucide-react';

interface ProjectsViewProps {
  onSelectProject: (projectId: string) => void;
  onNavigate: (view: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onSelectProject, onNavigate }) => {
  const { submissions } = useAuth();
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | 'Beginner' | 'Intermediate' | 'Advanced'>('all');

  const filtered = PROJECTS.filter(p => {
    if (filterDifficulty !== 'all' && p.difficulty !== filterDifficulty) return false;
    return true;
  });

  return (
    <div className="space-y-8 py-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#35B8A0]/10 text-xs font-semibold text-[#35B8A0] mb-2">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Hands-on Deliverables</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14213D] dark:text-white tracking-tight">
          Practical Projects & Portfolio
        </h1>
        <p className="text-xs sm:text-sm text-[#737B90] dark:text-slate-400 mt-1 max-w-2xl">
          Build authentic digital proof of your capability. Complete these industry-grade projects, submit your repository and live URLs, and showcase them in your public portfolio.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {['all', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
          <button
            key={diff}
            onClick={() => setFilterDifficulty(diff as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
              filterDifficulty === diff
                ? 'bg-[#7057D9] text-white shadow-xs'
                : 'bg-white dark:bg-[#14213D] text-[#737B90] border border-[#E5E8F0] dark:border-slate-800 hover:text-[#14213D]'
            }`}
          >
            {diff}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((project) => {
          const submission = submissions.find(s => s.projectId === project.id);
          const isSubmitted = !!submission;

          return (
            <div
              key={project.id}
              onClick={() => onSelectProject(project.id)}
              className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 p-6 flex flex-col justify-between hover:border-[#7057D9] hover:shadow-lg hover:shadow-[#7057D9]/5 transition-all cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-semibold text-[#7057D9] dark:text-[#a89af0]">{project.difficulty} Level</span>
                  <span className="text-[#737B90] dark:text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    ~{project.estimatedHours} Hours
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#14213D] dark:text-white group-hover:text-[#7057D9] dark:group-hover:text-[#a89af0] transition-colors mb-2">
                  {project.title}
                </h3>

                <p className="text-xs text-[#737B90] dark:text-slate-400 leading-relaxed mb-4">
                  {project.objective}
                </p>

                <div className="space-y-1.5 mb-4">
                  <p className="text-[11px] font-semibold text-[#14213D] dark:text-white uppercase tracking-wider">
                    Required Skills:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.requiredSkills.map((sk, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] px-2.5 py-1 rounded-md bg-[#F8F9FC] dark:bg-slate-800 text-[#20263A] dark:text-slate-300 border border-[#E5E8F0] dark:border-slate-700"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E8F0] dark:border-slate-800 flex items-center justify-between text-xs">
                {isSubmitted ? (
                  <span className="flex items-center gap-1.5 text-[#35B8A0] font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    Deliverable Submitted ({submission.score || 92}/100)
                  </span>
                ) : (
                  <span className="text-[#737B90] dark:text-slate-400">
                    {project.rubric.length} Evaluation Criteria
                  </span>
                )}

                <span className="font-bold text-[#7057D9] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Project <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface ProjectDetailViewProps {
  projectId: string;
  onBack: () => void;
  onOpenSubmissionModal: (project: Project) => void;
  onOpenAiAssistant: (topic?: string) => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  projectId,
  onBack,
  onOpenSubmissionModal,
  onOpenAiAssistant
}) => {
  const { submissions } = useAuth();
  const project = PROJECTS.find(p => p.id === projectId) || PROJECTS[0];
  const submission = submissions.find(s => s.projectId === project.id);

  return (
    <div className="space-y-8 py-6">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#737B90] hover:text-[#14213D] dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Projects</span>
      </button>

      {/* Project Hero */}
      <div className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs text-[#737B90] dark:text-slate-400">
          <span className="font-bold text-[#7057D9] dark:text-[#a89af0]">{project.difficulty} Project</span>
          <span>·</span>
          <span>~{project.estimatedHours} Hours Required</span>
          {project.courseTitle && (
            <>
              <span>·</span>
              <span>Capstone for {project.courseTitle}</span>
            </>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14213D] dark:text-white tracking-tight">
          {project.title}
        </h1>

        <p className="text-xs sm:text-sm text-[#737B90] dark:text-slate-300 leading-relaxed max-w-3xl">
          {project.objective}
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={() => onOpenSubmissionModal(project)}
            className="px-6 py-2.5 bg-[#7057D9] hover:bg-[#5f46c6] text-white text-xs font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>{submission ? 'Update Submission' : 'Submit Project Deliverable'}</span>
          </button>

          <button
            onClick={() => onOpenAiAssistant(`Can you give me guidance and tips for building "${project.title}"?`)}
            className="px-4 py-2.5 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 text-xs font-semibold text-[#14213D] dark:text-white rounded-xl hover:border-[#7057D9] transition-colors"
          >
            Ask AI for Project Strategy
          </button>
        </div>
      </div>

      {/* Submission Status Banner (if submitted) */}
      {submission && (
        <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 rounded-2xl p-5 text-xs text-emerald-900 dark:text-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="font-bold flex items-center gap-2 text-sm text-emerald-800 dark:text-emerald-300">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Submission Approved · Grade: {submission.score || 92}/100
            </p>
            <p className="text-emerald-700 dark:text-emerald-400">
              {submission.feedback || 'Great implementation! Clean structure and excellent visual presentation.'}
            </p>
            {submission.liveUrl && (
              <p className="pt-1">
                <a href={submission.liveUrl} target="_blank" rel="noreferrer" className="underline font-semibold flex items-center gap-1">
                  View Live Deployment <ExternalLink className="w-3 h-3 inline" />
                </a>
              </p>
            )}
          </div>

          <button
            onClick={() => onOpenSubmissionModal(project)}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 shrink-0"
          >
            Edit Submission
          </button>
        </div>
      )}

      {/* Instructions & Rubric 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Instructions & Resources */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-[#14213D] dark:text-white">
              Project Instructions & Milestones
            </h2>
            <ol className="space-y-3 text-xs text-[#20263A] dark:text-slate-300 list-decimal list-inside leading-relaxed">
              {project.instructions.map((inst, i) => (
                <li key={i} className="pl-1">
                  <span>{inst}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Resources */}
          {project.resources.length > 0 && (
            <div className="bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 p-6 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-[#14213D] dark:text-white uppercase tracking-wider">
                Recommended Resources & Docs
              </h3>
              <div className="space-y-2">
                {project.resources.map((res, rIdx) => (
                  <a
                    key={rIdx}
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 flex items-center justify-between text-xs text-[#7057D9] dark:text-[#a89af0] hover:underline"
                  >
                    <span>{res.title}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Grading Rubric */}
        <div className="lg:col-span-5 bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#35B8A0]" />
            <h3 className="text-base font-bold text-[#14213D] dark:text-white">
              Evaluation Rubric (100 Points Total)
            </h3>
          </div>

          <p className="text-xs text-[#737B90] dark:text-slate-400 leading-relaxed">
            Submissions are evaluated against these criteria. Aim for at least 80 points to earn certificate qualification.
          </p>

          <div className="space-y-3 pt-2">
            {project.rubric.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 flex items-center justify-between text-xs"
              >
                <span className="text-[#20263A] dark:text-slate-200 pr-2">
                  {item.criterion}
                </span>
                <span className="font-bold text-[#7057D9] dark:text-[#a89af0] tabular-nums shrink-0">
                  {item.points} pts
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
