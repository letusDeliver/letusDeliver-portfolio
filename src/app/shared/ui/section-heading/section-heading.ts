import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  templateUrl: './section-heading.html',
})
export class SectionHeading {
  eyebrow = input<string | undefined>(undefined);
  heading = input.required<string>();
  description = input<string | undefined>(undefined);
  align = input<'left' | 'center'>('left');
}
