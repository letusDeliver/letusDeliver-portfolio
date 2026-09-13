import { Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Tag } from '../../../shared/ui/tag/tag';
import { Button } from '../../../shared/ui/button/button';
import { Reveal } from '../../../shared/directives/reveal';
import { SeoService } from '../../../core/seo/seo.service';
import { personSchema } from '../../../core/seo/structured-data';
import { FOUNDERS, PROJECTS } from '../../../core/data';

const OWNERSHIP_LABEL: Record<string, string> = {
  letusdeliver: 'letusdeliver project',
  personal: 'Personal project',
  'professional-experience': 'Professional experience',
};

@Component({
  selector: 'app-founder',
  imports: [RouterLink, Tag, Button, Reveal],
  templateUrl: './founder.html',
})
export class FounderPage {
  private readonly seo = inject(SeoService);

  readonly slug = input<string>('');

  protected readonly founder = computed(() => FOUNDERS.find((f) => f.slug === this.slug()));
  protected readonly projects = computed(() => {
    const founder = this.founder();
    if (!founder) return [];
    return founder.projectSlugs.map((slug) => PROJECTS.find((p) => p.slug === slug)).filter((p) => !!p);
  });

  constructor() {
    // Route params bound via withComponentInputBinding() aren't available
    // until after construction, so this must be an effect to pick up the
    // initial value (and any later slug change while the component is reused).
    effect(() => {
      const founder = this.founder();
      if (founder) {
        this.seo.update({
          title: `${founder.name} — ${founder.role}`,
          description: founder.summary,
          path: `/about/${founder.slug}`,
          type: 'profile',
        });
        this.seo.setStructuredData('ld-person', personSchema(founder));
      }
    });
  }

  ownershipLabel(ownershipType: string): string {
    return OWNERSHIP_LABEL[ownershipType] ?? ownershipType;
  }
}
