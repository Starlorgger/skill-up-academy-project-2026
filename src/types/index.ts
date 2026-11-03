export type UserRole = 'student' | 'instructor' | 'admin';
export type ThemeMode = 'system' | 'light' | 'dark';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  title?: string;
  country?: string;
  interests: string[];
  learningGoals: string[];
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  enrolledCourses: string[]; // courseIds
  savedLessons: string[]; // lessonIds
  studyMinutes: number;
  plan: 'free' | 'pro_monthly' | 'pro_annual';
  subscription?: UserSubscription;
  currency: 'NGN' | 'USD';
  createdAt: string;
}

export interface AiServiceTelemetry {
  configured: boolean;
  provider: string;
  model: string;
  operationalStatus: 'healthy' | 'degraded' | 'unconfigured';
  totalRequests: number;
  successCount: number;
  failureCount: number;
  lastLatencyMs?: number;
  lastCheckedAt: string;
  rateLimitTier?: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  name: string;
  email: string;
  category: 'course' | 'ai_mentor' | 'payment' | 'bug' | 'general';
  subject: string;
  description: string;
  createdAt: string;
  status: 'open' | 'investigating' | 'resolved';
}

export interface SkillCategory {
  id: string;
  letter: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  skills: string[];
  courseCount: number;
  featured?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  passingScorePercent: number;
  questions: QuizQuestion[];
}

export interface PracticalExercise {
  title: string;
  prompt: string;
  starterCode?: string;
  hint?: string;
  solutionNotes: string;
}

export interface Lesson {
  id: string;
  title: string;
  objective: string;
  durationMinutes: number;
  type: 'video' | 'text' | 'interactive';
  videoUrl?: string; // YouTube / educational video URL
  videoPoster?: string;
  writtenContent: string;
  keyTakeaways: string[];
  exercise?: PracticalExercise;
  quiz?: Quiz;
  resources?: { title: string; url: string; type: string }[];
}

export interface CourseModule {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationHours: number;
  priceNGN: number;
  priceUSD: number;
  isPremium: boolean;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  instructor: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
  thumbnail: string;
  description: string;
  objectives: string[];
  prerequisites: string[];
  modules: CourseModule[];
  certificateAvailable: boolean;
  featured?: boolean;
  trending?: boolean;
  finalProjectTitle?: string;
  finalProjectId?: string;
}

export interface ProjectRubricItem {
  criterion: string;
  points: number;
}

export interface Project {
  id: string;
  title: string;
  categoryId: string;
  courseId?: string;
  courseTitle?: string;
  objective: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  requiredSkills: string[];
  instructions: string[];
  resources: { title: string; url: string }[];
  rubric: ProjectRubricItem[];
  starterTemplateUrl?: string;
}

export interface ProjectSubmission {
  id: string;
  projectId: string;
  projectTitle: string;
  userId: string;
  userName: string;
  repoUrl?: string;
  liveUrl?: string;
  notes: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'needs_work';
  score?: number;
  feedback?: string;
  isPublicInPortfolio: boolean;
}

export interface UserProgress {
  userId: string;
  courseId: string;
  completedLessonIds: string[];
  quizScores: Record<string, number>; // quizId -> score %
  lastAccessedLessonId?: string;
  lastAccessedAt: string;
  certificateIssued: boolean;
  certificateCode?: string;
  certificateIssuedAt?: string;
}

export interface LearningPath {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  totalDurationWeeks: number;
  courseIds: string[];
  primaryProjectId: string;
  careerOutcomes: string[];
}

export interface Certificate {
  id: string;
  verificationCode: string;
  userId: string;
  userName: string;
  courseId: string;
  courseTitle: string;
  issuedAt: string;
  grade: string;
  instructorName: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'achievement' | 'reminder' | 'system';
}

export type JobLocationType = 'remote' | 'hybrid' | 'onsite';
export type JobEmploymentType = 'full-time' | 'part-time' | 'contract' | 'internship';
export type JobExperienceLevel = 'entry' | 'mid' | 'senior';

export interface JobListing {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  locationType: JobLocationType;
  country: string; // e.g. "Nigeria", "Global Remote", "United Kingdom", "United States"
  employmentType: JobEmploymentType;
  experienceLevel: JobExperienceLevel;
  salaryMinNGN: number;
  salaryMaxNGN: number;
  salaryMinUSD: number;
  salaryMaxUSD: number;
  categoryId: string;
  categoryName: string;
  skillsRequired: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  postedDate: string;
  deadline?: string;
  verifiedEmployer: boolean;
  applicantsCount: number;
  matchingScore?: number;
  featured?: boolean;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  portfolioUrl?: string;
  githubUrl?: string;
  coverNote: string;
  expectedSalaryNGN?: number;
  expectedSalaryUSD?: number;
  status: 'submitted' | 'under_review' | 'interview' | 'accepted' | 'declined';
  submittedAt: string;
}

export interface FreelanceGig {
  id: string;
  title: string;
  clientName: string;
  clientAvatar?: string;
  clientCountry: string;
  clientRating: number;
  clientReviewsCount: number;
  budgetType: 'fixed' | 'hourly';
  budgetNGN: number;
  budgetUSD: number;
  duration: string;
  experienceLevel: 'beginner' | 'intermediate' | 'expert';
  categoryId: string;
  categoryName: string;
  skillsRequired: string[];
  description: string;
  deliverables: string[];
  deadline: string;
  proposalsCount: number;
  verifiedPayment: boolean;
  postedDate: string;
  featured?: boolean;
}

export interface FreelanceProposal {
  id: string;
  gigId: string;
  gigTitle: string;
  clientName: string;
  bidAmountNGN: number;
  bidAmountUSD: number;
  deliveryTimeDays: number;
  coverLetter: string;
  portfolioLinks: string[];
  status: 'submitted' | 'shortlisted' | 'accepted' | 'declined';
  submittedAt: string;
}

export interface CareerMilestone {
  level: string;
  title: string;
  skills: string[];
  recommendedCourseIds: string[];
  projectTitle: string;
  estimatedMonths: number;
}

export interface CareerPath {
  id: string;
  title: string;
  roleName: string;
  categoryId: string;
  categoryName: string;
  iconName: string;
  summary: string;
  demandLevel: 'High' | 'Very High' | 'Explosive';
  averageSalaryNGN: string;
  averageSalaryUSD: string;
  primarySkills: string[];
  milestones: CareerMilestone[];
  topEmployers: string[];
  freelancePotential: string;
  remoteFeasibility: string;
  resumeTips: string[];
  interviewQuestions: { question: string; answerGuidance: string }[];
}

export interface EarningGuide {
  id: string;
  title: string;
  categoryName: string;
  method: string;
  avgRateNGN: string;
  avgRateUSD: string;
  platforms: string[];
  actionSteps: string[];
}

export interface UserSubscription {
  id: string;
  plan: 'free' | 'pro_monthly' | 'pro_annual';
  status: 'active' | 'cancelled' | 'past_due' | 'trialing';
  startDate: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  amount: number;
  currency: 'NGN' | 'USD';
  paymentMethod: {
    brand: string;
    last4: string;
    channel: 'card' | 'bank_transfer' | 'ussd';
    expiry?: string;
  };
  lastTransactionReference?: string;
}

export interface PaymentTransaction {
  id: string;
  reference: string;
  userId: string;
  userName: string;
  userEmail: string;
  plan: 'pro_monthly' | 'pro_annual';
  amount: number;
  currency: 'NGN' | 'USD';
  channel: 'card' | 'bank_transfer' | 'ussd' | 'qr';
  status: 'success' | 'failed' | 'pending';
  gateway: 'paystack';
  gatewayMode: 'test' | 'live';
  paidAt: string;
  receiptUrl?: string;
  invoiceNumber: string;
}

export interface RevenueAnalytics {
  mrrNGN: number;
  mrrUSD: number;
  arrNGN: number;
  arrUSD: number;
  totalRevenueNGN: number;
  totalRevenueUSD: number;
  activeSubscribersCount: number;
  freeUsersCount: number;
  conversionRate: number;
  churnRate: number;
  monthlySubscribers: number;
  annualSubscribers: number;
  transactions: PaymentTransaction[];
}


