import React from 'react';
import { Sparkles, Globe, Shield, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white dark:bg-[#14213D] border-t border-[#E5E8F0] dark:border-slate-800 text-[#737B90] dark:text-slate-400 text-sm mt-20 transition-colors pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 pr-0 md:pr-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#14213D] to-[#7057D9] flex items-center justify-center text-white shadow-sm">
                <Sparkles className="w-4 h-4 text-[#35B8A0]" />
              </div>
              <span className="font-extrabold text-lg text-[#14213D] dark:text-white tracking-tight">
                SkillUp<span className="text-[#7057D9]">.</span>Academy
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#737B90] dark:text-slate-400 mb-2 max-w-sm">
              Empowering learners and builders across Nigeria and internationally with practical digital skills, structured roadmaps, real-world portfolio projects, and AI mentorship.
            </p>
            <p className="text-xs font-semibold text-[#7057D9] dark:text-[#a89af0] mb-4">
              Created by Tayo Verse Studios
            </p>
            <div className="flex items-center gap-3 text-xs text-[#737B90]">
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[#35B8A0]" />
                Nigeria & Global
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-[#7057D9]" />
                Verified Certificates
              </span>
            </div>
          </div>

          {/* Quick Learning Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#14213D] dark:text-white mb-3">
              Learn & Build
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('explore')} className="hover:text-[#7057D9] transition-colors">
                  Explore Courses
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('categories')} className="hover:text-[#7057D9] transition-colors">
                  15 Skill Domains
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('paths')} className="hover:text-[#7057D9] transition-colors">
                  Guided Learning Paths
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-[#7057D9] transition-colors">
                  Hands-on Projects & Portfolios
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('mylearning')} className="hover:text-[#7057D9] transition-colors">
                  Student Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Opportunities & Work */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#14213D] dark:text-white mb-3">
              Work & Careers
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('jobs')} className="hover:text-[#7057D9] transition-colors font-semibold text-[#35B8A0]">
                  Online Jobs Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('freelance')} className="hover:text-[#7057D9] transition-colors font-semibold text-[#7057D9] dark:text-[#a89af0]">
                  Freelance Opportunities
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('career')} className="hover:text-[#7057D9] transition-colors">
                  Career Roadmaps & Salaries
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('monitor')} className="hover:text-[#7057D9] transition-colors">
                  AI & Learning Monitor
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pricing')} className="hover:text-[#7057D9] transition-colors">
                  Membership & Pricing
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#14213D] dark:text-white mb-3">
              Support & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#7057D9] transition-colors">
                  About SkillUp Academy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('help')} className="hover:text-[#7057D9] transition-colors">
                  Help & Contact Support
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-[#7057D9] transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-[#7057D9] transition-colors">
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#E5E8F0] dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-[#737B90] dark:text-slate-500 gap-4">
          <p>© 2026 SkillUp Academy · Created by Tayo Verse Studios</p>
          <p className="flex items-center gap-1.5">
            Designed with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for ambitious digital learners worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};
