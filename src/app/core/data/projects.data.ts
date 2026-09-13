import { Project } from '../models';

/**
 * All project facts are sourced from the founders' resumes.
 * `ownershipType` distinguishes LetUsDeliver company work from personal
 * engineering projects and from prior professional employment — employer
 * projects are never presented as LetUsDeliver client work.
 */
export const PROJECTS: Project[] = [
  {
    slug: 'employee-management-system',
    title: 'Employee Management System',
    category: 'Full Stack',
    summary: 'A production-oriented, full-stack HR system built solo end to end on Clean Architecture principles.',
    description:
      'A self-directed engineering project built to deepen backend and system-design skills from a frontend-strong base — designed and implemented solo across the full stack.',
    technologies: [
      'Angular 21',
      'Signals',
      'Typed Reactive Forms',
      'Angular Material 3',
      'Tailwind CSS',
      'Node.js',
      'Express 5',
      'PostgreSQL',
      'Prisma',
      'JWT',
      'Zod',
      'Swagger / OpenAPI 3.0',
      'Vitest',
    ],
    featured: true,
    ownershipType: 'personal',
    overview:
      'A full-stack HR system covering employee records and core workforce workflows, built to explore production-grade backend architecture from a frontend-strong starting point.',
    challenge:
      'Designing a backend that stays maintainable as features grow — with real authentication, permissioning and validation — rather than a demo-only API.',
    solution:
      'Node.js/Express 5 REST API on Clean Architecture (thin controllers, service/repository layering) with PostgreSQL via Prisma. Authentication uses JWT access tokens plus rotating, database-backed refresh tokens; authorization is permission-based RBAC rather than hard-coded role checks. Request and environment validation runs through Zod, with the same schemas driving Swagger/OpenAPI documentation — a single source of truth for contracts and validation. Logging via Winston/Morgan and hardening via Helmet, CORS and bcrypt round out the API. The Angular 21 frontend uses standalone APIs with Signals and computed() for signal-based feature stores (no NgRx), strict TypeScript, typed Reactive Forms, and an Angular Material 3 + Tailwind CSS design system.',
    features: [
      'JWT authentication with rotating, database-backed refresh tokens',
      'Permission-based RBAC (not hard-coded role checks)',
      'API documentation generated from the same Zod schemas used for request validation',
      'Signal-based feature stores on the Angular frontend (no NgRx)',
      'Cloudinary-backed file uploads',
    ],
    architectureNotes:
      'Clean Architecture on the backend (thin controllers, service/repository layering) paired with a signal-based, standalone-API Angular frontend — validation and API docs share one Zod-driven source of truth.',
    engineeringDecisions: [
      'Permission-based RBAC modeled explicitly rather than relying on hard-coded role checks.',
      'Zod schemas reused for both runtime validation and generated OpenAPI documentation.',
      'Signals + computed() used for frontend state instead of introducing NgRx for a project of this size.',
    ],
  },
  {
    slug: 'enterprise-micro-frontend-shell',
    title: 'Enterprise Micro-Frontend Shell',
    category: 'Architecture',
    summary: 'An Angular platform shell composing independently built and deployed applications via Native Federation.',
    description:
      'A self-directed architecture project exploring manifest-driven micro-frontend composition with a typed host↔remote contract.',
    technologies: ['Angular', 'Native Federation', 'TypeScript', 'Architecture Decision Records'],
    featured: true,
    ownershipType: 'personal',
    overview:
      'An Angular platform shell that hosts independently built and deployed applications behind one consistent experience, using Native Federation for runtime composition.',
    challenge:
      'Letting independently deployed remote applications integrate into one shell experience without tightly coupling their release cycles or leaking implementation details across boundaries.',
    solution:
      'A manifest-driven application registry with contract-versioned schema validation, and a typed Shell Public API exposing four distinct host↔remote interaction patterns: fire-and-forget notifications (toast), a read-only reactive context (theme), request/response flows (dialogs), and a registration-with-lifecycle extension point (header actions) with shell-attributed ownership.',
    features: [
      'Manifest-driven application registry with contract-versioned schema validation',
      'Typed Shell Public API with four distinct host↔remote interaction patterns',
      'Every platform-level decision documented as an Architecture Decision Record',
    ],
    architectureNotes:
      'Native Federation for runtime composition, with a written architecture charter used to validate each milestone — decision traceability treated as a first-class deliverable, not an afterthought.',
    engineeringDecisions: [
      'Contract-versioned schema validation for the application registry, so remotes can evolve independently without breaking the shell.',
      'Four explicit host↔remote interaction patterns (toast, theme context, dialogs, header actions) instead of one general-purpose message bus.',
      'Every platform-level decision recorded as an ADR and checked against a written architecture charter.',
    ],
  },
  {
    slug: 'multi-tenant-hospital-management-system',
    title: 'Multi-Tenant Hospital Management System',
    category: 'Product',
    summary: 'A frontend-first HMS UI built on the PrimeNG "Sakai" template with a swappable mock-service layer.',
    description:
      'A self-directed frontend project exploring domain modeling and a port/mock-service pattern for a multi-module product UI.',
    technologies: ['Angular', 'PrimeNG', 'Tailwind CSS', 'Architecture Decision Records'],
    featured: true,
    ownershipType: 'personal',
    overview:
      'A frontend-first Hospital Management System UI built on the PrimeNG "Sakai" (Aura) template with Tailwind CSS, using a port/mock-service pattern so a real backend can later replace in-memory services without UI changes.',
    challenge:
      'Building a realistic, multi-module product UI ahead of a backend, without designing the frontend into a corner once real APIs arrive.',
    solution:
      'A port/mock-service pattern isolates data access behind interfaces, so in-memory services can be swapped for a real backend later without touching UI code. The Patient module (list, register, detail, edit) and the Workforce module (Employee, Doctor, Department, Specialisation) were delivered with permission-gated routing and reusable profile-header/section-card patterns.',
    features: [
      'Patient module: list, register, detail, edit',
      'Workforce module: Employee, Doctor, Department, Specialisation',
      'Permission-gated routing',
      'Reusable profile-header and section-card UI patterns',
    ],
    architectureNotes:
      'Doctor is modeled as a composition over Employee (optional profile objects) rather than inheritance, with the distinction enforced structurally in the mock service layer — a deliberate domain-modeling decision recorded in an ADR.',
    engineeringDecisions: [
      'Composition over inheritance for the Doctor/Employee relationship, enforced at the service layer rather than left as a convention.',
      'Port/mock-service pattern chosen specifically so a future real backend swap requires no UI rewrite.',
    ],
  },
  {
    slug: 'personal-portfolio',
    title: 'Personal Portfolio',
    category: 'Product',
    summary: 'A personal portfolio site built with Angular and the Angular Router.',
    description: 'Personal portfolio site built with Angular and the Angular Router to showcase projects and background.',
    technologies: ['Angular', 'Angular Router'],
    featured: false,
    ownershipType: 'personal',
    overview: 'A personal portfolio site built with Angular and the Angular Router to showcase projects and background.',
  },
  {
    slug: 'nightwatch-platform',
    title: 'Nightwatch Platform',
    category: 'Cloud',
    summary: 'An enterprise monitoring and operational platform built on Python, FastAPI and GCP.',
    description:
      'Backend engineering work delivered as part of professional employment. Shown here as evidence of engineering capability — this was client/employer work, not a LetUsDeliver engagement.',
    technologies: ['Python', 'FastAPI', 'GCP', 'BigQuery', 'Cloud Storage', 'Datastore', 'Docker', 'GitHub Actions', 'Jenkins'],
    featured: false,
    ownershipType: 'professional-experience',
    contextLabel: 'Professional experience — Insight Global, client: The Home Depot',
    overview:
      'An enterprise monitoring and operational platform. Backend services and API endpoints engineered using FastAPI, integrating BigQuery, Cloud Storage and Datastore for cloud data processing and platform operations.',
    solution:
      'Backend service development on FastAPI with GCP-native data services (BigQuery, Cloud Storage, Datastore), improved through production issue investigation, root-cause analysis and defect resolution, alongside CI/CD modernization with containerized deployments.',
  },
  {
    slug: 'enterprise-data-pipelines',
    title: 'Enterprise Data Pipelines',
    category: 'Cloud',
    summary: 'Cloud-native ETL pipelines on GCP for data movement, transformation and persistence.',
    description:
      'Data engineering work delivered as part of professional employment — shown as evidence of engineering capability, not a LetUsDeliver engagement.',
    technologies: ['Python', 'BigQuery', 'Cloud Storage', 'Apache Airflow', 'Pandas'],
    featured: false,
    ownershipType: 'professional-experience',
    contextLabel: 'Professional experience',
    overview:
      'Cloud-native ETL solutions on GCP automating data movement, transformation and persistence, with Python/Pandas components for data cleansing and validation.',
    solution:
      'Apache Airflow orchestrates scheduling and dependency management across pipeline tasks, with Pandas-based components handling data cleansing and validation.',
  },
  {
    slug: 'full-stack-product-applications',
    title: 'Full-Stack Product Applications',
    category: 'Full Stack',
    summary: '20+ end-to-end backend systems delivered across diverse product domains.',
    description:
      'Backend engineering delivered for employer clients across multiple domains — shown as evidence of range and delivery experience, not LetUsDeliver client work.',
    technologies: ['Python', 'Django', 'Django REST Framework', 'Flask', 'PostgreSQL', 'MySQL', 'Docker'],
    featured: false,
    ownershipType: 'professional-experience',
    contextLabel: 'Professional experience — Toxsl Technologies',
    overview:
      'Architected and delivered 20+ end-to-end backend systems across diverse domains — including bus booking, social media, gym management, payment gateway integration, and event planning — implementing REST APIs, database design, auth flows and third-party integrations for each.',
  },
];
