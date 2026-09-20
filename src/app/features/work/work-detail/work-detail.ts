import { Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../core/seo/seo.service';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { Tag } from '../../../shared/ui/tag/tag';
import { Button } from '../../../shared/ui/button/button';
import { Reveal } from '../../../shared/directives/reveal';
import { PROJECTS } from '../../../core/data';
import { siteConfig } from '../../../core/config/site.config';

const OWNERSHIP_LABEL: Record<string, string> = {
  letusdeliver: 'letusdeliver project',
  personal: 'Personal project',
  'professional-experience': 'Professional experience',
};

@Component({
  selector: 'app-work-detail',
  imports: [RouterLink, Tag, Button, Reveal],
  templateUrl: './work-detail.html',
})
export class WorkDetail {
  private readonly seo = inject(SeoService);
  private readonly analytics = inject(AnalyticsService);

  readonly slug = input<string>('');

  protected readonly project = computed(() => PROJECTS.find((p) => p.slug === this.slug()));

  protected readonly nextProject = computed(() => {
    const projects = PROJECTS;
    const currentIndex = projects.findIndex((p) => p.slug === this.slug());
    if (currentIndex === -1) return undefined;
    return projects[(currentIndex + 1) % projects.length];
  });

  constructor() {
    // Route params bound via withComponentInputBinding() are only
    // available after construction, and this component is reused (not
    // recreated) when navigating between sibling /work/:slug routes —
    // so this must be an effect, not constructor-time logic, to pick up
    // both the initial value and later slug changes.
    effect(() => {
      const project = this.project();
      if (project) {
        this.seo.update({
          title: project.title,
          description: project.summary,
          path: `/work/${project.slug}`,
          ...(project.imageUrl ? { image: `${siteConfig.siteUrl}${project.imageUrl}` } : {}),
        });
        this.analytics.track('work_project_viewed', { slug: project.slug });
      }
    });
  }

  ownershipLabel(ownershipType: string): string {
    return OWNERSHIP_LABEL[ownershipType] ?? ownershipType;
  }

  onDemoClick(): void {
    this.analytics.track('live_demo_clicked', { slug: this.slug() });
  }

  onGithubClick(): void {
    this.analytics.track('github_clicked', { slug: this.slug() });
  }
}
