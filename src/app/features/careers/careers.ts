import { Component, inject } from '@angular/core';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';
import { Button } from '../../shared/ui/button/button';
import { Tag } from '../../shared/ui/tag/tag';
import { Reveal } from '../../shared/directives/reveal';
import { SeoService } from '../../core/seo/seo.service';

@Component({
  selector: 'app-careers',
  imports: [SectionHeading, Button, Tag, Reveal],
  templateUrl: './careers.html',
})
export class Careers {
  private readonly seo = inject(SeoService);

  /**
   * Roles we'd likely be hiring for if/when we open a position — not
   * active postings. Kept deliberately generic (archetypes, not fabricated
   * job listings) since there are currently no openings; see the page copy.
   */
  protected readonly futureRoles: string[] = [
    'Angular Developer',
    'Full-Stack Developer',
    'Backend Developer',
    'AI Engineer',
    'DevOps Engineer',
    'Product Designer',
  ];

  constructor() {
    this.seo.update({
      title: 'Careers',
      description: "letusdeliver is a small, engineering-first company. No open roles right now, but we're always interested in hearing from great engineers.",
      path: '/careers',
    });
  }
}
