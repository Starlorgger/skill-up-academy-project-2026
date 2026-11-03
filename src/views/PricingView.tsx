import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle, 
  Lock, 
  Zap, 
  Award, 
  Briefcase, 
  FolderGit2, 
  Clock, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';

interface PricingViewProps {
  onOpenPaymentModal: (plan: 'pro_monthly' | 'pro_annual') => void;
  onNavigate: (view: string) => void;
}

export const PricingView: React.FC<PricingViewProps> = ({ onOpenPaymentModal, onNavigate }) => {
  const { user, currency, setCurrency } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const monthlyNGN = 15000;
  const annualNGN = 135000; // ₦11,250/mo (Save 25%)
  const monthlyUSD = 12;
  const annualUSD = 99; // $8.25/mo

  const freeFeatures = [
    'Access to introductory modules & basic lessons',
    'Interactive practical code exercises',
    'Community question forums',
    'Standard progress tracking & study clock',
    'Up to 5 Gemini AI assistant queries per day'
  ];

  const proMonthlyFeatures = [
    'Unlimited access to all 15 skill categories',
    'Advanced AI Engineering, Full-Stack, & Cloud tracks',
    'Verified Course Completion Certificates with QR verification',
    'Portfolio Project Reviews with Rubric Grading',
    'Unlimited 24/7 AI Learning Assistant with Gemini 3.8',
    'Direct application access to 15+ verified tech jobs',
    'Direct proposal bidding on international freelance client gigs',
    'Offline downloadable resources & code starter templates'
  ];

  const proAnnualFeatures = [
    'Everything included in Pro Monthly',
    'Save 25% (2.5 Months Free compared to monthly)',
    '1-on-1 Portfolio & Resume Audit for remote job hunting',
    'Priority direct candidate referral to partner tech employers',
    'Exclusive downloadable Commercial Code Master Bundles',
    'VIP SkillUp Pro Gold Badge on profile and job applications',
    'Priority ticket support with 2-hour response guarantee'
  ];

  return (
    <div className="space-y-12 py-8 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7057D9]/15 border border-[#7057D9]/30 text-xs font-semibold text-[#7057D9] dark:text-[#a89af0]">
          <Sparkles className="w-3.5 h-3.5 text-[#35B8A0]" />
          <span>Paystack-Secured Membership Plans</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#14213D] dark:text-white tracking-tight leading-tight">
          Invest in High-Income <span className="text-[#7057D9]">Digital Skills</span>
        </h1>

        <p className="text-xs sm:text-sm text-[#737B90] dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Start for free to build your foundation, or upgrade to SkillUp Pro to unlock full production curricula, verified certificates, hands-on portfolio capstones, and direct job & freelance referrals.
        </p>

        {/* Currency & Trust Badge Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
          {/* Currency Toggle */}
          <div className="flex items-center p-1 bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 text-xs shadow-xs">
            <button
              onClick={() => setCurrency('NGN')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                currency === 'NGN' ? 'bg-[#7057D9] text-white' : 'text-[#737B90] hover:text-[#14213D] dark:hover:text-white'
              }`}
            >
              ₦ NGN (Nigeria)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                currency === 'USD' ? 'bg-[#7057D9] text-white' : 'text-[#737B90] hover:text-[#14213D] dark:hover:text-white'
              }`}
            >
              $ USD (International)
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#35B8A0] bg-[#35B8A0]/10 px-3.5 py-1.5 rounded-xl border border-[#35B8A0]/20">
            <Lock className="w-3.5 h-3.5" />
            <span>Paystack Test Sandbox Active · Safe Test Checkout</span>
          </div>
        </div>
      </div>

      {/* 3-Tier Subscription Cards: Free, Premium Monthly, Premium Yearly */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Tier 1: Free Learner */}
        <div className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-[#7057D9]/40 transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#737B90] dark:text-slate-400 uppercase tracking-wider">
                Tier 1 · Starter
              </span>
              {user.plan === 'free' && (
                <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-[#737B90]">
                  Your Current Plan
                </span>
              )}
            </div>

            <h3 className="text-xl font-extrabold text-[#14213D] dark:text-white">
              Free Learner
            </h3>

            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#14213D] dark:text-white">
                {currency === 'NGN' ? '₦0' : '$0'}
              </span>
              <span className="text-xs text-[#737B90]">/ forever</span>
            </div>

            <p className="text-xs text-[#737B90] dark:text-slate-400 mt-2 leading-relaxed">
              Ideal for beginners who want to explore digital skills fundamentals before committing.
            </p>

            <div className="pt-6 border-t border-[#E5E8F0] dark:border-slate-800 mt-6 space-y-3">
              <p className="text-xs font-bold text-[#14213D] dark:text-white uppercase tracking-wider">
                What's Included:
              </p>
              <ul className="space-y-2.5 text-xs text-[#20263A] dark:text-slate-300">
                {freeFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#35B8A0] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8">
            <button
              onClick={() => onNavigate('explore')}
              className="w-full py-3 rounded-xl border border-[#E5E8F0] dark:border-slate-700 font-bold text-xs sm:text-sm text-[#14213D] dark:text-white hover:bg-[#F8F9FC] dark:hover:bg-slate-800 transition-colors"
            >
              Browse Free Catalog
            </button>
          </div>
        </div>

        {/* Tier 2: Premium Monthly */}
        <div className="bg-white dark:bg-[#14213D] rounded-3xl border-2 border-[#7057D9]/50 p-6 sm:p-8 flex flex-col justify-between shadow-md relative hover:border-[#7057D9] transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#7057D9] dark:text-[#a89af0] uppercase tracking-wider">
                Tier 2 · Flexible
              </span>
              {user.plan === 'pro_monthly' && (
                <span className="px-2 py-0.5 rounded-full bg-[#35B8A0]/15 text-[10px] font-bold text-[#35B8A0]">
                  Active Plan
                </span>
              )}
            </div>

            <h3 className="text-xl font-extrabold text-[#14213D] dark:text-white">
              SkillUp Pro Monthly
            </h3>

            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#7057D9] dark:text-[#a89af0]">
                {currency === 'NGN' ? '₦15,000' : '$12'}
              </span>
              <span className="text-xs text-[#737B90]">/ month</span>
            </div>

            <p className="text-xs text-[#737B90] dark:text-slate-400 mt-2 leading-relaxed">
              Full access to complete curricula, graded portfolio capstones, and verified certificates. Cancel anytime.
            </p>

            <div className="pt-6 border-t border-[#E5E8F0] dark:border-slate-800 mt-6 space-y-3">
              <p className="text-xs font-bold text-[#14213D] dark:text-white uppercase tracking-wider">
                Everything in Free, plus:
              </p>
              <ul className="space-y-2.5 text-xs text-[#20263A] dark:text-slate-300">
                {proMonthlyFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#35B8A0] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 space-y-2">
            <button
              onClick={() => onOpenPaymentModal('pro_monthly')}
              className="w-full py-3.5 rounded-xl bg-[#7057D9] hover:bg-[#5f47c8] font-bold text-xs sm:text-sm text-white shadow-md shadow-[#7057D9]/20 transition-all flex items-center justify-center gap-2"
            >
              <span>{user.plan === 'pro_monthly' ? 'Manage Monthly Subscription' : 'Subscribe Monthly with Paystack'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-center text-[#737B90] dark:text-slate-400">
              Auto-renews monthly · Cancel anytime with 1 click
            </p>
          </div>
        </div>

        {/* Tier 3: Premium Yearly (Best Value) */}
        <div className="bg-gradient-to-b from-[#14213D] via-[#1b2b4e] to-[#251f47] text-white rounded-3xl border-2 border-[#35B8A0] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative">
          <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-[#35B8A0] to-[#2fa38e] text-[#14213D] text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
            ⭐ Best Value · Save 25%
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#35B8A0] uppercase tracking-wider">
                Tier 3 · Career Accelerator
              </span>
              {user.plan === 'pro_annual' && (
                <span className="px-2 py-0.5 rounded-full bg-[#35B8A0] text-[10px] font-extrabold text-[#14213D]">
                  Active Plan
                </span>
              )}
            </div>

            <h3 className="text-xl font-extrabold text-white">
              SkillUp Pro Annual
            </h3>

            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-white">
                {currency === 'NGN' ? '₦135,000' : '$99'}
              </span>
              <span className="text-xs text-slate-300">/ year</span>
            </div>

            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Equivalent to only {currency === 'NGN' ? '₦11,250' : '$8.25'} per month. Get 2.5 months completely free plus 1-on-1 portfolio review.
            </p>

            <div className="pt-6 border-t border-white/10 mt-6 space-y-3">
              <p className="text-xs font-bold text-[#35B8A0] uppercase tracking-wider">
                Exclusive Annual Privileges:
              </p>
              <ul className="space-y-2.5 text-xs text-slate-200">
                {proAnnualFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#35B8A0] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 space-y-2">
            <button
              onClick={() => onOpenPaymentModal('pro_annual')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#35B8A0] to-[#2fa38e] hover:brightness-105 font-extrabold text-xs sm:text-sm text-[#14213D] shadow-lg shadow-[#35B8A0]/30 transition-all flex items-center justify-center gap-2"
            >
              <span>{user.plan === 'pro_annual' ? 'Manage Annual Plan' : 'Get Annual Access · Save 25%'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-center text-slate-300">
              30-day money-back satisfaction guarantee
            </p>
          </div>
        </div>
      </div>

      {/* Feature Comparison Matrix */}
      <div className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-lg font-extrabold text-[#14213D] dark:text-white">
          Detailed Tier Comparison
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-[#E5E8F0] dark:border-slate-800 text-[#737B90] dark:text-slate-400">
                <th className="py-3 pr-4 font-semibold">Features & Privileges</th>
                <th className="py-3 px-4 font-semibold text-center">Free Learner</th>
                <th className="py-3 px-4 font-semibold text-center text-[#7057D9] dark:text-[#a89af0]">Pro Monthly</th>
                <th className="py-3 px-4 font-semibold text-center text-[#35B8A0]">Pro Annual</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E8F0] dark:divide-slate-800">
              <tr>
                <td className="py-3 pr-4 font-medium text-[#14213D] dark:text-white">Course Library Access</td>
                <td className="py-3 px-4 text-center text-[#737B90]">Intro Modules Only</td>
                <td className="py-3 px-4 text-center font-bold text-[#14213D] dark:text-white">All 15 Categories</td>
                <td className="py-3 px-4 text-center font-bold text-[#35B8A0]">All 15 Categories</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-[#14213D] dark:text-white">Verified Certificates of Completion</td>
                <td className="py-3 px-4 text-center text-slate-400">—</td>
                <td className="py-3 px-4 text-center font-bold text-[#35B8A0]">✓ Included</td>
                <td className="py-3 px-4 text-center font-bold text-[#35B8A0]">✓ Included</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-[#14213D] dark:text-white">AI Mentor (Gemini 3.8 Flash)</td>
                <td className="py-3 px-4 text-center text-[#737B90]">5 questions/day</td>
                <td className="py-3 px-4 text-center font-bold text-[#14213D] dark:text-white">Unlimited</td>
                <td className="py-3 px-4 text-center font-bold text-[#35B8A0]">Unlimited + Priority</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-[#14213D] dark:text-white">Project Submissions & Rubric Reviews</td>
                <td className="py-3 px-4 text-center text-slate-400">—</td>
                <td className="py-3 px-4 text-center font-bold text-[#35B8A0]">✓ Included</td>
                <td className="py-3 px-4 text-center font-bold text-[#35B8A0]">✓ Included</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-[#14213D] dark:text-white">Online Jobs & Direct Applications</td>
                <td className="py-3 px-4 text-center text-[#737B90]">View Only</td>
                <td className="py-3 px-4 text-center font-bold text-[#14213D] dark:text-white">Full Apply Access</td>
                <td className="py-3 px-4 text-center font-bold text-[#35B8A0]">Priority Recruiter Referral</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-[#14213D] dark:text-white">Freelance Proposal Bids & Rate Calculator</td>
                <td className="py-3 px-4 text-center text-[#737B90]">Basic Calculator</td>
                <td className="py-3 px-4 text-center font-bold text-[#14213D] dark:text-white">Unlimited Bids</td>
                <td className="py-3 px-4 text-center font-bold text-[#35B8A0]">Unlimited Bids + Client Pitch Scripts</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 p-8 shadow-xs space-y-6">
        <h3 className="text-lg font-bold text-[#14213D] dark:text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#7057D9]" />
          Frequently Asked Questions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#737B90] dark:text-slate-300">
          <div>
            <h4 className="font-bold text-[#14213D] dark:text-white text-sm mb-1">
              What payment methods does Paystack support?
            </h4>
            <p className="leading-relaxed">
              Paystack natively supports Nigerian debit cards (Mastercard, Visa, Verve), direct bank transfer via dynamic virtual accounts (Wema Bank / Titan), and bank USSD strings (*737#, *901#, *894#, *966#), plus international credit cards.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#14213D] dark:text-white text-sm mb-1">
              How does the Paystack test mode work?
            </h4>
            <p className="leading-relaxed">
              In test sandbox mode, you can safely test the checkout flow using test card credentials or simulated transfer without being debited. All premium courses and certificates unlock immediately.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#14213D] dark:text-white text-sm mb-1">
              Can I cancel or pause my subscription anytime?
            </h4>
            <p className="leading-relaxed">
              Yes. You can cancel with a single click in your Account Settings. You keep full access to all your courses and certificates until the end of your billing period.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#14213D] dark:text-white text-sm mb-1">
              Do paying users get automatic access to new courses?
            </h4>
            <p className="leading-relaxed">
              Yes! All existing and newly released courses across all 15 digital skill domains are automatically included in your active SkillUp Pro membership at no extra charge.
            </p>
          </div>
        </div>
      </div>

      {/* Creator Credit */}
      <div className="text-center pt-4 border-t border-[#E5E8F0] dark:border-slate-800 text-xs text-[#737B90] dark:text-slate-500">
        Created by Tayo Verse Studios · SkillUp Academy Monetization Engine
      </div>
    </div>
  );
};
