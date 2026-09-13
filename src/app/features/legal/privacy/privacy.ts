import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../core/seo/seo.service';

@Component({
  selector: 'app-privacy',
  imports: [RouterLink],
  templateUrl: './privacy.html',
})
export class Privacy {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.update({
      title: 'Privacy Policy',
      description: 'How letusdeliver handles information submitted through this website.',
      path: '/privacy',
    });
  }
}
