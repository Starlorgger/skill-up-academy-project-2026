import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  SlidersHorizontal, 
  Check, 
  Moon, 
  Sun, 
  Globe, 
  Bell, 
  Trash2, 
  ShieldAlert,
  Save,
  Info,
  CreditCard,
  Sparkles,
  RefreshCw,
  AlertCircle,
  Calendar,
  ArrowUpRight,
  Lock,
  FileText,
  Rocket,
  Smartphone,
  Download,
  Server,
  Laptop,
  Github
} from 'lucide-react';
import { DeploymentModal } from '../components/DeploymentModal';
import { triggerHaptic } from '../utils/haptics';

interface SettingsViewProps {
  onNavigate: (view: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onNavigate }) => {
  const { 
    user, 
    updateUser, 
    currency, 
    setCurrency, 
    darkMode, 
    toggleDarkMode, 
    themeMode,
    setThemeMode,
    logout,
    transactions,
    cancelSubscription,
    resumeSubscription,
    downgradeToFree,
    upgradePlan
  } = useAuth();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [title, setTitle] = useState(user.title || '');
  const [bio, setBio] = useState(user.bio || '');
  const [country, setCountry] = useState(user.country || 'Nigeria');
  const [studyReminder, setStudyReminder] = useState(true);
  const [achievementAlert, setAchievementAlert] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeploymentModal, setShowDeploymentModal] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name,
      email,
      title,
      bio,
      country
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDeleteData = () => {
    localStorage.removeItem('skillup_user');
    localStorage.removeItem('skillup_progress');
    localStorage.removeItem('skillup_certificates');
    localStorage.removeItem('skillup_submissions');
    logout();
    onNavigate('home');
  };

  return (
    <div className="space-y-8 py-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14213D] dark:text-white tracking-tight">
          Account & Learning Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#737B90] dark:text-slate-400 mt-1">
          Manage your personal details, preferences, notifications, and security.
        </p>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 rounded-2xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Your settings have been saved successfully.</span>
        </div>
      )}

      {/* Profile Form */}
      <div className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 p-6 sm:p-8 shadow-xs">
        <h2 className="text-base font-bold text-[#14213D] dark:text-white mb-4">
          Personal Information
        </h2>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#737B90] dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-xs sm:text-sm text-[#20263A] dark:text-white focus:outline-none focus:border-[#7057D9]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#737B90] dark:text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-xs sm:text-sm text-[#20263A] dark:text-white focus:outline-none focus:border-[#7057D9]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#737B90] dark:text-slate-300 mb-1">
                Professional Title
              </label>
              <input
                type="text"
                placeholder="e.g. Frontend Developer / Digital Designer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-xs sm:text-sm text-[#20263A] dark:text-white focus:outline-none focus:border-[#7057D9]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#737B90] dark:text-slate-300 mb-1">
                Country
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-xs sm:text-sm text-[#20263A] dark:text-white focus:outline-none focus:border-[#7057D9]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#737B90] dark:text-slate-300 mb-1">
              Short Bio
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-xs sm:text-sm text-[#20263A] dark:text-white focus:outline-none focus:border-[#7057D9]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#7057D9] hover:bg-[#5f46c6] text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>

      {/* Subscription & Billing Management */}
      <div className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5E8F0] dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#7057D9]" />
              <h2 className="text-base font-bold text-[#14213D] dark:text-white">
                Subscription & Billing Management
              </h2>
            </div>
            <p className="text-xs text-[#737B90] dark:text-slate-400 mt-0.5">
              Manage your Paystack subscription, renewals, payment methods, and invoices.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize flex items-center gap-1.5 ${
              user.plan === 'free'
                ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                : 'bg-[#35B8A0]/15 text-[#35B8A0] border border-[#35B8A0]/30'
            }`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{user.plan === 'free' ? 'Free Plan' : user.plan.replace('_', ' ')}</span>
            </span>
          </div>
        </div>

        {/* Current Plan Overview Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-[#14213D] to-[#251f4c] text-white space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold text-[#35B8A0] uppercase tracking-wider block">
                Active Membership
              </span>
              <h3 className="text-xl font-extrabold text-white mt-0.5">
                {user.plan === 'free' ? 'SkillUp Free Learner' : (user.plan === 'pro_annual' ? 'SkillUp Pro Annual (Saved 25%)' : 'SkillUp Pro Monthly')}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {user.plan === 'free'
                  ? 'Limited access to basic courses. Upgrade to access all premium AI, coding, and design tracks.'
                  : `Full access to all premium curricula, certificates, and portfolio reviews.`}
              </p>
            </div>

            <div className="shrink-0">
              <button
                onClick={() => onNavigate('pricing')}
                className="px-4 py-2 rounded-xl bg-[#7057D9] hover:bg-[#5f47c8] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>{user.plan === 'free' ? 'Upgrade to Pro' : 'Change Plan'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {user.subscription && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/10 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Billing Amount:</span>
                <span className="font-bold text-[#35B8A0]">
                  {currency === 'NGN' ? `₦${user.subscription.amount.toLocaleString()}` : `$${user.subscription.amount}`}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Payment Method:</span>
                <span className="font-bold text-white">
                  {user.subscription.paymentMethod.brand} ···· {user.subscription.paymentMethod.last4}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Next Renewal Date:</span>
                <span className="font-bold text-white">
                  {new Date(user.subscription.currentPeriodEnd).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Auto-Renew Status:</span>
                <span className={`font-bold ${user.subscription.cancelAtPeriodEnd ? 'text-amber-400' : 'text-[#35B8A0]'}`}>
                  {user.subscription.cancelAtPeriodEnd ? 'Cancels at period end' : 'Active (Auto-renews)'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Subscription Actions & Test Mode Sandbox Simulator */}
        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          {user.subscription && (
            <div>
              {!user.subscription.cancelAtPeriodEnd ? (
                <button
                  onClick={() => cancelSubscription()}
                  className="text-xs text-rose-600 hover:underline font-semibold"
                >
                  Cancel Auto-Renewal at Period End
                </button>
              ) : (
                <button
                  onClick={() => resumeSubscription()}
                  className="text-xs text-[#35B8A0] hover:underline font-semibold flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Resume Auto-Renewal</span>
                </button>
              )}
            </div>
          )}

          {/* Quick Testing Toggles */}
          <div className="flex items-center gap-2 ml-auto text-[11px]">
            <span className="text-[#737B90] dark:text-slate-400">Sandbox Preview:</span>
            {user.plan !== 'free' ? (
              <button
                onClick={() => downgradeToFree()}
                className="px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-[#737B90]"
                title="Switch to Free to test access gating"
              >
                Simulate Free Plan
              </button>
            ) : (
              <button
                onClick={() => upgradePlan('pro_monthly')}
                className="px-2.5 py-1 rounded-lg bg-[#7057D9] text-white font-bold"
                title="Quick activate Pro plan"
              >
                Simulate Pro Plan
              </button>
            )}
          </div>
        </div>

        {/* Payment History / Invoices */}
        <div className="space-y-3 pt-3 border-t border-[#E5E8F0] dark:border-slate-800">
          <h3 className="text-xs font-bold text-[#14213D] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-[#7057D9]" />
            Recent Paystack Invoices & Receipts
          </h3>

          <div className="divide-y divide-[#E5E8F0] dark:divide-slate-800 text-xs">
            {transactions.slice(0, 3).map((tx) => (
              <div key={tx.id} className="py-2.5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#14213D] dark:text-white">{tx.invoiceNumber}</span>
                    <span className="text-[#737B90]">·</span>
                    <span className="capitalize">{tx.plan.replace('_', ' ')}</span>
                  </div>
                  <span className="text-[11px] text-[#737B90] dark:text-slate-400 font-mono">
                    Ref: {tx.reference} · {new Date(tx.paidAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-bold text-[#35B8A0]">
                    {tx.currency === 'NGN' ? `₦${tx.amount.toLocaleString()}` : `$${tx.amount}`}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#35B8A0]/10 text-[#35B8A0]">
                    Paid
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Regional & Currency Preferences */}
      <div className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#14213D] dark:text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#35B8A0]" />
          Regional & Currency Preferences
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div
            onClick={() => setCurrency('NGN')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              currency === 'NGN'
                ? 'border-[#7057D9] bg-[#7057D9]/5 ring-2 ring-[#7057D9]/20'
                : 'border-[#E5E8F0] dark:border-slate-800'
            }`}
          >
            <p className="text-xs font-bold text-[#14213D] dark:text-white">Nigerian Naira (₦)</p>
            <p className="text-[11px] text-[#737B90] dark:text-slate-400 mt-1">
              Default currency for local banking, Paystack, and Nigeria-based cards.
            </p>
          </div>

          <div
            onClick={() => setCurrency('USD')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              currency === 'USD'
                ? 'border-[#7057D9] bg-[#7057D9]/5 ring-2 ring-[#7057D9]/20'
                : 'border-[#E5E8F0] dark:border-slate-800'
            }`}
          >
            <p className="text-xs font-bold text-[#14213D] dark:text-white">US Dollars ($)</p>
            <p className="text-[11px] text-[#737B90] dark:text-slate-400 mt-1">
              International pricing for global users and foreign credit cards.
            </p>
          </div>
        </div>
      </div>

      {/* Interface Appearance Theme Switcher (System, Light, Dark) */}
      <div className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-[#14213D] dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#7057D9]" />
              <span>Interface Theme & Appearance</span>
            </h2>
            <p className="text-xs text-[#737B90] dark:text-slate-400 mt-0.5">
              Choose your preferred visual theme using Tailwind dark class variants.
            </p>
          </div>

          <span className="text-[11px] font-semibold text-[#7057D9] dark:text-[#a89af0] bg-[#7057D9]/10 px-2.5 py-1 rounded-full border border-[#7057D9]/20 self-start sm:self-auto capitalize">
            Active: {themeMode} {themeMode === 'system' ? `(${darkMode ? 'Dark' : 'Light'})` : ''}
          </span>
        </div>

        {/* 3-Way Mode Switcher Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* 1. System Mode */}
          <button
            type="button"
            onClick={() => {
              triggerHaptic.selectionChanged();
              setThemeMode('system');
            }}
            className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between min-h-[110px] ${
              themeMode === 'system'
                ? 'border-[#7057D9] bg-[#7057D9]/5 ring-2 ring-[#7057D9]/25 shadow-xs'
                : 'border-[#E5E8F0] dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-[#F8F9FC] dark:bg-slate-800/40'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-8 h-8 rounded-xl bg-slate-200/80 dark:bg-slate-700 text-[#14213D] dark:text-white flex items-center justify-center">
                <Laptop className="w-4 h-4 text-[#7057D9] dark:text-[#a89af0]" />
              </div>
              {themeMode === 'system' && (
                <span className="w-5 h-5 rounded-full bg-[#7057D9] text-white flex items-center justify-center">
                  <Check className="w-3 h-3" />
                </span>
              )}
            </div>
            <div>
              <p className="text-xs font-bold text-[#14213D] dark:text-white">System</p>
              <p className="text-[11px] text-[#737B90] dark:text-slate-400 mt-0.5">
                Automatically matches your device or OS color scheme.
              </p>
            </div>
          </button>

          {/* 2. Light Mode */}
          <button
            type="button"
            onClick={() => {
              triggerHaptic.selectionChanged();
              setThemeMode('light');
            }}
            className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between min-h-[110px] ${
              themeMode === 'light'
                ? 'border-[#7057D9] bg-[#7057D9]/5 ring-2 ring-[#7057D9]/25 shadow-xs'
                : 'border-[#E5E8F0] dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-[#F8F9FC] dark:bg-slate-800/40'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Sun className="w-4 h-4" />
              </div>
              {themeMode === 'light' && (
                <span className="w-5 h-5 rounded-full bg-[#7057D9] text-white flex items-center justify-center">
                  <Check className="w-3 h-3" />
                </span>
              )}
            </div>
            <div>
              <p className="text-xs font-bold text-[#14213D] dark:text-white">Light</p>
              <p className="text-[11px] text-[#737B90] dark:text-slate-400 mt-0.5">
                Clean and bright interface for daylight reading.
              </p>
            </div>
          </button>

          {/* 3. Dark Mode */}
          <button
            type="button"
            onClick={() => {
              triggerHaptic.selectionChanged();
              setThemeMode('dark');
            }}
            className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between min-h-[110px] ${
              themeMode === 'dark'
                ? 'border-[#7057D9] bg-[#7057D9]/5 ring-2 ring-[#7057D9]/25 shadow-xs'
                : 'border-[#E5E8F0] dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-[#F8F9FC] dark:bg-slate-800/40'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-8 h-8 rounded-xl bg-[#14213D] text-[#35B8A0] border border-slate-700 flex items-center justify-center">
                <Moon className="w-4 h-4" />
              </div>
              {themeMode === 'dark' && (
                <span className="w-5 h-5 rounded-full bg-[#7057D9] text-white flex items-center justify-center">
                  <Check className="w-3 h-3" />
                </span>
              )}
            </div>
            <div>
              <p className="text-xs font-bold text-[#14213D] dark:text-white">Dark</p>
              <p className="text-[11px] text-[#737B90] dark:text-slate-400 mt-0.5">
                Deep navy night theme engineered for focus and battery savings.
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Notification Toggles */}
      <div className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#14213D] dark:text-white flex items-center gap-2">
          <Bell className="w-5 h-5 text-[#7057D9]" />
          Study Alerts & Notifications
        </h2>

        <div className="space-y-3 pt-2">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="text-xs font-semibold text-[#14213D] dark:text-white">Daily Study Cadence Reminders</p>
              <p className="text-[11px] text-[#737B90] dark:text-slate-400">Receive an evening alert to maintain your 4-day learning streak.</p>
            </div>
            <input
              type="checkbox"
              checked={studyReminder}
              onChange={(e) => setStudyReminder(e.target.checked)}
              className="w-4 h-4 rounded text-[#7057D9]"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer pt-2 border-t border-[#E5E8F0] dark:border-slate-800">
            <div>
              <p className="text-xs font-semibold text-[#14213D] dark:text-white">Certificate & Project Grade Alerts</p>
              <p className="text-[11px] text-[#737B90] dark:text-slate-400">Notifies you as soon as an instructor reviews your project deliverable.</p>
            </div>
            <input
              type="checkbox"
              checked={achievementAlert}
              onChange={(e) => setAchievementAlert(e.target.checked)}
              className="w-4 h-4 rounded text-[#7057D9]"
            />
          </label>
        </div>
      </div>

      {/* Application Information */}
      <div className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#14213D] dark:text-white flex items-center gap-2">
          <Info className="w-5 h-5 text-[#7057D9]" />
          Application Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 text-xs">
          <div className="p-3.5 bg-[#F8F9FC] dark:bg-slate-800/60 rounded-xl border border-[#E5E8F0] dark:border-slate-700">
            <span className="text-[11px] text-[#737B90] dark:text-slate-400 uppercase tracking-wider block">Application</span>
            <span className="font-bold text-[#14213D] dark:text-white text-sm">SkillUp Academy</span>
          </div>

          <div className="p-3.5 bg-[#F8F9FC] dark:bg-slate-800/60 rounded-xl border border-[#E5E8F0] dark:border-slate-700">
            <span className="text-[11px] text-[#737B90] dark:text-slate-400 uppercase tracking-wider block">Official Creator</span>
            <span className="font-bold text-[#7057D9] dark:text-[#a89af0] text-sm">Created by Tayo Verse Studios</span>
          </div>

          <div className="p-3.5 bg-[#F8F9FC] dark:bg-slate-800/60 rounded-xl border border-[#E5E8F0] dark:border-slate-700">
            <span className="text-[11px] text-[#737B90] dark:text-slate-400 uppercase tracking-wider block">System Version</span>
            <span className="font-mono text-[#20263A] dark:text-slate-200">v2.4.0 (Full Release)</span>
          </div>

          <div className="p-3.5 bg-[#F8F9FC] dark:bg-slate-800/60 rounded-xl border border-[#E5E8F0] dark:border-slate-700">
            <span className="text-[11px] text-[#737B90] dark:text-slate-400 uppercase tracking-wider block">AI Mentorship Engine</span>
            <span className="font-semibold text-[#35B8A0]">Google Gemini 3.8 Flash (Server-Side Proxy)</span>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between text-xs text-[#737B90] dark:text-slate-400">
          <span>Need live latency & AI health telemetry?</span>
          <button
            onClick={() => onNavigate('monitor')}
            className="text-[#7057D9] font-semibold hover:underline"
          >
            Open AI & Learning Monitor →
          </button>
        </div>
      </div>

      {/* Production Deployment & Google Play Store Hub */}
      <div className="bg-gradient-to-br from-[#14213D] via-[#1a2644] to-[#251e4d] rounded-3xl border border-[#7057D9]/40 p-6 sm:p-8 text-white shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#7057D9]/20 border border-[#7057D9]/40 flex items-center justify-center shrink-0">
              <Rocket className="w-6 h-6 text-[#35B8A0]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white">
                  Production Deployment & Google Play Hub
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#35B8A0]/20 text-[#35B8A0] border border-[#35B8A0]/30">
                  Ready to Deploy
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Export files, configure Google Cloud Run / Render hosting, and package for Google Play Store (TWA .aab).
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <a
              href="/api/download/source-code.zip"
              download="skillup-academy-full-project.zip"
              className="px-4 py-2.5 rounded-xl border border-white/20 hover:bg-white/10 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-[#35B8A0]" />
              <span>Download .ZIP</span>
            </a>

            <button
              onClick={() => {
                triggerHaptic.selectionChanged();
                setShowDeploymentModal(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7057D9] to-[#8c74e8] hover:from-[#5f46c6] hover:to-[#7861d8] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>Push to GitHub & Deploy</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 text-xs">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
            <span className="text-white font-bold flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5 text-white" />
              GitHub Repository
            </span>
            <p className="text-[11px] text-slate-300">
              One-command push script <code className="font-mono text-purple-300">push-to-github.sh</code>, Git commands, and clean .gitignore.
            </p>
          </div>

          <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
            <span className="text-[#35B8A0] font-bold flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5" />
              Android Google Play
            </span>
            <p className="text-[11px] text-slate-300">
              Trusted Web Activity config, <code className="font-mono text-purple-300">twa-manifest.json</code>, and Bubblewrap instructions.
            </p>
          </div>

          <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
            <span className="text-[#a89af0] font-bold flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5" />
              Cloud & Docker
            </span>
            <p className="text-[11px] text-slate-300">
              Multi-stage <code className="font-mono text-purple-300">Dockerfile</code>, <code className="font-mono text-purple-300">Procfile</code>, and 1-command Cloud Run deploy.
            </p>
          </div>

          <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
            <span className="text-[#35B8A0] font-bold flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              Paystack Live
            </span>
            <p className="text-[11px] text-slate-300">
              Safe test mode verified. Ready for live secret key activation in Naira & USD.
            </p>
          </div>
        </div>
      </div>

      {/* Account Deletion & Privacy Control */}
      <div className="bg-rose-50/50 dark:bg-rose-950/10 rounded-3xl border border-rose-200 dark:border-rose-900/30 p-6 sm:p-8 space-y-4">
        <h2 className="text-base font-bold text-rose-800 dark:text-rose-400 flex items-center gap-2">
          <Trash2 className="w-5 h-5 text-rose-600" />
          Data Privacy & Account Deletion
        </h2>

        <p className="text-xs text-rose-700/80 dark:text-rose-300/80 leading-relaxed">
          You have full sovereignty over your data. Deleting your learning data removes all enrolled progress, saved quizzes, and certificates from your local browser storage.
        </p>

        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Reset All Learning Progress
          </button>
        ) : (
          <div className="p-4 bg-white dark:bg-[#14213D] rounded-2xl border border-rose-300 space-y-3">
            <p className="text-xs font-bold text-rose-600">
              Are you sure? This cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleDeleteData}
                className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold"
              >
                Yes, Delete My Data
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Deployment & Google Play Store Hub Modal */}
      <DeploymentModal
        isOpen={showDeploymentModal}
        onClose={() => setShowDeploymentModal(false)}
      />
    </div>
  );
};
