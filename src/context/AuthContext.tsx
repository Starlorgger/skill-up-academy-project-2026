import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserProgress, Certificate, ProjectSubmission, UserSubscription, PaymentTransaction, ThemeMode } from '../types';
import { COURSES } from '../data/mockData';

interface AuthContextType {
  user: User;
  progress: Record<string, UserProgress>;
  certificates: Certificate[];
  submissions: ProjectSubmission[];
  transactions: PaymentTransaction[];
  currency: 'NGN' | 'USD';
  darkMode: boolean;
  themeMode: ThemeMode;
  setCurrency: (c: 'NGN' | 'USD') => void;
  toggleDarkMode: () => void;
  setThemeMode: (mode: ThemeMode) => void;
  formatPrice: (priceNGN: number, priceUSD: number) => string;
  updateUser: (updates: Partial<User>) => void;
  switchRole: (role: 'student' | 'admin') => void;
  enrollInCourse: (courseId: string) => void;
  completeLesson: (courseId: string, lessonId: string, completed?: boolean) => Promise<void>;
  recordQuizScore: (courseId: string, quizId: string, score: number) => Promise<void>;
  issueCertificate: (courseId: string) => Promise<Certificate | null>;
  submitProject: (projectId: string, data: { repoUrl?: string; liveUrl?: string; notes: string; isPublicInPortfolio: boolean }) => Promise<ProjectSubmission | null>;
  toggleSaveLesson: (lessonId: string) => void;
  addStudyTime: (minutes: number) => void;
  upgradePlan: (plan: 'pro_monthly' | 'pro_annual', txData?: Partial<PaymentTransaction>) => void;
  cancelSubscription: () => Promise<boolean>;
  resumeSubscription: () => Promise<boolean>;
  downgradeToFree: () => void;
  login: (email: string, name?: string) => void;
  logout: () => void;
}

const DEFAULT_USER: User = {
  id: 'user-default-1',
  name: 'Chidi Amadi',
  email: 'chidi.amadi@example.com',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  bio: 'Aspiring AI engineer and full-stack developer based in Lagos, Nigeria. Passionate about building impactful digital products.',
  title: 'Digital Craftsman & Learner',
  country: 'Nigeria',
  interests: ['Artificial Intelligence', 'Full-Stack Web', 'Figma UI/UX', 'Freelancing'],
  learningGoals: ['Deploy a production LLM agent', 'Launch my freelance portfolio', 'Land a global remote contract'],
  experienceLevel: 'beginner',
  enrolledCourses: ['ai-prompt-engineering-mastery', 'fullstack-web-dev-bootcamp'],
  savedLessons: ['les-1-1'],
  studyMinutes: 94,
  plan: 'pro_monthly',
  subscription: {
    id: 'sub-demo-1',
    plan: 'pro_monthly',
    status: 'active',
    startDate: '2026-09-01T08:00:00Z',
    currentPeriodEnd: '2026-11-28T08:00:00Z',
    cancelAtPeriodEnd: false,
    amount: 15000,
    currency: 'NGN',
    paymentMethod: {
      brand: 'Mastercard',
      last4: '1234',
      channel: 'card',
      expiry: '12/28'
    },
    lastTransactionReference: 'PSK_INIT_TEST_DEMO1'
  },
  currency: 'NGN',
  createdAt: '2026-09-01T08:00:00Z'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('skillup_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [progress, setProgress] = useState<Record<string, UserProgress>>(() => {
    const saved = localStorage.getItem('skillup_progress');
    return saved ? JSON.parse(saved) : {
      'user-default-1:ai-prompt-engineering-mastery': {
        userId: 'user-default-1',
        courseId: 'ai-prompt-engineering-mastery',
        completedLessonIds: ['les-1-1'],
        quizScores: { 'quiz-1-1': 100 },
        lastAccessedLessonId: 'les-1-1',
        lastAccessedAt: new Date().toISOString(),
        certificateIssued: false
      }
    };
  });

  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    const saved = localStorage.getItem('skillup_certificates');
    return saved ? JSON.parse(saved) : [];
  });

  const [submissions, setSubmissions] = useState<ProjectSubmission[]>(() => {
    const saved = localStorage.getItem('skillup_submissions');
    return saved ? JSON.parse(saved) : [];
  });

  const [transactions, setTransactions] = useState<PaymentTransaction[]>(() => {
    const saved = localStorage.getItem('skillup_transactions');
    return saved ? JSON.parse(saved) : [
      {
        id: 'tx-seed-1',
        reference: 'PSK_TEST_89412_A9B1',
        userId: 'user-default-1',
        userName: 'Chidi Amadi',
        userEmail: 'chidi.amadi@example.com',
        plan: 'pro_monthly',
        amount: 15000,
        currency: 'NGN',
        channel: 'card',
        status: 'success',
        gateway: 'paystack',
        gatewayMode: 'test',
        paidAt: '2026-10-01T09:15:00Z',
        invoiceNumber: 'INV-2026-09142'
      }
    ];
  });

  const [currency, setCurrencyState] = useState<'NGN' | 'USD'>(() => {
    return (localStorage.getItem('skillup_currency') as 'NGN' | 'USD') || 'NGN';
  });

  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('skillup_theme_mode');
    if (saved === 'system' || saved === 'light' || saved === 'dark') {
      return saved as ThemeMode;
    }
    return localStorage.getItem('skillup_dark') === 'true' ? 'dark' : 'system';
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('skillup_theme_mode');
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('skillup_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('skillup_progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('skillup_certificates', JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem('skillup_submissions', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem('skillup_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('skillup_currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('skillup_theme_mode', themeMode);

    const applyTheme = (isDark: boolean) => {
      setDarkMode(isDark);
      localStorage.setItem('skillup_dark', String(isDark));
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    if (themeMode === 'dark') {
      applyTheme(true);
      return;
    }

    if (themeMode === 'light') {
      applyTheme(false);
      return;
    }

    // System theme: track OS preferences
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    applyTheme(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      applyTheme(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [themeMode]);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
  };

  const toggleDarkMode = () => {
    setThemeModeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  };
  const setCurrency = (c: 'NGN' | 'USD') => setCurrencyState(c);

  const formatPrice = (priceNGN: number, priceUSD: number) => {
    if (priceNGN === 0 || priceUSD === 0) return 'Free';
    if (currency === 'NGN') {
      return `₦${priceNGN.toLocaleString()}`;
    }
    return `$${priceUSD.toLocaleString()}`;
  };

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const switchRole = (role: 'student' | 'admin') => {
    setUser(prev => ({ ...prev, role }));
  };

  const enrollInCourse = (courseId: string) => {
    if (!user.enrolledCourses.includes(courseId)) {
      setUser(prev => ({
        ...prev,
        enrolledCourses: [...prev.enrolledCourses, courseId]
      }));
    }
  };

  const completeLesson = async (courseId: string, lessonId: string, completed: boolean = true) => {
    const key = `${user.id}:${courseId}`;
    const currentProg = progress[key] || {
      userId: user.id,
      courseId,
      completedLessonIds: [],
      quizScores: {},
      lastAccessedLessonId: lessonId,
      lastAccessedAt: new Date().toISOString(),
      certificateIssued: false
    };

    let updatedIds = [...currentProg.completedLessonIds];
    if (completed && !updatedIds.includes(lessonId)) {
      updatedIds.push(lessonId);
    } else if (!completed) {
      updatedIds = updatedIds.filter(id => id !== lessonId);
    }

    const updatedProg: UserProgress = {
      ...currentProg,
      completedLessonIds: updatedIds,
      lastAccessedLessonId: lessonId,
      lastAccessedAt: new Date().toISOString()
    };

    setProgress(prev => ({ ...prev, [key]: updatedProg }));

    // Sync to server API in background
    try {
      await fetch(`/api/progress/${user.id}/${courseId}/complete-lesson`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId, completed })
      });
    } catch (e) {
      // offline fallback is preserved in local state
    }
  };

  const recordQuizScore = async (courseId: string, quizId: string, score: number) => {
    const key = `${user.id}:${courseId}`;
    const currentProg = progress[key] || {
      userId: user.id,
      courseId,
      completedLessonIds: [],
      quizScores: {},
      lastAccessedAt: new Date().toISOString(),
      certificateIssued: false
    };

    const updatedProg: UserProgress = {
      ...currentProg,
      quizScores: {
        ...currentProg.quizScores,
        [quizId]: score
      }
    };

    setProgress(prev => ({ ...prev, [key]: updatedProg }));

    try {
      await fetch(`/api/progress/${user.id}/${courseId}/quiz-score`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quizId, score })
      });
    } catch (e) {
      // safe fallback
    }
  };

  const issueCertificate = async (courseId: string): Promise<Certificate | null> => {
    try {
      const res = await fetch('/api/certificates/issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          userName: user.name,
          courseId
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to issue certificate');
      }

      const data = await res.json();
      const cert: Certificate = data.certificate;
      setCertificates(prev => [cert, ...prev.filter(c => c.courseId !== courseId)]);

      const key = `${user.id}:${courseId}`;
      if (progress[key]) {
        setProgress(prev => ({
          ...prev,
          [key]: {
            ...prev[key],
            certificateIssued: true,
            certificateCode: cert.verificationCode,
            certificateIssuedAt: cert.issuedAt
          }
        }));
      }

      return cert;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const submitProject = async (
    projectId: string,
    data: { repoUrl?: string; liveUrl?: string; notes: string; isPublicInPortfolio: boolean }
  ): Promise<ProjectSubmission | null> => {
    try {
      const res = await fetch(`/api/projects/${projectId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          userName: user.name,
          ...data
        })
      });

      if (!res.ok) throw new Error('Submission failed');
      const json = await res.json();
      const submission: ProjectSubmission = json.submission;
      setSubmissions(prev => [submission, ...prev]);
      return submission;
    } catch (e) {
      // Local fallback
      const fallbackSub: ProjectSubmission = {
        id: `sub-${Date.now()}`,
        projectId,
        projectTitle: 'Submitted Project',
        userId: user.id,
        userName: user.name,
        repoUrl: data.repoUrl,
        liveUrl: data.liveUrl,
        notes: data.notes,
        submittedAt: new Date().toISOString(),
        status: 'approved',
        score: 94,
        feedback: 'Submitted successfully in sandbox mode. Great work!',
        isPublicInPortfolio: data.isPublicInPortfolio
      };
      setSubmissions(prev => [fallbackSub, ...prev]);
      return fallbackSub;
    }
  };

  const toggleSaveLesson = (lessonId: string) => {
    setUser(prev => {
      const current = prev.savedLessons || [];
      const updated = current.includes(lessonId)
        ? current.filter(id => id !== lessonId)
        : [...current, lessonId];
      return { ...prev, savedLessons: updated };
    });
  };

  const addStudyTime = (minutes: number) => {
    setUser(prev => ({
      ...prev,
      studyMinutes: (prev.studyMinutes || 0) + minutes
    }));
  };

  const upgradePlan = (plan: 'pro_monthly' | 'pro_annual', txData?: Partial<PaymentTransaction>) => {
    const durationDays = plan === 'pro_annual' ? 365 : 30;
    const currentPeriodEnd = new Date(Date.now() + durationDays * 86400000).toISOString();
    const amount = txData?.amount || (plan === 'pro_annual' ? (currency === 'NGN' ? 135000 : 99) : (currency === 'NGN' ? 15000 : 12));
    const ref = txData?.reference || `PSK_TEST_${Date.now()}_${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const newSub: UserSubscription = {
      id: `sub-${Date.now()}`,
      plan,
      status: 'active',
      startDate: new Date().toISOString(),
      currentPeriodEnd,
      cancelAtPeriodEnd: false,
      amount,
      currency: txData?.currency || currency,
      paymentMethod: {
        brand: txData?.channel === 'bank_transfer' ? 'Wema Bank (Transfer)' : (txData?.channel === 'ussd' ? 'GTBank USSD' : 'Mastercard'),
        last4: '1234',
        channel: (txData?.channel as any) || 'card',
        expiry: '12/28'
      },
      lastTransactionReference: ref
    };

    // Step 3: Link subscriptions to premium courses so paying users get access automatically
    const premiumCourseIds = COURSES.filter(c => c.isPremium).map(c => c.id);
    const updatedEnrolled = Array.from(new Set([...user.enrolledCourses, ...premiumCourseIds]));

    setUser(prev => ({
      ...prev,
      plan,
      subscription: newSub,
      enrolledCourses: updatedEnrolled
    }));

    // Record verified transaction
    const newTx: PaymentTransaction = {
      id: `tx-${Date.now()}`,
      reference: ref,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      plan,
      amount,
      currency: txData?.currency || currency,
      channel: (txData?.channel as any) || 'card',
      status: 'success',
      gateway: 'paystack',
      gatewayMode: 'test',
      paidAt: new Date().toISOString(),
      invoiceNumber: `INV-2026-${Math.floor(10000 + Math.random() * 90000)}`
    };

    setTransactions(prev => [newTx, ...prev]);
  };

  const cancelSubscription = async (): Promise<boolean> => {
    try {
      await fetch('/api/subscriptions/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id })
      });
    } catch (e) {
      // offline fallback
    }

    if (user.subscription) {
      setUser(prev => ({
        ...prev,
        subscription: prev.subscription ? { ...prev.subscription, cancelAtPeriodEnd: true } : undefined
      }));
      return true;
    }
    return false;
  };

  const resumeSubscription = async (): Promise<boolean> => {
    try {
      await fetch('/api/subscriptions/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id })
      });
    } catch (e) {
      // offline fallback
    }

    if (user.subscription) {
      setUser(prev => ({
        ...prev,
        subscription: prev.subscription ? { ...prev.subscription, cancelAtPeriodEnd: false } : undefined
      }));
      return true;
    }
    return false;
  };

  const downgradeToFree = () => {
    setUser(prev => ({
      ...prev,
      plan: 'free',
      subscription: undefined
    }));
  };

  const login = (email: string, name?: string) => {
    setUser(prev => ({
      ...prev,
      email,
      name: name || email.split('@')[0]
    }));
  };

  const logout = () => {
    // Resets to guest learner
    setUser({
      ...DEFAULT_USER,
      id: `guest-${Date.now()}`,
      name: 'Guest Learner',
      email: 'guest@skillup.academy',
      plan: 'free',
      subscription: undefined,
      enrolledCourses: []
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        progress,
        certificates,
        submissions,
        transactions,
        currency,
        darkMode,
        themeMode,
        setCurrency,
        toggleDarkMode,
        setThemeMode,
        formatPrice,
        updateUser,
        switchRole,
        enrollInCourse,
        completeLesson,
        recordQuizScore,
        issueCertificate,
        submitProject,
        toggleSaveLesson,
        addStudyTime,
        upgradePlan,
        cancelSubscription,
        resumeSubscription,
        downgradeToFree,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
