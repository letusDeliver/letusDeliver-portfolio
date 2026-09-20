import { Project } from '../models';

/**
 * Project facts are sourced from the founders' resumes and, where noted,
 * from an independent GitHub repository analysis (each repo was cloned,
 * built, linted and tested directly rather than assessed from README
 * claims alone — see D:\Start-up\Github-Analysis\*.md).
 *
 * `ownershipType` distinguishes LetUsDeliver company work from personal
 * engineering projects and from prior professional employment — employer
 * projects are never presented as LetUsDeliver client work.
 *
 * `angular-crashCourse-tracker-app` (also analyzed) is deliberately
 * excluded — it doesn't build, has no tests, and its core advertised
 * features are unimplemented stubs. See PROGRESS.md for the reasoning.
 */
export const PROJECTS: Project[] = [
  {
    slug: 'enterprise-micro-frontend-shell',
    title: 'Enterprise Micro-Frontend Shell',
    category: 'Architecture',
    summary: 'An Angular platform shell composing independently built and deployed applications via Native Federation — 58/58 tests passing, boundary rules enforced in CI.',
    description:
      'A self-directed architecture project exploring manifest-driven micro-frontend composition with a typed, versioned host↔remote contract.',
    technologies: ['Angular 21', 'TypeScript (strict)', 'Native Federation', 'Signals', 'Bun', 'Vitest', 'GitHub Actions', 'Architecture Decision Records'],
    featured: true,
    ownershipType: 'personal',
    githubUrl: 'https://github.com/letusDeliver/multi-app-architecture-system',
    overview:
      'An Angular 21 platform shell that hosts independently built and deployed applications behind one consistent experience, composing them at runtime via Native Federation rather than compiling their code into the shell\'s own build.',
    challenge:
      'Letting independently deployed remote applications integrate into one shell experience without tightly coupling their release cycles, without teams accidentally referencing each other\'s internals, and without a shared-capability change silently breaking every hosted application at once.',
    solution:
      'A manifest-driven application registry validates each entry in two distinct stages (structural, then contract-version compatibility) before Native Federation mounts it at runtime — an unreachable or non-conforming remote is contained, never crashing the shell. Applications interact with the shell exclusively through a typed Shell Public API distributed as its own versioned package, covering four distinct communication shapes: fire-and-forget (Toast), a read-only live observable (Theme), request/response (Dialog, via Promise), and registration-with-lifecycle (Header Actions, via a generic ExtensionRegistry). Per-mount, shell-attributed ownership means an application cannot forge or observe another application\'s contributions, and everything is deregistered automatically on unmount. The shell/application boundary is enforced two ways at once — architecturally via custom ESLint import rules, and at runtime via the typed API surface — both wired into CI alongside a permanent "empty-shell" gate proving the shell builds, boots and tests cleanly with zero registered applications.',
    features: [
      'Manifest-driven application discovery with two-stage (structural + contract-version) validation',
      'Runtime mount/unmount via Native Federation with contained failure handling for unreachable or non-conforming remotes',
      'A typed Shell Public API covering four distinct communication patterns: fire-and-forget, live observable, request/response, and lifecycle-scoped registration',
      'Shell-attributed, unforgeable ownership scoping for cross-application contributions',
      'Build-time boundary enforcement via custom ESLint rules, wired into CI',
      'A permanent "empty-shell" CI gate re-proving the shell works with zero hosted applications',
    ],
    architectureNotes:
      'Native Federation for runtime composition; a written architecture charter and a ratified decision log (with ADRs) validated at each milestone — decision traceability treated as a first-class deliverable. GitHub Actions CI runs boundary lint, per-project build+test, and the empty-shell gate on every push — all 58 unit tests (51 shell, 7 reference app) pass, independently verified.',
    engineeringDecisions: [
      'Registration, not injection, for every shell extension point — applications hand the shell plain-data descriptors, never template/component references, so the shell fully owns rendering and lifecycle.',
      'Shell-attributed ownership over caller-supplied ownership: the owning application id is only ever supplied by the shell itself, making impersonation of another application\'s contribution structurally impossible rather than merely disallowed by convention.',
      'Contracts (the manifest schema and the Shell Public API) shipped as separate, versioned workspace packages from day one, so a future multi-repo split is a config change, not a refactor.',
      'A single workspace staging the shell and one reference app together is an explicit, time-boxed decision (recorded in an ADR) with a named migration trigger, not the intended end state.',
    ],
  },
  {
    slug: 'employee-management-system',
    title: 'Employee Management System',
    category: 'Full Stack',
    summary: 'A permission-scoped RBAC employee management API with JWT rotation, retroactive logout invalidation, and full audit logging.',
    description:
      'A self-directed engineering project built to deepen backend and system-design skills from a frontend-strong base — designed and implemented solo across a Node.js/Express/Prisma backend and an Angular frontend.',
    technologies: [
      'Node.js',
      'Express 5',
      'PostgreSQL',
      'Prisma 7',
      'Zod',
      'JWT',
      'Cloudinary',
      'Angular 21',
      'Signals',
      'Typed Reactive Forms',
      'Angular Material 3',
      'Tailwind CSS',
    ],
    featured: true,
    ownershipType: 'personal',
    githubUrl: 'https://github.com/letusDeliver/employee-management-backend',
    imageUrl: 'images/work/employee-management-system.jpg',
    imageAlt: 'The Employee Management System frontend\'s landing page, highlighting employee records, role-based access, and document management.',
    overview:
      'A single-tenant Employee Management System covering HR records, department/manager hierarchy and documents, built feature-by-feature behind a securable API where admins, managers and individual employees can be granted different, fine-grained access to the same resources.',
    challenge:
      'Designing a backend that stays maintainable as features grow — with real authentication, permissioning and audit trails — rather than a demo-only API with hard-coded role checks.',
    solution:
      'An Express 5 REST API on Clean Architecture (route → controller → service → repository → Prisma → PostgreSQL), consistently applied across every module. Authentication issues short-lived JWT access tokens plus rotating, database-backed refresh tokens; a Role → Permission → RolePermission RBAC model is checked via permission keys (e.g. `employee:read:any` vs `employee:read:own`) rather than hard-coded role names, letting the service layer distinguish "any record" access from "only your own record." Soft-deleted Employee records with a self-referencing manager hierarchy get transactional audit logging (before/after JSON snapshots) on every write. Cloudinary handles profile pictures and per-employee documents. Zod schemas validate both environment config (failing fast at boot with readable errors) and every request body/query — and those same schemas generate the OpenAPI/Swagger documentation, so the spec can never drift from the validation it describes.',
    features: [
      'JWT access + refresh tokens with rotation, plus a `tokensValidAfter` timestamp that retroactively invalidates all previously issued access tokens across devices on logout',
      'Permission-based RBAC (`resource:action:scope`) rather than hard-coded role checks',
      'Timing-safe login — a dummy-hash comparison on unknown emails specifically prevents a timing side-channel from revealing account existence',
      'Employee CRUD with soft delete, self-management prevention, and deterministic pagination/search/filter/sort',
      'Transactional audit log (actor, before/after JSON, IP) on every Employee create/update/delete',
      'OpenAPI docs generated from the same Zod schemas used for request validation',
    ],
    architectureNotes:
      'Clean Architecture on the backend (thin controllers, service/repository layering, Prisma access confined to repositories) paired with a signal-based, standalone-API Angular frontend. A hand-written partial unique index — not expressible in Prisma\'s schema DSL — enforces "one active Employee per User" while still allowing `userId` reuse after soft-delete; the reasoning is documented directly in a migration.',
    engineeringDecisions: [
      'Permission-based RBAC modeled explicitly, with `:any`/`:own` scope distinctions enforced in the service layer, rather than relying on hard-coded role checks.',
      'A stateless-JWT logout gap closed deliberately via a `tokensValidAfter` column checked on every request.',
      'Zod schemas reused for both runtime validation and generated OpenAPI documentation, eliminating a common source of spec drift.',
      'Signals + computed() used for frontend state instead of introducing NgRx for a project of this size.',
    ],
  },
  {
    slug: 'ibkr-signal-scanner',
    title: 'IBKR Signal & Scanner Engine',
    category: 'Full Stack',
    summary: 'A real-time market scanner and order-management engine built directly on Interactive Brokers\' native trading API — verified by a passing 66-test suite.',
    description:
      'A self-directed, actively-used trading tool connecting directly to Interactive Brokers\' TWS API to scan the market, compute technical indicators, and manage a custom multi-mode order lifecycle.',
    technologies: ['Python', 'Flask', 'ibapi (Interactive Brokers API)', 'pandas', 'NumPy', 'Waitress', 'pytest'],
    featured: true,
    ownershipType: 'personal',
    statusLabel: 'Actively used',
    githubUrl: 'https://github.com/Mrityunjay1997/ibkr-webapp-main',
    imageUrl: 'images/work/ibkr-signal-scanner.jpg',
    imageAlt: 'The IBKR backtesting/scanner dashboard, showing the background-scanner controls, setup save/load, and indicator configuration table.',
    overview:
      'A locally-run trading assistant that opens a persistent socket connection to a local Interactive Brokers TWS/Gateway instance, scans the US equity market for movers in real time, and lets the user place and manage orders — including session-aware bracket and multi-leg flows — from a browser dashboard.',
    challenge:
      'Retail/prop traders using Interactive Brokers need a fast, customizable way to scan the tradable equity universe for technical setups, cross-reference movers against breaking news, and place session-aware orders without hand-building each one in TWS.',
    solution:
      'A Flask application opens a persistent `ibapi` EClient/EWrapper socket connection to TWS/Gateway (auto-detecting paper vs. live by port), runs a background scanner loop pulling IBKR "top movers" scans, enriches each symbol with historical bars and a custom technical-indicator library, filters results against user-defined and news-keyword criteria, and exposes both a dashboard and JSON endpoints backed by a purpose-built "unified order" abstraction that normalizes off-book, automated, and manual order entry into one lifecycle model.',
    features: [
      'Real-time IBKR scanner integration with configurable multi-filter screening (30+ toggleable filter keys)',
      'A custom technical-indicator library: VWAP, SMA/EMA, RSI, OBV variants, ATR, pivot points, Fibonacci retracement levels',
      'A unified order system spanning off-book, automated, and manual order modes with entry conditions and share-size calculation',
      'Session-aware order handling — bracket orders are correctly disabled outside regular trading hours',
      'Position tracking and exit evaluation',
      'News headline fetching with keyword and time-window filtering, plus a dedicated read-aloud news reader',
    ],
    architectureNotes:
      'A Flask application organized into domain packages (`scanner/`, `orders/`, `news/`) rather than by MVC layer, served via Waitress with a threaded background scanner loop. Verified by independently running the test suite: 66 tests across 22 files, covering indicator math, order features and news filtering, all passing.',
    engineeringDecisions: [
      'Direct integration with IB\'s raw socket API rather than a higher-level wrapper — full control over the connection, at the cost of hand-rolled async-callback bookkeeping for timeouts and contract/history lookups.',
      'A custom "unified order" abstraction normalizing three different order-entry paths (off-book, automated, manual) into one lifecycle model.',
      'File-based JSON/CSV persistence instead of a database — the right call for a single local user, with real config-driven tuning visible in dated comments showing iterative production use.',
    ],
  },
  {
    slug: 'flowmedic',
    title: 'FlowMedic',
    category: 'Cloud',
    summary: 'An Apache Airflow 3.x incident-response workflow that detects pipeline failures, builds an auditable timeline, and gates recovery behind a human-in-the-loop approval step.',
    description:
      'A hackathon project (Astronomer\'s "Beyond the Dag") built on Apache Airflow to explore automated, auditable incident response for data pipelines.',
    technologies: ['Python', 'Apache Airflow 3.x (TaskFlow API)', 'Pydantic v2', 'Docker'],
    featured: false,
    ownershipType: 'personal',
    statusLabel: 'Hackathon MVP',
    githubUrl: 'https://github.com/Mrityunjay1997/flowmedic',
    overview:
      'FlowMedic models an automated incident-response loop on top of Apache Airflow: a demo DAG intentionally fails a validation step, then a chain of TaskFlow tasks discovers and classifies the failure, produces a structured diagnosis, builds an auditable timeline and incident record, pauses for human approval directly in the Airflow UI, then executes and validates a simulated recovery.',
    challenge:
      'Diagnosing why a pipeline run failed, deciding whether it\'s safe to auto-recover, and keeping an auditable record of that decision is usually manual, ad hoc work for data platform teams.',
    solution:
      'A single Airflow DAG chains discovery → evidence collection → diagnosis → timeline → incident record → a human-in-the-loop approval gate (Airflow 3.1\'s `ApprovalOperator`, with a Jinja-templated message pulling live diagnosis fields) → simulated recovery → validation. Domain logic (incident models, timeline building, record creation) is kept as plain, Airflow-independent Python functions the DAG calls — deliberately decoupled so it can be tested and run outside of Airflow entirely. The diagnosis stage currently uses a deterministic function rather than a live model call, chosen specifically so the demo runs reliably without a network/LLM dependency — a real LLM integration (via `pydantic-ai`, already in the dependency chain) is the natural next step.',
    features: [
      'Three selectable, deterministic failure scenarios (data quality, missing file, schema failure) for a reproducible demo',
      'A typed Pydantic incident domain model (severity, incident type, recovery action, status)',
      'A human-readable, staged incident timeline builder (detection → discovery → evidence → diagnosis → safety)',
      'Airflow 3.1+ Human-in-the-Loop integration via `ApprovalOperator`, gating any recovery action behind explicit human approval',
      'Domain logic decoupled from Airflow task bodies, independently testable and independently verified to run outside the DAG',
    ],
    architectureNotes:
      'Orchestration (`dags/`) is kept separate from domain logic (a plain Python package), a pattern that makes Airflow code genuinely testable. Docker Compose runs a single local Airflow "standalone" service for the demo.',
    engineeringDecisions: [
      '`trigger_rule="all_done"` used on the failure-handling chain so discovery/diagnosis tasks still run even though their upstream validation task failed — an easy default to get wrong.',
      'Recovery is structurally unreachable without passing through the HITL approval gate — a safety-first design appropriate for anything touching downstream pipeline consumers.',
      'The diagnosis stage was deliberately shipped as a deterministic placeholder to keep the hackathon demo reliable without a live network/LLM dependency, with the interface already shaped for a real model call to slot in next.',
    ],
  },
  {
    slug: 'donezo',
    title: 'Donezo',
    category: 'Product',
    summary: 'An in-progress Angular 20 Kanban-style project tracker — the ticket board is fully built with debounced filtering and scroll pagination.',
    description:
      'A self-directed Angular project practicing modern component architecture and RxJS state patterns on a Jira-style task tracker.',
    technologies: ['Angular 20', 'PrimeNG', 'RxJS', 'TypeScript'],
    featured: false,
    ownershipType: 'personal',
    statusLabel: 'Work in progress',
    githubUrl: 'https://github.com/letusDeliver/Donezo',
    imageUrl: 'images/work/donezo.jpg',
    imageAlt: 'Donezo\'s Kanban ticket board, showing Backlog, Todo, In Progress and Review columns with priority-tagged ticket cards.',
    overview:
      'Donezo is an in-progress Angular 20 project-tracker: a sidebar-driven app organizing work into projects, tickets and tasks, built with standalone components and lazy-loaded feature routes.',
    challenge:
      'Building a Kanban-style ticket board that stays responsive under filtering and pagination, with clean separation between the container that owns state and the presentational pieces that render it.',
    solution:
      'The Tickets feature is the fully-built part of the app: a Kanban board with five status columns, scroll-triggered "load more" pagination per column, and a debounced multi-field filter pipeline (search, priority, type, assignee) built with RxJS `Subject` + `debounceTime` + `takeUntil`, cleanly decomposed into a `KanbanBoard` container driving `KanbanColumn` and `TicketCard` presentational components.',
    features: [
      'Kanban board with 5 status columns and scroll-based "load more" pagination per column',
      'Debounced (300ms) multi-field filter pipeline: search, priority, type, assignee',
      'Removable filter "chips" reflecting active filters',
      'Container/presentational component split with correct RxJS subscription cleanup',
      'Collapsible sidebar navigation that tracks the active route',
    ],
    architectureNotes:
      'Standalone Angular 20 components throughout, feature-folder structure with lazy-loaded routes. Other screens (dashboard, tasks, project forms) are still scaffolded rather than built out — this is presented as a work in progress, not a finished tool.',
    engineeringDecisions: [
      'Container/presentational decomposition (`KanbanBoard` → `KanbanColumn` → `TicketCard`) keeping state ownership and rendering cleanly separated.',
      '`Subject` + `debounceTime` + `takeUntil` for filter debouncing with correct subscription cleanup on destroy — a pattern many junior Angular developers get wrong.',
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
    featured: false,
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
    slug: 'careernaukri',
    title: 'CareerNaukri',
    category: 'Full Stack',
    summary: 'A two-sided Django job board — candidate profiles and job applications on one side, recruiter postings and Razorpay-billed subscriptions on the other.',
    description:
      'A self-directed Django project building a full job-marketplace platform end to end: candidate and recruiter accounts, structured resume profiles, job posting and applications, recruiter subscription billing, and a multi-section content system.',
    technologies: ['Python', 'Django', 'SQLite', 'Razorpay', 'django-ckeditor', 'Crispy Forms (Bootstrap 5)'],
    featured: false,
    ownershipType: 'personal',
    githubUrl: 'https://github.com/Mrityunjay1997/JobSearch',
    imageUrl: 'images/work/jobsearch.jpg',
    imageAlt: "CareerNaukri's landing page, showing the job search bar and open-positions/categories/employers stats.",
    overview:
      'CareerNaukri is a two-sided job board built on Django: candidates build a structured profile — employment history, education, technical skills, and projects — and apply to job listings, while recruiters post jobs, browse applicants, and manage postings from a dedicated dashboard behind a subscription plan. A parallel content system — a blog, career-advice articles, and a candidate help centre, each with its own category/tag taxonomy — sits alongside the core job-board functionality.',
    challenge:
      'Modeling two structurally different user roles (candidate vs. recruiter) against a single Django user model, gating recruiter features behind a paid subscription tier with real payment processing, and supporting three separate content types (blog, career advice, help centre) without duplicating the same category/tag/comment machinery three times over.',
    solution:
      'A single custom User model carries a `role` field plus every candidate-facing profile attribute directly on the user row, while structured, repeatable profile sections — employment history, education, technical skills, and portfolio projects — are modeled as separate one-to-many tables keyed to the user, each with its own add/edit/delete view pair. New recruiters are automatically enrolled in a "Basic" subscription plan on signup; upgrading is handled through a Razorpay checkout callback that records the transaction and unlocks the paid plan, with PDF receipt generation. Configuration, including the Django secret key, is read through `python-decouple` rather than hardcoded, keeping secrets out of version control.',
    features: [
      'Role-based accounts (candidate / recruiter) on a single custom User model, with role-specific dashboards',
      'Structured candidate profile builder: employment history, education, technical skills, and projects, each independently addable, editable, and deletable',
      'Job posting, editing, and applicant tracking for recruiters; search, filtering, and one-click applications for candidates',
      'Recruiter subscription plans with Razorpay payment integration, transaction history, and generated PDF receipts',
      'A blog, a separate career-advice section, and a candidate help centre, each with its own category/tag taxonomy and rich-text authoring',
      "Django's built-in email-based password reset flow",
    ],
    architectureNotes:
      'Django 3.2 with class-based views for the CRUD-heavy flows (job posting, applicant lists, transaction history) and function-based views for the marketing/content pages. `django-ckeditor` powers rich-text fields across jobs, blog posts, and career-advice posts; `django-crispy-forms` (Bootstrap 5 pack) renders the many multi-field forms consistently.',
    engineeringDecisions: [
      'A single custom User model carrying a `role` field rather than separate Candidate/Recruiter models or Django groups — simpler at this scale, at the cost of nullable recruiter-only fields on every candidate row and vice versa.',
      "Recruiter subscription enrollment handled inside an overridden `User.save()` (auto-assigning a Basic plan the first time a recruiter row is saved) rather than a separate signup-flow step — guarantees every recruiter has an active plan row, at the cost of coupling billing logic into the user model's persistence layer.",
    ],
  },
];
