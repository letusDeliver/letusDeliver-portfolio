import { Component } from '@angular/core';
import { SectionHeading } from '../../../../shared/ui/section-heading/section-heading';
import { Reveal } from '../../../../shared/directives/reveal';
import { FOUNDERS } from '../../../../core/data';

@Component({
  selector: 'app-home-founders-complementary',
  imports: [SectionHeading, Reveal],
  templateUrl: './founders-complementary.html',
})
export class FoundersComplementary {
  // Reuses each founder's own `buildingLetusdeliver` data (see
  // founder.model.ts / founders.data.ts) rather than a second, separate
  // copy of the same "what this founder focuses on" facts.
  protected readonly kunal = FOUNDERS.find((f) => f.slug === 'kunal')!;
  protected readonly mrityunjay = FOUNDERS.find((f) => f.slug === 'mrityunjay')!;
}
