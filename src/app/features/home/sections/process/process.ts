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
    { index: '01', label: 'Understand' },
    { index: '02', label: 'Architect' },
    { index: '03', label: 'Build' },
    { index: '04', label: 'Test' },
    { index: '05', label: 'Review' },
    { index: '06', label: 'Deploy' },
    { index: '07', label: 'Improve' },
  ];
}
