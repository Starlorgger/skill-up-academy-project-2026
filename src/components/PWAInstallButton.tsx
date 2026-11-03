import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X, CheckCircle2, Apple, Play } from 'lucide-react';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'compact' | 'full' | 'banner';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ 
  className = '',
  variant = 'compact'
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [showPlayStoreModal, setShowPlayStoreModal] = useState(false);

  // If already running inside an installed PWA or TWA standalone container
  if (isInstalled) {
    return null;
  }

  // Handle Chrome / Android / Desktop 1-tap install
  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      setShowIOSModal(true);
    } else {
      setShowPlayStoreModal(true);
    }
  };

  if (variant === 'banner') {
    return (
      <>
        <div className={`p-4 bg-gradient-to-r from-[#14213D] via-[#1e2a4a] to-[#7057D9] text-white rounded-2xl border border-[#7057D9]/30 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${className}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5 text-[#35B8A0]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Install SkillUp Academy App
              </h4>
              <p className="text-xs text-slate-300">
                Learn offline, receive study streaks, and launch with 1 tap on Android & iOS.
              </p>
            </div>
          </div>

          <button
            onClick={handleInstallClick}
            className="w-full sm:w-auto px-4 py-2 bg-[#35B8A0] hover:bg-[#2fa38e] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install App</span>
          </button>
        </div>

        {/* Modal: iOS Instructions */}
        {showIOSModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="w-full max-w-sm bg-white dark:bg-[#14213D] rounded-3xl p-6 shadow-2xl border border-[#E5E8F0] dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Apple className="w-5 h-5 text-[#14213D] dark:text-white" />
                  <h3 className="font-bold text-sm text-[#14213D] dark:text-white">
                    Install on Apple iOS
                  </h3>
                </div>
                <button 
                  onClick={() => setShowIOSModal(false)}
                  className="p-1 rounded-lg text-[#737B90] hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2.5 text-xs text-[#20263A] dark:text-slate-300">
                <div className="p-3 bg-[#F8F9FC] dark:bg-slate-800/60 rounded-xl flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#7057D9] text-white flex items-center justify-center shrink-0 font-bold text-[10px]">1</span>
                  <span>Tap the <strong>Share</strong> button at the bottom of Safari (square with an up arrow).</span>
                </div>
                <div className="p-3 bg-[#F8F9FC] dark:bg-slate-800/60 rounded-xl flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#7057D9] text-white flex items-center justify-center shrink-0 font-bold text-[10px]">2</span>
                  <span>Scroll down and select <strong>Add to Home Screen</strong>.</span>
                </div>
                <div className="p-3 bg-[#F8F9FC] dark:bg-slate-800/60 rounded-xl flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#35B8A0] text-white flex items-center justify-center shrink-0 font-bold text-[10px]">3</span>
                  <span>Tap <strong>Add</strong> in the top right to install SkillUp Academy as a standalone native app!</span>
                </div>
              </div>

              <button
                onClick={() => setShowIOSModal(false)}
                className="w-full py-2.5 bg-[#7057D9] hover:bg-[#5f46c6] text-white font-bold text-xs rounded-xl transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        )}

        {/* Modal: Google Play / Android PWA */}
        {showPlayStoreModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="w-full max-w-md bg-white dark:bg-[#14213D] rounded-3xl p-6 shadow-2xl border border-[#E5E8F0] dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Play className="w-5 h-5 text-[#35B8A0]" />
                  <h3 className="font-bold text-sm text-[#14213D] dark:text-white">
                    Install & Google Play Store Ready
                  </h3>
                </div>
                <button 
                  onClick={() => setShowPlayStoreModal(false)}
                  className="p-1 rounded-lg text-[#737B90] hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-[#737B90] dark:text-slate-300">
                <p>
                  SkillUp Academy is fully configured as an installable <strong>Progressive Web App (PWA)</strong> and <strong>Trusted Web Activity (TWA)</strong> ready for Google Play publication.
                </p>
                <div className="p-3 bg-[#F8F9FC] dark:bg-slate-800/60 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-[#35B8A0] font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Instant Installation on Chrome / Android</span>
                  </div>
                  <p className="text-[11px]">
                    Tap your browser menu (⋮) and select <strong>Install app</strong> or <strong>Add to Home screen</strong>.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowPlayStoreModal(false)}
                className="w-full py-2.5 bg-[#7057D9] hover:bg-[#5f46c6] text-white font-bold text-xs rounded-xl transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Compact variant for Navbar header
  return (
    <>
      <button
        onClick={handleInstallClick}
        className={`px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#7057D9] to-[#8c74e8] hover:from-[#5f46c6] hover:to-[#7861d8] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 ${className}`}
        title="Install SkillUp Academy App on your device"
      >
        <Download className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Install App</span>
        <span className="sm:hidden">Install</span>
      </button>

      {/* Modal: iOS Instructions */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-white dark:bg-[#14213D] rounded-3xl p-6 shadow-2xl border border-[#E5E8F0] dark:border-slate-800 space-y-4 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Apple className="w-5 h-5 text-[#14213D] dark:text-white" />
                <h3 className="font-bold text-sm text-[#14213D] dark:text-white">
                  Install on Apple iOS
                </h3>
              </div>
              <button 
                onClick={() => setShowIOSModal(false)}
                className="p-1 rounded-lg text-[#737B90] hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-[#20263A] dark:text-slate-300">
              <p>To install SkillUp Academy on your iPhone or iPad:</p>
              <div className="p-3 bg-[#F8F9FC] dark:bg-slate-800/60 rounded-xl space-y-2">
                <p>1. Tap the <strong>Share</strong> button in Safari toolbar.</p>
                <p>2. Scroll down and tap <strong>Add to Home Screen</strong>.</p>
                <p>3. Tap <strong>Add</strong> to launch with zero browser address bar.</p>
              </div>
            </div>

            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2.5 bg-[#7057D9] hover:bg-[#5f46c6] text-white font-bold text-xs rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal: Google Play / Android PWA */}
      {showPlayStoreModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-[#14213D] rounded-3xl p-6 shadow-2xl border border-[#E5E8F0] dark:border-slate-800 space-y-4 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Play className="w-5 h-5 text-[#35B8A0]" />
                <h3 className="font-bold text-sm text-[#14213D] dark:text-white">
                  Install SkillUp Academy
                </h3>
              </div>
              <button 
                onClick={() => setShowPlayStoreModal(false)}
                className="p-1 rounded-lg text-[#737B90] hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#737B90] dark:text-slate-300">
              <p>
                SkillUp Academy is fully installable on Android, Windows, Mac, and Linux.
              </p>
              <div className="p-3 bg-[#F8F9FC] dark:bg-slate-800/60 rounded-xl space-y-1.5">
                <p className="font-semibold text-[#14213D] dark:text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#35B8A0]" />
                  <span>How to install:</span>
                </p>
                <p className="text-[11px]">
                  Click the install icon in your browser URL bar (desktop) or tap browser menu (⋮) &gt; <strong>Install app</strong> (Android).
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowPlayStoreModal(false)}
              className="w-full py-2.5 bg-[#7057D9] hover:bg-[#5f46c6] text-white font-bold text-xs rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
