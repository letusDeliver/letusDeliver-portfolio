import { Component } from '@angular/core';
import { SectionHeading } from '../../../../shared/ui/section-heading/section-heading';
import { Reveal } from '../../../../shared/directives/reveal';

interface WhyPoint {
  title: string;
  description: string;
}

@Component({
  selector: 'app-home-why-us',
  imports: [SectionHeading, Reveal],
  templateUrl: './why-us.html',
})
export class WhyUs {
  protected readonly points: WhyPoint[] = [
    { title: 'Experienced', description: '10+ years of combined professional experience.' },
    { title: 'End-to-End', description: 'Frontend, backend, databases, cloud and data engineering.' },
    { title: 'Founder-Led', description: 'Work directly with the engineers building your product.' },
    {
      title: 'Engineering-First',
      description: 'Architecture, maintainability, performance and reliability matter from day one.',
    },
  ];
}
