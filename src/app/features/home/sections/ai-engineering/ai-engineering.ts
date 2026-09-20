import { Component } from '@angular/core';
import { SectionHeading } from '../../../../shared/ui/section-heading/section-heading';
import { Reveal } from '../../../../shared/directives/reveal';

@Component({
  selector: 'app-home-ai-engineering',
  imports: [SectionHeading, Reveal],
  templateUrl: './ai-engineering.html',
})
export class AiEngineering {
  // Grounded in what's actually true today (both founders' own profiles —
  // see founders.data.ts — describe real, current AI-assisted-development
  // practice via Claude Code), not an aspirational pipeline. Split into
  // "already how we work" vs. "actively exploring" rather than presenting
  // both as equally mature.
  protected readonly established: string[] = ['Codebase analysis & refactoring', 'Technical documentation', 'Accelerated implementation'];

  protected readonly exploring: string[] = ['Requirement analysis', 'Test generation', 'Debugging support', 'Infrastructure automation'];
}
