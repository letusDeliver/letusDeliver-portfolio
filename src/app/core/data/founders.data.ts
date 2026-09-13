import { Founder } from '../models';

/**
 * Founder facts are sourced directly from each founder's resume.
 * Do not add claims, metrics or technologies not present in the source
 * resumes. Contact details are intentionally omitted from public content —
 * the site routes inquiries through /start-a-project instead.
 */
export const FOUNDERS: Founder[] = [
  {
    slug: 'kunal',
    name: 'Kunal',
    role: 'Co-Founder · Full-Stack & Frontend Architect',
    yearsExperience: '4.5+ years',
    photoUrl: '/images/kunal-profile.jpg',
    summary:
      'Senior Software Engineer with 4.5+ years of experience designing and building enterprise-scale web applications with Angular (v12–v21), TypeScript, RxJS and Signals. Deep expertise in component-driven and standalone architecture, reactive state patterns, performance optimization and accessibility (WCAG/ARIA), with production experience delivering PrimeNG- and Angular Material-based UI in Agile teams. Complements frontend depth with hands-on backend engineering (Node.js, Express, PostgreSQL/Prisma, JWT auth, RBAC) and enterprise micro-frontend architecture (Native Federation), built through self-directed, production-grade engineering projects.',
    philosophy:
      'Uses AI-assisted / agentic development workflows (Claude Code) as a working practice for codebase analysis, refactoring and documentation — not as a novelty, but as a lever for engineering velocity and quality. Experienced mentoring developers and owning features end-to-end.',
    expertise: [
      'Angular standalone & component-driven architecture',
      'Signal-based reactive state',
      'Frontend performance optimization',
      'Accessibility (WCAG/ARIA)',
      'Micro-frontend architecture (Native Federation)',
      'Backend & API engineering (Node.js, Express, PostgreSQL)',
    ],
    technologies: [
      {
        category: 'Frontend',
        items: ['Angular (v12–v21)', 'TypeScript', 'JavaScript (ES6+)', 'RxJS', 'Signals', 'HTML5', 'CSS3', 'Bootstrap'],
      },
      { category: 'UI Libraries', items: ['PrimeNG', 'Angular Material', 'Tailwind CSS'] },
      {
        category: 'Architecture & Patterns',
        items: [
          'Standalone APIs',
          'Component-Based Architecture',
          'Reactive & Template-Driven Forms',
          'Lazy Loading',
          'Route Guards',
          'HTTP Interceptors',
          'OnPush Change Detection',
          'Dependency Injection',
          'Custom Directives & Pipes',
          'Micro-Frontends (Native Federation)',
          'Signal-Based State',
          'Basic NgRx',
        ],
      },
      {
        category: 'Backend',
        items: ['Node.js', 'Express', 'PostgreSQL', 'Prisma ORM', 'REST API Design', 'JWT Authentication', 'RBAC/Permission Modeling', 'Zod Validation'],
      },
      {
        category: 'Quality & Accessibility',
        items: ['Accessibility (WCAG/ARIA)', 'Performance Optimization', 'Jasmine', 'Karma', 'Vitest', 'Unit Testing'],
      },
      { category: 'Tools & Practices', items: ['Git', 'GitHub', 'Angular CLI', 'Agile/Scrum', 'Code Review', 'Team Mentoring', 'OpenAPI/Swagger'] },
      { category: 'AI-Assisted Development', items: ['Claude Code (agent-driven feature workflows, codebase analysis, refactoring, documentation generation)'] },
    ],
    experience: [
      {
        role: 'Senior Software Engineer',
        organization: 'Nuage Biztech',
        period: 'Sep 2025 – Present',
        highlights: [
          'Developing enterprise applications using Angular standalone architecture and modern frontend engineering practices.',
          'Implemented accessibility improvements using semantic HTML and ARIA, raising WCAG conformance across application modules.',
          'Built reusable Angular and PrimeNG components, reducing duplicated UI logic and improving maintainability across modules.',
          'Mentors junior developers and contributes to feature planning, code review, and sprint delivery.',
        ],
      },
      {
        role: 'Custom Software Engineering Senior Analyst',
        organization: 'Accenture',
        period: 'Dec 2024 – Jul 2025',
        highlights: [
          'Built enterprise feature modules using Angular standalone component architecture, removing NgModule boilerplate and clarifying module boundaries.',
          'Implemented NgRx state management and RxJS reactive patterns to enforce predictable, unidirectional data flow across features.',
          'Integrated REST APIs with structured error handling and retry mechanisms, improving resilience to transient network failures.',
          'Delivered features within Agile/Scrum sprint cycles, collaborating cross-functionally with QA and design.',
        ],
      },
      {
        role: 'Software Engineer',
        organization: 'Triazine Software',
        period: 'Dec 2023 – Nov 2024',
        highlights: [
          'Developed Angular applications and profiled rendering/change-detection behavior to identify performance bottlenecks.',
          'Improved page performance by approximately 20% through targeted optimization (lazy loading, OnPush strategy, bundle size reduction).',
          'Built dynamic, schema-driven forms and reusable components adopted across multiple application modules.',
        ],
      },
      {
        role: 'Software Engineer',
        organization: 'KMG',
        period: 'Jul 2021 – Dec 2023',
        highlights: [
          'Built and maintained Angular applications across the full feature lifecycle, from implementation through production support.',
          'Diagnosed and resolved production issues, improving application stability and reducing recurring defects.',
          'Integrated REST APIs and delivered responsive, cross-device UI components.',
        ],
      },
    ],
    projectSlugs: [
      'enterprise-micro-frontend-shell',
      'employee-management-system',
      'multi-tenant-hospital-management-system',
      'donezo',
      'personal-portfolio',
    ],
    certifications: [
      { name: 'Angular', issuer: 'Sololearn', date: 'Aug 2025' },
      { name: 'Introduction to Programming Using JavaScript', issuer: 'LetsUpgrade', date: 'Sep 2023' },
      { name: 'SQL', issuer: 'Sololearn', date: 'Jul 2020' },
      { name: 'Introduction to Programming Using Python', issuer: 'Sololearn', date: 'Jul 2020' },
    ],
    education: {
      degree: 'B.E, Computer Science Engineering',
      institution: 'Sant Longowal Institute of Engineering and Technology',
      year: '2021',
    },
  },
  {
    slug: 'mrityunjay',
    name: 'Mrityunjay',
    role: 'Co-Founder · Python & Cloud Engineer',
    yearsExperience: '4+ years',
    photoUrl: '/images/mrityunjay-profile.jpg',
    summary:
      'Senior Python Backend Engineer with 4+ years of experience architecting scalable backend services, REST APIs, cloud-native data platforms and CI/CD pipelines across 20+ production projects. Core strengths in API design, database optimization, cloud data processing, production reliability, Docker containerization and secure CI/CD delivery.',
    philosophy:
      'Currently engineering enterprise backend and cloud services for The Home Depot (via Insight Global), building Python/FastAPI services on GCP with BigQuery, Cloud Storage and Datastore.',
    expertise: [
      'Python backend engineering (FastAPI, Django, Flask)',
      'Cloud-native data platforms (GCP: BigQuery, Cloud Storage, Datastore)',
      'REST API design & database optimization',
      'CI/CD pipelines (GitHub Actions, Jenkins) & Docker containerization',
      'ETL & data processing (Apache Airflow, Pandas)',
      'Production reliability & incident response',
    ],
    technologies: [
      { category: 'Backend', items: ['Python', 'FastAPI', 'Django', 'Django REST Framework', 'Flask', 'Celery', 'REST APIs', 'Microservices'] },
      { category: 'Auth & Security', items: ['JWT', 'RBAC', 'API Permissions', 'Security Scanning'] },
      { category: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Neo4j', 'Google Cloud Datastore'] },
      { category: 'Cloud', items: ['GCP (BigQuery, Cloud Storage, Datastore)', 'AWS (EC2, S3, Lambda)'] },
      { category: 'DevOps & CI/CD', items: ['Docker', 'GitHub Actions', 'Jenkins', 'Git', 'GitLab', 'Linux'] },
      { category: 'Data Engineering', items: ['Apache Airflow', 'Pandas', 'NumPy', 'ETL Pipelines', 'Data Processing'] },
    ],
    experience: [
      {
        role: 'Backend Python Engineer',
        organization: 'Insight Global — Client: The Home Depot',
        period: 'Dec 2025 – Present',
        highlights: [
          'Engineers enterprise backend services using Python and FastAPI, developing and maintaining REST APIs for internal developer-facing platforms, monitoring systems and operational tooling.',
          'Develops and enhances Nightwatch, an enterprise monitoring and operational platform — owning backend service development, production issue investigation, and platform reliability improvements across cloud-native workflows.',
          'Architects cloud-based data-processing services on GCP, leveraging BigQuery for analytical workloads, Cloud Storage for data persistence, and Datastore for application state management.',
          'Designs and implements secure CI/CD pipelines using GitHub Actions and Jenkins — automating build, security scanning, containerization (Docker) and deployment workflows.',
          'Recognized with Rising Star of the Quarter and Platform Guardian awards for engineering contributions, production ownership, and platform reliability. Earned Astronomer Airflow certification.',
        ],
      },
      {
        role: 'Python Backend Developer',
        organization: 'AdGlobal360 India Pvt. Ltd.',
        period: 'May 2024 – Nov 2025',
        highlights: [
          'Developed scalable backend applications and REST APIs using Python, Django, Django REST Framework and Flask — supporting business-critical workflows with authentication, authorization and third-party service integrations.',
          'Improved API response times by approximately 40% through systematic backend optimization — database query rewriting, N+1 elimination, indexing strategy improvements, and application-level performance tuning.',
          'Engineered automated ETL and data-processing workflows using Python and Pandas, replacing manual data operations and saving an estimated 200+ hours per month.',
          'Designed and optimized PostgreSQL and MySQL schemas, queries and indexing strategies to improve read/write performance and support growing data requirements.',
        ],
      },
      {
        role: 'Python Developer',
        organization: 'Toxsl Technologies',
        period: 'Nov 2021 – May 2024',
        highlights: [
          'Developed backend services and REST APIs using Python, Django and Django REST Framework across 20+ client projects spanning domains including payments, social platforms, booking systems, event management, and enterprise management tools.',
          'Implemented JWT-based authentication, role-based access control (RBAC), and API-level permission mechanisms across multiple application services.',
          'Designed relational database schemas using PostgreSQL and MySQL, optimizing query performance through indexing, query rewriting and schema normalization.',
        ],
      },
    ],
    projectSlugs: [
      'ibkr-signal-scanner',
      'flowmedic',
      'nightwatch-platform',
      'enterprise-data-pipelines',
      'full-stack-product-applications',
    ],
    certifications: [
      { name: 'Astronomer Airflow Certification', issuer: 'Astronomer', date: 'Apache Airflow workflow orchestration and data pipeline engineering' },
      { name: 'Google Cloud Platform', issuer: 'Google Cloud', date: 'Professional learning in cloud computing, BigQuery, and GCP services' },
    ],
    education: {
      degree: 'B.Tech, Computer Science & Engineering',
      institution: 'Indo Global Colleges',
      year: '2018 – 2022',
    },
  },
];

export function getFounder(slug: string): Founder | undefined {
  return FOUNDERS.find((f) => f.slug === slug);
}
