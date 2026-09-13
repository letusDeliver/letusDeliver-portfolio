import { Component, inject } from '@angular/core';
import { SeoService } from '../../core/seo/seo.service';
import { organizationSchema, websiteSchema } from '../../core/seo/structured-data';
import { Hero } from './sections/hero/hero';
import { Credibility } from './sections/credibility/credibility';
import { ServicesOverview } from './sections/services-overview/services-overview';
import { FeaturedWork } from './sections/featured-work/featured-work';
import { Philosophy } from './sections/philosophy/philosophy';
import { WhyUs } from './sections/why-us/why-us';
import { Process } from './sections/process/process';
import { FoundersPreview } from './sections/founders-preview/founders-preview';
import { Technology } from './sections/technology/technology';
import { InsightsPreview } from './sections/insights-preview/insights-preview';
import { FinalCta } from './sections/final-cta/final-cta';

@Component({
  selector: 'app-home',
  imports: [
    Hero,
    Credibility,
    ServicesOverview,
    FeaturedWork,
    Philosophy,
    WhyUs,
    Process,
    FoundersPreview,
    Technology,
    InsightsPreview,
    FinalCta,
  ],
  templateUrl: './home.html',
})
export class Home {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.update({
      title: 'letusdeliver — Software Engineering · Cloud · AI',
      description:
        'Founder-led software engineering studio building modern digital products for startups and growing businesses. Think. Build. Deliver.',
      path: '/',
    });
    this.seo.setStructuredData('ld-organization', organizationSchema());
    this.seo.setStructuredData('ld-website', websiteSchema());
  }
}
