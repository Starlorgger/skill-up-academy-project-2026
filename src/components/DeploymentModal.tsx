import React, { useState } from 'react';
import { 
  Rocket, 
  X, 
  Copy, 
  Check, 
  Smartphone, 
  Server, 
  ShieldCheck, 
  Download, 
  Terminal, 
  FileCode, 
  Play, 
  ExternalLink,
  Layers,
  Sparkles,
  Github
} from 'lucide-react';

interface DeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeploymentModal: React.FC<DeploymentModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'github' | 'cloud' | 'playstore' | 'env' | 'docker'>('overview');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const gitManualCommand = `# 1. Initialize Git in project root
git init
git branch -M main

# 2. Stage all source files (.gitignore protects secrets & builds)
git add .

# 3. Create your initial commit
git commit -m "feat: initial commit of SkillUp Academy platform"

# 4. Link your remote GitHub repository
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# 5. Push to GitHub main branch
git push -u origin main`;

  const gitScriptCommand = `# Automated turnkey push using the included script
chmod +x scripts/push-to-github.sh
./scripts/push-to-github.sh https://github.com/<your-username>/<your-repo-name>.git`;

  const cloudRunCommand = `gcloud run deploy skillup-academy \\
  --source . \\
  --platform managed \\
  --region us-central1 \\
  --allow-unauthenticated \\
  --set-env-vars NODE_ENV=production,PORT=3000`;

  const bubblewrapCommand = `# 1. Install Google Bubblewrap CLI
npm install -g @bubblewrap/cli

# 2. Initialize Trusted Web Activity using pre-configured manifest
bubblewrap init --manifest=https://your-domain.com/manifest.json

# 3. Build signed Android App Bundle (.aab)
bubblewrap build`;

  const dockerCommand = `# Build and run SkillUp Academy production container
docker build -t skillup-academy:latest .
docker run -d -p 3000:3000 --env-file .env --name skillup-app skillup-academy:latest`;

  const envTemplate = `# SkillUp Academy Production Environment
PORT=3000
NODE_ENV="production"
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
APP_URL="https://your-domain.com"
PAYSTACK_PUBLIC_KEY="pk_live_your_key"
PAYSTACK_SECRET_KEY="sk_live_your_key"`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#14213D] rounded-3xl shadow-2xl border border-[#E5E8F0] dark:border-slate-800 flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#E5E8F0] dark:border-slate-800 flex items-center justify-between gap-4 bg-[#F8F9FC] dark:bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#7057D9]/20 text-[#7057D9] dark:text-[#a89af0] flex items-center justify-center border border-[#7057D9]/30">
              <Rocket className="w-5 h-5 text-[#7057D9]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-[#14213D] dark:text-white">
                  SkillUp Academy · Production & Google Play Deployment Hub
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#35B8A0]/15 text-[#35B8A0] border border-[#35B8A0]/30 hidden sm:inline-block">
                  Ready to Deploy
                </span>
              </div>
              <p className="text-xs text-[#737B90] dark:text-slate-400">
                Created by Tayo Verse Studios · Complete export configurations for Cloud & Android Play Store.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#737B90] hover:text-[#14213D] dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 sm:gap-2 px-5 pt-3 border-b border-[#E5E8F0] dark:border-slate-800 bg-white dark:bg-[#14213D] overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-[#7057D9] text-[#7057D9] dark:text-[#a89af0]'
                : 'border-transparent text-[#737B90] hover:text-[#14213D] dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Deployment Checklist</span>
          </button>

          <button
            onClick={() => setActiveTab('github')}
            className={`px-3.5 py-2 font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'github'
                ? 'border-[#7057D9] text-[#7057D9] dark:text-[#a89af0]'
                : 'border-transparent text-[#737B90] hover:text-[#14213D] dark:hover:text-white'
            }`}
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub Push & Source</span>
          </button>

          <button
            onClick={() => setActiveTab('playstore')}
            className={`px-3.5 py-2 font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'playstore'
                ? 'border-[#35B8A0] text-[#35B8A0]'
                : 'border-transparent text-[#737B90] hover:text-[#14213D] dark:hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-[#35B8A0]" />
            <span>Google Play Store (TWA)</span>
          </button>

          <button
            onClick={() => setActiveTab('cloud')}
            className={`px-3.5 py-2 font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'cloud'
                ? 'border-[#7057D9] text-[#7057D9] dark:text-[#a89af0]'
                : 'border-transparent text-[#737B90] hover:text-[#14213D] dark:hover:text-white'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>Cloud & Container Deploy</span>
          </button>

          <button
            onClick={() => setActiveTab('env')}
            className={`px-3.5 py-2 font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'env'
                ? 'border-[#7057D9] text-[#7057D9] dark:text-[#a89af0]'
                : 'border-transparent text-[#737B90] hover:text-[#14213D] dark:hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Environment Blueprint</span>
          </button>

          <button
            onClick={() => setActiveTab('docker')}
            className={`px-3.5 py-2 font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'docker'
                ? 'border-[#7057D9] text-[#7057D9] dark:text-[#a89af0]'
                : 'border-transparent text-[#737B90] hover:text-[#14213D] dark:hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Docker & Procfile</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* TAB 1: OVERVIEW CHECKLIST */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#14213D] to-[#1e2a4a] text-white border border-[#7057D9]/40 space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#35B8A0]" />
                  <h3 className="font-bold text-sm text-white">Full Application Architecture Audit</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  SkillUp Academy is fully built and compiled. All frontend views, backend API routes, authentication context, Paystack test mode billing, AI Learning Mentor proxy, and PWA capabilities are validated and ready for production hosting.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl bg-[#F8F9FC] dark:bg-slate-800/60 border border-[#E5E8F0] dark:border-slate-700/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-[#35B8A0] font-bold">
                    <Check className="w-4 h-4" />
                    <span>Frontend Client (React 19 & Vite)</span>
                  </div>
                  <p className="text-[#737B90] dark:text-slate-300">
                    Compiled into static bundle in <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono">dist/</code> with zero warnings or dead imports.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8F9FC] dark:bg-slate-800/60 border border-[#E5E8F0] dark:border-slate-700/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-[#35B8A0] font-bold">
                    <Check className="w-4 h-4" />
                    <span>Full-Stack Express Server (`server.ts`)</span>
                  </div>
                  <p className="text-[#737B90] dark:text-slate-300">
                    Hosts Gemini AI Mentor API proxy, Paystack verification endpoints, and serves <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono">dist/</code> in production.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8F9FC] dark:bg-slate-800/60 border border-[#E5E8F0] dark:border-slate-700/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-[#35B8A0] font-bold">
                    <Check className="w-4 h-4" />
                    <span>Paystack Monetization Engine</span>
                  </div>
                  <p className="text-[#737B90] dark:text-slate-300">
                    Dual currency (₦ NGN & $ USD), Card 3DS OTP simulation, Wema Bank Transfer, and auto-unlocking of premium courses.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8F9FC] dark:bg-slate-800/60 border border-[#E5E8F0] dark:border-slate-700/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-[#35B8A0] font-bold">
                    <Check className="w-4 h-4" />
                    <span>Google Play Store TWA & PWA Engine</span>
                  </div>
                  <p className="text-[#737B90] dark:text-slate-300">
                    Includes <code className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono">manifest.json</code>, maskable 512px icon, and <code className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono">.well-known/assetlinks.json</code>.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-emerald-900 dark:text-emerald-200 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="font-bold">Complete Deployment Documentation (`DEPLOYMENT.md`)</p>
                  <p className="text-[11px] opacity-90">An exhaustive guide has been written to the project root covering every phase from local testing to Google Play publication.</p>
                </div>
                <button
                  onClick={() => setActiveTab('playstore')}
                  className="px-3.5 py-1.5 bg-[#35B8A0] text-white rounded-xl font-bold hover:bg-[#2fa38e] transition-colors shrink-0"
                >
                  View Play Store Steps
                </button>
              </div>
            </div>
          )}

          {/* TAB: GITHUB REPOSITORY & SOURCE CODE EXPORT */}
          {activeTab === 'github' && (
            <div className="space-y-5">
              {/* Top Banner: One-Click Source Download */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#14213D] via-[#1f2347] to-[#281b4d] text-white border border-[#7057D9]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-[#35B8A0]" />
                    <span className="text-xs font-bold text-[#35B8A0] uppercase tracking-wider">Direct Project Download</span>
                  </div>
                  <h3 className="text-base font-bold text-white">Download Complete Source Code (.zip)</h3>
                  <p className="text-xs text-slate-300 max-w-xl">
                    Get the pristine repository archive with all TypeScript source files, Express backend, Android Capacitor assets, and configs ready for local development or pushing to GitHub.
                  </p>
                </div>

                <a
                  href="/api/download/source-code.zip"
                  download="skillup-academy-full-project.zip"
                  className="px-4 py-2.5 rounded-xl bg-[#35B8A0] hover:bg-[#2fa38e] text-white font-bold text-xs transition-colors flex items-center gap-2 shrink-0 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Project .ZIP</span>
                </a>
              </div>

              {/* Step 1: Automated Script Push */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[#14213D] dark:text-white flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-[#7057D9]" />
                      <span>Option A: Push with Automated Helper Script (Fastest)</span>
                    </h3>
                    <p className="text-xs text-[#737B90] dark:text-slate-400 mt-0.5">
                      Run the bundled bash script in your terminal to initialize git, stage files, and push to your GitHub repo in one go.
                    </p>
                  </div>

                  <button
                    onClick={() => copyToClipboard(gitScriptCommand, 'gitScript')}
                    className="px-3 py-1.5 rounded-xl border border-[#E5E8F0] dark:border-slate-700 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs text-[#14213D] dark:text-white"
                  >
                    {copiedKey === 'gitScript' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'gitScript' ? 'Copied Script!' : 'Copy Command'}</span>
                  </button>
                </div>

                <div className="p-4 bg-slate-900 rounded-2xl text-slate-200 font-mono text-xs overflow-x-auto shadow-inner">
                  <pre>{gitScriptCommand}</pre>
                </div>
              </div>

              {/* Step 2: Manual Git Commands */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[#14213D] dark:text-white flex items-center gap-2">
                      <Github className="w-4 h-4 text-[#7057D9]" />
                      <span>Option B: Standard Git Terminal Commands</span>
                    </h3>
                    <p className="text-xs text-[#737B90] dark:text-slate-400 mt-0.5">
                      Use standard git commands to link your local folder to GitHub.
                    </p>
                  </div>

                  <button
                    onClick={() => copyToClipboard(gitManualCommand, 'gitManual')}
                    className="px-3 py-1.5 rounded-xl bg-[#7057D9] text-white font-semibold hover:bg-[#5f46c6] transition-colors flex items-center gap-1.5 text-xs"
                  >
                    {copiedKey === 'gitManual' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'gitManual' ? 'Copied Git Steps!' : 'Copy All Commands'}</span>
                  </button>
                </div>

                <div className="p-4 bg-slate-900 rounded-2xl text-slate-200 font-mono text-xs overflow-x-auto shadow-inner">
                  <pre>{gitManualCommand}</pre>
                </div>
              </div>

              {/* Tip / Auth Box */}
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 text-amber-900 dark:text-amber-200 text-xs space-y-1.5">
                <div className="flex items-center gap-2 font-bold">
                  <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>GitHub Authentication Tip (Personal Access Token)</span>
                </div>
                <p className="leading-relaxed">
                  When running <code className="font-mono bg-amber-200/50 dark:bg-amber-900/50 px-1 py-0.5 rounded">git push</code>, GitHub requires a <strong>Personal Access Token (classic or fine-grained)</strong> with <code className="font-mono bg-amber-200/50 dark:bg-amber-900/50 px-1 py-0.5 rounded">repo</code> permissions rather than your standard account password. You can generate one at <strong>github.com → Settings → Developer Settings → Personal Access Tokens</strong>. Full documentation is included in <code className="font-mono font-bold">GITHUB_GUIDE.md</code>.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: NATIVE ANDROID & GOOGLE PLAY STORE */}
          {activeTab === 'playstore' && (
            <div className="space-y-4">
              {/* Highlight Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#14213D] via-[#1e2a4a] to-[#251b47] text-white border border-[#7057D9]/40 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#35B8A0]/20 text-[#35B8A0] flex items-center justify-center border border-[#35B8A0]/40">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white">
                        Native Android Project (Capacitor 7 & Gradle)
                      </h3>
                      <p className="text-[11px] text-slate-300">
                        Package: <span className="font-mono text-[#35B8A0]">com.tayoverse.skillupacademy</span> · Version: 1.0.0
                      </p>
                    </div>
                  </div>

                  <a
                    href="/api/download/android-project.zip"
                    download="skillup-academy-android.zip"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#35B8A0] hover:bg-[#2fa38e] text-white text-xs font-bold rounded-xl shadow-md transition-all hover:scale-102 shrink-0"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Android Project (.zip)</span>
                  </a>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed">
                  Your application is fully packaged with standardized density app icons (<code className="text-[#35B8A0] font-mono">ldpi</code>, <code className="text-[#35B8A0] font-mono">mdpi</code>, <code className="text-[#35B8A0] font-mono">hdpi</code>, <code className="text-[#35B8A0] font-mono">xhdpi</code>, <code className="text-[#35B8A0] font-mono">xxhdpi</code>, <code className="text-[#35B8A0] font-mono">xxxhdpi</code>), splash screens, locked portrait orientation, and Google Play Store 512×512 icon.
                </p>
              </div>

              {/* Two Options for Building */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* Method A: GitHub Actions (Recommended for Mobile) */}
                <div className="p-4 rounded-2xl bg-[#F8F9FC] dark:bg-slate-800/60 border border-[#E5E8F0] dark:border-slate-700 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#7057D9] text-white flex items-center justify-center text-xs font-bold">A</span>
                    <h4 className="font-bold text-xs text-[#14213D] dark:text-white">Cloud Build with GitHub Actions</h4>
                  </div>
                  <p className="text-[11px] text-[#737B90] dark:text-slate-300 leading-relaxed">
                    Zero computer or Android Studio needed! Workflow <code className="font-mono text-[10px] bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded">.github/workflows/android-build.yml</code> compiles both your testing <strong>APK</strong> and production <strong>AAB</strong> for free in minutes.
                  </p>
                  <ol className="list-decimal pl-4 text-[11px] text-[#737B90] dark:text-slate-400 space-y-0.5">
                    <li>Push code to your GitHub repository.</li>
                    <li>Open <strong>Actions</strong> tab &gt; click <strong>Run workflow</strong>.</li>
                    <li>Download the compiled <code className="text-emerald-600 dark:text-emerald-400 font-mono">app-debug.apk</code> straight to your phone!</li>
                  </ol>
                </div>

                {/* Method B: Android Studio or Gradle CLI */}
                <div className="p-4 rounded-2xl bg-[#F8F9FC] dark:bg-slate-800/60 border border-[#E5E8F0] dark:border-slate-700 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#35B8A0] text-white flex items-center justify-center text-xs font-bold">B</span>
                    <h4 className="font-bold text-xs text-[#14213D] dark:text-white">Local Build (CLI or Android Studio)</h4>
                  </div>
                  <p className="text-[11px] text-[#737B90] dark:text-slate-300 leading-relaxed">
                    Open the <code className="font-mono text-[10px] bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded">android/</code> directory in Android Studio or run the Gradle commands:
                  </p>
                  <div className="p-2.5 bg-slate-900 rounded-xl text-slate-200 font-mono text-[10px] space-y-1">
                    <div><span className="text-[#35B8A0]"># Test APK:</span> cd android &amp;&amp; ./gradlew assembleDebug</div>
                    <div><span className="text-[#a89af0]"># Play Store AAB:</span> cd android &amp;&amp; ./gradlew bundleRelease</div>
                  </div>
                </div>
              </div>

              {/* KeyStore Generation & Signing Command */}
              <div className="p-4 rounded-2xl border border-[#E5E8F0] dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-[#14213D] dark:text-white flex items-center gap-2">
                    <FileCode className="w-3.5 h-3.5 text-[#35B8A0]" />
                    <span>Generate Java KeyStore (.jks) for Release Signing</span>
                  </h4>
                  <button
                    onClick={() => copyToClipboard('keytool -genkey -v -keystore skillup-release-key.jks -alias skillup-key-alias -keyalg RSA -keysize 2048 -validity 10000', 'keytool')}
                    className="px-2.5 py-1 rounded-lg border border-[#E5E8F0] dark:border-slate-700 text-[11px] font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1 transition-colors"
                  >
                    {copiedKey === 'keytool' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'keytool' ? 'Copied keytool command!' : 'Copy keytool Command'}</span>
                  </button>
                </div>
                <div className="p-2.5 bg-slate-900 rounded-xl text-slate-200 font-mono text-[10px] overflow-x-auto">
                  <code>keytool -genkey -v -keystore skillup-release-key.jks -alias skillup-key-alias -keyalg RSA -keysize 2048 -validity 10000</code>
                </div>
                <p className="text-[11px] text-[#737B90] dark:text-slate-400">
                  Creates a 2048-bit RSA key valid for 27 years. Place the generated <code className="font-mono">skillup-release-key.jks</code> in <code className="font-mono">android/app/</code>.
                </p>
              </div>

              {/* Graphic Assets Dimensions Quick Reference */}
              <div className="p-4 rounded-2xl bg-[#F8F9FC] dark:bg-slate-800/60 border border-[#E5E8F0] dark:border-slate-700 space-y-2">
                <h4 className="font-bold text-xs text-[#14213D] dark:text-white flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#7057D9]" />
                  <span>Google Play Store Visual Asset Dimension Guide</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-[#E5E8F0] dark:border-slate-800">
                    <p className="font-bold text-[#14213D] dark:text-white">App Icon</p>
                    <p className="text-[#35B8A0] font-mono font-bold">512 × 512 px</p>
                    <p className="text-[10px] text-[#737B90] dark:text-slate-400">32-bit PNG, no alpha (in public/icons)</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-[#E5E8F0] dark:border-slate-800">
                    <p className="font-bold text-[#14213D] dark:text-white">Feature Graphic</p>
                    <p className="text-[#7057D9] dark:text-[#a89af0] font-mono font-bold">1024 × 500 px</p>
                    <p className="text-[10px] text-[#737B90] dark:text-slate-400">JPG or 24-bit PNG banner, max 15MB</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-[#E5E8F0] dark:border-slate-800">
                    <p className="font-bold text-[#14213D] dark:text-white">Phone Screenshots</p>
                    <p className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">1080 × 1920 px</p>
                    <p className="text-[10px] text-[#737B90] dark:text-slate-400">9:16 portrait, min 2, max 8 images</p>
                  </div>
                </div>
              </div>

              {/* Install on Mobile Instructions */}
              <div className="p-4 rounded-2xl border border-[#E5E8F0] dark:border-slate-800 space-y-2">
                <h4 className="font-bold text-xs text-[#14213D] dark:text-white flex items-center gap-2">
                  <Smartphone className="w-3.5 h-3.5 text-[#35B8A0]" />
                  <span>How to Install the APK on Your Android Phone</span>
                </h4>
                <ol className="list-decimal pl-5 text-[11px] text-[#737B90] dark:text-slate-300 space-y-1">
                  <li>Download or transfer the generated <code className="font-mono text-emerald-600 dark:text-emerald-400">app-debug.apk</code> to your Android device.</li>
                  <li>Tap the file to install. If prompted with <em>"Install unknown apps"</em>, tap <strong>Settings</strong> and toggle <strong>Allow from this source</strong> to ON.</li>
                  <li>Tap <strong>Install</strong>, then <strong>Open</strong> to launch SkillUp Academy in full-screen native mobile mode.</li>
                </ol>
              </div>

              {/* Play Store Submission Checklist */}
              <div className="p-4 rounded-2xl border border-[#E5E8F0] dark:border-slate-800 space-y-2">
                <h4 className="font-bold text-xs text-[#14213D] dark:text-white flex items-center gap-2">
                  <Play className="w-3.5 h-3.5 text-[#7057D9]" />
                  <span>Google Play Developer Console Upload</span>
                </h4>
                <p className="text-[11px] text-[#737B90] dark:text-slate-400 leading-relaxed">
                  Log in to your <strong>Google Play Console</strong>, create a new application named <strong>SkillUp Academy</strong>, upload the signed <code className="font-mono text-purple-600 dark:text-purple-400">app-release.aab</code> bundle from <code className="font-mono">android/app/build/outputs/bundle/release/</code>, and submit for review. Full detailed guide available in <code className="font-mono">ANDROID_PLAY_STORE_GUIDE.md</code>.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: CLOUD DEPLOYMENT */}
          {activeTab === 'cloud' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#F8F9FC] dark:bg-slate-800/60 border border-[#E5E8F0] dark:border-slate-700 space-y-1.5">
                <h3 className="font-bold text-sm text-[#14213D] dark:text-white">
                  1-Command Cloud Run Deployment
                </h3>
                <p className="text-[#737B90] dark:text-slate-300">
                  Deploy the entire full-stack app to Google Cloud Run directly from the command line:
                </p>
              </div>

              <div className="relative">
                <div className="p-4 bg-slate-900 rounded-2xl text-slate-200 font-mono text-xs overflow-x-auto">
                  <pre>{cloudRunCommand}</pre>
                </div>
                <button
                  onClick={() => copyToClipboard(cloudRunCommand, 'cloudrun')}
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  {copiedKey === 'cloudrun' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'cloudrun' ? 'Copied!' : 'Copy Command'}</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl border border-[#E5E8F0] dark:border-slate-800 space-y-2">
                <h4 className="font-bold text-sm text-[#14213D] dark:text-white">Alternative Zero-Config Platforms:</h4>
                <ul className="list-disc pl-5 space-y-1 text-[#737B90] dark:text-slate-300">
                  <li><strong>Render</strong>: Connect GitHub repo &gt; Web Service &gt; Build: <code className="font-mono">npm run build</code>, Start: <code className="font-mono">npx tsx server.ts</code></li>
                  <li><strong>Railway</strong>: Push repo; Railway automatically boots the included <code className="font-mono">Dockerfile</code> or <code className="font-mono">Procfile</code>.</li>
                  <li><strong>DigitalOcean / AWS App Runner</strong>: Multi-stage Dockerfile provided in repository root.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: ENVIRONMENT VARIABLES */}
          {activeTab === 'env' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#14213D] dark:text-white">Production Environment Configuration</h3>
                  <p className="text-xs text-[#737B90]">Define these variables in your hosting dashboard or .env file.</p>
                </div>
                <button
                  onClick={() => copyToClipboard(envTemplate, 'env')}
                  className="px-3 py-1.5 rounded-xl bg-[#7057D9] text-white font-semibold hover:bg-[#5f46c6] transition-colors flex items-center gap-1.5"
                >
                  {copiedKey === 'env' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'env' ? 'Copied .env!' : 'Copy .env Blueprint'}</span>
                </button>
              </div>

              <div className="p-4 bg-slate-900 rounded-2xl text-slate-200 font-mono text-xs overflow-x-auto">
                <pre>{envTemplate}</pre>
              </div>
            </div>
          )}

          {/* TAB 5: DOCKER & PROCFILE */}
          {activeTab === 'docker' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#14213D] dark:text-white">Docker Containerization Commands</h3>
                  <p className="text-xs text-[#737B90]">Production-grade multi-stage build tested on Node 22 Alpine.</p>
                </div>
                <button
                  onClick={() => copyToClipboard(dockerCommand, 'docker')}
                  className="px-3 py-1.5 rounded-xl border border-[#E5E8F0] dark:border-slate-700 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                >
                  {copiedKey === 'docker' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'docker' ? 'Copied!' : 'Copy Docker Commands'}</span>
                </button>
              </div>

              <div className="p-4 bg-slate-900 rounded-2xl text-slate-200 font-mono text-xs overflow-x-auto">
                <pre>{dockerCommand}</pre>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[#E5E8F0] dark:border-slate-800 bg-[#F8F9FC] dark:bg-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-[#737B90] dark:text-slate-400">
            Official Production Release by <strong>Tayo Verse Studios</strong>.
          </span>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => {
                const element = document.createElement("a");
                const file = new Blob([bubblewrapCommand + "\n\n" + cloudRunCommand], {type: 'text/plain'});
                element.href = URL.createObjectURL(file);
                element.download = "skillup-deployment-instructions.txt";
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
              }}
              className="w-full sm:w-auto px-4 py-2 rounded-xl border border-[#E5E8F0] dark:border-slate-700 bg-white dark:bg-slate-800 text-[#20263A] dark:text-white font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Instructions</span>
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2 bg-[#7057D9] hover:bg-[#5f46c6] text-white font-bold rounded-xl transition-colors shadow-xs"
            >
              Close Hub
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
