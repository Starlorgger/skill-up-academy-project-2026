import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { FreelanceGig, FreelanceProposal } from '../types';
import { FREELANCE_GIGS, EARNING_GUIDES } from '../data/opportunitiesData';
import { 
  Briefcase, 
  Search, 
  Clock, 
  ShieldCheck, 
  Star, 
  Send, 
  DollarSign, 
  CheckCircle2, 
  Sparkles, 
  Calculator, 
  FileText, 
  X, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Bookmark,
  Users
} from 'lucide-react';

interface FreelanceViewProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenAiAssistant: (topic?: string) => void;
}

export const FreelanceView: React.FC<FreelanceViewProps> = ({ onNavigate, onOpenAiAssistant }) => {
  const { user, currency, formatPrice } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBudgetType, setSelectedBudgetType] = useState<'all' | 'fixed' | 'hourly'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'gigs' | 'proposals' | 'calculator' | 'templates'>('gigs');

  // Selected gig for slide-over / details modal
  const [selectedGig, setSelectedGig] = useState<FreelanceGig | null>(null);

  // Proposal modal state
  const [isSubmittingProposal, setIsSubmittingProposal] = useState(false);
  const [gigForProposal, setGigForProposal] = useState<FreelanceGig | null>(null);
  const [bidAmount, setBidAmount] = useState<string>('');
  const [deliveryDays, setDeliveryDays] = useState<number>(7);
  const [coverLetter, setCoverLetter] = useState<string>('');
  const [portfolioLink, setPortfolioLink] = useState<string>('');
  const [proposalSuccess, setProposalSuccess] = useState(false);

  // Saved proposals in state
  const [proposals, setProposals] = useState<FreelanceProposal[]>([
    {
      id: 'prop-sample-1',
      gigId: 'gig-1',
      gigTitle: 'Build AI Customer Support Agent with Gemini API',
      clientName: 'Sarah Jenkins',
      bidAmountNGN: 520000,
      bidAmountUSD: 620,
      deliveryTimeDays: 10,
      coverLetter: 'Hi Sarah, I specialize in generative AI integration with Gemini. I have already built contextual agents with memory and fallback logic on SkillUp Academy.',
      portfolioLinks: ['https://skillup.academy/portfolio/' + user.id],
      status: 'shortlisted',
      submittedAt: new Date(Date.now() - 86400000).toISOString()
    }
  ]);

  // Rate calculator state
  const [targetMonthlyIncome, setTargetMonthlyIncome] = useState<number>(currency === 'NGN' ? 1200000 : 1500);
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState<number>(25);
  const [weeksPerYear, setWeeksPerYear] = useState<number>(48);

  const calculatedHourlyRate = useMemo(() => {
    const annualTarget = targetMonthlyIncome * 12;
    const annualBillableHours = billableHoursPerWeek * weeksPerYear;
    return annualBillableHours > 0 ? Math.round(annualTarget / annualBillableHours) : 0;
  }, [targetMonthlyIncome, billableHoursPerWeek, weeksPerYear]);

  // Filtered freelance gigs
  const filteredGigs = useMemo(() => {
    return FREELANCE_GIGS.filter(gig => {
      const matchesSearch = 
        gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gig.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gig.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gig.skillsRequired.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType = selectedBudgetType === 'all' || gig.budgetType === selectedBudgetType;
      const matchesCat = selectedCategory === 'all' || gig.categoryId === selectedCategory;

      return matchesSearch && matchesType && matchesCat;
    });
  }, [searchQuery, selectedBudgetType, selectedCategory]);

  const handleOpenProposalModal = (gig: FreelanceGig) => {
    setGigForProposal(gig);
    setBidAmount(currency === 'NGN' ? String(gig.budgetNGN) : String(gig.budgetUSD));
    setIsSubmittingProposal(true);
    setProposalSuccess(false);
  };

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gigForProposal) return;

    const amountNum = Number(bidAmount) || 0;
    const newProposal: FreelanceProposal = {
      id: `prop-${Date.now()}`,
      gigId: gigForProposal.id,
      gigTitle: gigForProposal.title,
      clientName: gigForProposal.clientName,
      bidAmountNGN: currency === 'NGN' ? amountNum : amountNum * 850,
      bidAmountUSD: currency === 'USD' ? amountNum : Math.round(amountNum / 850),
      deliveryTimeDays: Number(deliveryDays) || 7,
      coverLetter: coverLetter || 'I have completed this skill specialization on SkillUp Academy and can deliver high-quality code on time.',
      portfolioLinks: portfolioLink ? [portfolioLink] : ['https://skillup.academy/portfolio'],
      status: 'submitted',
      submittedAt: new Date().toISOString()
    };

    setProposals(prev => [newProposal, ...prev]);
    setProposalSuccess(true);
    setTimeout(() => {
      setIsSubmittingProposal(false);
      setProposalSuccess(false);
      setActiveTab('proposals');
    }, 1800);
  };

  return (
    <div className="space-y-8 py-6">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#14213D] via-[#1c2e56] to-[#2b1f4c] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-lg border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#35B8A0]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#7057D9]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#35B8A0]/20 border border-[#35B8A0]/40 text-xs font-semibold text-[#35B8A0]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Freelance Opportunity & Gig Network</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Win High-Paying Freelance Contracts & Projects
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Directly monetize your digital skills. Connect with international and local clients needing AI prompt engineers, web developers, UI designers, and data analysts. Submit tailored bids and calculate your market rates.
          </p>

          {/* Quick Metrics */}
          <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <span className="block text-xl font-bold text-white">{FREELANCE_GIGS.length} Live Gigs</span>
              <span className="text-slate-400">Fixed & Hourly</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <span className="block text-xl font-bold text-[#35B8A0]">Verified Funds</span>
              <span className="text-slate-400">Escrow Protected</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <span className="block text-xl font-bold text-[#a89af0]">₦400k – ₦800k</span>
              <span className="text-slate-400">Avg Project Payout</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <span className="block text-xl font-bold text-white">Direct Settlement</span>
              <span className="text-slate-400">USD & NGN Bank Transfer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#E5E8F0] dark:border-slate-800 pb-3 gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('gigs')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-colors ${
              activeTab === 'gigs'
                ? 'bg-[#7057D9] text-white shadow-sm'
                : 'text-[#737B90] dark:text-slate-400 hover:text-[#14213D] dark:hover:text-white'
            }`}
          >
            Available Gigs ({filteredGigs.length})
          </button>
          <button
            onClick={() => setActiveTab('proposals')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-colors relative ${
              activeTab === 'proposals'
                ? 'bg-[#7057D9] text-white shadow-sm'
                : 'text-[#737B90] dark:text-slate-400 hover:text-[#14213D] dark:hover:text-white'
            }`}
          >
            My Proposals
            {proposals.length > 0 && (
              <span className="ml-2 px-1.5 py-0.5 text-xs bg-[#35B8A0] text-[#14213D] font-extrabold rounded-full">
                {proposals.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-colors flex items-center gap-1.5 ${
              activeTab === 'calculator'
                ? 'bg-[#7057D9] text-white shadow-sm'
                : 'text-[#737B90] dark:text-slate-400 hover:text-[#14213D] dark:hover:text-white'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Rate Calculator</span>
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-colors flex items-center gap-1.5 ${
              activeTab === 'templates'
                ? 'bg-[#7057D9] text-white shadow-sm'
                : 'text-[#737B90] dark:text-slate-400 hover:text-[#14213D] dark:hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Winning Pitch Guides</span>
          </button>
        </div>

        <button
          onClick={() => onOpenAiAssistant('Crafting a winning freelance proposal on Upwork and Contra')}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-[#7057D9] text-[#7057D9] dark:text-[#a89af0] hover:bg-[#7057D9]/10 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Proposal Writer</span>
        </button>
      </div>

      {/* Tab 1: Available Gigs */}
      {activeTab === 'gigs' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 p-4 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-[#737B90] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search freelance gigs by skill (e.g. Gemini, React, Figma, Power BI)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E8F0] dark:border-slate-700 bg-[#F8F9FC] dark:bg-slate-900/60 text-xs sm:text-sm text-[#20263A] dark:text-white placeholder-[#737B90] focus:outline-none focus:border-[#7057D9]"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto text-xs shrink-0">
              <select
                value={selectedBudgetType}
                onChange={(e) => setSelectedBudgetType(e.target.value as any)}
                className="px-3 py-2 rounded-xl border border-[#E5E8F0] dark:border-slate-700 bg-white dark:bg-slate-800 text-[#20263A] dark:text-slate-200 focus:outline-none"
              >
                <option value="all">All Budget Types</option>
                <option value="fixed">Fixed Price Only</option>
                <option value="hourly">Hourly Rate Only</option>
              </select>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 rounded-xl border border-[#E5E8F0] dark:border-slate-700 bg-white dark:bg-slate-800 text-[#20263A] dark:text-slate-200 focus:outline-none"
              >
                <option value="all">All Categories</option>
                <option value="ai-engineering">AI & Automation</option>
                <option value="software-development">Web & Software</option>
                <option value="ui-ux-design">UI/UX Design</option>
                <option value="data-science">Data & BI</option>
                <option value="website-no-code">Webflow & No-Code</option>
              </select>
            </div>
          </div>

          {/* Gigs List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGigs.map((gig) => (
              <div
                key={gig.id}
                onClick={() => setSelectedGig(gig)}
                className="bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 p-5 shadow-sm hover:border-[#7057D9] transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Client line */}
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                      <img
                        src={gig.clientAvatar}
                        alt={gig.clientName}
                        className="w-7 h-7 rounded-full object-cover border border-[#E5E8F0] dark:border-slate-700"
                      />
                      <span className="text-xs font-semibold text-[#737B90] dark:text-slate-400">
                        {gig.clientName} ({gig.clientCountry})
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{gig.clientRating.toFixed(1)}</span>
                      <span className="text-slate-400 font-normal">({gig.clientReviewsCount})</span>
                    </div>
                  </div>

                  <h3 className="text-base font-extrabold text-[#14213D] dark:text-white group-hover:text-[#7057D9] transition-colors leading-snug mb-2">
                    {gig.title}
                  </h3>

                  {/* Budget & Timeline */}
                  <div className="flex flex-wrap items-center gap-3 text-xs mb-3">
                    <span className="font-extrabold text-[#35B8A0]">
                      {currency === 'NGN' 
                        ? (gig.budgetType === 'hourly' ? `₦${gig.budgetNGN.toLocaleString()} / hr` : `₦${gig.budgetNGN.toLocaleString()} fixed`)
                        : (gig.budgetType === 'hourly' ? `$${gig.budgetUSD} / hr` : `$${gig.budgetUSD} fixed`)
                      }
                    </span>
                    <span className="text-[#737B90] dark:text-slate-400">·</span>
                    <span className="text-[#737B90] dark:text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {gig.duration}
                    </span>
                    <span className="text-[#737B90] dark:text-slate-400">·</span>
                    <span className="capitalize text-[#737B90] dark:text-slate-400">
                      {gig.experienceLevel} level
                    </span>
                  </div>

                  <p className="text-xs text-[#737B90] dark:text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                    {gig.description}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {gig.skillsRequired.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-[#F8F9FC] dark:bg-slate-800 text-[11px] font-medium text-[#20263A] dark:text-slate-300 border border-[#E5E8F0] dark:border-slate-700"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card footer */}
                <div className="pt-3 border-t border-[#E5E8F0] dark:border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-[#737B90] dark:text-slate-400">
                    {gig.verifiedPayment && (
                      <span className="flex items-center gap-1 text-[#35B8A0] font-semibold text-[11px]">
                        <ShieldCheck className="w-3.5 h-3.5" /> Verified Funds
                      </span>
                    )}
                    <span>·</span>
                    <span>{gig.proposalsCount} Proposals</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenProposalModal(gig);
                    }}
                    className="px-3 py-1.5 font-bold rounded-xl bg-[#7057D9] text-white hover:bg-[#5f47c8] transition-colors"
                  >
                    Submit Proposal
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: My Proposals */}
      {activeTab === 'proposals' && (
        <div className="space-y-4">
          {proposals.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 p-8">
              <FileText className="w-12 h-12 text-[#737B90] mx-auto mb-3 opacity-60" />
              <h3 className="text-base font-bold text-[#14213D] dark:text-white">No Proposals Submitted Yet</h3>
              <p className="text-xs text-[#737B90] dark:text-slate-400 max-w-md mx-auto mt-1 mb-4">
                Browse open client gigs and submit your first project bid with your SkillUp portfolio.
              </p>
              <button
                onClick={() => setActiveTab('gigs')}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-[#7057D9] text-white"
              >
                Browse Open Gigs
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {proposals.map((prop) => (
                <div
                  key={prop.id}
                  className="bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base text-[#14213D] dark:text-white">
                      {prop.gigTitle}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#737B90] dark:text-slate-400">
                      <span>Client: {prop.clientName}</span>
                      <span>·</span>
                      <span className="font-bold text-[#35B8A0]">
                        Bid: {currency === 'NGN' ? `₦${prop.bidAmountNGN.toLocaleString()}` : `$${prop.bidAmountUSD}`}
                      </span>
                      <span>·</span>
                      <span>Est Delivery: {prop.deliveryTimeDays} days</span>
                    </div>

                    <p className="text-xs text-[#737B90] dark:text-slate-400 bg-[#F8F9FC] dark:bg-slate-800/50 p-2.5 rounded-lg italic">
                      "{prop.coverLetter}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize flex items-center gap-1.5 ${
                      prop.status === 'shortlisted'
                        ? 'bg-[#35B8A0]/10 text-[#35B8A0] border border-[#35B8A0]/20'
                        : 'bg-purple-500/10 text-[#7057D9] border border-purple-500/20'
                    }`}>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {prop.status}
                    </span>

                    <button
                      onClick={() => onOpenAiAssistant(`How do I prepare for a client discovery call for: ${prop.gigTitle}`)}
                      className="px-3 py-1.5 rounded-xl border border-[#7057D9] text-[#7057D9] dark:text-[#a89af0] text-xs font-semibold hover:bg-[#7057D9]/10"
                    >
                      Client Call Prep
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Rate Calculator */}
      {activeTab === 'calculator' && (
        <div className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-xl font-extrabold text-[#14213D] dark:text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#7057D9]" />
              Freelance Hourly & Project Rate Calculator
            </h2>
            <p className="text-xs sm:text-sm text-[#737B90] dark:text-slate-300">
              Calculate realistic rates based on your monthly living expenses, billable client hours (accounting for non-billable marketing & learning), and profit margin goals in Nigeria or abroad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="space-y-4 md:col-span-2">
              {/* Target Monthly Income */}
              <div>
                <label className="block text-xs font-bold text-[#14213D] dark:text-slate-200 mb-1">
                  Target Monthly Take-Home Income ({currency === 'NGN' ? '₦ NGN' : '$ USD'})
                </label>
                <input
                  type="number"
                  value={targetMonthlyIncome}
                  onChange={(e) => setTargetMonthlyIncome(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E8F0] dark:border-slate-700 bg-[#F8F9FC] dark:bg-slate-900/60 text-sm font-bold text-[#14213D] dark:text-white focus:outline-none focus:border-[#7057D9]"
                />
                <span className="text-[11px] text-[#737B90] dark:text-slate-400 mt-1 block">
                  Recommended minimum: ₦800,000 / month or $1,000 / month for comfortable digital professionals.
                </span>
              </div>

              {/* Billable Hours */}
              <div>
                <label className="block text-xs font-bold text-[#14213D] dark:text-slate-200 mb-1">
                  Billable Client Hours Per Week ({billableHoursPerWeek} hrs)
                </label>
                <input
                  type="range"
                  min="10"
                  max="40"
                  value={billableHoursPerWeek}
                  onChange={(e) => setBillableHoursPerWeek(Number(e.target.value))}
                  className="w-full accent-[#7057D9]"
                />
                <div className="flex justify-between text-[11px] text-[#737B90] dark:text-slate-400">
                  <span>10 hrs (Part-time / Side-gig)</span>
                  <span>25 hrs (Realistic Full-time)</span>
                  <span>40 hrs (Maximum)</span>
                </div>
              </div>

              {/* Working Weeks Per Year */}
              <div>
                <label className="block text-xs font-bold text-[#14213D] dark:text-slate-200 mb-1">
                  Working Weeks Per Year ({weeksPerYear} weeks)
                </label>
                <input
                  type="range"
                  min="40"
                  max="52"
                  value={weeksPerYear}
                  onChange={(e) => setWeeksPerYear(Number(e.target.value))}
                  className="w-full accent-[#35B8A0]"
                />
                <span className="text-[11px] text-[#737B90] dark:text-slate-400 mt-1 block">
                  Leaving 4 weeks for holidays, illness, and continuous upskilling on SkillUp Academy.
                </span>
              </div>
            </div>

            {/* Output Card */}
            <div className="bg-gradient-to-br from-[#14213D] to-[#201d4a] text-white p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs uppercase font-bold text-[#35B8A0] tracking-wider block">
                  Your Minimum Recommended Rate
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
                  {currency === 'NGN' ? `₦${calculatedHourlyRate.toLocaleString()}` : `$${calculatedHourlyRate}`}
                  <span className="text-xs font-normal text-slate-300"> / hour</span>
                </div>
              </div>

              <div className="space-y-2 text-xs border-t border-white/10 pt-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Estimated Annual Target:</span>
                  <span className="font-bold">
                    {currency === 'NGN' 
                      ? `₦${((targetMonthlyIncome * 12)/1000000).toFixed(1)}M` 
                      : `$${(targetMonthlyIncome * 12).toLocaleString()}`
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Small Project (20 hrs):</span>
                  <span className="font-bold text-[#35B8A0]">
                    {currency === 'NGN' ? `₦${(calculatedHourlyRate * 20).toLocaleString()}` : `$${calculatedHourlyRate * 20}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Large Project (80 hrs):</span>
                  <span className="font-bold text-[#a89af0]">
                    {currency === 'NGN' ? `₦${(calculatedHourlyRate * 80).toLocaleString()}` : `$${calculatedHourlyRate * 80}`}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onOpenAiAssistant(`How do I pitch a client at a rate of ${currency === 'NGN' ? '₦' + calculatedHourlyRate : '$' + calculatedHourlyRate} per hour without getting rejected?`)}
                className="w-full py-2.5 rounded-xl bg-[#7057D9] text-white text-xs font-bold hover:bg-[#5f47c8] transition-colors"
              >
                Ask AI: How to Pitch This Rate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Winning Pitch Guides */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EARNING_GUIDES.map((guide) => (
            <div
              key={guide.id}
              className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#7057D9] dark:text-[#a89af0] uppercase tracking-wider">
                  {guide.categoryName}
                </span>
                <h3 className="text-base font-extrabold text-[#14213D] dark:text-white leading-snug">
                  {guide.title}
                </h3>
                <div className="text-xs font-bold text-[#35B8A0] pt-1">
                  Earning Potential: {currency === 'NGN' ? guide.avgRateNGN : guide.avgRateUSD}
                </div>

                <div className="pt-3 space-y-2">
                  <h4 className="text-xs font-bold text-[#14213D] dark:text-white">Action Steps to Close Clients:</h4>
                  <ol className="space-y-1.5 text-xs text-[#737B90] dark:text-slate-300">
                    {guide.actionSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="font-bold text-[#7057D9]">{idx + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E8F0] dark:border-slate-800">
                <button
                  onClick={() => onOpenAiAssistant(`Write me a customized cold outreach script for ${guide.title}`)}
                  className="w-full py-2 rounded-xl border border-[#7057D9] text-[#7057D9] dark:text-[#a89af0] text-xs font-bold hover:bg-[#7057D9]/10 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Outreach Script</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Slide-over / Modal for Gig Details */}
      {selectedGig && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/50 backdrop-blur-sm p-0 sm:p-4">
          <div className="w-full max-w-xl h-full sm:h-[90vh] bg-white dark:bg-[#14213D] sm:rounded-3xl border border-[#E5E8F0] dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
            <div className="p-6 border-b border-[#E5E8F0] dark:border-slate-800 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-[#35B8A0] uppercase">
                    {selectedGig.budgetType} Contract
                  </span>
                  {selectedGig.verifiedPayment && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#35B8A0] font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" /> Payment Verified
                    </span>
                  )}
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-[#14213D] dark:text-white">
                  {selectedGig.title}
                </h2>
                <div className="flex items-center gap-2 text-xs text-[#737B90] dark:text-slate-400 mt-1">
                  <span>Client: {selectedGig.clientName}</span>
                  <span>·</span>
                  <span>{selectedGig.clientCountry}</span>
                  <span>·</span>
                  <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                    <Star className="w-3 h-3 fill-amber-500" /> {selectedGig.clientRating} ({selectedGig.clientReviewsCount})
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedGig(null)}
                className="p-2 text-[#737B90] hover:text-[#14213D] dark:hover:text-white rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs sm:text-sm">
              <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-[#F8F9FC] dark:bg-slate-800/60 border border-[#E5E8F0] dark:border-slate-800">
                <div>
                  <span className="block text-[10px] text-[#737B90] dark:text-slate-400">Budget</span>
                  <span className="font-extrabold text-[#35B8A0]">
                    {currency === 'NGN' ? `₦${selectedGig.budgetNGN.toLocaleString()}` : `$${selectedGig.budgetUSD}`}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-[#737B90] dark:text-slate-400">Timeline</span>
                  <span className="font-bold text-[#14213D] dark:text-white">{selectedGig.duration}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-[#737B90] dark:text-slate-400">Proposals</span>
                  <span className="font-bold text-[#7057D9] dark:text-[#a89af0]">{selectedGig.proposalsCount} Bids</span>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-sm text-[#14213D] dark:text-white mb-2">Project Brief</h3>
                <p className="text-[#737B90] dark:text-slate-300 leading-relaxed">
                  {selectedGig.description}
                </p>
              </div>

              <div>
                <h3 className="font-bold text-sm text-[#14213D] dark:text-white mb-2">Required Deliverables</h3>
                <ul className="space-y-1.5">
                  {selectedGig.deliverables.map((del, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#737B90] dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-[#35B8A0] shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-sm text-[#14213D] dark:text-white mb-2">Key Skills</h3>
                <div className="flex flex-wrap gap-1.5">
                  {selectedGig.skillsRequired.map((s, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-[#F8F9FC] dark:bg-slate-800 text-xs font-semibold text-[#14213D] dark:text-white border border-[#E5E8F0] dark:border-slate-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-[#E5E8F0] dark:border-slate-800 bg-[#F8F9FC] dark:bg-slate-900/60 flex items-center justify-between gap-3">
              <button
                onClick={() => onOpenAiAssistant(`Draft a proposal for freelance gig: "${selectedGig.title}". Budget is ${selectedGig.budgetUSD} USD.`)}
                className="px-3 py-2 text-xs font-bold rounded-xl border border-[#7057D9] text-[#7057D9] dark:text-[#a89af0] flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Proposal Writer</span>
              </button>

              <button
                onClick={() => {
                  setSelectedGig(null);
                  handleOpenProposalModal(selectedGig);
                }}
                className="px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-[#7057D9] text-white hover:bg-[#5f47c8] shadow-md transition-all flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Proposal</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Proposal Submission Modal */}
      {isSubmittingProposal && gigForProposal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-[#35B8A0] uppercase tracking-wider">
                  Submit Client Proposal
                </span>
                <h3 className="text-lg font-extrabold text-[#14213D] dark:text-white mt-0.5">
                  {gigForProposal.title}
                </h3>
                <p className="text-xs text-[#737B90] dark:text-slate-400">
                  Client: {gigForProposal.clientName} ({gigForProposal.clientCountry})
                </p>
              </div>

              <button
                onClick={() => setIsSubmittingProposal(false)}
                className="p-1.5 text-[#737B90] hover:text-[#14213D] dark:hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {proposalSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#35B8A0]/15 border border-[#35B8A0] text-[#35B8A0] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-extrabold text-[#14213D] dark:text-white">
                  Proposal Submitted!
                </h4>
                <p className="text-xs text-[#737B90] dark:text-slate-400 max-w-xs mx-auto">
                  The client has received your bid and cover pitch. You can monitor shortlisted status in the "My Proposals" tab.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitProposal} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#737B90] dark:text-slate-300 mb-1">
                      Your Bid Amount ({currency === 'NGN' ? '₦ NGN' : '$ USD'})
                    </label>
                    <input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl bg-[#F8F9FC] dark:bg-slate-900/60 text-[#20263A] dark:text-white border border-[#E5E8F0] dark:border-slate-700 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#737B90] dark:text-slate-300 mb-1">
                      Estimated Delivery Days
                    </label>
                    <input
                      type="number"
                      value={deliveryDays}
                      onChange={(e) => setDeliveryDays(Number(e.target.value))}
                      min="1"
                      required
                      className="w-full px-3 py-2 rounded-xl bg-[#F8F9FC] dark:bg-slate-900/60 text-[#20263A] dark:text-white border border-[#E5E8F0] dark:border-slate-700 font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#737B90] dark:text-slate-300 mb-1">
                    Portfolio or Live Demo Links
                  </label>
                  <input
                    type="url"
                    value={portfolioLink}
                    onChange={(e) => setPortfolioLink(e.target.value)}
                    placeholder="https://yourportfolio.com or github repo"
                    className="w-full px-3 py-2 rounded-xl bg-[#F8F9FC] dark:bg-slate-900/60 text-[#20263A] dark:text-white border border-[#E5E8F0] dark:border-slate-700 focus:outline-none focus:border-[#7057D9]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#737B90] dark:text-slate-300 mb-1">
                    Cover Pitch (Explain exactly how you will execute their deliverables)
                  </label>
                  <textarea
                    rows={4}
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Describe your plan, relevant previous projects, and approach..."
                    className="w-full px-3 py-2 rounded-xl bg-[#F8F9FC] dark:bg-slate-900/60 text-[#20263A] dark:text-white border border-[#E5E8F0] dark:border-slate-700 focus:outline-none focus:border-[#7057D9]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsSubmittingProposal(false)}
                    className="px-4 py-2 rounded-xl border border-[#E5E8F0] dark:border-slate-700 text-[#737B90] dark:text-slate-400 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#7057D9] text-white font-bold hover:bg-[#5f47c8] transition-colors"
                  >
                    Send Proposal
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Creator Credit */}
      <div className="text-center pt-6 border-t border-[#E5E8F0] dark:border-slate-800 text-xs text-[#737B90] dark:text-slate-500">
        Created by Tayo Verse Studios · SkillUp Academy Freelance Network
      </div>
    </div>
  );
};
