/**
 * Codevertex Website — Prisma Seed
 *
 * Seeds:
 *  - All Digitika Academy courses (mirrors src/config/courses.ts)
 *  - Starter blog posts
 *
 * Run:  pnpm prisma db seed
 * Env:  DATABASE_URL must be set
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// ---------------------------------------------------------------------------
// Courses
// ---------------------------------------------------------------------------

interface CourseSeed {
  id: string;
  categoryId: string;
  name: string;
  shortName?: string;
  slug: string;
  duration: string;
  mode: string;
  price: number;
  currency: string;
  description: string;
  longDescription?: string;
  level: string;
  audience?: string;
  stack?: string;
  coverImage?: string;
  outcomes: string[];
  prerequisites: string[];
  careerPaths: string[];
  includes: string[];
  featured?: boolean;
  sortOrder: number;
}

const COURSES: CourseSeed[] = [
  // ── SOFTWARE ENGINEERING ──────────────────────────────────────────────────
  {
    id: 'code-starter',
    categoryId: 'software',
    name: 'Code-Starter — Introduction to Software Engineering',
    shortName: 'Code-Starter Bootcamp',
    slug: 'code-starter',
    duration: '10 weeks',
    mode: 'Hybrid (In-person Kisumu + Zoom)',
    price: 30000,
    currency: 'KES',
    level: 'beginner',
    featured: true,
    sortOrder: 1,
    coverImage: '/images/Code-starter-2.png',
    description:
      'Go from absolute beginner to confident junior developer in 10 weeks. Learn to code in 2 languages, build real projects, and earn 2 ICDL certifications.',
    longDescription:
      "Go from absolute beginner to confident junior developer in 10 weeks. You'll learn to code in 2 languages (Python and JavaScript), build real projects you can show employers, earn 2 ICDL certifications, and join a community of East African tech professionals. Delivered in a hybrid format — evening sessions in our Kisumu hub plus Zoom for flexibility. No prior experience required.",
    outcomes: [
      'Code in Python and JavaScript',
      'Build and deploy 3+ real web projects',
      'Earn 2 ICDL certifications',
      'Use Git, GitHub, and developer tools professionally',
      'Apply AI tools to accelerate your workflow',
    ],
    prerequisites: ['Basic computer literacy', 'Access to a laptop'],
    careerPaths: ['Junior Developer', 'Freelance Web Developer', 'ICT Support', 'Tech Entrepreneur'],
    includes: [
      '10 weeks of expert-led instruction',
      '2 ICDL exam vouchers',
      'Project portfolio (3 real projects)',
      'Career mentorship session',
      'Alumni network access',
      'Certificate of completion',
    ],
  },
  {
    id: 'fullstack',
    categoryId: 'software',
    name: 'Full-Stack Web Development',
    slug: 'fullstack',
    duration: '16 weeks',
    mode: 'Online & In-person',
    price: 45000,
    currency: 'KES',
    level: 'intermediate',
    sortOrder: 2,
    coverImage: '/images/coding.png',
    description:
      'Master modern full-stack web development with React, Node.js, and PostgreSQL. Build production-ready applications from database to deployment.',
    outcomes: [
      'Build full-stack React + Node.js applications',
      'Design and query relational databases',
      'Deploy to cloud platforms (Vercel, Railway)',
      'Implement authentication and REST APIs',
      'Apply agile development practices',
    ],
    prerequisites: ['Basic HTML/CSS knowledge', 'Familiarity with JavaScript'],
    careerPaths: ['Full-Stack Developer', 'Backend Engineer', 'Freelance Developer'],
    includes: ['16 weeks instruction', '5 capstone projects', 'Code review sessions', 'Alumni certificate'],
    stack: 'React, Node.js, Express, PostgreSQL, Prisma, Tailwind CSS',
  },
  {
    id: 'mobile-dev',
    categoryId: 'software',
    name: 'Mobile App Development',
    slug: 'mobile-dev',
    duration: '14 weeks',
    mode: 'Online & In-person',
    price: 38000,
    currency: 'KES',
    level: 'intermediate',
    sortOrder: 3,
    coverImage: '/images/coding.png',
    description:
      'Build cross-platform mobile apps for iOS and Android using React Native. Ship your first app to the Play Store by the end of the programme.',
    outcomes: [
      'Build cross-platform iOS & Android apps',
      'Publish to Google Play Store',
      'Integrate device APIs (camera, GPS, notifications)',
      'Connect to REST APIs and real-time backends',
    ],
    prerequisites: ['JavaScript fundamentals', 'Basic React knowledge preferred'],
    careerPaths: ['Mobile Developer', 'React Native Engineer', 'App Entrepreneur'],
    includes: ['14 weeks instruction', '3 mobile projects', 'Play Store deployment guide', 'Alumni certificate'],
    stack: 'React Native, Expo, TypeScript, Firebase',
  },
  {
    id: 'devops-cloud',
    categoryId: 'software',
    name: 'DevOps & Cloud Engineering',
    slug: 'devops-cloud',
    duration: '12 weeks',
    mode: 'Online',
    price: 42000,
    currency: 'KES',
    level: 'intermediate',
    sortOrder: 4,
    coverImage: '/images/coding.png',
    description:
      'Master CI/CD pipelines, container orchestration with Kubernetes, and cloud infrastructure on AWS and GCP.',
    outcomes: [
      'Containerise applications with Docker & Kubernetes',
      'Build CI/CD pipelines with GitHub Actions',
      'Provision cloud infrastructure with Terraform',
      'Monitor systems with Prometheus and Grafana',
    ],
    prerequisites: ['Linux command line basics', 'Basic programming knowledge'],
    careerPaths: ['DevOps Engineer', 'SRE', 'Cloud Architect', 'Platform Engineer'],
    includes: ['12 weeks instruction', 'Cloud lab environments', 'Terraform templates', 'Alumni certificate'],
    stack: 'Docker, Kubernetes, GitHub Actions, AWS, GCP, Terraform, Prometheus',
  },
  {
    id: 'cybersecurity',
    categoryId: 'software',
    name: 'Cybersecurity Fundamentals',
    slug: 'cybersecurity',
    duration: '10 weeks',
    mode: 'Online & In-person',
    price: 28000,
    currency: 'KES',
    level: 'beginner',
    sortOrder: 5,
    coverImage: '/images/IT Support Course.png',
    description:
      'Learn to protect systems and networks from cyber threats. Covers ethical hacking, network security, and industry-standard defence frameworks.',
    outcomes: [
      'Identify and mitigate common vulnerabilities',
      'Perform basic ethical hacking and pen testing',
      'Implement network security controls',
      'Apply OWASP and NIST frameworks',
    ],
    prerequisites: ['Basic networking knowledge', 'Computer literacy'],
    careerPaths: ['Security Analyst', 'Penetration Tester', 'IT Security Officer'],
    includes: ['10 weeks instruction', 'Kali Linux lab environment', 'Capture-the-Flag challenges', 'Certificate'],
    stack: 'Kali Linux, Wireshark, Metasploit, Burp Suite, Nmap',
  },
  {
    id: 'scratch-python',
    categoryId: 'software',
    name: 'Scratch & Python for Kids (Ages 8–12)',
    slug: 'scratch-python',
    duration: '8 weeks',
    mode: 'In-person Kisumu',
    price: 8000,
    currency: 'KES',
    level: 'beginner',
    audience: 'Ages 8–12',
    sortOrder: 6,
    coverImage: '/images/python-programming.png',
    description:
      'Young learners aged 8–12 build their first games and animations using Scratch, then graduate to Python basics in a fun, structured programme.',
    outcomes: [
      'Create animations and simple games in Scratch',
      'Write basic Python programs',
      'Develop computational thinking',
      'Build confidence with technology',
    ],
    prerequisites: ['Basic reading ability', 'Parental consent'],
    careerPaths: ['Future developer foundation', 'STEM pathway preparation'],
    includes: ['8 weeks instruction', 'Parent progress reports', 'Digital certificate', 'Coding portfolio'],
  },
  {
    id: 'web-design-teens',
    categoryId: 'software',
    name: 'Web Design for Teens (Ages 13–17)',
    slug: 'web-design-teens',
    duration: '8 weeks',
    mode: 'In-person Kisumu',
    price: 12000,
    currency: 'KES',
    level: 'beginner',
    audience: 'Ages 13–17',
    sortOrder: 7,
    coverImage: '/images/Code-starter-2.png',
    description:
      'Teens aged 13–17 learn HTML, CSS, and basic JavaScript to design and publish their own websites. Includes a final project and graduation showcase.',
    outcomes: [
      'Design responsive websites with HTML & CSS',
      'Apply basic JavaScript interactions',
      'Deploy a live website to the internet',
      'Present a tech project with confidence',
    ],
    prerequisites: ['Basic computer use', 'Parental consent'],
    careerPaths: ['Web Designer', 'Junior Developer pathway', 'Digital Entrepreneur'],
    includes: ['8 weeks instruction', 'Live portfolio website', 'Graduation showcase', 'Certificate'],
    stack: 'HTML5, CSS3, JavaScript, GitHub Pages',
  },
  {
    id: 'game-dev',
    categoryId: 'software',
    name: 'Game Development with Unity',
    slug: 'game-dev',
    duration: '10 weeks',
    mode: 'Online & In-person',
    price: 10000,
    currency: 'KES',
    level: 'beginner',
    audience: 'Ages 13+',
    sortOrder: 8,
    coverImage: '/images/coding.png',
    description:
      'Build 2D and 3D games with Unity and C#. Participants leave with a published mini-game and the skills to pursue a career in game development.',
    outcomes: [
      'Build 2D and 3D games in Unity',
      'Program game logic with C#',
      'Apply physics, animations, and audio',
      'Publish a game to itch.io or Google Play',
    ],
    prerequisites: ['Basic computer skills'],
    careerPaths: ['Game Developer', 'Interactive Media Designer', 'VR/AR Developer'],
    includes: ['10 weeks instruction', 'Unity Pro student license', 'Published game portfolio', 'Certificate'],
    stack: 'Unity, C#, Blender (basics)',
  },

  // ── ICDL ─────────────────────────────────────────────────────────────────
  {
    id: 'icdl-core',
    categoryId: 'icdl',
    name: 'ICDL Core Certification',
    slug: 'icdl-core',
    duration: '6 weeks',
    mode: 'In-person Kisumu + Online',
    price: 12000,
    currency: 'KES',
    level: 'beginner',
    sortOrder: 1,
    coverImage: '/images/ICDL-core-course.png',
    description:
      'Earn the globally recognised ICDL Core qualification covering computer essentials, Word, Excel, PowerPoint, and internet skills.',
    outcomes: [
      'Operate a computer with confidence',
      'Create documents, spreadsheets, and presentations',
      'Navigate the internet safely',
      'Pass the official ICDL Core exam',
    ],
    prerequisites: ['Basic computer literacy'],
    careerPaths: ['Office Professional', 'Admin Assistant', 'Any role requiring digital literacy'],
    includes: ['6 weeks instruction', '1 official ICDL exam voucher', 'Exam practice software', 'ICDL certificate'],
  },
  {
    id: 'icdl-advanced',
    categoryId: 'icdl',
    name: 'ICDL Advanced Certification',
    slug: 'icdl-advanced',
    duration: '8 weeks',
    mode: 'In-person Kisumu + Online',
    price: 18000,
    currency: 'KES',
    level: 'intermediate',
    sortOrder: 2,
    coverImage: '/images/ICDL-core-course.png',
    description:
      'Advance your digital skills with ICDL Advanced modules covering database management, advanced spreadsheets, and document production.',
    outcomes: [
      'Build and query databases with Access',
      'Use advanced Excel formulas and macros',
      'Produce professional documents with advanced Word features',
      'Pass the ICDL Advanced exam',
    ],
    prerequisites: ['ICDL Core certification or equivalent'],
    careerPaths: ['Data Entry Specialist', 'Business Analyst', 'Office Manager'],
    includes: ['8 weeks instruction', '1 ICDL Advanced exam voucher', 'Exam materials', 'Certificate'],
  },
  {
    id: 'icdl-professional',
    categoryId: 'icdl',
    name: 'ICDL Professional Certification',
    slug: 'icdl-professional',
    duration: '10 weeks',
    mode: 'In-person Kisumu + Online',
    price: 24000,
    currency: 'KES',
    level: 'advanced',
    sortOrder: 3,
    coverImage: '/images/ICDL-core-course.png',
    description:
      'The highest tier of ICDL qualification. Covers IT security, project management, and data science fundamentals for senior professionals.',
    outcomes: [
      'Apply IT security best practices',
      'Manage projects with digital tools',
      'Analyse data at a professional level',
      'Achieve the ICDL Professional qualification',
    ],
    prerequisites: ['ICDL Advanced or significant professional experience'],
    careerPaths: ['IT Manager', 'Project Manager', 'Senior Business Analyst'],
    includes: ['10 weeks instruction', '2 ICDL Professional exam vouchers', 'Project toolkit', 'Certificate'],
  },
  {
    id: 'icdl-digital-citizen',
    categoryId: 'icdl',
    name: 'ICDL Digital Citizen',
    slug: 'icdl-digital-citizen',
    duration: '3 weeks',
    mode: 'Online',
    price: 6500,
    currency: 'KES',
    level: 'beginner',
    sortOrder: 4,
    coverImage: '/images/ICDL-core-course.png',
    description:
      'A short, accessible programme for anyone who wants to use the internet safely and effectively — ideal for small business owners and community learners.',
    outcomes: [
      'Use email and social media safely',
      'Recognise and avoid online scams',
      'Conduct transactions safely online',
      'Protect personal data and privacy',
    ],
    prerequisites: ['Access to a smartphone or computer'],
    careerPaths: ['Digital literacy foundation for any career'],
    includes: ['3 weeks online content', 'ICDL Digital Citizen certificate', 'Online exam'],
  },

  // ── CCNA ─────────────────────────────────────────────────────────────────
  {
    id: 'ccna-1',
    categoryId: 'ccna',
    name: 'CCNA v7 — Part 1: Introduction to Networks',
    slug: 'ccna-1',
    duration: '8 weeks',
    mode: 'In-person Kisumu + Online',
    price: 22000,
    currency: 'KES',
    level: 'beginner',
    sortOrder: 1,
    coverImage: '/images/Cisco.png',
    description:
      'Build a solid foundation in networking fundamentals with the official Cisco CCNA v7 curriculum. Covers OSI model, TCP/IP, Ethernet, and basic switch/router configuration.',
    outcomes: [
      'Understand the OSI and TCP/IP models',
      'Configure basic Cisco switches and routers',
      'Implement VLANs and STP',
      'Troubleshoot common network issues',
    ],
    prerequisites: ['Basic IT knowledge'],
    careerPaths: ['Network Technician', 'IT Support', 'Junior Network Engineer'],
    includes: ['8 weeks instruction', 'Cisco Packet Tracer labs', 'CCNA Part 1 exam voucher', 'Certificate'],
    stack: 'Cisco Packet Tracer, IOS CLI',
  },
  {
    id: 'ccna-2',
    categoryId: 'ccna',
    name: 'CCNA v7 — Part 2: Switching, Routing & Wireless',
    slug: 'ccna-2',
    duration: '8 weeks',
    mode: 'In-person Kisumu + Online',
    price: 22000,
    currency: 'KES',
    level: 'intermediate',
    sortOrder: 2,
    coverImage: '/images/Cisco.png',
    description:
      'Deepen your networking knowledge with advanced routing protocols (OSPF, EIGRP), wireless LAN configuration, and inter-VLAN routing.',
    outcomes: [
      'Configure OSPF and static routing',
      'Set up wireless LANs and WLC',
      'Implement inter-VLAN routing',
      'Understand network security fundamentals',
    ],
    prerequisites: ['CCNA Part 1 or equivalent knowledge'],
    careerPaths: ['Network Engineer', 'Systems Administrator', 'NOC Technician'],
    includes: ['8 weeks instruction', 'Advanced Packet Tracer labs', 'CCNA Part 2 exam voucher', 'Certificate'],
    stack: 'Cisco Packet Tracer, IOS CLI, WLC',
  },
  {
    id: 'ccna-3',
    categoryId: 'ccna',
    name: 'CCNA v7 — Part 3: Enterprise Networking, Security & Automation',
    slug: 'ccna-3',
    duration: '8 weeks',
    mode: 'In-person Kisumu + Online',
    price: 22000,
    currency: 'KES',
    level: 'advanced',
    sortOrder: 3,
    coverImage: '/images/Cisco.png',
    description:
      'Complete the CCNA curriculum with WAN technologies, network security, QoS, and network automation with Python and REST APIs.',
    outcomes: [
      'Configure WAN and VPN technologies',
      'Apply QoS policies',
      'Automate networks with Python',
      'Prepare for the Cisco CCNA exam',
    ],
    prerequisites: ['CCNA Parts 1 and 2 or equivalent'],
    careerPaths: ['Network Engineer', 'Network Automation Engineer', 'CCNA-certified Professional'],
    includes: ['8 weeks instruction', 'Final Packet Tracer labs', 'CCNA Part 3 exam voucher', 'Certificate'],
    stack: 'Cisco Packet Tracer, Python, REST APIs',
  },
  {
    id: 'ccna-exam-prep',
    categoryId: 'ccna',
    name: 'CCNA Exam Prep Bootcamp',
    slug: 'ccna-exam-prep',
    duration: '4 weeks',
    mode: 'Online Intensive',
    price: 15000,
    currency: 'KES',
    level: 'advanced',
    sortOrder: 4,
    coverImage: '/images/Cisco.png',
    description:
      'Intensive exam preparation for the Cisco CCNA 200-301 certification. Practice exams, lab simulations, and targeted topic review.',
    outcomes: [
      'Master all CCNA exam objectives',
      'Complete timed practice exams',
      'Identify and close knowledge gaps',
      'Pass the CCNA 200-301 certification',
    ],
    prerequisites: ['Completed CCNA Parts 1–3 or equivalent experience'],
    careerPaths: ['CCNA-certified Network Engineer', 'Network Administrator'],
    includes: ['4 weeks intensive prep', '10+ practice exams', 'Lab simulation bank', 'Study guide PDF'],
  },

  // ── AI ────────────────────────────────────────────────────────────────────
  {
    id: 'ai-fundamentals',
    categoryId: 'ai',
    name: 'AI Fundamentals',
    slug: 'ai-fundamentals',
    duration: '6 weeks',
    mode: 'Online & In-person',
    price: 14000,
    currency: 'KES',
    level: 'beginner',
    sortOrder: 1,
    coverImage: '/images/python-programming.png',
    description:
      'No-code introduction to artificial intelligence. Understand how AI and machine learning work, and use AI tools to improve your productivity and career.',
    outcomes: [
      'Explain how AI and ML models work',
      'Use ChatGPT, Claude, and Gemini effectively',
      'Apply prompt engineering techniques',
      'Identify AI use cases in your industry',
    ],
    prerequisites: ['Basic computer literacy'],
    careerPaths: ['AI-powered professional in any field', 'AI Product Manager', 'Business Analyst'],
    includes: ['6 weeks instruction', 'AI tools access', 'Prompt engineering guide', 'Certificate'],
  },
  {
    id: 'ml-python',
    categoryId: 'ai',
    name: 'Machine Learning with Python',
    slug: 'ml-python',
    duration: '12 weeks',
    mode: 'Online & In-person',
    price: 32000,
    currency: 'KES',
    level: 'intermediate',
    sortOrder: 2,
    coverImage: '/images/python-programming.png',
    description:
      'Build and deploy machine learning models with Python, scikit-learn, and TensorFlow. From data preprocessing to model evaluation and deployment.',
    outcomes: [
      'Build supervised and unsupervised ML models',
      'Process and visualise datasets with pandas and matplotlib',
      'Deploy models via Flask REST APIs',
      'Apply ML to real business problems',
    ],
    prerequisites: ['Python programming basics', 'Basic statistics knowledge'],
    careerPaths: ['ML Engineer', 'Data Scientist', 'AI Developer'],
    includes: ['12 weeks instruction', '4 ML projects', 'Kaggle competition guide', 'Certificate'],
    stack: 'Python, scikit-learn, TensorFlow, pandas, NumPy, Jupyter',
  },
  {
    id: 'genai-llm',
    categoryId: 'ai',
    name: 'Generative AI & Large Language Models',
    slug: 'genai-llm',
    duration: '10 weeks',
    mode: 'Online',
    price: 38000,
    currency: 'KES',
    level: 'advanced',
    sortOrder: 3,
    coverImage: '/images/coding.png',
    description:
      'Deep-dive into LLMs, RAG pipelines, fine-tuning, and building production AI applications with the Anthropic and OpenAI APIs.',
    outcomes: [
      'Build RAG pipelines with vector databases',
      'Fine-tune and evaluate LLMs',
      'Deploy AI agents with tool use',
      'Integrate LLM APIs into production apps',
    ],
    prerequisites: ['Python proficiency', 'ML fundamentals or experience'],
    careerPaths: ['AI Engineer', 'LLM Developer', 'AI Product Builder'],
    includes: ['10 weeks instruction', 'API credits package', '3 AI app projects', 'Certificate'],
    stack: 'Python, LangChain, Anthropic API, OpenAI API, Pinecone, pgvector',
  },
  {
    id: 'ai-for-business',
    categoryId: 'ai',
    name: 'AI for Business & Leaders',
    slug: 'ai-for-business',
    duration: '3 weeks',
    mode: 'Online (Weekend sessions)',
    price: 9000,
    currency: 'KES',
    level: 'beginner',
    sortOrder: 4,
    coverImage: '/images/Codevertex-Digital-Marketing.jpg',
    description:
      "Designed for executives and managers who want to understand AI's impact on their industry and lead digital transformation initiatives confidently.",
    outcomes: [
      'Identify AI opportunities in your organisation',
      'Evaluate AI vendors and solutions',
      'Build a basic AI implementation roadmap',
      'Communicate AI strategy to stakeholders',
    ],
    prerequisites: ['Management or business experience', 'No coding required'],
    careerPaths: ['Digital Transformation Leader', 'AI Strategy Consultant', 'Operations Manager'],
    includes: ['3 weekend sessions', 'AI strategy canvas template', 'Peer group access', 'Certificate'],
  },

  // ── DATA ANALYTICS ────────────────────────────────────────────────────────
  {
    id: 'data-python',
    categoryId: 'data',
    name: 'Data Analytics with Python',
    slug: 'data-python',
    duration: '10 weeks',
    mode: 'Online & In-person',
    price: 28000,
    currency: 'KES',
    level: 'intermediate',
    sortOrder: 1,
    coverImage: '/images/python-programming.png',
    description:
      'Master data wrangling, visualisation, and statistical analysis with Python, pandas, and matplotlib. Build a data portfolio employers will love.',
    outcomes: [
      'Clean and analyse datasets with pandas',
      'Create compelling visualisations',
      'Apply statistical analysis techniques',
      'Build and present data dashboards',
    ],
    prerequisites: ['Basic Python knowledge', 'Basic statistics familiarity'],
    careerPaths: ['Data Analyst', 'Business Intelligence Analyst', 'Data Engineer'],
    includes: ['10 weeks instruction', '4 analysis projects', 'Portfolio review', 'Certificate'],
    stack: 'Python, pandas, NumPy, matplotlib, seaborn, Jupyter',
  },
  {
    id: 'data-powerbi',
    categoryId: 'data',
    name: 'Business Intelligence with Power BI',
    slug: 'data-powerbi',
    duration: '6 weeks',
    mode: 'Online & In-person',
    price: 16000,
    currency: 'KES',
    level: 'beginner',
    sortOrder: 2,
    coverImage: '/images/Codevertex-Digital-Marketing.jpg',
    description:
      'Build interactive dashboards and reports with Microsoft Power BI. Connect to live data sources and automate executive reporting.',
    outcomes: [
      'Create interactive Power BI dashboards',
      'Write DAX formulas for calculated metrics',
      'Connect to SQL, Excel, and API data sources',
      'Publish and share reports in Power BI Service',
    ],
    prerequisites: ['Excel familiarity', 'Basic data concepts'],
    careerPaths: ['BI Analyst', 'Reporting Analyst', 'Data Visualisation Specialist'],
    includes: ['6 weeks instruction', '3 dashboard projects', 'Power BI Desktop license', 'Certificate'],
    stack: 'Power BI Desktop, DAX, Power Query, SQL',
  },
  {
    id: 'data-sql',
    categoryId: 'data',
    name: 'SQL & Database Analytics',
    slug: 'data-sql',
    duration: '6 weeks',
    mode: 'Online',
    price: 12000,
    currency: 'KES',
    level: 'beginner',
    sortOrder: 3,
    coverImage: '/images/python-programming.png',
    description:
      'Learn to query, join, and aggregate data from relational databases using SQL. Essential for every data analyst and backend developer.',
    outcomes: [
      'Write complex SQL queries with JOINs and subqueries',
      'Design normalised database schemas',
      'Use window functions and CTEs',
      'Optimise slow queries with indexes',
    ],
    prerequisites: ['Basic computer skills'],
    careerPaths: ['Data Analyst', 'Database Administrator', 'Backend Developer'],
    includes: ['6 weeks instruction', 'PostgreSQL practice environment', 'Query library', 'Certificate'],
    stack: 'PostgreSQL, pgAdmin, DBeaver',
  },
  {
    id: 'data-advanced',
    categoryId: 'data',
    name: 'Advanced Data Analytics & Storytelling',
    slug: 'data-advanced',
    duration: '8 weeks',
    mode: 'Online',
    price: 22000,
    currency: 'KES',
    level: 'advanced',
    sortOrder: 4,
    coverImage: '/images/python-programming.png',
    description:
      'Combine statistical modelling, A/B testing, and data storytelling to turn raw data into decisions. Ideal for analysts ready to step up to senior roles.',
    outcomes: [
      'Apply A/B testing and hypothesis testing',
      'Build predictive models from business data',
      'Tell compelling data stories for executives',
      'Automate reporting pipelines',
    ],
    prerequisites: ['SQL proficiency', 'Basic Python or R', 'Data Analysis fundamentals'],
    careerPaths: ['Senior Data Analyst', 'Data Science Lead', 'Analytics Manager'],
    includes: ['8 weeks instruction', '2 real-world capstone projects', 'Peer review sessions', 'Certificate'],
    stack: 'Python, R, Tableau/Superset, SQL, Jupyter',
  },
];

// ---------------------------------------------------------------------------
// Blog posts (starter content)
// ---------------------------------------------------------------------------

interface BlogSeed {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  coverImage?: string;
  tags: string[];
  published: boolean;
  publishedAt: Date;
}

const BLOG_POSTS: BlogSeed[] = [
  {
    slug: 'closing-africas-digital-skills-gap',
    title: "Closing Africa's Digital Skills Gap — One Developer at a Time",
    excerpt:
      "Africa's tech talent shortage is real, but so is the opportunity. Here's how Digitika Academy is tackling the challenge from Kisumu.",
    content: `Africa's digital economy is growing at 12% annually, yet the continent faces a shortfall of over 600,000 qualified tech workers by 2030. At Codevertex, we believe the solution isn't just importing talent — it's building it locally.

## Why Kisumu?

Kisumu is Kenya's third-largest city, home to a vibrant university ecosystem with Maseno University, KCA University, and Great Lakes University of Kisumu. Yet historically, tech education here has lagged behind Nairobi. We saw an opportunity.

When we launched Digitika Academy in 2021, we started small — a single Code-Starter cohort of 12 students in a rented room at Pioneer House. Today, we've trained over 120 certified developers and certified 200+ corporate staff across ICDL and CCNA programmes.

## What Works

The biggest lesson: practical beats theoretical. Students who spend 70% of class time writing real code outperform those who spend the majority reading about it. Our 10-week Code-Starter bootcamp is built on this insight — every session produces something a student can show a potential employer.

ICDL certification has proven equally powerful. Many employers in East Africa now require ICDL Core as a baseline qualification for office roles. We're proud that our pass rate consistently exceeds 90%.

## What's Next

We're expanding our AI programme to meet surging demand from businesses navigating the generative AI transition. Our "AI for Business" weekend cohort sold out in 72 hours in its first run. We're adding a second cohort monthly.

The digital skills gap is real — but so is the ambition of East African learners. Our job is to meet that ambition with world-class instruction.

*— The Codevertex Team*`,
    author: 'Codevertex Editorial',
    coverImage: '/images/students.jpg',
    tags: ['education', 'digitika', 'africa', 'skills-gap'],
    published: true,
    publishedAt: new Date('2026-02-15'),
  },
  {
    slug: 'why-east-african-businesses-need-ai-now',
    title: 'Why East African Businesses Can No Longer Afford to Ignore AI',
    excerpt:
      'The AI transition is here — and businesses that adopt early will have an insurmountable advantage. Here is what you need to know.',
    content: `Artificial intelligence is no longer a Silicon Valley curiosity. It is reshaping logistics in Mombasa, customer service in Nairobi, and agriculture across the region. Businesses that adopt AI now will be years ahead of those who wait.

## The Reality Check

A Codevertex client — a regional logistics company — was spending KES 2.4M monthly on manual route planning and customer communication. After integrating our AI-powered platform, that cost dropped to KES 380,000. The difference? Automated route optimisation and an AI chat assistant handling 68% of customer queries without human intervention.

This isn't exceptional. It's what happens when any business applies the right AI tools to their real operational challenges.

## Three High-ROI AI Applications for East African Businesses

**1. Customer Support Automation**
AI chatbots trained on your knowledge base can handle repeat questions 24/7 — in Swahili, English, or both. No new hires required.

**2. Predictive Inventory Management**
Machine learning models analysing your historical sales data can predict stockouts 2–3 weeks in advance, reducing both waste and lost sales.

**3. Financial Reconciliation**
AI-powered bookkeeping tools can match M-Pesa receipts to invoices automatically — a task that takes a finance team hours every week.

## Getting Started

The barrier to AI adoption isn't technical sophistication — it's awareness and access to the right partners. Codevertex builds the AI systems and trains the teams to run them.

Ready to explore what AI can do for your business? [Contact our team](/contact) for a free discovery call.`,
    author: 'Codevertex Editorial',
    coverImage: '/images/team.jpg',
    tags: ['ai', 'business', 'east-africa', 'automation'],
    published: true,
    publishedAt: new Date('2026-03-10'),
  },
  {
    slug: 'power-suite-the-integrated-platform-for-african-enterprises',
    title: 'Power Suite: The Integrated Platform Built for African Enterprises',
    excerpt:
      'One login, one support team, one integrated platform — why fragmented software stacks are costing businesses more than they think.',
    content: `The average mid-sized East African business uses 11 separate software tools — many of which don't talk to each other. Finance uses a local accounting tool. The warehouse runs on Excel. Customer service lives in WhatsApp groups. HR is a tangle of spreadsheets.

The cost isn't just the subscription fees. It's the hours wasted reconciling data across systems, the errors from manual data entry, and the decisions made on incomplete information.

## What We Built

Codevertex Power Suite is a fully integrated collection of enterprise products that share a single authentication layer, a common data model, and a unified support team:

- **Ordering** — multi-tenant online ordering with real-time tracking
- **POS** — offline-capable point of sale for retail and hospitality
- **Books** — treasury, invoicing, and M-Pesa/Paystack payments
- **Inventory** — real-time stock and procurement management
- **MarketFlow CRM** — AI-powered marketing automation and lead management
- **Notifications** — SMS, email, and push notification delivery
- **Analytics** — Apache Superset BI dashboards on your live data

Every product uses the same SSO identity. A user with admin access to Ordering automatically has the right access to Books. One login, one support team.

## Built for African Realities

M-Pesa integration isn't a plugin — it's native. Offline-first POS means a slow connection doesn't stop a sale. Swahili support is built in, not bolted on.

We've deployed Power Suite for logistics companies, restaurants, universities, and government-affiliated training organisations. The question we always ask: "Does this work when the internet goes down or the power cuts out?" If the answer isn't yes, we keep building.

*Want to see Power Suite in action? [Book a demo](/contact) with our team.*`,
    author: 'Codevertex Editorial',
    coverImage: '/images/hub.jpg',
    tags: ['power-suite', 'enterprise', 'saas', 'integration'],
    published: true,
    publishedAt: new Date('2026-04-05'),
  },
];

// ---------------------------------------------------------------------------
// Seed runner
// ---------------------------------------------------------------------------

async function main() {
  console.log('🌱 Seeding Codevertex website database...');

  // Upsert courses
  console.log(`\n📚 Seeding ${COURSES.length} courses...`);
  for (const course of COURSES) {
    const data = { ...course, featured: course.featured ?? false };
    await prisma.course.upsert({
      where: { id: course.id },
      create: data,
      update: data,
    });
    console.log(`  ✓ ${course.name}`);
  }

  // Upsert blog posts
  console.log(`\n📝 Seeding ${BLOG_POSTS.length} blog posts...`);
  for (const post of BLOG_POSTS) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      create: post,
      update: post,
    });
    console.log(`  ✓ ${post.title}`);
  }

  console.log('\n✅ Seed complete.');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
