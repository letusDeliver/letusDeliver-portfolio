import { Component, inject } from '@angular/core';
import { Button } from '../../../../shared/ui/button/button';
import { Reveal } from '../../../../shared/directives/reveal';
import { AnalyticsService } from '../../../../core/services/analytics.service';

@Component({
  selector: 'app-home-final-cta',
  imports: [Button, Reveal],
  templateUrl: './final-cta.html',
})
export class FinalCta {
  private readonly analytics = inject(AnalyticsService);

  onStartProjectClick(): void {
    this.analytics.track('start_project_click', { source: 'final_cta' });
  }
}
