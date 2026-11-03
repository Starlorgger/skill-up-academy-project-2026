import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { JobListing, JobApplication, JobLocationType, JobExperienceLevel } from '../types';
import { JOB_LISTINGS } from '../data/opportunitiesData';
import { COURSES } from '../data/mockData';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  Building2, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  DollarSign, 
  SlidersHorizontal, 
  Sparkles, 
  Send, 
  X, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Bookmark,
  Share2,
  AlertCircle,
  FileCheck
} from 'lucide-react';

interface JobsViewProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenAiAssistant: (topic?: string) => void;
}

export const JobsView: React.FC<JobsViewProps> = ({ onNavigate, onOpenAiAssistant }) => {
  const { user, currency, formatPrice } = useAuth();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLocationType, setSelectedLocationType] = useState<string>('all');
  const [selectedExperience, setSelectedExperience] = useState<string>('all');
  const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'browse' | 'applications'>('browse');

  // Selected job for detail drawer
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);

  // Application modal state
  const [isApplying, setIsApplying] = useState(false);
  const [jobToApply, setJobToApply] = useState<JobListing | null>(null);
  const [portfolioLink, setPortfolioLink] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('');
  const [appSubmittedSuccess, setAppSubmittedSuccess] = useState(false);

  // Saved bookmark jobs
  const [savedJobIds, setSavedJobIds] = useState<string[]>(['job-1']);

  // Applications list in state
  const [applications, setApplications] = useState<JobApplication[]>([
    {
      id: 'app-sample-1',
      jobId: 'job-1',
      jobTitle: 'AI Workflow & Prompt Engineer',
      company: 'NeuralStack Africa',
      applicantName: user.name,
      applicantEmail: user.email,
      applicantPhone: '+234 803 123 4567',
      portfolioUrl: 'https://skillup.academy/portfolio/' + user.id,
      coverNote: 'Excited to apply! I completed the AI Engineering program on SkillUp Academy and built 2 working LLM agents.',
      expectedSalaryNGN: 850000,
      expectedSalaryUSD: 1000,
      status: 'under_review',
      submittedAt: new Date(Date.now() - 86400000 * 2).toISOString()
    }
  ]);

  // Derive skills user is learning based on enrolled courses
  const userEnrolledSkills = useMemo(() => {
    const skills = new Set<string>();
    COURSES.forEach(c => {
      if (user.enrolledCourses.includes(c.id)) {
        skills.add(c.categoryName);
        c.objectives.forEach(obj => skills.add(obj.toLowerCase()));
      }
    });
    // Add default core skills for demonstration
    skills.add('prompt engineering');
    skills.add('react');
    skills.add('typescript');
    skills.add('python');
    skills.add('figma');
    return skills;
  }, [user.enrolledCourses]);

  // Calculate matching score for a job
  const getJobMatchScore = (job: JobListing): number => {
    let matchedCount = 0;
    job.skillsRequired.forEach(skill => {
      const lower = skill.toLowerCase();
      for (const userSkill of userEnrolledSkills) {
        if (lower.includes(userSkill) || userSkill.includes(lower)) {
          matchedCount++;
          break;
        }
      }
    });
    const ratio = job.skillsRequired.length > 0 ? matchedCount / job.skillsRequired.length : 0.5;
    return Math.min(100, Math.round(50 + ratio * 48));
  };

  const toggleSaveJob = (e: React.MouseEvent, jobId: string) => {
    e.stopPropagation();
    setSavedJobIds(prev => 
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return JOB_LISTINGS.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skillsRequired.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = selectedCategory === 'all' || job.categoryId === selectedCategory;
      const matchesLoc = selectedLocationType === 'all' || job.locationType === selectedLocationType;
      const matchesExp = selectedExperience === 'all' || job.experienceLevel === selectedExperience;
      const matchesCountry = 
        selectedCountryFilter === 'all' || 
        (selectedCountryFilter === 'nigeria' && job.country === 'Nigeria') ||
        (selectedCountryFilter === 'remote' && (job.locationType === 'remote' || job.country.includes('Remote')));

      return matchesSearch && matchesCat && matchesLoc && matchesExp && matchesCountry;
    });
  }, [searchQuery, selectedCategory, selectedLocationType, selectedExperience, selectedCountryFilter]);

  const handleOpenApplyModal = (job: JobListing) => {
    setJobToApply(job);
    setIsApplying(true);
    setAppSubmittedSuccess(false);
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobToApply) return;

    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      jobId: jobToApply.id,
      jobTitle: jobToApply.title,
      company: jobToApply.company,
      applicantName: user.name,
      applicantEmail: user.email,
      applicantPhone: '+234 800 000 0000',
      portfolioUrl: portfolioLink || 'https://skillup.academy/portfolio',
      githubUrl: githubLink,
      coverNote: coverLetter || 'I have completed relevant digital skills training on SkillUp Academy and have projects ready to demonstrate.',
      expectedSalaryNGN: currency === 'NGN' ? Number(expectedSalary) || jobToApply.salaryMinNGN : undefined,
      expectedSalaryUSD: currency === 'USD' ? Number(expectedSalary) || jobToApply.salaryMinUSD : undefined,
      status: 'submitted',
      submittedAt: new Date().toISOString()
    };

    setApplications(prev => [newApp, ...prev]);
    setAppSubmittedSuccess(true);
    setTimeout(() => {
      setIsApplying(false);
      setAppSubmittedSuccess(false);
      setActiveTab('applications');
    }, 1800);
  };

  return (
    <div className="space-y-8 py-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#14213D] via-[#1a2d54] to-[#251f47] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-lg border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#7057D9]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#35B8A0]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7057D9]/20 border border-[#7057D9]/40 text-xs font-semibold text-[#a89af0]">
            <Briefcase className="w-3.5 h-3.5 text-[#35B8A0]" />
            <span>Skill-to-Opportunity Job Engine</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Discover Verified Digital Jobs in <span className="text-[#35B8A0]">Nigeria</span> & <span className="text-[#a89af0]">Worldwide</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Every job listed here connects directly to the digital skills you learn on SkillUp Academy. Build your portfolio, submit verified applications, and unlock employment with local tech leaders and international remote teams.
          </p>

          {/* Quick stats counter */}
          <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <span className="block text-xl font-bold text-white">{JOB_LISTINGS.length}+</span>
              <span className="text-slate-400">Active Roles</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <span className="block text-xl font-bold text-[#35B8A0]">100%</span>
              <span className="text-slate-400">Verified Employers</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <span className="block text-xl font-bold text-[#a89af0]">₦650k - ₦2.2M</span>
              <span className="text-slate-400">Monthly Avg Range</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <span className="block text-xl font-bold text-white">Global Remote</span>
              <span className="text-slate-400">USD & NGN Options</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Browse Jobs vs My Applications */}
      <div className="flex items-center justify-between border-b border-[#E5E8F0] dark:border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-4 py-2 text-sm font-bold rounded-xl transition-colors ${
              activeTab === 'browse'
                ? 'bg-[#7057D9] text-white shadow-sm'
                : 'text-[#737B90] dark:text-slate-400 hover:text-[#14213D] dark:hover:text-white'
            }`}
          >
            Explore Job Openings ({filteredJobs.length})
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2 text-sm font-bold rounded-xl transition-colors relative ${
              activeTab === 'applications'
                ? 'bg-[#7057D9] text-white shadow-sm'
                : 'text-[#737B90] dark:text-slate-400 hover:text-[#14213D] dark:hover:text-white'
            }`}
          >
            My Applications
            {applications.length > 0 && (
              <span className="ml-2 px-1.5 py-0.5 text-xs bg-[#35B8A0] text-[#14213D] font-extrabold rounded-full">
                {applications.length}
              </span>
            )}
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-[#737B90] dark:text-slate-400">
          <button
            onClick={() => onOpenAiAssistant('Resume & Interview Prep for Digital Jobs')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E8F0] dark:border-slate-800 hover:border-[#7057D9] text-[#7057D9] dark:text-[#a89af0] transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask AI: Review My Resume</span>
          </button>
        </div>
      </div>

      {/* View Content */}
      {activeTab === 'applications' ? (
        <div className="space-y-4">
          {applications.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 p-8">
              <FileCheck className="w-12 h-12 text-[#737B90] mx-auto mb-3 opacity-60" />
              <h3 className="text-base font-bold text-[#14213D] dark:text-white">No Applications Submitted Yet</h3>
              <p className="text-xs text-[#737B90] dark:text-slate-400 max-w-md mx-auto mt-1 mb-4">
                Explore the verified digital jobs directory and submit your first application using your SkillUp portfolio.
              </p>
              <button
                onClick={() => setActiveTab('browse')}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-[#7057D9] text-white"
              >
                Browse Available Jobs
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-lg text-[#14213D] dark:text-white">
                        {app.jobTitle}
                      </span>
                      <span className="text-xs text-[#737B90] dark:text-slate-400">at {app.company}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#737B90] dark:text-slate-400">
                      <span>Submitted: {new Date(app.submittedAt).toLocaleDateString()}</span>
                      <span>·</span>
                      <span>Applicant: {app.applicantName}</span>
                      {app.portfolioUrl && (
                        <>
                          <span>·</span>
                          <a 
                            href={app.portfolioUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-[#7057D9] dark:text-[#a89af0] hover:underline flex items-center gap-1"
                          >
                            <span>Portfolio Link</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </>
                      )}
                    </div>

                    <p className="text-xs text-[#737B90] dark:text-slate-400 bg-[#F8F9FC] dark:bg-slate-800/50 p-2.5 rounded-lg italic">
                      "{app.coverNote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize flex items-center gap-1.5 ${
                      app.status === 'under_review' 
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20' 
                        : app.status === 'interview'
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                        : 'bg-[#35B8A0]/10 text-[#35B8A0] border border-[#35B8A0]/20'
                    }`}>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {app.status.replace('_', ' ')}
                    </span>

                    <button
                      onClick={() => onOpenAiAssistant(`Prepare me for an interview for the role of ${app.jobTitle} at ${app.company}`)}
                      className="px-3 py-1.5 rounded-xl border border-[#7057D9] text-[#7057D9] dark:text-[#a89af0] text-xs font-semibold hover:bg-[#7057D9]/10 transition-colors"
                    >
                      AI Interview Prep
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Browse Tab */
        <div className="space-y-6">
          {/* Search & Filter Controls */}
          <div className="bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 p-4 sm:p-5 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#737B90] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by job title, skill (e.g. Prompt Engineering, React, Figma), or company..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E8F0] dark:border-slate-700 bg-[#F8F9FC] dark:bg-slate-900/60 text-xs sm:text-sm text-[#20263A] dark:text-white placeholder-[#737B90] focus:outline-none focus:border-[#7057D9]"
                />
              </div>

              {/* Location Scope Quick Selector */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => setSelectedCountryFilter('all')}
                  className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                    selectedCountryFilter === 'all'
                      ? 'border-[#7057D9] bg-[#7057D9]/10 text-[#7057D9] dark:text-[#a89af0]'
                      : 'border-[#E5E8F0] dark:border-slate-700 text-[#737B90] dark:text-slate-400'
                  }`}
                >
                  All Locations
                </button>
                <button
                  onClick={() => setSelectedCountryFilter('nigeria')}
                  className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                    selectedCountryFilter === 'nigeria'
                      ? 'border-[#35B8A0] bg-[#35B8A0]/10 text-[#35B8A0]'
                      : 'border-[#E5E8F0] dark:border-slate-700 text-[#737B90] dark:text-slate-400'
                  }`}
                >
                  🇳🇬 Nigeria Only
                </button>
                <button
                  onClick={() => setSelectedCountryFilter('remote')}
                  className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                    selectedCountryFilter === 'remote'
                      ? 'border-[#7057D9] bg-[#7057D9]/10 text-[#7057D9] dark:text-[#a89af0]'
                      : 'border-[#E5E8F0] dark:border-slate-700 text-[#737B90] dark:text-slate-400'
                  }`}
                >
                  🌍 Global Remote
                </button>
              </div>
            </div>

            {/* Sub-Filters: Category, Work Type, Experience */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E5E8F0] dark:border-slate-800 text-xs">
              <span className="text-[#737B90] dark:text-slate-400 font-semibold flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filter:
              </span>

              {/* Work Type */}
              <select
                value={selectedLocationType}
                onChange={(e) => setSelectedLocationType(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-[#E5E8F0] dark:border-slate-700 bg-white dark:bg-slate-800 text-[#20263A] dark:text-slate-200 text-xs focus:outline-none"
              >
                <option value="all">Any Work Type</option>
                <option value="remote">Fully Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">On-site</option>
              </select>

              {/* Experience */}
              <select
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-[#E5E8F0] dark:border-slate-700 bg-white dark:bg-slate-800 text-[#20263A] dark:text-slate-200 text-xs focus:outline-none"
              >
                <option value="all">Any Experience Level</option>
                <option value="entry">Entry-Level / Beginner Friendly</option>
                <option value="mid">Mid-Level</option>
                <option value="senior">Senior</option>
              </select>

              {/* Category */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-[#E5E8F0] dark:border-slate-700 bg-white dark:bg-slate-800 text-[#20263A] dark:text-slate-200 text-xs focus:outline-none"
              >
                <option value="all">All Domains</option>
                <option value="ai-engineering">AI & Machine Learning</option>
                <option value="software-development">Software Development</option>
                <option value="mobile-app-development">Mobile Apps</option>
                <option value="ui-ux-design">UI/UX Design</option>
                <option value="data-science">Data Analytics</option>
                <option value="website-no-code">No-Code & Websites</option>
                <option value="digital-marketing">Digital Marketing</option>
                <option value="cybersecurity-cloud">Cloud & Security</option>
              </select>

              {(searchQuery || selectedCategory !== 'all' || selectedLocationType !== 'all' || selectedExperience !== 'all' || selectedCountryFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedLocationType('all');
                    setSelectedExperience('all');
                    setSelectedCountryFilter('all');
                  }}
                  className="text-xs text-[#7057D9] dark:text-[#a89af0] hover:underline font-semibold ml-auto"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>

          {/* Job Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.map((job) => {
              const matchScore = getJobMatchScore(job);
              const isSaved = savedJobIds.includes(job.id);

              return (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className="bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 p-5 shadow-sm hover:border-[#7057D9] dark:hover:border-[#7057D9] transition-all cursor-pointer flex flex-col justify-between group relative"
                >
                  <div>
                    {/* Header: Company & Badges */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={job.companyLogo || 'https://images.unsplash.com/photo-1542744094-3a31727221eb?w=120&auto=format&fit=crop&q=80'}
                          alt={job.company}
                          className="w-11 h-11 rounded-xl object-cover border border-[#E5E8F0] dark:border-slate-700 bg-slate-100"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold text-[#737B90] dark:text-slate-400">
                              {job.company}
                            </span>
                            {job.verifiedEmployer && (
                              <span title="Verified Employer" className="inline-flex">
                                <ShieldCheck className="w-3.5 h-3.5 text-[#35B8A0]" />
                              </span>
                            )}
                          </div>
                          <h3 className="font-extrabold text-base text-[#14213D] dark:text-white group-hover:text-[#7057D9] transition-colors leading-snug">
                            {job.title}
                          </h3>
                        </div>
                      </div>

                      {/* Bookmark button */}
                      <button
                        onClick={(e) => toggleSaveJob(e, job.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          isSaved 
                            ? 'text-[#7057D9] bg-[#7057D9]/10' 
                            : 'text-[#737B90] hover:text-[#14213D] dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                        title={isSaved ? 'Remove bookmark' : 'Save job'}
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Metadata line: Location · Work Type · Level */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#737B90] dark:text-slate-400 mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#7057D9]" />
                        {job.location}
                      </span>
                      <span>·</span>
                      <span className="capitalize">{job.employmentType}</span>
                      <span>·</span>
                      <span className="capitalize">{job.experienceLevel}-level</span>
                    </div>

                    {/* Salary Highlight */}
                    <div className="mb-3 text-xs font-bold text-[#35B8A0] flex items-center gap-1">
                      <span>
                        {currency === 'NGN' 
                          ? `₦${(job.salaryMinNGN / 1000).toFixed(0)}k – ₦${(job.salaryMaxNGN / 1000).toFixed(0)}k / month`
                          : `$${job.salaryMinUSD} – $${job.salaryMaxUSD} / month`
                        }
                      </span>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-[#737B90] dark:text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                      {job.description}
                    </p>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {job.skillsRequired.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-[#F8F9FC] dark:bg-slate-800 text-[11px] font-medium text-[#20263A] dark:text-slate-300 border border-[#E5E8F0] dark:border-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.skillsRequired.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] text-[#737B90] dark:text-slate-400">
                          +{job.skillsRequired.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Footer: Match Score & Quick Actions */}
                  <div className="pt-3 border-t border-[#E5E8F0] dark:border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-[#35B8A0]/10 border border-[#35B8A0]/30 flex items-center justify-center text-[10px] font-extrabold text-[#35B8A0]">
                        {matchScore}%
                      </div>
                      <span className="text-[11px] font-medium text-[#737B90] dark:text-slate-400">
                        Skill Match
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenApplyModal(job);
                      }}
                      className="px-3 py-1.5 text-xs font-bold rounded-xl bg-[#7057D9] text-white hover:bg-[#5f47c8] transition-colors shadow-sm"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 p-8">
              <Search className="w-10 h-10 text-[#737B90] mx-auto mb-2 opacity-60" />
              <h3 className="text-sm font-bold text-[#14213D] dark:text-white">No jobs matched your filters</h3>
              <p className="text-xs text-[#737B90] dark:text-slate-400 mt-1">
                Try clearing some search terms or resetting the location scope.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Slide-over / Modal Detail Drawer */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/50 backdrop-blur-sm p-0 sm:p-4">
          <div 
            className="w-full max-w-2xl h-full sm:h-[90vh] bg-white dark:bg-[#14213D] sm:rounded-3xl border border-[#E5E8F0] dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#E5E8F0] dark:border-slate-800 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedJob.companyLogo}
                  alt={selectedJob.company}
                  className="w-12 h-12 rounded-2xl object-cover border border-[#E5E8F0] dark:border-slate-700"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-[#737B90] dark:text-slate-400">
                      {selectedJob.company}
                    </span>
                    {selectedJob.verifiedEmployer && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-[#35B8A0] font-bold">
                        <ShieldCheck className="w-3.5 h-3.5" /> Verified
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-[#14213D] dark:text-white">
                    {selectedJob.title}
                  </h2>
                </div>
              </div>

              <button
                onClick={() => setSelectedJob(null)}
                className="p-2 text-[#737B90] hover:text-[#14213D] dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body Scroll */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs sm:text-sm">
              {/* Highlight bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#F8F9FC] dark:bg-slate-800/60 border border-[#E5E8F0] dark:border-slate-800">
                <div>
                  <span className="block text-[11px] text-[#737B90] dark:text-slate-400">Compensation</span>
                  <span className="font-bold text-[#35B8A0]">
                    {currency === 'NGN' 
                      ? `₦${(selectedJob.salaryMinNGN/1000).toFixed(0)}k - ₦${(selectedJob.salaryMaxNGN/1000).toFixed(0)}k` 
                      : `$${selectedJob.salaryMinUSD} - $${selectedJob.salaryMaxUSD}`
                    }
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] text-[#737B90] dark:text-slate-400">Location</span>
                  <span className="font-bold text-[#14213D] dark:text-white">{selectedJob.location}</span>
                </div>
                <div>
                  <span className="block text-[11px] text-[#737B90] dark:text-slate-400">Employment</span>
                  <span className="font-bold text-[#14213D] dark:text-white capitalize">{selectedJob.employmentType}</span>
                </div>
                <div>
                  <span className="block text-[11px] text-[#737B90] dark:text-slate-400">Applicants</span>
                  <span className="font-bold text-[#7057D9] dark:text-[#a89af0]">{selectedJob.applicantsCount} people</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="font-bold text-sm text-[#14213D] dark:text-white">Role Overview</h3>
                <p className="text-[#737B90] dark:text-slate-300 leading-relaxed">
                  {selectedJob.description}
                </p>
              </div>

              {/* Responsibilities */}
              <div className="space-y-2">
                <h3 className="font-bold text-sm text-[#14213D] dark:text-white">Core Responsibilities</h3>
                <ul className="space-y-1.5">
                  {selectedJob.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#737B90] dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-[#35B8A0] shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="space-y-2">
                <h3 className="font-bold text-sm text-[#14213D] dark:text-white">Requirements & Competencies</h3>
                <ul className="space-y-1.5">
                  {selectedJob.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#737B90] dark:text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7057D9] shrink-0 mt-2" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="space-y-2">
                <h3 className="font-bold text-sm text-[#14213D] dark:text-white">Benefits & Perks</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedJob.benefits.map((b, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-[#F8F9FC] dark:bg-slate-800/40 border border-[#E5E8F0] dark:border-slate-800 text-xs text-[#737B90] dark:text-slate-300">
                      🎁 {b}
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills required & matching courses */}
              <div className="space-y-2 p-4 rounded-2xl bg-[#7057D9]/5 border border-[#7057D9]/20">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-[#7057D9] dark:text-[#a89af0] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Skills Covered in SkillUp Academy
                  </h4>
                  <span className="text-[11px] font-extrabold text-[#35B8A0]">
                    {getJobMatchScore(selectedJob)}% Match
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedJob.skillsRequired.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-[11px] font-medium text-[#14213D] dark:text-white border border-[#E5E8F0] dark:border-slate-700">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 sm:p-6 border-t border-[#E5E8F0] dark:border-slate-800 bg-[#F8F9FC] dark:bg-slate-900/60 flex items-center justify-between gap-3">
              <button
                onClick={() => onOpenAiAssistant(`Help me prepare an application and cover letter for ${selectedJob.title} at ${selectedJob.company}`)}
                className="px-3 py-2 text-xs font-semibold rounded-xl border border-[#7057D9] text-[#7057D9] dark:text-[#a89af0] hover:bg-[#7057D9]/10 transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Cover Letter Helper</span>
              </button>

              <button
                onClick={() => {
                  setSelectedJob(null);
                  handleOpenApplyModal(selectedJob);
                }}
                className="px-6 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-[#7057D9] text-white hover:bg-[#5f47c8] shadow-md transition-all flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Apply for this Position</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Application Submission Modal */}
      {isApplying && jobToApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-[#7057D9] dark:text-[#a89af0] uppercase tracking-wider">
                  Direct Job Application
                </span>
                <h3 className="text-xl font-extrabold text-[#14213D] dark:text-white mt-0.5">
                  {jobToApply.title}
                </h3>
                <p className="text-xs text-[#737B90] dark:text-slate-400">
                  {jobToApply.company} · {jobToApply.location}
                </p>
              </div>

              <button
                onClick={() => setIsApplying(false)}
                className="p-1.5 text-[#737B90] hover:text-[#14213D] dark:hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {appSubmittedSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#35B8A0]/15 border border-[#35B8A0] text-[#35B8A0] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-extrabold text-[#14213D] dark:text-white">
                  Application Submitted Successfully!
                </h4>
                <p className="text-xs text-[#737B90] dark:text-slate-400 max-w-xs mx-auto">
                  Your profile and portfolio have been routed to the hiring team at {jobToApply.company}. You can track status under "My Applications".
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="space-y-4 text-xs">
                {/* Pre-filled applicant details */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#737B90] dark:text-slate-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      disabled
                      value={user.name}
                      className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#20263A] dark:text-slate-300 border border-[#E5E8F0] dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#737B90] dark:text-slate-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      disabled
                      value={user.email}
                      className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#20263A] dark:text-slate-300 border border-[#E5E8F0] dark:border-slate-700"
                    />
                  </div>
                </div>

                {/* Portfolio / Project link */}
                <div>
                  <label className="block font-semibold text-[#737B90] dark:text-slate-300 mb-1">
                    Portfolio / SkillUp Project Showcase URL
                  </label>
                  <input
                    type="url"
                    value={portfolioLink}
                    onChange={(e) => setPortfolioLink(e.target.value)}
                    placeholder="https://github.com/yourusername or portfolio link"
                    className="w-full px-3 py-2 rounded-xl bg-[#F8F9FC] dark:bg-slate-900/60 text-[#20263A] dark:text-white border border-[#E5E8F0] dark:border-slate-700 focus:outline-none focus:border-[#7057D9]"
                  />
                </div>

                {/* Expected monthly compensation */}
                <div>
                  <label className="block font-semibold text-[#737B90] dark:text-slate-300 mb-1">
                    Expected Monthly Compensation ({currency === 'NGN' ? '₦ NGN' : '$ USD'})
                  </label>
                  <input
                    type="number"
                    value={expectedSalary}
                    onChange={(e) => setExpectedSalary(e.target.value)}
                    placeholder={currency === 'NGN' ? 'e.g. 750000' : 'e.g. 1200'}
                    className="w-full px-3 py-2 rounded-xl bg-[#F8F9FC] dark:bg-slate-900/60 text-[#20263A] dark:text-white border border-[#E5E8F0] dark:border-slate-700 focus:outline-none focus:border-[#7057D9]"
                  />
                </div>

                {/* Short cover note */}
                <div>
                  <label className="block font-semibold text-[#737B90] dark:text-slate-300 mb-1">
                    Why are you a great fit for this role?
                  </label>
                  <textarea
                    rows={3}
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Highlight your key projects, completed SkillUp courses, and relevant skills..."
                    className="w-full px-3 py-2 rounded-xl bg-[#F8F9FC] dark:bg-slate-900/60 text-[#20263A] dark:text-white border border-[#E5E8F0] dark:border-slate-700 focus:outline-none focus:border-[#7057D9]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsApplying(false)}
                    className="px-4 py-2 rounded-xl border border-[#E5E8F0] dark:border-slate-700 text-[#737B90] dark:text-slate-400 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#7057D9] text-white font-bold hover:bg-[#5f47c8] transition-colors"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Creator Credit Footer Note */}
      <div className="text-center pt-6 border-t border-[#E5E8F0] dark:border-slate-800 text-xs text-[#737B90] dark:text-slate-500">
        Created by Tayo Verse Studios · SkillUp Academy Opportunity Hub
      </div>
    </div>
  );
};
