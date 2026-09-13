import { Component } from '@angular/core';
import { SectionHeading } from '../../../../shared/ui/section-heading/section-heading';
import { Reveal } from '../../../../shared/directives/reveal';

interface Stage {
  index: string;
  label: string;
}

@Component({
  selector: 'app-home-process',
  imports: [SectionHeading, Reveal],
  templateUrl: './process.html',
})
export class Process {
  protected readonly stages: Stage[] = [
    { index: '01', label: 'Discover' },
    { index: '02', label: 'Design' },
    { index: '03', label: 'Build' },
    { index: '04', label: 'Validate' },
    { index: '05', label: 'Deliver' },
    { index: '06', label: 'Scale' },
  ];
}
