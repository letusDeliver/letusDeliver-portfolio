import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../core/seo/seo.service';

@Component({
  selector: 'app-terms',
  imports: [RouterLink],
  templateUrl: './terms.html',
})
export class Terms {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.update({
      title: 'Terms of Service',
      description: 'Terms governing use of the letusdeliver website.',
      path: '/terms',
    });
  }
}
