import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';
import { Button } from '../../shared/ui/button/button';
import { Reveal } from '../../shared/directives/reveal';
import { SeoService } from '../../core/seo/seo.service';
import { FOUNDERS } from '../../core/data';

interface CapabilityGroup {
  title: string;
  description: string;
}

interface Principle {
  title: string;
  description: string;
}

@Component({
  selector: 'app-about',
  imports: [RouterLink, SectionHeading, Button, Reveal],
  templateUrl: './about.html',
})
export class About {
  private readonly seo = inject(SeoService);
  protected readonly founders = FOUNDERS;

  protected readonly capabilities: CapabilityGroup[] = [
    { title: 'Frontend', description: 'Angular architecture, signal-based state, accessibility and performance.' },
    { title: 'Backend', description: 'Node.js/Express and Python (FastAPI, Django) APIs, authentication and data modeling.' },
    { title: 'Cloud', description: 'GCP and AWS data services, CI/CD pipelines, and containerized deployments.' },
    { title: 'Data', description: 'ETL pipelines and workflow automation built on Airflow and Pandas.' },
  ];

  protected readonly principles: Principle[] = [
    { title: 'Build with purpose', description: 'Technology should solve a meaningful business problem — not add complexity for its own sake.' },
    { title: 'Engineering quality', description: 'Architecture, security, maintainability and scalability matter from the first commit, not after something breaks.' },
    { title: 'Transparency', description: "You should always understand what's being built and why — no black boxes, no surprise scope." },
    { title: 'Deliver continuously', description: 'Small, validated releases beat long stretches of silence followed by one big reveal.' },
    { title: 'AI-assisted, human-driven', description: 'AI accelerates the engineering work. Architecture, product decisions and quality stay a human responsibility.' },
  ];

  constructor() {
    this.seo.update({
      title: 'About',
      description: 'letusdeliver is a founder-led software engineering studio built by two engineers who wanted to build products with strong engineering and direct communication.',
      path: '/about',
    });
  }
}
