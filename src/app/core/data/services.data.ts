import { Service } from '../models';

export const SERVICES: Service[] = [
  {
    slug: 'product-engineering',
    title: 'Product Engineering',
    tagline: 'Build from idea to production.',
    description:
      'End-to-end product engineering — from initial architecture decisions through to a system running in production, with maintainability treated as a first-class requirement, not an afterthought.',
    problem:
      'Early-stage products need to move fast without accumulating architecture debt that becomes expensive to unwind once the product finds traction.',
    whatWeDo: [
      'Translate product requirements into a maintainable technical architecture',
      'Build full-stack features end to end, from UI through API to database',
      'Set up the engineering foundations (structure, conventions, tooling) a team can build on',
    ],
    capabilities: ['Full-stack feature delivery', 'Technical architecture', 'API & data modeling', 'Production readiness'],
    useCases: ['New product builds', 'MVP to production hardening', 'Founding engineering support for early-stage teams'],
    technologies: ['Angular', 'TypeScript', 'Node.js', 'Express', 'Python', 'FastAPI', 'PostgreSQL'],
    featured: true,
  },
  {
    slug: 'frontend-architecture',
    title: 'Frontend Architecture',
    tagline: 'Build interfaces that scale with your product.',
    description:
      'Component-driven, standalone Angular architecture with reactive state patterns that stay maintainable as an application grows in size and team.',
    problem:
      'Frontends that started simple often become hard to change safely as features, contributors and state complexity grow.',
    whatWeDo: [
      'Design component and module boundaries that scale with the codebase',
      'Introduce signal-based or reactive state patterns appropriate to actual complexity',
      'Improve rendering performance and bundle size through targeted profiling',
      'Raise accessibility conformance (WCAG/ARIA) across an application',
    ],
    capabilities: ['Standalone component architecture', 'Signal-based & reactive state', 'Performance optimization', 'Accessibility (WCAG/ARIA)'],
    useCases: ['Frontend architecture reviews', 'Legacy Angular modernization', 'Design-system-backed UI builds'],
    technologies: ['Angular', 'TypeScript', 'RxJS', 'Signals', 'PrimeNG', 'Angular Material', 'Tailwind CSS'],
    featured: true,
  },
  {
    slug: 'backend-and-apis',
    title: 'Backend & APIs',
    tagline: 'Build reliable systems behind the experience.',
    description:
      'REST API design and backend services built on clear architectural boundaries, with authentication, authorization and validation treated as core design concerns.',
    problem:
      'APIs that skip structured validation, permissioning and error handling tend to become fragile and hard to extend under real production load.',
    whatWeDo: [
      'Design REST APIs with clear service/repository layering',
      'Implement JWT authentication and permission-based RBAC',
      'Add schema-driven request validation with generated API documentation',
      'Optimize database schemas, indexing and query performance',
    ],
    capabilities: ['REST API design', 'Authentication & RBAC', 'Schema-driven validation', 'Database optimization'],
    useCases: ['New backend services', 'API hardening & documentation', 'Database performance tuning'],
    technologies: ['Node.js', 'Express', 'Python', 'FastAPI', 'Django', 'PostgreSQL', 'MySQL', 'Prisma'],
    featured: true,
  },
  {
    slug: 'cloud-and-devops',
    title: 'Cloud & DevOps',
    tagline: 'Deploy with confidence.',
    description:
      'Cloud-native services and CI/CD pipelines built for reliability — from containerized deployments to production incident response.',
    problem:
      'Manual deployment processes and thin CI/CD pipelines slow teams down and make production incidents harder to diagnose.',
    whatWeDo: [
      'Design cloud-based data-processing services (GCP: BigQuery, Cloud Storage, Datastore)',
      'Build secure CI/CD pipelines with automated build, security scanning and containerized deployment',
      'Containerize backend services with Docker',
      'Investigate and resolve production incidents with root-cause analysis',
    ],
    capabilities: ['CI/CD pipeline design', 'Docker containerization', 'Cloud data services (GCP, AWS)', 'Production reliability'],
    useCases: ['CI/CD setup for new or existing projects', 'Cloud migration & data platform work', 'Production reliability engagements'],
    technologies: ['Docker', 'GitHub Actions', 'Jenkins', 'GCP', 'AWS'],
    featured: true,
  },
  {
    slug: 'data-and-automation',
    title: 'Data & Automation',
    tagline: 'Turn data and repetitive workflows into leverage.',
    description:
      'ETL pipelines and workflow automation that replace manual data operations with reliable, scheduled processing.',
    problem:
      'Manual data handling and repetitive operational workflows consume engineering and operations time that could go toward the product itself.',
    whatWeDo: [
      'Build automated ETL and data-processing workflows',
      'Orchestrate scheduling and task dependencies with Apache Airflow',
      'Design data-cleansing and validation components',
    ],
    capabilities: ['ETL pipeline design', 'Workflow orchestration (Airflow)', 'Data processing (Pandas, NumPy)'],
    useCases: ['Replacing manual data operations with automated pipelines', 'Analytical data pipelines on GCP BigQuery'],
    technologies: ['Python', 'Apache Airflow', 'Pandas', 'NumPy', 'BigQuery'],
    featured: true,
  },
  {
    slug: 'ai-engineering',
    title: 'AI Engineering',
    tagline: 'Build useful AI into real products.',
    description:
      'Practical, AI-assisted development workflows and AI-powered application features — applied where they genuinely help, not as a marketing layer.',
    problem:
      'Teams want to use AI in their products and their engineering process, but need it applied credibly rather than bolted on for the sake of it.',
    whatWeDo: [
      'Use AI-assisted / agentic development workflows (Claude Code) for codebase analysis, refactoring, and documentation as part of day-to-day delivery',
      'Build AI-powered application features where they add real product value',
    ],
    capabilities: ['AI-assisted development workflows', 'AI-powered feature integration'],
    useCases: ['Teams looking to adopt agentic development practices', 'Products that need a well-scoped AI feature, not a research project'],
    technologies: ['Claude Code'],
    featured: true,
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
