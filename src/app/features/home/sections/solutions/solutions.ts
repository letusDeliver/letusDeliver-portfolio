import { Component } from '@angular/core';
import { SectionHeading } from '../../../../shared/ui/section-heading/section-heading';
import { Reveal } from '../../../../shared/directives/reveal';

interface Solution {
  title: string;
  description: string;
  examples: string[];
}

@Component({
  selector: 'app-home-solutions',
  imports: [SectionHeading, Reveal],
  templateUrl: './solutions.html',
})
export class Solutions {
  // Problem-domain framing, distinct from the technical-capability
  // framing in `services-overview` — same engineering, described by the
  // business problem it solves rather than the stack that solves it.
  protected readonly solutions: Solution[] = [
    {
      title: 'Education',
      description: 'Software for the day-to-day operations of running a school or training program.',
      examples: ['Student & attendance platforms', 'Fee management', 'Teacher & staff workflows', 'Reporting dashboards'],
    },
    {
      title: 'Healthcare',
      description: 'Operational systems for clinics and care teams — not clinical/diagnostic software.',
      examples: ['Appointment scheduling', 'Patient record workflows', 'Billing', 'Operational reporting'],
    },
    {
      title: 'Business Operations',
      description: 'Internal tools that replace spreadsheets and manual process with something the whole team can rely on.',
      examples: ['Employee management', 'Task & workflow tracking', 'Internal dashboards', 'Process automation'],
    },
    {
      title: 'Startups',
      description: 'From a rough idea to something real users can put load on.',
      examples: ['Product discovery & architecture', 'MVP development', 'Iteration on real feedback', 'Production launch'],
    },
  ];
}
