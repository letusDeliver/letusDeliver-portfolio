import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeading } from '../../../shared/ui/section-heading/section-heading';
import { Reveal } from '../../../shared/directives/reveal';
import { SeoService } from '../../../core/seo/seo.service';
import { ARTICLES } from '../../../core/data';

@Component({
  selector: 'app-insights-list',
  imports: [RouterLink, SectionHeading, Reveal],
  templateUrl: './insights-list.html',
})
export class InsightsList {
  private readonly seo = inject(SeoService);
  protected readonly articles = ARTICLES;

  constructor() {
    this.seo.update({
      title: 'Insights',
      description: "Ideas, engineering and things we're learning.",
      path: '/insights',
    });
  }
}
