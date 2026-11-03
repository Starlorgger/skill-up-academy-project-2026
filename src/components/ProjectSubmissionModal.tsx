import React, { useState } from 'react';
import { Project } from '../types';
import { useAuth } from '../context/AuthContext';
import { triggerHaptic } from '../utils/haptics';
import { FolderGit2, Globe, Send, X, CheckCircle, RefreshCw } from 'lucide-react';

interface ProjectSubmissionModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const ProjectSubmissionModal: React.FC<ProjectSubmissionModalProps> = ({
  project,
  isOpen,
  onClose,
  onSuccess
}) => {
  const { submitProject } = useAuth();
  const [repoUrl, setRepoUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !project) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes.trim()) {
      triggerHaptic.warning();
      return;
    }

    setIsSubmitting(true);
    triggerHaptic.medium();

    try {
      await submitProject(project.id, {
        repoUrl: repoUrl.trim() || undefined,
        liveUrl: liveUrl.trim() || undefined,
        notes: notes.trim(),
        isPublicInPortfolio: isPublic
      });
      triggerHaptic.success();
      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      triggerHaptic.error();
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-white dark:bg-[#14213D] rounded-3xl shadow-2xl border border-[#E5E8F0] dark:border-slate-800 p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#737B90] hover:text-[#14213D] dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#7057D9]/10 text-[#7057D9] flex items-center justify-center">
                <FolderGit2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#14213D] dark:text-white">
                  Submit Project Deliverable
                </h3>
                <p className="text-xs text-[#737B90] dark:text-slate-400 truncate max-w-sm">
                  {project.title}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#737B90] dark:text-slate-300 mb-1">
                  GitHub Repository / Design File URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/your-username/my-project"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-xs sm:text-sm text-[#20263A] dark:text-white focus:outline-none focus:border-[#7057D9]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#737B90] dark:text-slate-300 mb-1">
                  Live Hosted URL / Figma Prototype (Optional)
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 w-4 h-4 text-[#737B90]" />
                  <input
                    type="url"
                    placeholder="https://my-project.vercel.app or Figma link"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-xs sm:text-sm text-[#20263A] dark:text-white focus:outline-none focus:border-[#7057D9]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#737B90] dark:text-slate-300 mb-1">
                  Implementation Summary & Challenges Solved <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your design decisions, key features implemented, and any challenges you navigated..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-xs sm:text-sm text-[#20263A] dark:text-white focus:outline-none focus:border-[#7057D9]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="publicPortfolio"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="w-4 h-4 rounded text-[#7057D9] focus:ring-[#7057D9]"
                />
                <label htmlFor="publicPortfolio" className="text-xs text-[#737B90] dark:text-slate-300">
                  Feature this project in my public SkillUp portfolio
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !notes.trim()}
                  className="w-full py-2.5 bg-[#7057D9] hover:bg-[#5f46c6] disabled:opacity-50 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Submitting Deliverable...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit for Review</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#35B8A0]/10 text-[#35B8A0] flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#14213D] dark:text-white mb-2">
              Deliverable Submitted!
            </h3>
            <p className="text-xs text-[#737B90] dark:text-slate-400 max-w-xs mx-auto mb-6">
              Your submission has been catalogued in your portfolio. You have unlocked credit towards your course certificate.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#7057D9] text-white rounded-xl font-semibold text-xs sm:text-sm hover:bg-[#5f46c6] transition-colors"
            >
              Continue Learning
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
