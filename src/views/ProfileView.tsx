import React from 'react';
import { useAuth } from '../context/AuthContext';
import { COURSES, PROJECTS } from '../data/mockData';
import { Certificate } from '../types';
import { 
  Award, 
  BookOpen, 
  FolderGit2, 
  Globe, 
  Mail, 
  MapPin, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';

interface ProfileViewProps {
  onNavigate: (view: string) => void;
  onOpenCertificateModal: (cert: Certificate) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  onNavigate,
  onOpenCertificateModal
}) => {
  const { user, certificates, submissions } = useAuth();

  const enrolledCourseObjects = COURSES.filter(c => user.enrolledCourses.includes(c.id));
  const publicSubmissions = submissions.filter(s => s.isPublicInPortfolio);

  return (
    <div className="space-y-8 py-6">
      {/* Profile Header Card */}
      <div className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
              alt={user.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-[#7057D9]"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-[#14213D] dark:text-white">
                  {user.name}
                </h1>
                <span className="text-[11px] font-semibold text-[#35B8A0] bg-[#35B8A0]/10 px-2 py-0.5 rounded-full capitalize">
                  {user.plan.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-[#737B90] dark:text-slate-400 font-medium">
                {user.title || 'Digital Learner'}
              </p>
              <div className="flex items-center gap-4 text-xs text-[#737B90] dark:text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {user.country || 'Nigeria'}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  {user.email}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('settings')}
            className="px-4 py-2 rounded-xl border border-[#E5E8F0] dark:border-slate-700 text-xs font-semibold text-[#20263A] dark:text-white hover:bg-[#F8F9FC] dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
        </div>

        {user.bio && (
          <p className="text-xs sm:text-sm text-[#20263A] dark:text-slate-300 leading-relaxed mt-5 pt-5 border-t border-[#E5E8F0] dark:border-slate-800">
            {user.bio}
          </p>
        )}

        {/* Learning Interests */}
        <div className="mt-4 pt-4 border-t border-[#E5E8F0] dark:border-slate-800 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-[#737B90] dark:text-slate-400 mr-2">
            Interests:
          </span>
          {user.interests.map((interest, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-lg text-xs font-medium text-[#20263A] dark:text-slate-200"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Subscription & Membership Status Banner */}
      <div className="bg-gradient-to-r from-[#14213D] via-[#1d2745] to-[#7057D9]/20 rounded-3xl border border-slate-800 p-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#7057D9]/20 border border-[#7057D9]/40 flex items-center justify-center shrink-0 text-[#a89af0]">
            <Sparkles className="w-6 h-6 text-[#35B8A0]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#35B8A0] font-bold">
                {user.plan === 'free' ? 'Free Tier Membership' : 'SkillUp Pro Member'}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#35B8A0]/15 text-[#35B8A0] border border-[#35B8A0]/30">
                Active
              </span>
            </div>
            <h3 className="text-base font-bold text-white mt-0.5">
              {user.plan === 'free' 
                ? 'Upgrade to SkillUp Pro for Unlimited Access' 
                : user.plan === 'pro_annual' ? 'SkillUp Pro Annual Subscription' : 'SkillUp Pro Monthly Subscription'}
            </h3>
            <p className="text-xs text-slate-300">
              {user.plan === 'free'
                ? 'Unlock all premium masterclasses, personalized AI Mentor guidance, and verified certificates.'
                : `Next renewal: ${user.subscription?.currentPeriodEnd ? new Date(user.subscription.currentPeriodEnd).toLocaleDateString() : 'Active'} · Secured by Paystack`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          {user.plan === 'free' ? (
            <button
              onClick={() => onNavigate('pricing')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7057D9] to-[#8c74e8] hover:from-[#5f46c6] hover:to-[#7861d8] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Upgrade to Pro</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate('settings')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Manage Billing</span>
            </button>
          )}
        </div>
      </div>

      {/* Public Portfolio Showcase */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#14213D] dark:text-white tracking-tight">
              Verified Project Portfolio
            </h2>
            <p className="text-xs text-[#737B90] dark:text-slate-400">
              Projects submitted and approved on SkillUp Academy.
            </p>
          </div>
        </div>

        {publicSubmissions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {publicSubmissions.map((sub) => (
              <div
                key={sub.id}
                className="bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-[#35B8A0] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Approved Score: {sub.score}/100
                    </span>
                    <span className="text-[#737B90] text-[11px]">
                      {new Date(sub.submittedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#14213D] dark:text-white mb-2">
                    {sub.projectTitle}
                  </h3>

                  <p className="text-xs text-[#737B90] dark:text-slate-300 leading-relaxed mb-4">
                    {sub.notes}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E8F0] dark:border-slate-800 flex items-center justify-between text-xs">
                  {sub.liveUrl ? (
                    <a
                      href={sub.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#7057D9] font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-[#737B90]">Local sandbox project</span>
                  )}

                  {sub.repoUrl && (
                    <a
                      href={sub.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#20263A] dark:text-slate-200 font-medium hover:underline flex items-center gap-1"
                    >
                      <Globe className="w-3 h-3" />
                      <span>Code Repository</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 text-xs text-[#737B90]">
            No public projects submitted yet. Complete projects from your courses to showcase them here!
          </div>
        )}
      </div>

      {/* Earned Certificates */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#14213D] dark:text-white tracking-tight">
          Earned Certificates ({certificates.length})
        </h2>

        {certificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 p-5 flex items-center justify-between shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#35B8A0]/10 text-[#35B8A0] flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#14213D] dark:text-white">
                      {cert.courseTitle}
                    </h4>
                    <p className="text-[11px] text-[#737B90] dark:text-slate-400">
                      ID: {cert.verificationCode}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onOpenCertificateModal(cert)}
                  className="px-3 py-1.5 rounded-lg bg-[#7057D9] text-white font-semibold text-xs hover:bg-[#5f46c6]"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 text-xs text-[#737B90]">
            Complete course modules to earn official certificates of achievement.
          </div>
        )}
      </div>
    </div>
  );
};
