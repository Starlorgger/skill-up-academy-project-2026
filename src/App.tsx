/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { Course, Project, Certificate } from './types';
import { COURSES, PROJECTS } from './data/mockData';

// Modals
import { AiAssistantModal } from './components/AiAssistantModal';
import { PaymentModal } from './components/PaymentModal';
import { CertificateModal } from './components/CertificateModal';
import { ProjectSubmissionModal } from './components/ProjectSubmissionModal';
import { HelpDrawer } from './components/HelpDrawer';
import { OfflineIndicator } from './components/OfflineIndicator';

// Views
import { HomeView } from './views/HomeView';
import { ExploreView } from './views/ExploreView';
import { CategoriesView, CategoryDetailView } from './views/CategoriesView';
import { CourseDetailView } from './views/CourseDetailView';
import { LessonPlayerView } from './views/LessonPlayerView';
import { MyLearningView } from './views/MyLearningView';
import { LearningPathsView } from './views/LearningPathsView';
import { ProjectsView, ProjectDetailView } from './views/ProjectsView';
import { JobsView } from './views/JobsView';
import { FreelanceView } from './views/FreelanceView';
import { CareerView } from './views/CareerView';
import { PricingView } from './views/PricingView';
import { ProfileView } from './views/ProfileView';
import { SettingsView } from './views/SettingsView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { AiAssistantView } from './views/AiAssistantView';
import { MonitorView } from './views/MonitorView';
import { 
  NotificationsView, 
  AboutView, 
  HelpContactView, 
  PrivacyPolicyView, 
  TermsOfServiceView 
} from './views/StaticPages';
import { 
  LoginView, 
  RegistrationView, 
  PasswordRecoveryView 
} from './views/AuthViews';

function AppContent() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedCourse, setSelectedCourse] = useState<Course>(COURSES[0]);
  const [activeLessonId, setActiveLessonId] = useState<string>('les-1-1');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('ai-engineering');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('project-portfolio-website');
  const [searchParam, setSearchParam] = useState<string>('');

  // Modals state
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [aiAssistantTopic, setAiAssistantTopic] = useState<string>('General Digital Skills');

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentPlan, setPaymentPlan] = useState<'pro_monthly' | 'pro_annual'>('pro_monthly');

  const [activeCertificate, setActiveCertificate] = useState<Certificate | null>(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  const [submissionProject, setSubmissionProject] = useState<Project | null>(null);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);

  // Context-sensitive Help Drawer
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedCourse, activeLessonId]);

  const handleNavigate = (view: string, param?: string) => {
    if (view === 'explore' && param) {
      setSearchParam(param);
    } else {
      setSearchParam('');
    }

    if (view === 'category-detail' && param) {
      setSelectedCategoryId(param);
    }

    if (view === 'project-detail' && param) {
      setSelectedProjectId(param);
    }

    setCurrentView(view);
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setCurrentView('course-detail');
  };

  const handleStartLesson = (course: Course, lessonId: string) => {
    setSelectedCourse(course);
    setActiveLessonId(lessonId);
    setCurrentView('lesson-player');
  };

  const handleOpenAiAssistant = (topic?: string) => {
    if (topic) setAiAssistantTopic(topic);
    setIsAiAssistantOpen(true);
  };

  const handleOpenPricingModal = (plan?: 'pro_monthly' | 'pro_annual') => {
    if (plan) setPaymentPlan(plan);
    setIsPaymentModalOpen(true);
  };

  const handleOpenCertModal = (cert?: Certificate) => {
    if (cert) {
      setActiveCertificate(cert);
      setIsCertModalOpen(true);
    } else {
      // Create instant certificate for display
      const defaultCert: Certificate = {
        id: `cert-${Date.now()}`,
        verificationCode: `SKILLUP-${Math.random().toString(36).substring(2, 7).toUpperCase()}-2026`,
        userId: 'user-default-1',
        userName: 'Chidi Amadi',
        courseId: selectedCourse.id,
        courseTitle: selectedCourse.title,
        issuedAt: new Date().toISOString(),
        grade: 'Excellence (Distinction)',
        instructorName: selectedCourse.instructor.name
      };
      setActiveCertificate(defaultCert);
      setIsCertModalOpen(true);
    }
  };

  const handleOpenSubmissionModal = (project: Project) => {
    setSubmissionProject(project);
    setIsSubmissionModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC] dark:bg-[#0c1426] text-[#20263A] dark:text-slate-100 transition-colors">
      {/* Top Bar Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenAiAssistant={() => handleOpenAiAssistant('Quick Guidance')}
        onOpenPricing={() => handleOpenPricingModal('pro_monthly')}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      {/* Main Body View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-12">
        {currentView === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onSelectCourse={handleSelectCourse}
            onOpenAiAssistant={handleOpenAiAssistant}
          />
        )}

        {currentView === 'explore' && (
          <ExploreView
            initialSearchQuery={searchParam}
            onSelectCourse={handleSelectCourse}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'categories' && (
          <CategoriesView
            onSelectCategory={(catId) => {
              setSelectedCategoryId(catId);
              setCurrentView('category-detail');
            }}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'category-detail' && (
          <CategoryDetailView
            categoryId={selectedCategoryId}
            onBack={() => setCurrentView('categories')}
            onSelectCourse={handleSelectCourse}
            onOpenAiAssistant={handleOpenAiAssistant}
          />
        )}

        {currentView === 'course-detail' && (
          <CourseDetailView
            course={selectedCourse}
            onBack={() => setCurrentView('explore')}
            onStartLesson={handleStartLesson}
            onOpenPricing={() => handleOpenPricingModal('pro_monthly')}
            onOpenAiAssistant={handleOpenAiAssistant}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'lesson-player' && (
          <LessonPlayerView
            course={selectedCourse}
            initialLessonId={activeLessonId}
            onBackToCourse={() => setCurrentView('course-detail')}
            onOpenAiAssistant={handleOpenAiAssistant}
            onOpenCertificateModal={() => handleOpenCertModal()}
            onOpenHelp={() => setIsHelpOpen(true)}
          />
        )}

        {currentView === 'mylearning' && (
          <MyLearningView
            onSelectCourse={handleSelectCourse}
            onNavigate={handleNavigate}
            onOpenCertificateModal={(cert) => handleOpenCertModal(cert)}
          />
        )}

        {currentView === 'paths' && (
          <LearningPathsView
            onSelectCourse={handleSelectCourse}
            onSelectProject={(pId) => {
              setSelectedProjectId(pId);
              setCurrentView('project-detail');
            }}
            onOpenAiAssistant={handleOpenAiAssistant}
          />
        )}

        {currentView === 'projects' && (
          <ProjectsView
            onSelectProject={(pId) => {
              setSelectedProjectId(pId);
              setCurrentView('project-detail');
            }}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'project-detail' && (
          <ProjectDetailView
            projectId={selectedProjectId}
            onBack={() => setCurrentView('projects')}
            onOpenSubmissionModal={handleOpenSubmissionModal}
            onOpenAiAssistant={handleOpenAiAssistant}
          />
        )}

        {currentView === 'jobs' && (
          <JobsView
            onNavigate={handleNavigate}
            onOpenAiAssistant={handleOpenAiAssistant}
          />
        )}

        {currentView === 'freelance' && (
          <FreelanceView
            onNavigate={handleNavigate}
            onOpenAiAssistant={handleOpenAiAssistant}
          />
        )}

        {currentView === 'career' && (
          <CareerView
            onNavigate={handleNavigate}
            onOpenAiAssistant={handleOpenAiAssistant}
          />
        )}

        {currentView === 'pricing' && (
          <PricingView
            onOpenPaymentModal={handleOpenPricingModal}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'ai-assistant' && (
          <AiAssistantView />
        )}

        {currentView === 'monitor' && (
          <MonitorView
            onNavigate={handleNavigate}
            onOpenAiAssistant={handleOpenAiAssistant}
          />
        )}

        {currentView === 'profile' && (
          <ProfileView
            onNavigate={handleNavigate}
            onOpenCertificateModal={(cert) => handleOpenCertModal(cert)}
          />
        )}

        {currentView === 'settings' && (
          <SettingsView onNavigate={handleNavigate} />
        )}

        {currentView === 'admin' && (
          <AdminDashboardView onNavigate={handleNavigate} />
        )}

        {currentView === 'notifications' && (
          <NotificationsView />
        )}

        {currentView === 'about' && (
          <AboutView />
        )}

        {currentView === 'help' && (
          <HelpContactView />
        )}

        {currentView === 'privacy' && (
          <PrivacyPolicyView />
        )}

        {currentView === 'terms' && (
          <TermsOfServiceView />
        )}

        {currentView === 'login' && (
          <LoginView onNavigate={handleNavigate} />
        )}

        {currentView === 'register' && (
          <RegistrationView onNavigate={handleNavigate} />
        )}

        {currentView === 'forgot-password' && (
          <PasswordRecoveryView onNavigate={handleNavigate} />
        )}
      </main>

      {/* Global Interactive Modals */}
      <AiAssistantModal
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        contextTopic={aiAssistantTopic}
      />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        initialPlan={paymentPlan}
      />

      <CertificateModal
        certificate={activeCertificate}
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
      />

      <ProjectSubmissionModal
        project={submissionProject}
        isOpen={isSubmissionModalOpen}
        onClose={() => setIsSubmissionModalOpen(false)}
      />

      {/* Context-Sensitive Help Drawer */}
      <HelpDrawer
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        currentContext={currentView}
        onOpenAiAssistant={handleOpenAiAssistant}
        onNavigate={handleNavigate}
      />

      {/* Workbox Offline Indicator */}
      <OfflineIndicator />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
