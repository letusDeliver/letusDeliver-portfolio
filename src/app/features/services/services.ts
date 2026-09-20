import { Component, inject } from '@angular/core';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';
import { Tag } from '../../shared/ui/tag/tag';
import { Button } from '../../shared/ui/button/button';
import { Reveal } from '../../shared/directives/reveal';
import { SeoService } from '../../core/seo/seo.service';
import { serviceSchema } from '../../core/seo/structured-data';
import { SERVICES } from '../../core/data';

interface DeliveryStage {
  index: string;
  label: string;
  description: string;
}

@Component({
  selector: 'app-services',
  imports: [SectionHeading, Tag, Button, Reveal],
  templateUrl: './services.html',
})
export class ServicesPage {
  private readonly seo = inject(SeoService);
  protected readonly services = SERVICES;

  protected readonly deliveryProcess: DeliveryStage[] = [
    { index: '01', label: 'Discovery', description: 'Understand the problem, constraints and who this actually needs to work for.' },
    { index: '02', label: 'Product Definition', description: 'Turn that understanding into a concrete, buildable scope.' },
    { index: '03', label: 'Architecture', description: 'Decide the technical shape before writing production code.' },
    { index: '04', label: 'Development', description: 'Build in reviewable increments, not one long silent stretch.' },
    { index: '05', label: 'Testing', description: 'Verify it actually works — automated where it earns its keep, manual where it matters.' },
    { index: '06', label: 'Deployment', description: 'Ship with a real CI/CD path, not a manual one-off.' },
    { index: '07', label: 'Support & Evolution', description: "The relationship doesn't end at launch." },
  ];

  constructor() {
    this.seo.update({
      title: 'Services',
      description: 'Engineering capability for every stage of your product — product engineering, frontend architecture, backend & APIs, cloud & DevOps, data & automation, and AI engineering.',
      path: '/services',
    });
    this.services.forEach((service, i) => {
      this.seo.setStructuredData(`ld-service-${i}`, serviceSchema(service));
    });
  }
}
