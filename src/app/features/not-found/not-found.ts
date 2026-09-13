import { Component, inject } from '@angular/core';
import { Button } from '../../shared/ui/button/button';
import { SeoService } from '../../core/seo/seo.service';

@Component({
  selector: 'app-not-found',
  imports: [Button],
  templateUrl: './not-found.html',
})
export class NotFound {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.update({
      title: 'Page not found',
      description: "The page you're looking for doesn't exist.",
      path: '/404',
    });
  }
}
