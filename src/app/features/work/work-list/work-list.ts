import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeading } from '../../../shared/ui/section-heading/section-heading';
import { Tag } from '../../../shared/ui/tag/tag';
import { Reveal } from '../../../shared/directives/reveal';
import { SeoService } from '../../../core/seo/seo.service';
import { PROJECTS } from '../../../core/data';
import { ProjectCategory } from '../../../core/models';

type Filter = 'All' | ProjectCategory;

const OWNERSHIP_LABEL: Record<string, string> = {
  letusdeliver: 'letusdeliver',
  personal: 'Personal project',
  'professional-experience': 'Professional experience',
};

@Component({
  selector: 'app-work-list',
  imports: [RouterLink, SectionHeading, Tag, Reveal],
  templateUrl: './work-list.html',
})
export class WorkList {
  private readonly seo = inject(SeoService);

  protected readonly filters: Filter[] = ['All', 'Product', 'Full Stack', 'Architecture', 'Cloud', 'AI'];
  protected readonly activeFilter = signal<Filter>('All');
  readonly projects = PROJECTS;

  readonly filteredProjects = computed(() => {
    const filter = this.activeFilter();
    return filter === 'All' ? this.projects : this.projects.filter((p) => p.category === filter);
  });

  constructor() {
    this.seo.update({
      title: "What we've built",
      description: 'Real applications and engineering projects showcasing how we approach software.',
      path: '/work',
    });
  }

  setFilter(filter: Filter): void {
    this.activeFilter.set(filter);
  }

  ownershipLabel(ownershipType: string): string {
    return OWNERSHIP_LABEL[ownershipType] ?? ownershipType;
  }
}
