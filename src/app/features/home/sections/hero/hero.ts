import { Component, inject } from '@angular/core';
import { Button } from '../../../../shared/ui/button/button';
import { Reveal } from '../../../../shared/directives/reveal';
import { PointerGlow } from '../../../../shared/directives/pointer-glow';
import { AnalyticsService } from '../../../../core/services/analytics.service';

@Component({
  selector: 'app-home-hero',
  imports: [Button, Reveal, PointerGlow],
  templateUrl: './hero.html',
})
export class Hero {
  private readonly analytics = inject(AnalyticsService);

  protected readonly stages = ['Product', 'Frontend', 'API', 'Database', 'Cloud', 'Deliver'];

  onStartProjectClick(): void {
    this.analytics.track('start_project_click', { source: 'hero' });
  }
}
