import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  Search, 
  Bell, 
  ShieldCheck, 
  Moon, 
  Sun, 
  BookOpen, 
  LogOut, 
  Check, 
  Award,
  SlidersHorizontal,
  HelpCircle,
  Activity,
  Briefcase,
  Compass,
  Rocket
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';
import { DeploymentModal } from './DeploymentModal';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenAiAssistant: () => void;
  onOpenPricing: () => void;
  onOpenHelp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenAiAssistant,
  onOpenPricing,
  onOpenHelp
}) => {
  const { user, currency, setCurrency, darkMode, toggleDarkMode, switchRole, logout } = useAuth();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showDeploymentModal, setShowDeploymentModal] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('explore', searchQuery.trim());
      setShowSearchModal(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#14213D]/95 backdrop-blur-md border-b border-[#E5E8F0] dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element with clean mark) */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-left text-lg font-bold tracking-tight text-[#14213D] dark:text-white whitespace-nowrap shrink-0 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#14213D] to-[#7057D9] flex items-center justify-center text-white shadow-sm shadow-[#7057D9]/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-[#35B8A0]" />
            </div>
            <span className="font-extrabold text-xl tracking-tight">
              SkillUp<span className="text-[#7057D9]">.</span>Academy
            </span>
          </button>

          {/* Zone 2: Concise Single-line Nav Links (Hidden on small mobile, handled by bottom nav) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium text-[#737B90] dark:text-slate-300">
            <button
              onClick={() => onNavigate('explore')}
              className={`hover:text-[#7057D9] dark:hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'explore' ? 'text-[#7057D9] font-semibold' : ''
              }`}
            >
              Courses
            </button>
            <button
              onClick={() => onNavigate('paths')}
              className={`hover:text-[#7057D9] dark:hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'paths' ? 'text-[#7057D9] font-semibold' : ''
              }`}
            >
              Paths
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className={`hover:text-[#7057D9] dark:hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'projects' ? 'text-[#7057D9] font-semibold' : ''
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => onNavigate('jobs')}
              className={`hover:text-[#7057D9] dark:hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                currentView === 'jobs' ? 'text-[#7057D9] font-semibold' : ''
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-[#35B8A0]" />
              <span>Jobs</span>
            </button>
            <button
              onClick={() => onNavigate('freelance')}
              className={`hover:text-[#7057D9] dark:hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'freelance' ? 'text-[#7057D9] font-semibold' : ''
              }`}
            >
              Freelance
            </button>
            <button
              onClick={() => onNavigate('career')}
              className={`hover:text-[#7057D9] dark:hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                currentView === 'career' ? 'text-[#7057D9] font-semibold' : ''
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-[#7057D9]" />
              <span>Career</span>
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className={`hover:text-[#7057D9] dark:hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'pricing' ? 'text-[#7057D9] font-semibold' : ''
              }`}
            >
              Pricing
            </button>
            <button
              onClick={() => onNavigate('monitor')}
              className={`hover:text-[#7057D9] dark:hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                currentView === 'monitor' ? 'text-[#7057D9] font-semibold' : ''
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Monitor</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action & Utilities */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick Search trigger */}
            <button
              onClick={() => setShowSearchModal(true)}
              className="p-2 text-[#737B90] hover:text-[#14213D] dark:text-slate-300 dark:hover:text-white rounded-lg hover:bg-[#F8F9FC] dark:hover:bg-slate-800 transition-colors focus:outline-none"
              title="Search courses"
              aria-label="Search courses"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* PWA In-App Install Trigger */}
            <PWAInstallButton variant="compact" />

            {/* Currency Selector (₦ / $) */}
            <button
              onClick={() => setCurrency(currency === 'NGN' ? 'USD' : 'NGN')}
              className="hidden sm:inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-lg border border-[#E5E8F0] dark:border-slate-700 bg-white dark:bg-slate-800 text-[#20263A] dark:text-slate-200 hover:border-[#7057D9] transition-colors"
              title="Switch currency preference"
            >
              {currency === 'NGN' ? '₦ NGN' : '$ USD'}
            </button>

            {/* AI Assistant Quick Trigger */}
            <button
              onClick={onOpenAiAssistant}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#7057D9]/10 text-[#7057D9] dark:bg-[#7057D9]/20 dark:text-[#a89af0] hover:bg-[#7057D9]/20 transition-colors whitespace-nowrap"
              title="Launch AI Learning Mentor"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#7057D9]" />
              <span>AI Mentor</span>
            </button>

            {/* Visible Question-Mark Help Icon */}
            <button
              onClick={onOpenHelp}
              className="p-2 text-[#7057D9] dark:text-[#a89af0] hover:bg-[#7057D9]/10 rounded-lg transition-colors focus:outline-none"
              title="Help, Guides & Support (Context-Sensitive)"
              aria-label="Help and Support"
            >
              <HelpCircle className="w-5 h-5 text-[#7057D9]" />
            </button>

            {/* Notifications Button */}
            <button
              onClick={() => onNavigate('notifications')}
              className="relative p-2 text-[#737B90] hover:text-[#14213D] dark:text-slate-300 dark:hover:text-white rounded-lg hover:bg-[#F8F9FC] dark:hover:bg-slate-800 transition-colors focus:outline-none"
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#7057D9] rounded-full"></span>
            </button>

            {/* User Profile / Account Menu */}
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 p-1 rounded-full border border-transparent hover:border-[#E5E8F0] dark:hover:border-slate-700 focus:outline-none transition-colors"
                aria-label="User account menu"
              >
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-[#E5E8F0] dark:border-slate-700"
                  referrerPolicy="no-referrer"
                />
              </button>

              {/* Profile Dropdown Menu */}
              {profileMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-[#14213D] shadow-xl border border-[#E5E8F0] dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setProfileMenuOpen(false)}
                >
                  <div className="px-4 py-3 border-b border-[#E5E8F0] dark:border-slate-800">
                    <p className="text-xs text-[#737B90] dark:text-slate-400">Signed in as</p>
                    <p className="text-sm font-semibold text-[#14213D] dark:text-white truncate">{user.name}</p>
                    <p className="text-xs text-[#737B90] dark:text-slate-400 truncate">{user.email}</p>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="text-[#35B8A0] font-medium uppercase tracking-wider text-[11px]">
                        {user.plan === 'free' ? 'Free Plan' : 'Pro Member'}
                      </span>
                      {user.plan === 'free' && (
                        <button
                          onClick={() => { setProfileMenuOpen(false); onOpenPricing(); }}
                          className="text-[#7057D9] font-semibold hover:underline"
                        >
                          Upgrade
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => { setProfileMenuOpen(false); onNavigate('mylearning'); }}
                      className="w-full px-4 py-2 text-left text-sm text-[#20263A] dark:text-slate-200 hover:bg-[#F8F9FC] dark:hover:bg-slate-800 flex items-center gap-2.5"
                    >
                      <BookOpen className="w-4 h-4 text-[#737B90]" />
                      My Learning Dashboard
                    </button>
                    <button
                      onClick={() => { setProfileMenuOpen(false); onNavigate('jobs'); }}
                      className="w-full px-4 py-2 text-left text-sm text-[#20263A] dark:text-slate-200 hover:bg-[#F8F9FC] dark:hover:bg-slate-800 flex items-center gap-2.5"
                    >
                      <Briefcase className="w-4 h-4 text-[#35B8A0]" />
                      Online Jobs Directory
                    </button>
                    <button
                      onClick={() => { setProfileMenuOpen(false); onNavigate('freelance'); }}
                      className="w-full px-4 py-2 text-left text-sm text-[#20263A] dark:text-slate-200 hover:bg-[#F8F9FC] dark:hover:bg-slate-800 flex items-center gap-2.5"
                    >
                      <Sparkles className="w-4 h-4 text-[#7057D9]" />
                      Freelance Gig Hub
                    </button>
                    <button
                      onClick={() => { setProfileMenuOpen(false); onNavigate('career'); }}
                      className="w-full px-4 py-2 text-left text-sm text-[#20263A] dark:text-slate-200 hover:bg-[#F8F9FC] dark:hover:bg-slate-800 flex items-center gap-2.5"
                    >
                      <Compass className="w-4 h-4 text-[#7057D9]" />
                      Career Roadmaps
                    </button>
                    <button
                      onClick={() => { setProfileMenuOpen(false); onNavigate('monitor'); }}
                      className="w-full px-4 py-2 text-left text-sm text-[#20263A] dark:text-slate-200 hover:bg-[#F8F9FC] dark:hover:bg-slate-800 flex items-center gap-2.5"
                    >
                      <Activity className="w-4 h-4 text-[#7057D9]" />
                      AI & Learning Monitor
                    </button>
                    <button
                      onClick={() => { setProfileMenuOpen(false); onNavigate('profile'); }}
                      className="w-full px-4 py-2 text-left text-sm text-[#20263A] dark:text-slate-200 hover:bg-[#F8F9FC] dark:hover:bg-slate-800 flex items-center gap-2.5"
                    >
                      <Award className="w-4 h-4 text-[#737B90]" />
                      Profile & Certificates
                    </button>
                    <button
                      onClick={() => { setProfileMenuOpen(false); onNavigate('settings'); }}
                      className="w-full px-4 py-2 text-left text-sm text-[#20263A] dark:text-slate-200 hover:bg-[#F8F9FC] dark:hover:bg-slate-800 flex items-center gap-2.5"
                    >
                      <SlidersHorizontal className="w-4 h-4 text-[#737B90]" />
                      Account Settings
                    </button>
                    <button
                      onClick={() => { setProfileMenuOpen(false); setShowDeploymentModal(true); }}
                      className="w-full px-4 py-2 text-left text-sm text-[#7057D9] dark:text-[#a89af0] font-semibold hover:bg-[#7057D9]/10 flex items-center gap-2.5 transition-colors"
                    >
                      <Rocket className="w-4 h-4 text-[#7057D9]" />
                      Deploy & Play Store Hub
                    </button>
                  </div>

                  {/* Role Switcher Preview (Student vs Admin Dashboard) */}
                  <div className="px-4 py-2 border-t border-[#E5E8F0] dark:border-slate-800">
                    <p className="text-[11px] font-semibold text-[#737B90] uppercase tracking-wider mb-1.5">
                      Role Preview
                    </p>
                    <div className="grid grid-cols-2 gap-1 p-0.5 bg-[#F8F9FC] dark:bg-slate-800 rounded-lg">
                      <button
                        onClick={() => switchRole('student')}
                        className={`text-xs py-1 px-2 rounded-md font-medium text-center transition-colors ${
                          user.role === 'student'
                            ? 'bg-white dark:bg-slate-700 text-[#14213D] dark:text-white shadow-sm'
                            : 'text-[#737B90] hover:text-[#14213D]'
                        }`}
                      >
                        Student
                      </button>
                      <button
                        onClick={() => {
                          switchRole('admin');
                          onNavigate('admin');
                          setProfileMenuOpen(false);
                        }}
                        className={`text-xs py-1 px-2 rounded-md font-medium text-center transition-colors ${
                          user.role === 'admin'
                            ? 'bg-[#7057D9] text-white shadow-sm'
                            : 'text-[#737B90] hover:text-[#7057D9]'
                        }`}
                      >
                        Admin
                      </button>
                    </div>
                  </div>

                  {/* Theme Toggle & Logout */}
                  <div className="pt-1 border-t border-[#E5E8F0] dark:border-slate-800">
                    <button
                      onClick={toggleDarkMode}
                      className="w-full px-4 py-2 text-left text-sm text-[#20263A] dark:text-slate-200 hover:bg-[#F8F9FC] dark:hover:bg-slate-800 flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2.5">
                        {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-[#737B90]" />}
                        {darkMode ? 'Light Theme' : 'Dark Theme'}
                      </span>
                    </button>
                    <button
                      onClick={() => { setProfileMenuOpen(false); logout(); }}
                      className="w-full px-4 py-2 text-left text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 flex items-center gap-2.5"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>

                  {/* Official Creator Credit */}
                  <div className="px-4 py-2 text-[10px] text-center text-[#737B90] dark:text-slate-400 border-t border-[#E5E8F0] dark:border-slate-800 bg-[#F8F9FC]/50 dark:bg-slate-900/40">
                    Created by Tayo Verse Studios
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Global Quick Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-xl bg-white dark:bg-[#14213D] rounded-2xl shadow-2xl border border-[#E5E8F0] dark:border-slate-800 p-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E8F0] dark:border-slate-800">
              <span className="text-sm font-semibold text-[#14213D] dark:text-white">What would you like to learn today?</span>
              <button
                onClick={() => setShowSearchModal(false)}
                className="text-xs text-[#737B90] hover:text-[#14213D] dark:hover:text-white px-2 py-1 rounded"
              >
                Close (ESC)
              </button>
            </div>
            <form onSubmit={handleSearchSubmit} className="mt-4">
              <div className="relative">
                <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-[#737B90]" />
                <input
                  type="text"
                  placeholder="Search AI, React, Figma, Data, Freelancing..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-11 pr-4 py-3 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-sm text-[#20263A] dark:text-white focus:outline-none focus:border-[#7057D9]"
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-[#737B90]">
                <span>Popular: Prompt Engineering, React, Upwork, Power BI</span>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#7057D9] text-white font-medium rounded-lg hover:bg-[#5f46c6] transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Deployment & Google Play Store Hub Modal */}
      <DeploymentModal
        isOpen={showDeploymentModal}
        onClose={() => setShowDeploymentModal(false)}
      />
    </>
  );
};
