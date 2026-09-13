import { Component } from '@angular/core';
import { SectionHeading } from '../../../../shared/ui/section-heading/section-heading';
import { Reveal } from '../../../../shared/directives/reveal';

interface Principle {
  index: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home-philosophy',
  imports: [SectionHeading, Reveal],
  templateUrl: './philosophy.html',
})
export class Philosophy {
  protected readonly principles: Principle[] = [
    { index: '01', title: 'Understand first', description: 'Good software starts with understanding the problem.' },
    {
      index: '02',
      title: 'Build for tomorrow',
      description: 'Architecture should support growth without creating unnecessary complexity.',
    },
    {
      index: '03',
      title: 'Keep it maintainable',
      description: 'Clear boundaries, reusable components and documented decisions create software teams can evolve.',
    },
    {
      index: '04',
      title: 'Deliver continuously',
      description: 'Frequent feedback and incremental delivery keep products moving forward.',
    },
  ];
}
