import React from 'react';
import { Home, Compass, Briefcase, BookOpen, User as UserIcon } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

interface MobileBottomNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Courses', icon: Compass },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'mylearning', label: 'Learning', icon: BookOpen },
    { id: 'profile', label: 'Profile', icon: UserIcon }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#14213D]/95 backdrop-blur-md border-t border-[#E5E8F0] dark:border-slate-800 safe-bottom">
      <div className="grid grid-cols-5 h-16 items-center px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                triggerHaptic.selectionChanged();
                onNavigate(item.id);
              }}
              className="flex flex-col items-center justify-center min-h-[44px] min-w-[44px] py-1 text-center transition-colors focus:outline-none"
              aria-label={item.label}
            >
              <Icon
                className={`w-5 h-5 transition-transform ${
                  isActive
                    ? 'text-[#7057D9] dark:text-[#a89af0] scale-110'
                    : 'text-[#737B90] dark:text-slate-400'
                }`}
              />
              <span
                className={`text-[10px] font-medium tracking-tight mt-1 truncate ${
                  isActive
                    ? 'text-[#7057D9] dark:text-[#a89af0] font-semibold'
                    : 'text-[#737B90] dark:text-slate-400'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
