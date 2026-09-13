import { Component, inject } from '@angular/core';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';
import { Tag } from '../../shared/ui/tag/tag';
import { Button } from '../../shared/ui/button/button';
import { Reveal } from '../../shared/directives/reveal';
import { SeoService } from '../../core/seo/seo.service';
import { serviceSchema } from '../../core/seo/structured-data';
import { SERVICES } from '../../core/data';

@Component({
  selector: 'app-services',
  imports: [SectionHeading, Tag, Button, Reveal],
  templateUrl: './services.html',
})
export class ServicesPage {
  private readonly seo = inject(SeoService);
  protected readonly services = SERVICES;

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
