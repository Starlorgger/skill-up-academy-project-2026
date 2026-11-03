import React from 'react';
import { WifiOff, CheckCircle2 } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:right-auto md:max-w-md z-50 animate-in slide-in-from-bottom duration-300 pointer-events-auto">
      <div className="flex items-center gap-3 px-4 py-3 bg-[#14213D] text-white rounded-2xl shadow-2xl border border-amber-500/40 backdrop-blur-md">
        <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
          <WifiOff className="w-4 h-4 animate-pulse" />
        </div>
        <div className="text-xs flex-1">
          <div className="font-bold flex items-center gap-1.5 text-amber-300">
            <span>Offline Mode Active</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          </div>
          <p className="text-slate-300 text-[11px] mt-0.5 leading-tight">
            Workbox service worker is serving cached courses and static assets without internet.
          </p>
        </div>
      </div>
    </div>
  );
};
