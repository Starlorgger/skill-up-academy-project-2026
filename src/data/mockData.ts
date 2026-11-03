import { SkillCategory, Course, LearningPath, Project } from '../types';

export const CATEGORIES: SkillCategory[] = [
  {
    id: 'ai-engineering',
    letter: 'A',
    title: 'Artificial Intelligence & AI Engineering',
    shortDescription: 'Master prompt engineering, LLMs, RAG, AI agents, Python for AI, and deep learning architectures.',
    fullDescription: 'From machine learning fundamentals to production agentic workflows and vector database architectures. Build production-grade AI applications, autonomous agents, and enterprise chatbots.',
    iconName: 'Brain',
    skills: [
      'Prompt Engineering',
      'LLM App Development',
      'AI Agents & Workflows',
      'Retrieval-Augmented Generation (RAG)',
      'Vector Databases & Embeddings',
      'Python for AI',
      'Neural Networks & Deep Learning',
      'Computer Vision & NLP',
      'Model Evaluation & Testing',
      'Responsible AI & Safety'
    ],
    courseCount: 12,
    featured: true
  },
  {
    id: 'software-development',
    letter: 'B',
    title: 'Software Development & Coding',
    shortDescription: 'Learn HTML, CSS, JavaScript, TypeScript, React, Next.js, Node.js, Python, and system architecture.',
    fullDescription: 'Full-stack software engineering from front-end user interfaces to scalable backend microservices, SQL databases, Git collaboration, algorithms, and clean software architecture.',
    iconName: 'Code',
    skills: [
      'JavaScript & TypeScript',
      'React & Next.js',
      'Node.js & Express APIs',
      'SQL & Relational Databases',
      'Python Backend',
      'Git & GitHub Workflows',
      'Data Structures & Algorithms',
      'System Architecture',
      'Automated Testing'
    ],
    courseCount: 16,
    featured: true
  },
  {
    id: 'mobile-app-development',
    letter: 'C',
    title: 'Mobile App Development',
    shortDescription: 'Build native and cross-platform apps for iOS and Android with Flutter, React Native, Kotlin, and Swift.',
    fullDescription: 'Create fast, responsive mobile experiences. Master state management, native device APIs, mobile UI ergonomics, testing, and store deployment for Google Play and Apple App Store.',
    iconName: 'Smartphone',
    skills: [
      'Flutter & Dart',
      'React Native',
      'Android with Kotlin',
      'iOS with Swift',
      'Mobile UX & Touch Ergonomics',
      'App Store Optimization & Release'
    ],
    courseCount: 8,
    featured: true
  },
  {
    id: 'website-no-code',
    letter: 'D',
    title: 'Website Development & No-Code Tools',
    shortDescription: 'Create high-converting websites, e-commerce stores, and custom portfolios using Webflow, WordPress, and Framer.',
    fullDescription: 'Empower clients with rapid web presence. Learn responsive layouts, domain configuration, client hand-off, SEO foundations, and visual database applications.',
    iconName: 'Layout',
    skills: [
      'WordPress & WooCommerce',
      'Webflow & Framer',
      'E-commerce Store Setup',
      'SEO-Friendly Web Architecture',
      'No-Code Workflow Automation'
    ],
    courseCount: 7
  },
  {
    id: 'data-science',
    letter: 'E',
    title: 'Data Science & Analytics',
    shortDescription: 'Transform raw data into strategic insights with SQL, Python, Excel, Power BI, and Tableau dashboards.',
    fullDescription: 'Data cleaning, exploratory data analysis, business intelligence dashboards, predictive statistical modeling, and compelling executive data storytelling.',
    iconName: 'BarChart2',
    skills: [
      'Advanced Excel & Google Sheets',
      'PostgreSQL & Analytics SQL',
      'Python (Pandas, NumPy, Seaborn)',
      'Power BI & Tableau',
      'Predictive Modeling & Statistics',
      'Executive Dashboards'
    ],
    courseCount: 9,
    featured: true
  },
  {
    id: 'cybersecurity-cloud',
    letter: 'F',
    title: 'Cybersecurity & Cloud Computing',
    shortDescription: 'Protect digital systems and scale workloads using AWS, Azure, Google Cloud, Docker, Kubernetes, and CI/CD.',
    fullDescription: 'Network defense, security audits, penetration testing in authorized environments, zero-trust architecture, cloud infrastructure, containerization, and DevOps pipelines.',
    iconName: 'Shield',
    skills: [
      'Network Security & Threat Analysis',
      'AWS & Google Cloud Fundamentals',
      'Docker & Container Orchestration',
      'CI/CD GitHub Actions',
      'Identity & Access Management (IAM)',
      'Incident Response'
    ],
    courseCount: 7
  },
  {
    id: 'graphic-design-creative',
    letter: 'G',
    title: 'Graphic Design & Creative Skills',
    shortDescription: 'Master brand identity, visual systems, Figma UI/UX, Canva, Adobe Photoshop, and Illustrator.',
    fullDescription: 'From fundamental typography and color theory to modern design systems, mobile app wireframing, high-fidelity prototypes, brand guidelines, and social campaign assets.',
    iconName: 'Figma',
    skills: [
      'Figma UI/UX Prototyping',
      'Design Systems & Tokens',
      'Brand Identity & Logo Craft',
      'Adobe Photoshop & Illustrator',
      'Canva for Business Marketing'
    ],
    courseCount: 11,
    featured: true
  },
  {
    id: 'video-editing-animation',
    letter: 'H',
    title: 'Video Editing & Animation',
    shortDescription: 'Produce captivating short-form reels, YouTube videos, and motion graphics with Premiere Pro, CapCut, and DaVinci.',
    fullDescription: 'Storytelling pacing, color grading, sound engineering, dynamic captions, kinetic typography, and multi-track motion editing for digital media.',
    iconName: 'Video',
    skills: [
      'CapCut & Short-Form Video',
      'Adobe Premiere Pro',
      'DaVinci Resolve Color Grading',
      'After Effects Motion Graphics',
      'Audio Clean-up & Dynamic Sound Design'
    ],
    courseCount: 6
  },
  {
    id: 'digital-marketing',
    letter: 'I',
    title: 'Digital Marketing & Growth',
    shortDescription: 'Drive customer acquisition with SEO, Google Ads, Meta Ads, email marketing funnels, and analytics.',
    fullDescription: 'Build predictable acquisition channels. Learn paid performance advertising, viral organic content, conversion rate optimization (CRO), and customer lifecycle retention.',
    iconName: 'TrendingUp',
    skills: [
      'Technical & On-Page SEO',
      'Meta & Google Ads Campaign Setup',
      'Email Automations (Klaviyo/ConvertKit)',
      'Conversion Rate Optimization',
      'Growth Funnel Architecture'
    ],
    courseCount: 8
  },
  {
    id: 'online-business',
    letter: 'J',
    title: 'Online Business & Entrepreneurship',
    shortDescription: 'Turn skills into thriving online businesses, validate digital products, and automate sales operations.',
    fullDescription: 'Customer discovery, pricing strategy, digital commerce, payment setup with Paystack & Stripe, business budgeting, and scalable client onboarding.',
    iconName: 'Briefcase',
    skills: [
      'Digital Product Validation',
      'E-commerce Store Operations',
      'Pricing & Sales Psychology',
      'Payment Gateway Integration',
      'Automated Business Systems'
    ],
    courseCount: 6
  },
  {
    id: 'freelancing-remote-work',
    letter: 'K',
    title: 'Freelancing & Remote Work',
    shortDescription: 'Find high-paying global clients on Upwork, write winning proposals, build portfolios, and earn remotely.',
    fullDescription: 'Everything required to establish an international freelance career: proposal templates, portfolio presentation, international payment methods, client boundaries, and retainer contracts.',
    iconName: 'Globe',
    skills: [
      'Upwork & Direct Client Sourcing',
      'Winning Proposal Frameworks',
      'High-Converting Portfolio Design',
      'Freelance Service Pricing & Retainers',
      'Cross-Border Remote Work Habits'
    ],
    courseCount: 7,
    featured: true
  },
  {
    id: 'writing-communication',
    letter: 'L',
    title: 'Writing & Communication',
    shortDescription: 'Master copywriting, technical documentation, business storytelling, and high-impact email communication.',
    fullDescription: 'Clarity, persuasion, and precision. Learn how to write compelling sales copy, developer documentation, pitch decks, and crisp professional updates.',
    iconName: 'PenTool',
    skills: [
      'Conversion Copywriting',
      'Technical Documentation',
      'Business Storytelling & Pitches',
      'Executive Email Communication'
    ],
    courseCount: 5
  },
  {
    id: 'ecommerce-sales',
    letter: 'M',
    title: 'E-commerce & Online Sales',
    shortDescription: 'Launch, market, and manage profitable online stores with Shopify, WooCommerce, and digital storefronts.',
    fullDescription: 'Product sourcing, shop setup, product photography curation, checkout optimization, shipping logistics, and customer retention strategies.',
    iconName: 'ShoppingBag',
    skills: [
      'Shopify & Store Architecture',
      'Product Listing & Visual Curation',
      'Order Fulfillment & Inventory',
      'Sales Funnel Optimization'
    ],
    courseCount: 5
  },
  {
    id: 'finance-productivity',
    letter: 'N',
    title: 'Finance & Digital Productivity',
    shortDescription: 'Organize your workflow and finances using Notion, Excel, Trello, Google Workspace, and automations.',
    fullDescription: 'Streamline business operations, track cash flow, manage team deliverables, and configure automated productivity dashboards in Notion and Asana.',
    iconName: 'CheckSquare',
    skills: [
      'Notion Systems for Teams',
      'Small Business Bookkeeping',
      'Automated Asana & Trello Boards',
      'Google Workspace Power Workflows'
    ],
    courseCount: 5
  },
  {
    id: 'emerging-tech',
    letter: 'O',
    title: 'Emerging & Specialized Technologies',
    shortDescription: 'Explore blockchain, Web3 smart contracts, IoT, game development in Unity, and 3D modeling.',
    fullDescription: 'Cutting-edge domains: Solidity smart contract development, Web3 decentralized front-ends, interactive 3D simulations, and robotics foundations.',
    iconName: 'Zap',
    skills: [
      'Solidity & Smart Contracts',
      'Web3 Frontend Integration',
      'Unity Game Engine Foundations',
      'IoT Sensor Architecture'
    ],
    courseCount: 4
  }
];

export const COURSES: Course[] = [
  {
    id: 'ai-prompt-engineering-mastery',
    title: 'Prompt Engineering & Generative AI for Builders',
    slug: 'ai-prompt-engineering-mastery',
    categoryId: 'ai-engineering',
    categoryName: 'Artificial Intelligence & AI Engineering',
    level: 'Beginner',
    durationHours: 12,
    priceNGN: 0,
    priceUSD: 0,
    isPremium: false,
    rating: 4.9,
    reviewsCount: 420,
    studentsCount: 3850,
    instructor: {
      name: 'Dr. Adeyemi Adeleke',
      role: 'Lead AI Engineer & Researcher',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      bio: 'Former senior ML engineer with 10+ years deploying NLP models and agentic workflows across Africa and Europe.'
    },
    thumbnail: '/src/assets/images/category_ai_engineering_1793158877489.jpg',
    description: 'Learn how to harness LLMs like Gemini 3, craft production prompt architectures, reduce hallucinations, and integrate AI APIs into functional web applications.',
    objectives: [
      'Understand how LLMs process tokens, temperature, and system contexts',
      'Implement few-shot, chain-of-thought, and structured JSON prompting',
      'Prevent prompt injection and manage hallucination guardrails',
      'Build a working client-side AI assistant using server-side Gemini API endpoints'
    ],
    prerequisites: ['Basic computer literacy', 'Curiosity for AI tools'],
    certificateAvailable: true,
    featured: true,
    trending: true,
    finalProjectTitle: 'Develop an AI-Powered Study Assistant & Chatbot',
    finalProjectId: 'project-ai-chatbot',
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: Foundations of Generative AI & Token Mechanics',
        lessons: [
          {
            id: 'les-1-1',
            title: 'How Large Language Models Work Under the Hood',
            objective: 'Understand tokenization, context windows, and probabilistic next-token generation.',
            durationMinutes: 18,
            type: 'text',
            videoUrl: 'https://www.youtube.com/embed/aircAruvnKk', // educational neural networks 3b1b embed
            writtenContent: `### Understanding Large Language Models
Large Language Models (LLMs) are deep neural networks trained on massive corpora of text. Rather than "thinking" in human terms, they calculate probability distributions over candidate tokens given a prior sequence.

#### 1. What is a Token?
A token is a sub-word chunk. On average, 1,000 tokens represent approximately 750 words in English. When you send a prompt:
1. The text is broken into numerical token IDs.
2. The model processes these through transformer attention layers.
3. The model outputs logits (raw unnormalized probabilities) for the subsequent token.

#### 2. Key Parameters You Control:
- **Temperature**: Controls randomness. Low temperature (e.g., 0.1 - 0.3) makes output focused and deterministic, ideal for code or JSON. High temperature (0.7 - 1.0) introduces creative variety.
- **Top-P (Nucleus Sampling)**: Dynamically selects tokens whose cumulative probability reaches P.
- **System Instructions**: Establishes the persona, behavioral boundaries, and output format before user prompts are evaluated.`,
            keyTakeaways: [
              'LLMs calculate token probabilities rather than storing static encyclopedic facts.',
              'Low temperature is vital for structured JSON and precise code generation.',
              'Tokens, not words, dictate context window consumption and API billing.'
            ],
            exercise: {
              title: 'Token & Prompt Optimization Exercise',
              prompt: 'Rewrite the following verbose user prompt to be concise, structured, and enforce strict JSON output with fields "summary" and "actionItems":\n"Hey can you please read this and give me a summary and tell me what things I need to do? Make sure it is JSON please."',
              starterCode: `// Optimized Prompt Template:
const systemInstruction = "You are a concise operational analyst...";
const prompt = \`Summarize the text below in valid JSON format...\`;`,
              hint: 'Specify the exact JSON schema and use unambiguous field names.',
              solutionNotes: 'A robust prompt uses explicit Schema specifications, system instructions, and zero-shot directives without conversational filler.'
            },
            quiz: {
              id: 'quiz-1-1',
              title: 'Module 1 Quiz: Core LLM Concepts',
              passingScorePercent: 80,
              questions: [
                {
                  id: 'q1',
                  question: 'What happens to LLM output when temperature is set to 0.1?',
                  options: [
                    'Output becomes highly unpredictable and creative',
                    'Output becomes nearly deterministic and favors high-probability tokens',
                    'The model generates responses twice as long',
                    'The context window limit is doubled'
                  ],
                  correctIndex: 1,
                  explanation: 'Low temperature flattens probability variance so the model consistently chooses the highest-likelihood tokens.'
                },
                {
                  id: 'q2',
                  question: 'Why is structured output (JSON) essential in software development with AI?',
                  options: [
                    'It makes the API response completely free of charge',
                    'It allows client and server code to reliably parse fields into data objects',
                    'It prevents the model from using memory',
                    'Browsers cannot render plain text'
                  ],
                  correctIndex: 1,
                  explanation: 'Predictable JSON schemas allow backend and frontend applications to consume AI output without brittle regex parsing.'
                }
              ]
            }
          },
          {
            id: 'les-1-2',
            title: 'Chain-of-Thought & Structured Few-Shot Prompting',
            objective: 'Master structured prompting techniques to drastically improve reasoning accuracy on complex tasks.',
            durationMinutes: 24,
            type: 'text',
            videoUrl: 'https://www.youtube.com/embed/jC4v5AS4RIM',
            writtenContent: `### Advanced Prompt Engineering Patterns

Prompt engineering is not about typing polite sentences; it is about providing clear constraints, reference anchors, and reasoning tracks.

#### 1. Few-Shot Demonstration
Instead of explaining rules abstractly, provide 2–3 concrete input/output pairs directly in the prompt. This anchors the model's pattern matching to your desired style and schema.

#### 2. Chain-of-Thought (CoT)
For multi-step arithmetic, logic, or code refactoring, instruct the model to "think step by step" or decompose the problem into sub-goals before writing the final solution.

#### 3. Role & Constraint Framing
\`\`\`text
You are a Senior TypeScript Architect reviewing pull requests.
Constraints:
- Identify security flaws first.
- Only propose backwards-compatible syntax.
- Return output formatted in Markdown tables.
\`\`\``,
            keyTakeaways: [
              'Few-shot examples consistently outperform lengthy descriptive rules.',
              'Chain-of-thought prompts provide intermediate tokens that guide subsequent reasoning.',
              'Negative constraints ("Do NOT do X") are best paired with positive alternatives ("Instead, do Y").'
            ],
            exercise: {
              title: 'Draft a Few-Shot Prompt for Sentiment Categorization',
              prompt: 'Create a 3-example few-shot prompt that classifies customer feedback into: POSITIVE, NEUTRAL, or CRITICAL_URGENT.',
              starterCode: `Input: "The checkout button crashed and charged my card twice!"
Classification: CRITICAL_URGENT

Input: "Delivery was 1 day early, thank you!"
Classification: POSITIVE`,
              hint: 'Include edge cases in your examples to guide borderline classifications.',
              solutionNotes: 'Few-shot prompts establish predictable classification syntax without ambiguity.'
            }
          }
        ]
      },
      {
        id: 'mod-2',
        title: 'Module 2: Building Production AI Applications',
        lessons: [
          {
            id: 'les-2-1',
            title: 'Server-Side API Integration & Security Guardrails',
            objective: 'Safely integrate AI SDKs into backend endpoints without leaking client credentials.',
            durationMinutes: 30,
            type: 'interactive',
            writtenContent: `### Secure Server-Side Architecture for AI

Never expose API keys in client-side React code. If an API key is shipped in client JavaScript, malicious users can extract it in seconds and exhaust your usage quotas.

#### Proper Flow:
1. Browser client sends a request to your Express/Next.js backend (\`POST /api/assistant/chat\`).
2. Server verifies user session and applies rate-limiting.
3. Server initializes the AI client with \`process.env.GEMINI_API_KEY\`.
4. Server streams or returns sanitized responses back to the browser.`,
            keyTakeaways: [
              'Always keep AI SDK credentials in server-side environment variables.',
              'Sanitize both user inputs and AI outputs to avoid prompt injection vulnerabilities.',
              'Implement fallback responses in case external AI endpoints experience latency spikes.'
            ],
            exercise: {
              title: 'Implement an Express AI Proxy Route',
              prompt: 'Review the architecture in server.ts and verify how user prompts are safely relayed to the Gemini client with system instructions.',
              starterCode: `app.post('/api/assistant/chat', async (req, res) => {
  const { message, history } = req.body;
  // Secure server-side call
});`,
              solutionNotes: 'The backend proxy provides logging, rate limits, and authentication checks.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'fullstack-web-dev-bootcamp',
    title: 'Modern Full-Stack Web Development: React, TypeScript & Node.js',
    slug: 'fullstack-web-dev-bootcamp',
    categoryId: 'software-development',
    categoryName: 'Software Development & Coding',
    level: 'Beginner',
    durationHours: 35,
    priceNGN: 15000,
    priceUSD: 12,
    isPremium: true,
    rating: 4.95,
    reviewsCount: 890,
    studentsCount: 6400,
    instructor: {
      name: 'Chioma Okonjo',
      role: 'Staff Frontend Engineer',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      bio: 'Staff engineer with 8 years building React micro-frontends and accessible component systems for fintech platforms.'
    },
    thumbnail: '/src/assets/images/category_web_dev_1793158878094.jpg',
    description: 'Learn modern web development from semantic HTML and Tailwind CSS to React 19, TypeScript, state management, Express backends, and full project deployment.',
    objectives: [
      'Write type-safe, maintainable TypeScript applications',
      'Build reactive, accessible UI components with Tailwind CSS',
      'Manage complex asynchronous state and API queries',
      'Deploy full-stack applications with production-grade security practices'
    ],
    prerequisites: ['Basic computer skills'],
    certificateAvailable: true,
    featured: true,
    trending: true,
    finalProjectTitle: 'Build a Personal Portfolio Website',
    finalProjectId: 'project-portfolio-website',
    modules: [
      {
        id: 'fs-mod-1',
        title: 'Module 1: Semantic HTML, Modern CSS & Tailwind Mastery',
        lessons: [
          {
            id: 'fs-les-1',
            title: 'Clean Architecture with Semantic HTML5 & Modern Layouts',
            objective: 'Build accessible, SEO-ready structural layouts using semantic tags and flexbox/grid.',
            durationMinutes: 25,
            type: 'text',
            videoUrl: 'https://www.youtube.com/embed/UB1O30fR-EE',
            writtenContent: `### Why Semantic Markup Matters
Semantic HTML informs search engines, assistive technologies (screen readers), and browsers about the exact role of every element.

- **\`<header>\`**: The introductory zone, brand title, and global navigation.
- **\`<main>\`**: The dominant central content unique to this document.
- **\`<section>\`**: Thematic grouping of content with a heading.
- **\`<article>\`**: Self-contained composition (e.g., blog post, course card).
- **\`<nav>\`**: Navigation landmark with accessible labels.`,
            keyTakeaways: [
              'Semantic HTML is the backbone of web accessibility and technical SEO.',
              'Prefer semantic elements over generic div tags.',
              'Ensure contrast ratios meet WCAG AA standards (4.5:1 minimum for body text).'
            ],
            exercise: {
              title: 'Convert Non-Semantic Markup',
              prompt: 'Identify three problems with: <div class="header"><div class="logo">SkillUp</div><div class="link">Home</div></div> and provide semantic equivalents.',
              starterCode: `<header class="flex items-center justify-between">
  <a href="/" class="font-bold text-lg">SkillUp</a>
  <nav><a href="/">Home</a></nav>
</header>`,
              solutionNotes: 'Semantic elements allow screen readers to navigate via landmark shortcuts.'
            }
          },
          {
            id: 'fs-les-2',
            title: 'Modern TypeScript: Interfaces, Generics & Strict Safety',
            objective: 'Master TypeScript typing to eliminate runtime bugs before compilation.',
            durationMinutes: 35,
            type: 'interactive',
            writtenContent: `### TypeScript Foundations for React

TypeScript transforms JavaScript development from guesswork into verified contracts.

\`\`\`typescript
interface CourseCardProps {
  id: string;
  title: string;
  durationHours: number;
  isPremium: boolean;
  onEnroll: (courseId: string) => void;
}
\`\`\`

#### Key Benefits:
1. **IntelliSense Autocomplete**: Instant discoverability of component props.
2. **Compile-Time Refactoring**: Renaming a field updates all references reliably.
3. **Documentation by Default**: Types serve as living documentation of API responses.`,
            keyTakeaways: [
              'Use interfaces for data entities and object contracts.',
              'Avoid using "any"; prefer unknown or specific generic types.',
              'Type your React component props and state variables explicitly.'
            ],
            exercise: {
              title: 'Define a Course Progress Type',
              prompt: 'Create a TypeScript interface for a student progress tracker including completed lessons array and completion timestamp.',
              starterCode: `export interface StudentProgress {
  userId: string;
  courseId: string;
  completedLessons: string[];
  updatedAt: string;
}`,
              solutionNotes: 'Strict types ensure UI components never render undefined state.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'figma-uiux-design-systems',
    title: 'Figma UI/UX Design & Commercial Brand Systems',
    slug: 'figma-uiux-design-systems',
    categoryId: 'graphic-design-creative',
    categoryName: 'Graphic Design & Creative Skills',
    level: 'Beginner',
    durationHours: 18,
    priceNGN: 10000,
    priceUSD: 8,
    isPremium: true,
    rating: 4.88,
    reviewsCount: 310,
    studentsCount: 2900,
    instructor: {
      name: 'Tariq Mansoor',
      role: 'Principal Product Designer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      bio: 'Design system lead who has built enterprise component libraries for international consumer apps.'
    },
    thumbnail: '/src/assets/images/category_creative_design_1793158879071.jpg',
    description: 'Master Figma from wireframing and auto-layout to component variants, interactive micro-prototypes, typography pairings, and design system tokens.',
    objectives: [
      'Master Figma Auto Layout and responsive constraint models',
      'Design comprehensive design systems with color and typography tokens',
      'Conduct user journey mapping and usability heuristics',
      'Deliver developer-ready Figma files with inspection specifications'
    ],
    prerequisites: ['No prior design experience needed'],
    certificateAvailable: true,
    featured: true,
    finalProjectTitle: 'Design a Business Logo & Brand Identity System',
    finalProjectId: 'project-brand-logo',
    modules: [
      {
        id: 'fig-mod-1',
        title: 'Module 1: Design Fundamentals, Color & Typography Hierarchy',
        lessons: [
          {
            id: 'fig-les-1',
            title: 'Visual Hierarchy & The 60-30-10 Color Rule',
            objective: 'Understand spatial contrast, visual dominance, and disciplined color budgeting in UI design.',
            durationMinutes: 20,
            type: 'text',
            writtenContent: `### The 60-30-10 Rule in UI Design

Great interfaces feel effortless because color is applied with purpose rather than decorative excess.

- **60% Dominant Neutral**: Clean canvas (e.g., #F8F9FC or deep navy).
- **30% Structural Balance**: Cards, hairline borders (#E5E8F0), secondary typography (#737B90).
- **10% High-Intent Accent**: Primary action buttons (#7057D9) and progress states (#35B8A0).

When you reserve strong accent colors strictly for interactive buttons and progress indicators, users never question what action to take next.`,
            keyTakeaways: [
              'Color should direct attention to primary user goals.',
              'High contrast between text and surface ensures readability under sunlight.',
              'Never rely on color alone to communicate system state.'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'freelancing-international-clients',
    title: 'Freelancing & Remote Work: From Zero to Global Clients',
    slug: 'freelancing-international-clients',
    categoryId: 'freelancing-remote-work',
    categoryName: 'Freelancing & Remote Work',
    level: 'Beginner',
    durationHours: 14,
    priceNGN: 0,
    priceUSD: 0,
    isPremium: false,
    rating: 4.92,
    reviewsCount: 540,
    studentsCount: 4600,
    instructor: {
      name: 'Blessing Eze',
      role: 'Top-Rated Freelance Consultant',
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
      bio: 'Earned over $250k on Upwork and direct international retainers. Mentored 1,000+ African freelancers.'
    },
    thumbnail: '/src/assets/images/hero_learning_students_1793158877350.jpg',
    description: 'Learn how to package your digital skills, build a magnetic portfolio, write proposals that win over 30% of bids, set competitive international rates, and receive payments safely in Nigeria and worldwide.',
    objectives: [
      'Create an irresistible Upwork profile and client-focused portfolio',
      'Write customized proposals that address client business risks directly',
      'Price services with value-based packages and monthly retainers',
      'Set up legitimate international payment gateways and contracts'
    ],
    prerequisites: ['One digital skill (coding, design, writing, or data)'],
    certificateAvailable: true,
    featured: true,
    trending: true,
    finalProjectTitle: 'Build a Winning Freelance Proposal & Portfolio Showcase',
    finalProjectId: 'project-freelance-portfolio',
    modules: [
      {
        id: 'fr-mod-1',
        title: 'Module 1: Positioning Your Digital Skill as a Solution',
        lessons: [
          {
            id: 'fr-les-1',
            title: 'Why Clients Hire: Shifting From Tasks to Business Outcomes',
            objective: 'Understand client psychology and write proposals that solve expensive business problems.',
            durationMinutes: 22,
            type: 'text',
            writtenContent: `### The Mind of the International Client

When a business owner searches for a freelancer, they are not buying "5 hours of React code" or "a Figma file." They are buying:
1. **Time back** to focus on their core business.
2. **Confidence** that the project will launch on time without drama.
3. **Increased revenue or conversion** from their digital presence.

#### The 3-Sentence Hook for Proposals:
- **Sentence 1**: Acknowledge the core challenge in their posting in your own words.
- **Sentence 2**: State the exact approach you will use to solve it and past results.
- **Sentence 3**: Provide a 1-line link to a directly relevant sample and ask an engaging qualifying question.`,
            keyTakeaways: [
              'Never start a proposal with "I am a passionate developer with X years of experience."',
              'Focus 80% of your proposal on the client and their project outcome.',
              'Provide clear timeline estimates and a fixed, transparent milestone breakdown.'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'data-analytics-sql-python',
    title: 'Data Analytics Mastery: SQL, Python, Excel & Power BI',
    slug: 'data-analytics-sql-python',
    categoryId: 'data-science',
    categoryName: 'Data Science & Analytics',
    level: 'Beginner',
    durationHours: 24,
    priceNGN: 12000,
    priceUSD: 10,
    isPremium: true,
    rating: 4.89,
    reviewsCount: 380,
    studentsCount: 3100,
    instructor: {
      name: 'Ibrahim Bello',
      role: 'Senior Analytics Manager',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      bio: 'Analytics lead specialized in financial modeling, SQL pipelines, and Power BI executive dashboards.'
    },
    thumbnail: '/src/assets/images/category_web_dev_1793158878094.jpg',
    description: 'Transform messy raw spreadsheets into strategic business intelligence. Learn SQL querying, Python data wrangling, and interactive Power BI dashboards.',
    objectives: [
      'Write complex SQL queries with JOINs, aggregations, and window functions',
      'Clean and normalize dirty datasets using Python and Pandas',
      'Design interactive Power BI and Excel dashboards for executive teams',
      'Communicate data-driven business insights through visual storytelling'
    ],
    prerequisites: ['Basic Excel familiarity'],
    certificateAvailable: true,
    finalProjectTitle: 'Create an Executive Sales & Revenue Dashboard',
    finalProjectId: 'project-sales-dashboard',
    modules: [
      {
        id: 'da-mod-1',
        title: 'Module 1: Relational Databases & Analytical SQL',
        lessons: [
          {
            id: 'da-les-1',
            title: 'Mastering SQL SELECT, WHERE, GROUP BY & HAVING',
            objective: 'Query relational tables and calculate core business metrics.',
            durationMinutes: 28,
            type: 'text',
            writtenContent: `### Analytical SQL Syntax
SQL is the language of business data. In this lesson, you will master the query execution lifecycle:

\`\`\`sql
SELECT 
  category_id,
  COUNT(id) AS total_orders,
  SUM(total_amount_ngn) AS revenue_ngn,
  ROUND(AVG(total_amount_ngn), 2) AS aov_ngn
FROM orders
WHERE status = 'completed' AND created_at >= '2026-01-01'
GROUP BY category_id
HAVING SUM(total_amount_ngn) > 500000
ORDER BY revenue_ngn DESC;
\`\`\``,
            keyTakeaways: [
              'WHERE filters individual records before aggregation.',
              'HAVING filters grouped aggregates after GROUP BY.',
              'Always calculate meaningful business metrics like Average Order Value (AOV).'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'mobile-app-react-native',
    title: 'Cross-Platform Mobile App Development with React Native & Expo',
    slug: 'mobile-app-react-native',
    categoryId: 'mobile-app-development',
    categoryName: 'Mobile App Development',
    level: 'Intermediate',
    durationHours: 20,
    priceNGN: 15000,
    priceUSD: 12,
    isPremium: true,
    rating: 4.91,
    reviewsCount: 220,
    studentsCount: 1980,
    instructor: {
      name: 'Emeka Nwosu',
      role: 'Mobile Solutions Architect',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      bio: 'Mobile architect with 7 apps published to Google Play and Apple App Store, with 1M+ active users.'
    },
    thumbnail: '/src/assets/images/category_ai_engineering_1793158877489.jpg',
    description: 'Build native iOS and Android apps using React Native and Expo. Learn touch gestures, offline data caching, camera integration, and app store release workflows.',
    objectives: [
      'Create native touch UI with React Native components and StyleSheet',
      'Implement smooth navigation with Expo Router and stack navigation',
      'Integrate device hardware APIs: camera, push notifications, and geolocation',
      'Bundle and submit mobile APKs to Google Play Store and Apple TestFlight'
    ],
    prerequisites: ['Solid React and JavaScript fundamentals'],
    certificateAvailable: true,
    finalProjectTitle: 'Develop a Cross-Platform Task & Habit Tracker',
    finalProjectId: 'project-mobile-app',
    modules: [
      {
        id: 'rn-mod-1',
        title: 'Module 1: React Native Core Components & Ergonomics',
        lessons: [
          {
            id: 'rn-les-1',
            title: 'Touch Hitboxes, Safe Areas & Native Layouts',
            objective: 'Design mobile layouts that fit notch displays and adhere to 44px touch targets.',
            durationMinutes: 25,
            type: 'text',
            writtenContent: `### Mobile Ergonomics & Native Components

Mobile users interact with their thumbs. Interfaces must account for:
- **SafeAreaView**: Ensures content does not render behind notches or home indicators.
- **Minimum 44x44px touch targets**: Prevents frustrating mis-taps.
- **Thumb Zone Design**: Keep primary actions in the lower 40% of the screen.`,
            keyTakeaways: [
              'Always test layout on both small (375px) and large mobile viewports.',
              'Never hide primary navigation tabs in deep dropdown menus on mobile.',
              'Ensure keyboard dismissal when tapping outside form inputs.'
            ]
          }
        ]
      }
    ]
  }
];

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'path-beginner-to-web-dev',
    title: 'Beginner to Full-Stack Web Developer',
    slug: 'beginner-to-web-developer',
    tagline: 'Go from zero programming knowledge to building and deploying full-stack web applications.',
    description: 'A structured, progressive roadmap designed to take you from HTML & CSS basics to building scalable React & Node.js web applications, integrating databases, and deploying live production software.',
    level: 'Beginner',
    totalDurationWeeks: 12,
    courseIds: ['fullstack-web-dev-bootcamp', 'ai-prompt-engineering-mastery'],
    primaryProjectId: 'project-portfolio-website',
    careerOutcomes: [
      'Junior Full-Stack Developer',
      'Frontend React Engineer',
      'Freelance Web Specialist'
    ]
  },
  {
    id: 'path-beginner-to-ai-engineer',
    title: 'Beginner to AI Engineer',
    slug: 'beginner-to-ai-engineer',
    tagline: 'Master generative AI, prompt engineering, RAG, and autonomous agent systems.',
    description: 'Step into the highest-demand technological frontier. Learn how to engineer prompts, build vector search systems, and deploy agentic workflows connected to real-world APIs.',
    level: 'Intermediate',
    totalDurationWeeks: 10,
    courseIds: ['ai-prompt-engineering-mastery', 'fullstack-web-dev-bootcamp'],
    primaryProjectId: 'project-ai-chatbot',
    careerOutcomes: [
      'AI Application Engineer',
      'Generative AI Specialist',
      'AI Workflow Architect'
    ]
  },
  {
    id: 'path-freelancing-starter',
    title: 'Freelancing & Global Remote Work',
    slug: 'freelancing-starter-path',
    tagline: 'Package your digital skills, land international clients, and earn in foreign currency.',
    description: 'Learn the exact systems, proposal templates, portfolio structures, and negotiation frameworks needed to earn a sustainable remote income from anywhere in the world.',
    level: 'Beginner',
    totalDurationWeeks: 4,
    courseIds: ['freelancing-international-clients', 'figma-uiux-design-systems'],
    primaryProjectId: 'project-freelance-portfolio',
    careerOutcomes: [
      'Independent Digital Consultant',
      'Global Remote Freelancer',
      'Agency Founder'
    ]
  },
  {
    id: 'path-data-analyst-foundations',
    title: 'Data Analyst Foundations',
    slug: 'data-analyst-foundations',
    tagline: 'Turn data into high-value executive intelligence with SQL, Python, and Power BI.',
    description: 'Companies worldwide need data analysts to make sense of numbers. Learn data cleaning, SQL query pipelines, and interactive executive reporting.',
    level: 'Beginner',
    totalDurationWeeks: 8,
    courseIds: ['data-analytics-sql-python'],
    primaryProjectId: 'project-sales-dashboard',
    careerOutcomes: [
      'Business Intelligence Analyst',
      'Junior Data Analyst',
      'Operations Reporting Specialist'
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'project-portfolio-website',
    title: 'Build a Personal Developer Portfolio Website',
    categoryId: 'software-development',
    courseId: 'fullstack-web-dev-bootcamp',
    courseTitle: 'Modern Full-Stack Web Development',
    objective: 'Create and deploy a responsive, accessible personal portfolio showcasing your skills, completed projects, and a working contact form.',
    difficulty: 'Beginner',
    estimatedHours: 8,
    requiredSkills: ['HTML5', 'CSS3 / Tailwind', 'Responsive Design', 'Git & GitHub Pages'],
    instructions: [
      'Draft a clean 3-zone layout with Header, Hero, Projects Gallery, Skills Matrix, and Contact Form.',
      'Ensure the design is fully mobile-responsive across 375px to 1440px viewports.',
      'Deploy the live site to GitHub Pages, Vercel, or Netlify with working links.',
      'Submit the live URL and GitHub repository link for instructor review.'
    ],
    resources: [
      { title: 'Tailwind CSS Documentation', url: 'https://tailwindcss.com' },
      { title: 'Responsive Design Checklist', url: 'https://web.dev/learn/design' }
    ],
    rubric: [
      { criterion: 'Mobile Responsiveness & Layout Integrity', points: 30 },
      { criterion: 'Clean Semantic HTML & Accessibility Standards', points: 25 },
      { criterion: 'Working Project Links & Contact Form Handlers', points: 25 },
      { criterion: 'Typography & Visual Hierarchy Balance', points: 20 }
    ]
  },
  {
    id: 'project-ai-chatbot',
    title: 'Develop an AI-Powered Study Assistant & Chatbot',
    categoryId: 'ai-engineering',
    courseId: 'ai-prompt-engineering-mastery',
    courseTitle: 'Prompt Engineering & Generative AI for Builders',
    objective: 'Build an interactive web application that helps students study a topic, asks them practice questions, and provides structured feedback.',
    difficulty: 'Intermediate',
    estimatedHours: 12,
    requiredSkills: ['Gemini API', 'TypeScript', 'Server-Side API Routes', 'State Management'],
    instructions: [
      'Create a backend proxy endpoint that sends prompts to Gemini using safe system instructions.',
      'Build a chat UI with streaming responses, clear question prompts, and hint buttons.',
      'Add controls allowing the user to pick difficulty level (Beginner vs Advanced).',
      'Test for error handling when API limits or network issues occur.'
    ],
    resources: [
      { title: 'Google GenAI SDK Guide', url: 'https://ai.google.dev' },
      { title: 'Prompt Engineering Patterns', url: 'https://learnprompting.org' }
    ],
    rubric: [
      { criterion: 'Secure Server-Side API Architecture', points: 35 },
      { criterion: 'Effective System Instructions & Pedagogical Framing', points: 25 },
      { criterion: 'Error Handling & Graceful Fallback Mode', points: 20 },
      { criterion: 'Responsive, Accessible Chat Interface', points: 20 }
    ]
  },
  {
    id: 'project-sales-dashboard',
    title: 'Create an Executive Sales & Revenue Dashboard',
    categoryId: 'data-science',
    courseId: 'data-analytics-sql-python',
    courseTitle: 'Data Analytics Mastery: SQL, Python & Power BI',
    objective: 'Analyze an e-commerce sales dataset and build an interactive dashboard displaying MRR, AOV, churn, and product category breakdowns.',
    difficulty: 'Beginner',
    estimatedHours: 10,
    requiredSkills: ['SQL', 'Data Cleaning', 'Dashboard Design', 'Data Storytelling'],
    instructions: [
      'Write SQL queries to aggregate sales data by month, customer cohort, and product category.',
      'Construct high-contrast KPI cards for Gross Revenue, Net Profit, and Order Volume.',
      'Add date range and category filter controls with dynamic metric recalculation.',
      'Write a 200-word executive summary highlighting recommendations.'
    ],
    resources: [
      { title: 'SQL Joins & Aggregations Guide', url: 'https://mode.com/sql-tutorial' }
    ],
    rubric: [
      { criterion: 'Query Accuracy & Metric Formulas', points: 35 },
      { criterion: 'Visual Clarity & Tabular Figures', points: 25 },
      { criterion: 'Actionable Executive Summary Insights', points: 25 },
      { criterion: 'Filter Interactivity', points: 15 }
    ]
  },
  {
    id: 'project-brand-logo',
    title: 'Design a Business Logo & Brand Identity System',
    categoryId: 'graphic-design-creative',
    courseId: 'figma-uiux-design-systems',
    courseTitle: 'Figma UI/UX Design & Commercial Brand Systems',
    objective: 'Design a complete commercial brand guide in Figma for a modern African or international tech startup, including logo, color tokens, typography, and social banners.',
    difficulty: 'Beginner',
    estimatedHours: 6,
    requiredSkills: ['Figma', 'Typography Pairing', 'Vector Pen Tool', 'Brand Guidelines'],
    instructions: [
      'Create primary logo mark, secondary horizontal lockup, and favicon variations.',
      'Define a 60-30-10 color palette with HEX codes and accessibility contrast ratios.',
      'Select and pair a display font with a readable body font.',
      'Showcase the brand on 2 real-world mockups (business card and mobile app header).'
    ],
    resources: [
      { title: 'Figma Community Resources', url: 'https://figma.com/community' }
    ],
    rubric: [
      { criterion: 'Logo Scalability & Simplicity', points: 30 },
      { criterion: 'Color Harmony & Contrast Verification', points: 25 },
      { criterion: 'Consistent Brand Guidelines Presentation', points: 25 },
      { criterion: 'Real-World Mockup Application', points: 20 }
    ]
  },
  {
    id: 'project-freelance-portfolio',
    title: 'Build a Winning Freelance Proposal & Portfolio Showcase',
    categoryId: 'freelancing-remote-work',
    courseId: 'freelancing-international-clients',
    courseTitle: 'Freelancing & Remote Work: From Zero to Global Clients',
    objective: 'Prepare 3 high-converting proposal scripts, an optimized service package sheet, and a live portfolio case study showcasing your best work.',
    difficulty: 'Beginner',
    estimatedHours: 6,
    requiredSkills: ['Copywriting', 'Portfolio Presentation', 'Pricing Strategy', 'Client Communication'],
    instructions: [
      'Identify your primary niche skill and craft a 1-sentence value proposition.',
      'Write 3 tailored proposals targeting specific simulated job postings.',
      'Define 3 service tiers (Basic, Standard, Premium Retainer) with clear deliverables.',
      'Include 2 client case studies with Problem, Solution, and Measurable Outcome.'
    ],
    resources: [
      { title: 'Freelance Rate Calculator', url: 'https://skillupacademy.com/tools/pricing' }
    ],
    rubric: [
      { criterion: 'Client-Centered Proposal Framing', points: 35 },
      { criterion: 'Value-Based Pricing Clarity', points: 25 },
      { criterion: 'Case Study Measurable Results', points: 25 },
      { criterion: 'Professional Polish & Presentation', points: 15 }
    ]
  }
];
