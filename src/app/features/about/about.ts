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

  constructor() {
    this.seo.update({
      title: 'About',
      description: 'letusdeliver is a founder-led software engineering studio built by two engineers who wanted to build products with strong engineering and direct communication.',
      path: '/about',
    });
  }
}
