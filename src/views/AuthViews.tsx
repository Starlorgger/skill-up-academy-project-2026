import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Check, ArrowRight, ShieldCheck, Mail, Lock, User as UserIcon } from 'lucide-react';

interface AuthViewProps {
  onNavigate: (view: string) => void;
}

// -----------------------------------------------------------------------------
// 1. LOGIN VIEW
// -----------------------------------------------------------------------------
export const LoginView: React.FC<AuthViewProps> = ({ onNavigate }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('chidi.amadi@example.com');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    onNavigate('home');
  };

  return (
    <div className="py-12 max-w-md mx-auto">
      <div className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 p-8 shadow-md space-y-6">
        <div className="text-center space-y-1">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#14213D] to-[#7057D9] flex items-center justify-center text-white mx-auto mb-3">
            <Sparkles className="w-5 h-5 text-[#35B8A0]" />
          </div>
          <h2 className="text-xl font-bold text-[#14213D] dark:text-white">Welcome back to SkillUp</h2>
          <p className="text-xs text-[#737B90]">Continue your digital skills journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#737B90] mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#737B90]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-xs sm:text-sm text-[#20263A] dark:text-white focus:outline-none focus:border-[#7057D9]"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-medium text-[#737B90]">Password</label>
              <button
                type="button"
                onClick={() => onNavigate('forgot-password')}
                className="text-[11px] text-[#7057D9] hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-[#737B90]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-xs sm:text-sm text-[#20263A] dark:text-white focus:outline-none focus:border-[#7057D9]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#7057D9] hover:bg-[#5f46c6] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors shadow-xs"
          >
            Sign In
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-[#737B90]">
          <span>Don't have an account? </span>
          <button
            onClick={() => onNavigate('register')}
            className="font-bold text-[#7057D9] hover:underline"
          >
            Create free account
          </button>
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// 2. REGISTRATION VIEW (With Smooth Onboarding)
// -----------------------------------------------------------------------------
export const RegistrationView: React.FC<AuthViewProps> = ({ onNavigate }) => {
  const { login, updateUser } = useAuth();
  const [step, setStep] = useState<1 | 2>(1);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Artificial Intelligence', 'Full-Stack Web']);
  const [experienceLevel, setExperienceLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  const allInterests = [
    'Artificial Intelligence',
    'Full-Stack Web',
    'Mobile Apps',
    'Figma UI/UX',
    'Data Analytics',
    'Freelancing & Upwork',
    'Video Editing & Reels',
    'E-commerce & Stores'
  ];

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      setStep(2);
    }
  };

  const handleCompleteRegistration = () => {
    login(email, name);
    updateUser({
      interests: selectedInterests,
      experienceLevel
    });
    onNavigate('home');
  };

  return (
    <div className="py-12 max-w-lg mx-auto">
      <div className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 p-8 shadow-md space-y-6">
        <div className="text-center space-y-1">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#14213D] to-[#7057D9] flex items-center justify-center text-white mx-auto mb-3">
            <Sparkles className="w-5 h-5 text-[#35B8A0]" />
          </div>
          <h2 className="text-xl font-bold text-[#14213D] dark:text-white">
            {step === 1 ? 'Start Your SkillUp Journey' : 'Personalize Your Curriculum'}
          </h2>
          <p className="text-xs text-[#737B90]">
            {step === 1 ? 'Free access to foundational courses. No credit card required.' : 'Step 2: Choose your learning goals'}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleStep1} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#737B90] mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-3 w-4 h-4 text-[#737B90]" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Amina Bello"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-xs sm:text-sm text-[#20263A] dark:text-white focus:outline-none focus:border-[#7057D9]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#737B90] mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#737B90]" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-xs sm:text-sm text-[#20263A] dark:text-white focus:outline-none focus:border-[#7057D9]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#737B90] mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-[#737B90]" />
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-xs sm:text-sm text-[#20263A] dark:text-white focus:outline-none focus:border-[#7057D9]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#7057D9] hover:bg-[#5f46c6] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Continue to Interests</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* Step 2: Smooth Onboarding Choices */
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-[#14213D] dark:text-white mb-2">
                What are your main learning interests?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {allInterests.map((interest) => {
                  const isChecked = selectedInterests.includes(interest);
                  return (
                    <button
                      type="button"
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`p-2.5 rounded-xl text-xs font-medium text-left border transition-all flex items-center justify-between ${
                        isChecked
                          ? 'border-[#7057D9] bg-[#7057D9]/10 text-[#7057D9] dark:text-[#a89af0]'
                          : 'border-[#E5E8F0] dark:border-slate-700 bg-[#F8F9FC] dark:bg-slate-800 text-[#20263A] dark:text-slate-300'
                      }`}
                    >
                      <span className="truncate">{interest}</span>
                      {isChecked && <Check className="w-3.5 h-3.5 text-[#7057D9] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#14213D] dark:text-white mb-2">
                What is your current experience level?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['beginner', 'intermediate', 'advanced'] as const).map((lvl) => (
                  <button
                    type="button"
                    key={lvl}
                    onClick={() => setExperienceLevel(lvl)}
                    className={`py-2 rounded-xl text-xs font-semibold capitalize border transition-colors ${
                      experienceLevel === lvl
                        ? 'bg-[#14213D] text-white border-[#14213D] dark:bg-slate-700'
                        : 'border-[#E5E8F0] dark:border-slate-700 text-[#737B90]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleCompleteRegistration}
              className="w-full py-3 bg-[#7057D9] hover:bg-[#5f46c6] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors shadow-xs"
            >
              Finish & Start Learning
            </button>
          </div>
        )}

        <div className="pt-2 text-center text-xs text-[#737B90]">
          <span>Already have an account? </span>
          <button
            onClick={() => onNavigate('login')}
            className="font-bold text-[#7057D9] hover:underline"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// 3. PASSWORD RECOVERY VIEW
// -----------------------------------------------------------------------------
export const PasswordRecoveryView: React.FC<AuthViewProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSent(true);
  };

  return (
    <div className="py-12 max-w-md mx-auto">
      <div className="bg-white dark:bg-[#14213D] rounded-3xl border border-[#E5E8F0] dark:border-slate-800 p-8 shadow-md space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-[#14213D] dark:text-white">Recover Password</h2>
          <p className="text-xs text-[#737B90]">We will send you a secure password reset link</p>
        </div>

        {!sent ? (
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#737B90] mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8F9FC] dark:bg-slate-800 border border-[#E5E8F0] dark:border-slate-700 rounded-xl text-xs sm:text-sm text-[#20263A] dark:text-white focus:outline-none focus:border-[#7057D9]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#7057D9] text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-[#5f46c6] transition-colors"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="py-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#35B8A0]/10 text-[#35B8A0] flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <p className="text-xs text-[#20263A] dark:text-slate-200">
              Reset instructions sent to <strong>{email}</strong>. Check your inbox and spam folder.
            </p>
            <button
              onClick={() => onNavigate('login')}
              className="text-xs font-bold text-[#7057D9] hover:underline"
            >
              Return to Login
            </button>
          </div>
        )}

        <div className="pt-2 text-center text-xs text-[#737B90]">
          <button onClick={() => onNavigate('login')} className="hover:underline">
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
};
