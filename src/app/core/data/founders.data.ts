import { Founder } from '../models';

/**
 * Founder facts are sourced directly from each founder's resume (and, for
 * Mrityunjay's philosophy/role framing, an updated bio supplied directly
 * by him — see PROGRESS.md §21). Do not add claims, metrics or
 * technologies not present in those sources. Contact details are
 * intentionally omitted from public content — the site routes inquiries
 * through /start-a-project instead. Client names from prior employment are
 * omitted by policy (see §22) even where the source resume names one.
 */
export const FOUNDERS: Founder[] = [
  {
    slug: 'kunal',
    name: 'Kunal',
    role: 'Co-Founder · Frontend & Product Engineering',
    yearsExperience: '5+ years',
    photoUrl: 'images/kunal-profile.jpg',
    summary:
      'Kunal leads frontend and product engineering at letusdeliver, with 5+ years building production-grade Angular applications and turning product requirements into scalable, maintainable software.',
    philosophy:
      'Starts from the problem, not the framework — architecture should be exactly as complex as the product needs and no more. Favors component boundaries and state patterns that stay maintainable as a codebase grows, treats accessibility and performance as part of the definition of done rather than a later pass, and uses AI-assisted, agent-driven workflows (Claude Code) as a working practice for codebase analysis, refactoring and documentation — a lever for velocity and quality, not a shortcut around engineering judgment.',
    expertise: [
      {
        title: 'Frontend Engineering',
        description: 'Angular, TypeScript, RxJS and Signals, applied to enterprise-scale, standalone-architecture applications.',
      },
      {
        title: 'Product Engineering',
        description: 'Turns product and business requirements into usable, scalable production applications — not just implemented tickets.',
      },
      {
        title: 'Application Architecture',
        description: 'Component-driven and micro-frontend architecture (Native Federation), reusable systems, and API-integrated frontends built to stay maintainable as they grow.',
      },
      {
        title: 'Enterprise Engineering',
        description: 'Complex workflows, dashboards, forms and permission-driven applications, delivered in Agile teams.',
      },
      {
        title: 'AI-Assisted Engineering',
        description: 'AI coding agents (Claude Code) for codebase analysis, refactoring, documentation and accelerated delivery — a working practice, not a novelty.',
      },
      {
        title: 'Full-Stack Development',
        description: 'Backend and API engineering with Node.js, Express, PostgreSQL and Prisma — enough range to own a feature end to end.',
      },
      {
        title: 'Accessibility & Performance',
        description: 'WCAG/ARIA conformance and frontend performance optimization treated as core engineering quality, not an afterthought.',
      },
    ],
    roleAtLetusdeliver:
      "As co-founder, Kunal owns frontend architecture and product engineering at letusdeliver — translating product requirements into application architecture, leading Angular development and UI engineering, and setting the frontend standards the team builds against. That includes reusable component systems, accessibility and performance as first-class requirements, and folding AI-assisted development into the day-to-day engineering workflow rather than treating it as a separate experiment.",
    buildingLetusdeliver: {
      stages: ['Product', 'Frontend', 'Application Architecture', 'AI-assisted Engineering'],
      description:
        "Kunal's focus at letusdeliver runs from product requirements through to shipped interface — frontend architecture, reusable systems and AI-assisted workflows that keep delivery fast without cutting corners.",
    },
    technologies: [
      {
        category: 'Frontend',
        items: ['Angular (v12–v21)', 'TypeScript', 'JavaScript (ES6+)', 'RxJS', 'Signals', 'HTML5', 'CSS3'],
      },
      { category: 'UI & Styling', items: ['PrimeNG', 'Angular Material', 'Bootstrap', 'Tailwind CSS'] },
      {
        category: 'Architecture',
        items: [
          'Standalone APIs',
          'Component-Based Architecture',
          'Micro-Frontends (Native Federation)',
          'Signal-Based State',
          'Reactive & Template-Driven Forms',
          'Lazy Loading',
          'Route Guards',
          'HTTP Interceptors',
          'OnPush Change Detection',
          'Dependency Injection',
          'Custom Directives & Pipes',
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
          'Develops enterprise applications using Angular standalone architecture and modern frontend engineering practices.',
          'Raised WCAG conformance across application modules through semantic HTML and ARIA improvements.',
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
          'Profiled rendering and change-detection behavior in Angular applications to identify performance bottlenecks.',
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
    role: 'Co-Founder · Backend, Cloud & Data Engineering',
    yearsExperience: '5+ years',
    photoUrl: 'images/mrityunjay-profile.jpg',
    summary:
      'Mrityunjay leads backend, cloud and data engineering at letusdeliver, with 5+ years designing production-grade backend systems, cloud infrastructure and data platforms that let products run reliably and scale.',
    philosophy:
      'Believes reliable software is built on strong foundations — good APIs, thoughtful data models, automated deployments, observable systems and clear architecture are what let products grow without becoming difficult to maintain. Looks beyond individual backend features to the engineering systems behind the product: architecture → infrastructure → data → reliability → scale. Also exploring how AI can extend beyond code generation into requirement analysis, test generation, debugging, documentation and infrastructure automation — pairing experienced engineering judgment with AI-assisted workflows to reduce repetitive work and speed up delivery.',
    expertise: [
      {
        title: 'Backend Engineering',
        description: 'Python, FastAPI, Django and Flask, architected as REST APIs and services built to stay maintainable in production.',
      },
      {
        title: 'Cloud Engineering',
        description: 'GCP and AWS, building cloud-native services around BigQuery, Cloud Storage and Datastore.',
      },
      {
        title: 'Data Engineering',
        description: 'Apache Airflow, Pandas and ETL pipelines that turn manual data operations into reliable, automated workflows.',
      },
      {
        title: 'Database Engineering',
        description: 'PostgreSQL, MySQL, MongoDB and Neo4j, with a focus on schema design, indexing and query performance.',
      },
      {
        title: 'DevOps & CI/CD',
        description: 'Docker, GitHub Actions and Jenkins, automating build, security scanning and deployment workflows.',
      },
      {
        title: 'Production Reliability',
        description: 'Monitoring, incident response and performance tuning — the operational work that keeps a system trustworthy after launch.',
      },
    ],
    roleAtLetusdeliver:
      'As co-founder, Mrityunjay owns backend architecture, cloud infrastructure and data engineering at letusdeliver — designing APIs and database architecture, building cloud-native systems, and setting up the CI/CD pipelines and production-reliability practices that keep what ships dependable. That includes evaluating infrastructure and cloud technology choices, and — alongside Kunal — folding AI-assisted workflows into backend implementation, testing and debugging.',
    buildingLetusdeliver: {
      stages: ['Backend', 'Data', 'Cloud', 'Infrastructure', 'Reliability'],
      description:
        "Mrityunjay's focus at letusdeliver is everything underneath the product — the APIs, data systems and cloud infrastructure engineered to run reliably and scale as it grows.",
    },
    technologies: [
      { category: 'Backend', items: ['Python', 'FastAPI', 'Django', 'Django REST Framework', 'Flask', 'Celery', 'REST APIs', 'Microservices'] },
      { category: 'Security', items: ['JWT', 'RBAC', 'API Permissions', 'Security Scanning'] },
      { category: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Neo4j', 'Google Cloud Datastore'] },
      { category: 'Cloud', items: ['GCP (BigQuery, Cloud Storage, Datastore)', 'AWS (EC2, S3, Lambda)'] },
      { category: 'DevOps & CI/CD', items: ['Docker', 'GitHub Actions', 'Jenkins', 'Git', 'GitLab', 'Linux'] },
      { category: 'Data Engineering', items: ['Apache Airflow', 'Pandas', 'NumPy', 'ETL Pipelines', 'Data Processing', 'Data Pipelines'] },
      { category: 'AI & Engineering Tools', items: ['AI-Assisted Development', 'AI Coding Agents', 'Engineering Automation', 'Developer Workflows'] },
    ],
    experience: [
      {
        role: 'Backend Python Engineer',
        organization: 'Insight Global',
        period: 'Dec 2025 – Present',
        highlights: [
          'Develops and maintains REST APIs for internal developer-facing platforms, monitoring systems and operational tooling.',
          'Contributes to an enterprise monitoring and operational platform — investigating production issues and improving platform reliability.',
          'Builds cloud-native data-processing services on GCP, using BigQuery, Cloud Storage and Datastore.',
          'Designs secure CI/CD pipelines with GitHub Actions and Jenkins, automating build, security scanning, Docker containerization and deployment.',
          'Contributes to production engineering and operational reliability improvements across cloud-native workflows.',
          'Recognized with Rising Star of the Quarter and Platform Guardian awards for engineering contributions and production ownership. Earned Astronomer Airflow certification.',
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
          'Worked across multiple product teams and technology stacks throughout the engagement.',
        ],
      },
    ],
    projectSlugs: ['ibkr-signal-scanner', 'flowmedic', 'careernaukri'],
    certifications: [
      { name: 'Astronomer Airflow Certification', issuer: 'Astronomer', date: 'Apache Airflow workflow orchestration and data pipeline engineering' },
      { name: 'Google Cloud Platform', issuer: 'Google Cloud', date: 'Professional learning and experience across cloud computing, BigQuery and Google Cloud services' },
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
