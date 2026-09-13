import { Component } from '@angular/core';
import { SectionHeading } from '../../../../shared/ui/section-heading/section-heading';
import { Reveal } from '../../../../shared/directives/reveal';

interface TechGroup {
  category: string;
  items: string[];
}

@Component({
  selector: 'app-home-technology',
  imports: [SectionHeading, Reveal],
  templateUrl: './technology.html',
})
export class Technology {
  /** Populated strictly from the founders' resumes — nothing added beyond what's documented there. */
  protected readonly groups: TechGroup[] = [
    { category: 'Frontend', items: ['Angular', 'TypeScript', 'RxJS', 'Signals', 'PrimeNG', 'Angular Material', 'Tailwind CSS'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'Python', 'FastAPI', 'Django', 'Django REST Framework', 'Flask'] },
    { category: 'Database', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Neo4j', 'Prisma ORM', 'Google Cloud Datastore'] },
    { category: 'Cloud', items: ['GCP · BigQuery', 'GCP · Cloud Storage', 'GCP · Datastore', 'AWS EC2', 'AWS S3', 'AWS Lambda'] },
    { category: 'DevOps', items: ['Docker', 'GitHub Actions', 'Jenkins', 'Git', 'GitLab', 'Linux'] },
    { category: 'Data', items: ['Apache Airflow', 'Pandas', 'NumPy', 'ETL Pipelines'] },
    { category: 'Architecture', items: ['Standalone APIs', 'Micro-Frontends (Native Federation)', 'Microservices', 'RBAC / Permission Modeling', 'Clean Architecture'] },
    { category: 'AI', items: ['AI-assisted development workflows (Claude Code)'] },
  ];
}
