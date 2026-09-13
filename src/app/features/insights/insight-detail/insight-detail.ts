import { Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../core/seo/seo.service';
import { articleSchema } from '../../../core/seo/structured-data';
import { ARTICLES } from '../../../core/data';

@Component({
  selector: 'app-insight-detail',
  imports: [RouterLink],
  templateUrl: './insight-detail.html',
})
export class InsightDetail {
  private readonly seo = inject(SeoService);

  readonly slug = input<string>('');

  protected readonly article = computed(() => ARTICLES.find((a) => a.slug === this.slug()));

  constructor() {
    // Route params bound via withComponentInputBinding() aren't available
    // until after construction, so this must be an effect to pick up the
    // initial value (and any later slug change while the component is reused).
    effect(() => {
      const article = this.article();
      if (article) {
        this.seo.update({
          title: article.title,
          description: article.excerpt,
          path: `/insights/${article.slug}`,
          type: 'article',
        });
        this.seo.setStructuredData('ld-article', articleSchema(article));
      }
    });
  }
}
