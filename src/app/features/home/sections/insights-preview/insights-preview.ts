import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeading } from '../../../../shared/ui/section-heading/section-heading';
import { Reveal } from '../../../../shared/directives/reveal';
import { ARTICLES } from '../../../../core/data';

@Component({
  selector: 'app-home-insights-preview',
  imports: [RouterLink, SectionHeading, Reveal],
  templateUrl: './insights-preview.html',
})
export class InsightsPreview {
  protected readonly articles = ARTICLES.slice(0, 3);
}
