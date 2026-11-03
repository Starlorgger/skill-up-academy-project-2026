import { JobListing, FreelanceGig, CareerPath, EarningGuide } from '../types';

export const JOB_LISTINGS: JobListing[] = [
  {
    id: 'job-1',
    title: 'AI Workflow & Prompt Engineer',
    company: 'NeuralStack Africa',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    location: 'Lagos, Nigeria (Hybrid)',
    locationType: 'hybrid',
    country: 'Nigeria',
    employmentType: 'full-time',
    experienceLevel: 'entry',
    salaryMinNGN: 650000,
    salaryMaxNGN: 1100000,
    salaryMinUSD: 800,
    salaryMaxUSD: 1400,
    categoryId: 'ai-engineering',
    categoryName: 'Artificial Intelligence & AI Engineering',
    skillsRequired: ['Prompt Engineering', 'LLM App Development', 'Python for AI', 'AI Agents & Workflows'],
    description: 'We are seeking an ambitious AI Workflow & Prompt Engineer to design autonomous evaluation pipelines, fine-tune structured prompts, and implement agentic assistants using modern LLM APIs.',
    responsibilities: [
      'Design, test, and benchmark system prompts for customer operations and internal automation.',
      'Connect LLM APIs with vector databases and internal data pipelines using Python.',
      'Build evaluation test suites for hallucination reduction and output consistency.',
      'Collaborate with frontend engineers to integrate intelligent agents into production web interfaces.'
    ],
    requirements: [
      'Demonstrated experience writing structured prompts (few-shot, chain-of-thought, system prompts).',
      'Solid working knowledge of Python and REST API consumption.',
      'Understanding of RAG architectures and vector embeddings.',
      'Portfolio project or GitHub repo demonstrating practical AI tool integration.'
    ],
    benefits: [
      'Competitive monthly compensation with regular performance reviews',
      'Flexible hybrid schedule (2 days in Lekki office, 3 days remote)',
      'Annual learning stipend for cloud credits and AI certifications',
      'Health insurance (HMO) and wellness allowance'
    ],
    postedDate: '2026-03-24',
    deadline: '2026-04-30',
    verifiedEmployer: true,
    applicantsCount: 18,
    featured: true
  },
  {
    id: 'job-2',
    title: 'Frontend React & TypeScript Developer',
    company: 'FinPulse Global',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&auto=format&fit=crop&q=80',
    location: 'Remote (Worldwide / Nigeria)',
    locationType: 'remote',
    country: 'Global Remote',
    employmentType: 'full-time',
    experienceLevel: 'mid',
    salaryMinNGN: 1400000,
    salaryMaxNGN: 2200000,
    salaryMinUSD: 1600,
    salaryMaxUSD: 2500,
    categoryId: 'software-development',
    categoryName: 'Software Development & Coding',
    skillsRequired: ['React & Next.js', 'JavaScript & TypeScript', 'Tailwind CSS', 'Git & GitHub Workflows'],
    description: 'FinPulse is scaling its cross-border remittances interface. We need a detail-oriented React & TypeScript frontend engineer who values accessible design systems and lightning-fast web performance.',
    responsibilities: [
      'Build modular, reusable React components with TypeScript and Tailwind CSS.',
      'Optimize web application bundle sizes and client-side performance across low-bandwidth mobile networks.',
      'Collaborate directly with product designers in Figma to produce pixel-perfect UI experiences.',
      'Write unit and integration tests for critical transaction and onboarding flows.'
    ],
    requirements: [
      'At least 2 years of building modern web applications with React and TypeScript.',
      'Deep understanding of state management, custom React hooks, and asynchronous API calls.',
      'Strong grasp of responsive CSS and mobile-first layout patterns.',
      'Experience working with Git feature branches and pull requests.'
    ],
    benefits: [
      '100% remote work with flexible asynchronous hours',
      'Payment in USD or NGN equivalent with direct bank settlement',
      'MacBook laptop provision or home-office setup grant',
      '25 paid vacation days per calendar year'
    ],
    postedDate: '2026-03-22',
    deadline: '2026-05-15',
    verifiedEmployer: true,
    applicantsCount: 42,
    featured: true
  },
  {
    id: 'job-3',
    title: 'Junior Mobile App Developer (Flutter)',
    company: 'Apex Healthtech',
    companyLogo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=120&auto=format&fit=crop&q=80',
    location: 'Abuja, Nigeria (Hybrid)',
    locationType: 'hybrid',
    country: 'Nigeria',
    employmentType: 'full-time',
    experienceLevel: 'entry',
    salaryMinNGN: 500000,
    salaryMaxNGN: 850000,
    salaryMinUSD: 600,
    salaryMaxUSD: 1000,
    categoryId: 'mobile-app-development',
    categoryName: 'Mobile App Development',
    skillsRequired: ['Flutter & Dart', 'Mobile UX & Touch Ergonomics', 'REST APIs', 'Git'],
    description: 'Join Apex Healthtech to help build intuitive telemedicine and prescription tracking apps for Android and iOS devices across West Africa.',
    responsibilities: [
      'Develop clean Flutter widgets following Material Design and Cupertino standards.',
      'Integrate backend REST endpoints and offline cache mechanisms.',
      'Assist in APK builds, bug diagnostics, and Play Store release preparation.'
    ],
    requirements: [
      'Demonstrated knowledge of Flutter and Dart.',
      'A completed mobile project on GitHub or live APK on Play Store.',
      'Passion for crafting smooth user animations and accessible interfaces.'
    ],
    benefits: [
      'Mentorship from Senior Engineering Leads',
      'Comprehensive HMO covering outpatient and dental care',
      'Daily lunch provided at our Central Business District office'
    ],
    postedDate: '2026-03-20',
    deadline: '2026-04-25',
    verifiedEmployer: true,
    applicantsCount: 29
  },
  {
    id: 'job-4',
    title: 'UI/UX Product Designer',
    company: 'Kuda Horizon Labs',
    companyLogo: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=120&auto=format&fit=crop&q=80',
    location: 'Remote (Lagos / GMT+1)',
    locationType: 'remote',
    country: 'Nigeria',
    employmentType: 'full-time',
    experienceLevel: 'mid',
    salaryMinNGN: 1100000,
    salaryMaxNGN: 1800000,
    salaryMinUSD: 1300,
    salaryMaxUSD: 2100,
    categoryId: 'ui-ux-design',
    categoryName: 'UI/UX & Product Design',
    skillsRequired: ['Figma Mastery', 'Design Systems', 'User Research & Testing', 'Prototyping'],
    description: 'We are looking for a creative UI/UX Product Designer with a sharp eye for fintech ergonomics, typography, micro-interactions, and design token architectures.',
    responsibilities: [
      'Create high-fidelity wireframes, interactive Figma prototypes, and component libraries.',
      'Conduct remote usability testing with Nigerian consumers and merchants.',
      'Coordinate directly with frontend engineers during design handoff and QA review.'
    ],
    requirements: [
      'Strong portfolio showcasing mobile and desktop web product case studies.',
      'Proficiency in Figma auto-layout, variables, and component variants.',
      'Understanding of usability heuristics and accessibility standards (WCAG 2.1).'
    ],
    benefits: [
      'Fully remote with flexible core hours',
      'Monthly co-working space stipend (Workstation or similar)',
      'Subsidized annual Figma and Adobe Creative Cloud licenses'
    ],
    postedDate: '2026-03-25',
    deadline: '2026-05-01',
    verifiedEmployer: true,
    applicantsCount: 34,
    featured: true
  },
  {
    id: 'job-5',
    title: 'Data Analyst & Power BI Specialist',
    company: 'Sterling Retail Analytics',
    companyLogo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=120&auto=format&fit=crop&q=80',
    location: 'Lagos, Nigeria (On-site)',
    locationType: 'onsite',
    country: 'Nigeria',
    employmentType: 'full-time',
    experienceLevel: 'entry',
    salaryMinNGN: 550000,
    salaryMaxNGN: 900000,
    salaryMinUSD: 650,
    salaryMaxUSD: 1100,
    categoryId: 'data-science',
    categoryName: 'Data Science & Analytics',
    skillsRequired: ['Advanced Excel & Google Sheets', 'PostgreSQL & Analytics SQL', 'Power BI & Tableau'],
    description: 'Deliver actionable business intelligence dashboards for nationwide retail chains. Transform messy inventory and transactional logs into clean executive visualisations.',
    responsibilities: [
      'Extract and transform data from relational SQL databases and ERP exports.',
      'Build automated DAX calculations, KPIs, and interactive Power BI report pages.',
      'Present weekly performance summaries to category brand managers.'
    ],
    requirements: [
      'Strong SQL querying skills (JOINs, aggregations, CTEs, window functions).',
      'Demonstrated portfolio of Power BI or Tableau dashboards.',
      'Sharp analytical reasoning and data validation discipline.'
    ],
    benefits: [
      'On-site canteen and free transportation shuttle along Victoria Island route',
      'Quarterly performance bonuses',
      'Paid industry certification exams (Microsoft PL-300)'
    ],
    postedDate: '2026-03-18',
    deadline: '2026-04-20',
    verifiedEmployer: true,
    applicantsCount: 51
  },
  {
    id: 'job-6',
    title: 'Cloud Security & DevOps Junior Engineer',
    company: 'SecureCloud EMEA',
    companyLogo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=120&auto=format&fit=crop&q=80',
    location: 'Remote (Europe / Africa UTC to UTC+2)',
    locationType: 'remote',
    country: 'Global Remote',
    employmentType: 'full-time',
    experienceLevel: 'entry',
    salaryMinNGN: 1200000,
    salaryMaxNGN: 1900000,
    salaryMinUSD: 1400,
    salaryMaxUSD: 2300,
    categoryId: 'cybersecurity-cloud',
    categoryName: 'Cybersecurity & Cloud Computing',
    skillsRequired: ['Linux Server Administration', 'AWS / Google Cloud Basics', 'Docker Containerization', 'Network Security'],
    description: 'Monitor cloud infrastructure, configure CI/CD pipelines, enforce least-privilege IAM policies, and maintain system hardening protocols across containerised Kubernetes clusters.',
    responsibilities: [
      'Implement baseline security policies across AWS and GCP tenant environments.',
      'Assist senior engineers in automated container scans and vulnerability patching.',
      'Maintain automated backups, TLS certificate rotations, and server health alerts.'
    ],
    requirements: [
      'Solid command line Linux fundamentals (Ubuntu/Debian).',
      'Familiarity with cloud security models (AWS IAM, VPC, Security Groups).',
      'Knowledge of Docker container builds and Git automated pipelines.'
    ],
    benefits: [
      'USD international contract with remote benefits stipend',
      'AWS / GCP certification sponsorship voucher',
      'Quarterly team offsite summits in Nairobi and Kigali'
    ],
    postedDate: '2026-03-26',
    deadline: '2026-05-10',
    verifiedEmployer: true,
    applicantsCount: 22
  },
  {
    id: 'job-7',
    title: 'Webflow & No-Code Developer',
    company: 'BrandScale Agency UK',
    companyLogo: 'https://images.unsplash.com/photo-1542744094-3a31727221eb?w=120&auto=format&fit=crop&q=80',
    location: 'Remote (Global)',
    locationType: 'remote',
    country: 'Global Remote',
    employmentType: 'contract',
    experienceLevel: 'entry',
    salaryMinNGN: 700000,
    salaryMaxNGN: 1250000,
    salaryMinUSD: 850,
    salaryMaxUSD: 1500,
    categoryId: 'website-no-code',
    categoryName: 'Website Development & No-Code Tools',
    skillsRequired: ['Webflow & Framer', 'HTML/CSS Basics', 'Client Hand-off & CMS', 'SEO-Friendly Web Architecture'],
    description: 'Build fast, animated marketing websites for SaaS and venture-backed startups using Webflow and Framer. Great opportunity for designers and developers who master visual web tools.',
    responsibilities: [
      'Convert Figma prototypes into fully responsive Webflow and Framer sites.',
      'Set up custom CMS collections, dynamic filters, and on-page SEO meta tags.',
      'Integrate forms with Zapier, Make, and HubSpot email sequences.'
    ],
    requirements: [
      'Demonstrated portfolio of live Webflow or Framer websites.',
      'Strong eye for CSS grid, flexbox, and typography hierarchy.',
      'Good written English communication for async client updates.'
    ],
    benefits: [
      'Ongoing 6-month contract with retainer renewal',
      'Async-first work culture with zero unnecessary meetings',
      'Direct payouts via Wise or Payoneer'
    ],
    postedDate: '2026-03-23',
    deadline: '2026-04-28',
    verifiedEmployer: true,
    applicantsCount: 38
  },
  {
    id: 'job-8',
    title: 'Growth Marketing & Content Strategist',
    company: 'AfriPay Technologies',
    companyLogo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=120&auto=format&fit=crop&q=80',
    location: 'Lagos, Nigeria (Hybrid)',
    locationType: 'hybrid',
    country: 'Nigeria',
    employmentType: 'full-time',
    experienceLevel: 'mid',
    salaryMinNGN: 800000,
    salaryMaxNGN: 1350000,
    salaryMinUSD: 950,
    salaryMaxUSD: 1600,
    categoryId: 'digital-marketing',
    categoryName: 'Digital Marketing & Growth',
    skillsRequired: ['Technical SEO', 'Content Strategy & Copywriting', 'Meta & Google Ads', 'Email Marketing'],
    description: 'Drive user acquisition, organic search ranking, and newsletter engagement for a fast-growing merchant payment platform operating across Nigeria and Ghana.',
    responsibilities: [
      'Execute technical and on-page SEO strategies to scale organic organic inbound traffic.',
      'Manage high-converting social media ads and Google Performance Max campaigns.',
      'Draft case studies, merchant spotlights, and weekly email product roundups.'
    ],
    requirements: [
      'Proven track record of scaling website traffic or paid customer acquisition.',
      'Hands-on experience with Google Analytics 4, Meta Ads Manager, and email tools.',
      'Persuasive copywriting and content storytelling skills.'
    ],
    benefits: [
      'Quarterly profit-sharing incentive',
      'Modern workspace in Ikoyi with fast internet and generator backup',
      'Paid company retreats and training programs'
    ],
    postedDate: '2026-03-21',
    deadline: '2026-04-22',
    verifiedEmployer: true,
    applicantsCount: 45
  }
];

export const FREELANCE_GIGS: FreelanceGig[] = [
  {
    id: 'gig-1',
    title: 'Build AI Customer Support Agent with Gemini API',
    clientName: 'Sarah Jenkins',
    clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    clientCountry: 'United Kingdom',
    clientRating: 4.9,
    clientReviewsCount: 38,
    budgetType: 'fixed',
    budgetNGN: 550000,
    budgetUSD: 650,
    duration: '2 weeks',
    experienceLevel: 'intermediate',
    categoryId: 'ai-engineering',
    categoryName: 'Artificial Intelligence & AI Engineering',
    skillsRequired: ['Prompt Engineering', 'LLM App Development', 'Python for AI', 'REST APIs'],
    description: 'We need an experienced AI developer to configure an automated customer support assistant for our boutique e-commerce shop using the Gemini API and structured system prompts.',
    deliverables: [
      'Configured prompt instruction set handling returns, shipping questions, and FAQ.',
      'Node.js or Python backend webhook route for incoming user messages.',
      'Fallback logic to human ticket system when confidence score drops below 80%.',
      'Brief 1-page setup documentation for our internal support staff.'
    ],
    deadline: '2026-04-18',
    proposalsCount: 9,
    verifiedPayment: true,
    postedDate: '2026-03-25',
    featured: true
  },
  {
    id: 'gig-2',
    title: 'Redesign SaaS Analytics Dashboard in Figma',
    clientName: 'Marcus Lindqvist',
    clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    clientCountry: 'Sweden',
    clientRating: 5.0,
    clientReviewsCount: 24,
    budgetType: 'fixed',
    budgetNGN: 720000,
    budgetUSD: 850,
    duration: '3 weeks',
    experienceLevel: 'intermediate',
    categoryId: 'ui-ux-design',
    categoryName: 'UI/UX & Product Design',
    skillsRequired: ['Figma Mastery', 'Design Systems', 'Data Visualization UI', 'Prototyping'],
    description: 'Looking for a UI designer with great taste in data tables, charts, dark-mode themes, and subtle borders. We need 12 responsive dashboard screens designed in Figma with full component auto-layout.',
    deliverables: [
      '12 responsive screens (Desktop 1440px and Mobile 390px).',
      'Design token library with color scales, typography styles, and card variants.',
      'Clickable interactive prototype demonstrating filter changes and drawer animations.'
    ],
    deadline: '2026-04-24',
    proposalsCount: 14,
    verifiedPayment: true,
    postedDate: '2026-03-24',
    featured: true
  },
  {
    id: 'gig-3',
    title: 'Full-Stack Next.js Landing Page with Paystack & Stripe Checkout',
    clientName: 'Dr. Tunde Fashola',
    clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    clientCountry: 'Nigeria',
    clientRating: 4.8,
    clientReviewsCount: 19,
    budgetType: 'fixed',
    budgetNGN: 480000,
    budgetUSD: 570,
    duration: '10 days',
    experienceLevel: 'intermediate',
    categoryId: 'software-development',
    categoryName: 'Software Development & Coding',
    skillsRequired: ['React & Next.js', 'Tailwind CSS', 'Payment Gateway Integration', 'TypeScript'],
    description: 'Looking for a dependable Nigerian developer to build a modern marketing page with dual currency checkout (Paystack for NGN and Stripe for USD) for our executive coaching summit.',
    deliverables: [
      'Clean Next.js / Tailwind CSS single-page site with smooth scroll navigation.',
      'Paystack webhook and Stripe webhook integration with verified receipt email trigger.',
      'Mobile-optimized booking form with automated SMS/email confirmation.',
      'Deployment to Vercel with custom domain setup.'
    ],
    deadline: '2026-04-12',
    proposalsCount: 12,
    verifiedPayment: true,
    postedDate: '2026-03-26'
  },
  {
    id: 'gig-4',
    title: 'Financial Model & Monthly Sales Dashboard in Power BI',
    clientName: 'Elena Rostova',
    clientAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    clientCountry: 'Canada',
    clientRating: 4.9,
    clientReviewsCount: 47,
    budgetType: 'hourly',
    budgetNGN: 25000, // per hour
    budgetUSD: 30, // per hour
    duration: '20-30 hours',
    experienceLevel: 'intermediate',
    categoryId: 'data-science',
    categoryName: 'Data Science & Analytics',
    skillsRequired: ['Power BI & Tableau', 'PostgreSQL & Analytics SQL', 'Advanced Excel & Google Sheets'],
    description: 'Transform 3 years of multi-currency Shopify and Amazon sales CSVs into an executive Power BI dashboard with month-over-month cohort retention and SKU profitability metrics.',
    deliverables: [
      'Clean automated Power Query data ingestion pipeline.',
      'DAX measures for Gross Margin, CAC Payback, and MoM Revenue Growth.',
      'Interactive executive visual summary page with date and geography slicers.'
    ],
    deadline: '2026-04-20',
    proposalsCount: 8,
    verifiedPayment: true,
    postedDate: '2026-03-23'
  },
  {
    id: 'gig-5',
    title: 'Modern Webflow CMS Site for Architectural Firm',
    clientName: 'David Adeleke',
    clientAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
    clientCountry: 'Nigeria',
    clientRating: 4.7,
    clientReviewsCount: 11,
    budgetType: 'fixed',
    budgetNGN: 420000,
    budgetUSD: 500,
    duration: '14 days',
    experienceLevel: 'beginner',
    categoryId: 'website-no-code',
    categoryName: 'Website Development & No-Code Tools',
    skillsRequired: ['Webflow & Framer', 'SEO-Friendly Web Architecture', 'Client Hand-off & CMS'],
    description: 'We need an elegant portfolio site built in Webflow for our architectural studio in Victoria Island. Clean minimalist photography, project showcase grids, and client inquiry forms.',
    deliverables: [
      'Homepage, About Us, Projects Index, and Project Case Study dynamic template.',
      'Webflow CMS configured so our junior staff can upload new project photos.',
      'Technical on-page SEO meta tags, OpenGraph preview cards, and compressed WebP images.'
    ],
    deadline: '2026-04-16',
    proposalsCount: 7,
    verifiedPayment: true,
    postedDate: '2026-03-25'
  },
  {
    id: 'gig-6',
    title: 'Cross-Platform React Native Bug Fixing & API Integration',
    clientName: 'Jonas Weber',
    clientAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
    clientCountry: 'Germany',
    clientRating: 5.0,
    clientReviewsCount: 62,
    budgetType: 'hourly',
    budgetNGN: 35000, // per hour
    budgetUSD: 42, // per hour
    duration: '15-20 hours',
    experienceLevel: 'expert',
    categoryId: 'mobile-app-development',
    categoryName: 'Mobile App Development',
    skillsRequired: ['React Native', 'Mobile UX & Touch Ergonomics', 'REST APIs', 'Git'],
    description: 'We need an experienced React Native / Expo developer to resolve 4 UI layout glitches on Android devices and integrate biometric authentication (Fingerprint / Face ID).',
    deliverables: [
      'Fix Android keyboard overlay bug on login and checkout forms.',
      'Integrate expo-local-authentication with secure keystore fallback.',
      'Clean pull request with passing TypeScript checks.'
    ],
    deadline: '2026-04-10',
    proposalsCount: 11,
    verifiedPayment: true,
    postedDate: '2026-03-26'
  }
];

export const CAREER_PATHS: CareerPath[] = [
  {
    id: 'path-ai-engineer',
    title: 'AI & Machine Learning Engineer',
    roleName: 'AI Solutions Engineer',
    categoryId: 'ai-engineering',
    categoryName: 'Artificial Intelligence & AI Engineering',
    iconName: 'Brain',
    summary: 'Lead the generative AI wave. Build intelligent agents, LLM applications, RAG pipelines, and enterprise automation solutions that companies around the world are urgently hiring for.',
    demandLevel: 'Explosive',
    averageSalaryNGN: '₦750,000 – ₦2,500,000 / month',
    averageSalaryUSD: '$1,200 – $4,500 / month',
    primarySkills: ['Prompt Engineering', 'Python for AI', 'LLM App Development', 'RAG & Vector DBs', 'AI Agents'],
    milestones: [
      {
        level: 'Foundation (Month 1-2)',
        title: 'Prompt Engineering & LLM Fundamentals',
        skills: ['Zero-shot & Few-shot Prompting', 'Chain-of-thought', 'Gemini & OpenAI API Integration'],
        recommendedCourseIds: ['course-ai-101'],
        projectTitle: 'Interactive Customer Support Bot with Context Memory',
        estimatedMonths: 2
      },
      {
        level: 'Intermediate (Month 3-4)',
        title: 'RAG & Vector Retrieval Systems',
        skills: ['Vector Embeddings', 'ChromaDB / Pinecone', 'Document Chunking', 'Python Async APIs'],
        recommendedCourseIds: ['course-ai-101'],
        projectTitle: 'Enterprise PDF Document Search & QA Knowledge Engine',
        estimatedMonths: 2
      },
      {
        level: 'Advanced (Month 5-6)',
        title: 'Autonomous AI Agents & Production Deployment',
        skills: ['Tool Calling & Function Execution', 'Multi-Agent Frameworks', 'Latency & Cost Optimization'],
        recommendedCourseIds: ['course-ai-101'],
        projectTitle: 'Autonomous Research & Market Intelligence Agent',
        estimatedMonths: 2
      }
    ],
    topEmployers: ['Fintech Startups', 'AI Agencies in US/UK/EU', 'Enterprise Banks', 'Healthtech Labs'],
    freelancePotential: 'High hourly rates ($35 - $100/hr) for custom AI integration, chatbot workflows, and automation.',
    remoteFeasibility: '100% remote-compatible. Global clients frequently hire international AI engineers asynchronously.',
    resumeTips: [
      'Quantify results: "Reduced support resolution time by 65% with a Gemini-powered retrieval agent."',
      'Provide public GitHub links with live demo URLs and clean README installation instructions.',
      'Show understanding of latency and token cost budgeting, which enterprise clients care deeply about.'
    ],
    interviewQuestions: [
      {
        question: 'How do you mitigate hallucinations when building a RAG application for financial or medical data?',
        answerGuidance: 'Discuss strict system prompts, citing exact source chunk IDs, confidence threshold checks, setting temperature to 0.0-0.2, and using validation guardrails.'
      },
      {
        question: 'Explain the difference between Fine-Tuning and In-Context Learning (RAG).',
        answerGuidance: 'Explain that fine-tuning modifies the model weights for tone or niche formatting, while RAG injects dynamic real-time retrieval data into the prompt without re-training costs.'
      }
    ]
  },
  {
    id: 'path-fullstack-dev',
    title: 'Full-Stack Software Engineer',
    roleName: 'Full-Stack Web Developer',
    categoryId: 'software-development',
    categoryName: 'Software Development & Coding',
    iconName: 'Code',
    summary: 'The backbone of the modern digital economy. Build end-to-end web applications with React, TypeScript, Node.js, and SQL databases that power business operations and global startups.',
    demandLevel: 'Very High',
    averageSalaryNGN: '₦600,000 – ₦2,200,000 / month',
    averageSalaryUSD: '$1,000 – $3,800 / month',
    primarySkills: ['React & Next.js', 'JavaScript & TypeScript', 'Node.js & Express', 'SQL & Databases', 'Git & CI/CD'],
    milestones: [
      {
        level: 'Foundation (Month 1-2)',
        title: 'Modern Web Frontends',
        skills: ['HTML5 & Responsive CSS', 'JavaScript ES6+', 'React Components & Hooks'],
        recommendedCourseIds: ['course-dev-101'],
        projectTitle: 'Personal Portfolio & Project Showcase Website',
        estimatedMonths: 2
      },
      {
        level: 'Intermediate (Month 3-4)',
        title: 'TypeScript, APIs & Backend Logic',
        skills: ['TypeScript Strict Mode', 'Node.js Express REST APIs', 'PostgreSQL / SQL Queries'],
        recommendedCourseIds: ['course-dev-101'],
        projectTitle: 'Full-Stack Task & Team Collaboration Dashboard',
        estimatedMonths: 2
      },
      {
        level: 'Advanced (Month 5-6)',
        title: 'Full-Stack Production Systems & Authentication',
        skills: ['Next.js App Router', 'OAuth & JWT Auth', 'Caching & Database Indexing', 'Deployment'],
        recommendedCourseIds: ['course-dev-101'],
        projectTitle: 'SaaS Multi-Tenant Billing & Subscription Platform',
        estimatedMonths: 2
      }
    ],
    topEmployers: ['Paystack / Flutterwave Partners', 'International Remote Startups', 'E-commerce Giants', 'Software Consultancies'],
    freelancePotential: 'Massive volume of client work: landing pages ($300-$800), full web apps ($1,500-$5,000).',
    remoteFeasibility: 'Extremely high. Most software teams operate fully remote or hybrid with async PR reviews.',
    resumeTips: [
      'Highlight modern tech stack: React 19, TypeScript, Next.js, Tailwind, PostgreSQL.',
      'Link your active GitHub profile showing consistent commit green squares and clean code.',
      'Include live URLs for every single project mentioned.'
    ],
    interviewQuestions: [
      {
        question: 'What happens when a user types a URL into their browser and presses Enter?',
        answerGuidance: 'Walk through DNS resolution, TCP handshake, TLS negotiation, HTTP request/response, DOM tree construction, CSSOM, layout, paint, and JS execution.'
      },
      {
        question: 'How do you optimize a React web application that has slow page rendering?',
        answerGuidance: 'Mention React profiler, code splitting with dynamic imports, memoizing heavy components, virtualization for long lists, and optimizing image assets.'
      }
    ]
  },
  {
    id: 'path-product-designer',
    title: 'UI/UX & Product Designer',
    roleName: 'Product Designer',
    categoryId: 'ui-ux-design',
    categoryName: 'UI/UX & Product Design',
    iconName: 'Palette',
    summary: 'Design intuitive, beautiful user experiences for mobile apps and web platforms. Combine user psychology, visual typography, accessibility, and modern design systems.',
    demandLevel: 'High',
    averageSalaryNGN: '₦500,000 – ₦1,800,000 / month',
    averageSalaryUSD: '$900 – $3,200 / month',
    primarySkills: ['Figma Mastery', 'Design Systems', 'User Research', 'Prototyping', 'Usability Testing'],
    milestones: [
      {
        level: 'Foundation (Month 1-2)',
        title: 'Design Principles & Figma Mastery',
        skills: ['Visual Hierarchy', 'Typography & Color Theory', 'Figma Auto-Layout & Variants'],
        recommendedCourseIds: [],
        projectTitle: 'Mobile Banking Onboarding Flow Redesign',
        estimatedMonths: 2
      },
      {
        level: 'Intermediate (Month 3-4)',
        title: 'Design Systems & Component Architecture',
        skills: ['Design Tokens', 'Reusable UI Components', 'Accessibility (WCAG 2.1)'],
        recommendedCourseIds: [],
        projectTitle: 'Comprehensive E-commerce Design System with 40+ Components',
        estimatedMonths: 2
      },
      {
        level: 'Advanced (Month 5-6)',
        title: 'User Research & End-to-End Product Design',
        skills: ['User Interviews & Heuristic Analysis', 'Interactive Micro-interactions', 'Developer Handoff'],
        recommendedCourseIds: [],
        projectTitle: 'End-to-End Telemedicine App Case Study with User Research',
        estimatedMonths: 2
      }
    ],
    topEmployers: ['Fintech & Consumer Tech Apps', 'Digital Design Agencies', 'Global Remote SaaS Companies'],
    freelancePotential: 'Strong freelance market on Upwork, Contra, and direct client referrals ($500-$2,500 per project).',
    remoteFeasibility: '100% remote. Design collaboration tools like Figma make async design work seamless.',
    resumeTips: [
      'Your portfolio website is 90% of your interview. Focus on 2-3 deep case studies over 10 shallow mockups.',
      'Explain the "Why": show problem statement, user research, rejected iterations, and business outcomes.',
      'Demonstrate understanding of developer handoff and technical design system constraints.'
    ],
    interviewQuestions: [
      {
        question: 'Walk me through a time when user feedback contradicted your initial design hypothesis.',
        answerGuidance: 'Use the STAR method: describe the initial assumption, what usability testing revealed, how you pivoted without ego, and the improved metric.'
      },
      {
        question: 'How do you design for accessibility when dealing with high-contrast requirements and brand identity?',
        answerGuidance: 'Discuss APCA / WCAG 2.1 contrast ratios (minimum 4.5:1 for body copy), touch target sizes (minimum 44x44px), screen-reader labels, and accessible color palettes.'
      }
    ]
  },
  {
    id: 'path-data-analyst',
    title: 'Data Analyst & Business Intelligence Specialist',
    roleName: 'Data Analyst',
    categoryId: 'data-science',
    categoryName: 'Data Science & Analytics',
    iconName: 'BarChart2',
    summary: 'Turn raw data into business revenue. Master SQL data extraction, Power BI interactive dashboards, Python analysis, and executive storytelling to help leaders make informed decisions.',
    demandLevel: 'Very High',
    averageSalaryNGN: '₦500,000 – ₦1,600,000 / month',
    averageSalaryUSD: '$800 – $2,800 / month',
    primarySkills: ['SQL & Relational Databases', 'Power BI & Tableau', 'Advanced Excel', 'Python (Pandas)', 'Business KPIs'],
    milestones: [
      {
        level: 'Foundation (Month 1-2)',
        title: 'Data Cleaning & Spreadsheet Modeling',
        skills: ['VLOOKUP/XLOOKUP', 'Pivot Tables & Power Query', 'Descriptive Statistics'],
        recommendedCourseIds: [],
        projectTitle: 'Multi-Store Retail Sales & Profitability Analysis in Excel',
        estimatedMonths: 2
      },
      {
        level: 'Intermediate (Month 3-4)',
        title: 'SQL & Database Querying',
        skills: ['Complex JOINs & Aggregations', 'Window Functions', 'Subqueries & CTEs'],
        recommendedCourseIds: [],
        projectTitle: 'E-commerce Customer Churn & Cohort Retention Analysis in PostgreSQL',
        estimatedMonths: 2
      },
      {
        level: 'Advanced (Month 5-6)',
        title: 'Power BI Executive Dashboards & Python',
        skills: ['DAX Calculations', 'Data Modeling (Star Schema)', 'Python Data Visualization (Seaborn)'],
        recommendedCourseIds: [],
        projectTitle: 'Interactive Executive Business KPI Dashboard with Automated Refresh',
        estimatedMonths: 2
      }
    ],
    topEmployers: ['Commercial Banks & Microfinance', 'FMCG & Logistics Companies', 'Telecommunications', 'Remote Data Consultancies'],
    freelancePotential: 'Steady demand from small & mid-sized businesses needing one-off dashboards ($400-$1,200).',
    remoteFeasibility: 'High remote feasibility with secure database connection credentials or anonymized exports.',
    resumeTips: [
      'Highlight specific business outcomes: "Identified ₦18M in abandoned cart revenue using SQL cohort analysis."',
      'Host interactive dashboard links (NovyPro, Tableau Public, or GitHub Pages).',
      'Show that you understand business metrics (LTV, CAC, MRR, Churn) not just raw formulas.'
    ],
    interviewQuestions: [
      {
        question: 'What is the difference between WHERE and HAVING in SQL?',
        answerGuidance: 'WHERE filters individual rows before aggregation occurs; HAVING filters grouped rows after the GROUP BY aggregation.'
      },
      {
        question: 'How do you handle missing or duplicate values in a large dataset before reporting?',
        answerGuidance: 'Discuss identifying root causes (data entry vs system bug), imputation strategies vs dropping records, documenting assumptions, and automated data quality checks.'
      }
    ]
  }
];

export const EARNING_GUIDES: EarningGuide[] = [
  {
    id: 'guide-freelancing',
    title: 'Winning Your First International Freelance Client',
    categoryName: 'Freelancing & Remote Work',
    method: 'Direct Client Pitching & Upwork Optimization',
    avgRateNGN: '₦20,000 – ₦50,000 / hour',
    avgRateUSD: '$25 – $65 / hour',
    platforms: ['Upwork', 'Contra', 'LinkedIn', 'Fiverr Pro', 'Direct Email Outreach'],
    actionSteps: [
      'Pick ONE specific skill to position yourself around (e.g., "React Next.js Developer for Fintech" rather than "General Web Developer").',
      'Complete 2 portfolio projects from SkillUp Academy and host them live with zero-friction demo links.',
      'Craft a personalized 3-sentence proposal focusing entirely on the client problem, not your life story.',
      'Send a short 60-second Loom video or mock design snippet to prove your competence upfront.',
      'Set up a verified multi-currency account (Geegpay, Grey, or Payoneer) to receive USD and NGN settlements smoothly.'
    ]
  },
  {
    id: 'guide-sme-web',
    title: 'Building Websites for Nigerian Businesses & SMEs',
    categoryName: 'Local Market Monetization',
    method: 'Local Business Outreach & Retainers',
    avgRateNGN: '₦250,000 – ₦800,000 / website',
    avgRateUSD: '$300 – $950 / website',
    platforms: ['Google Maps / Local Search', 'Instagram Business Pages', 'Warm Referrals', 'Chambers of Commerce'],
    actionSteps: [
      'Search Google Maps for local businesses (clinics, law firms, real estate agents, schools, restaurants) with poor or non-existent websites.',
      'Build a quick 1-page sample using Webflow or React demonstrating their branding, services, and WhatsApp contact button.',
      'Reach out directly to the business owner with a friendly message: "I noticed your clinic website takes 8 seconds to load on mobile. I made this quick improvement for you."',
      'Offer a complete package: Website + Paystack Payment Link + Google Business Profile Setup + ₦30k/month maintenance retainer.',
      'Deliver on time and ask for 2 referrals to other business owners in their network.'
    ]
  },
  {
    id: 'guide-ai-workflows',
    title: 'Selling AI Automation & Chatbots to Startups',
    categoryName: 'AI Services',
    method: 'Custom AI Integration Consulting',
    avgRateNGN: '₦400,000 – ₦1,500,000 / workflow',
    avgRateUSD: '$500 – $1,800 / workflow',
    platforms: ['X (Twitter)', 'LinkedIn', 'Product Hunt', 'Startup Communities'],
    actionSteps: [
      'Identify time-consuming repetitive processes in small businesses (customer inquiries, lead qualification, social copy generation, PDF data extraction).',
      'Build a working proof-of-concept using Gemini API, Make.com, or Python.',
      'Record a 90-second screen demo showing the automated workflow saving 10 hours of manual labor per week.',
      'Post case studies publicly on LinkedIn with clear before-and-after operational metrics.',
      'Charge a setup fee ($500 - $1,500) plus an ongoing monthly maintenance fee ($150/mo) for prompt updates and monitoring.'
    ]
  }
];
