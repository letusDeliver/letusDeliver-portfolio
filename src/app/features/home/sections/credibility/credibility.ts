import { Component } from '@angular/core';
import { Reveal } from '../../../../shared/directives/reveal';

interface Stat {
  line1: string;
  line2: string;
}

@Component({
  selector: 'app-home-credibility',
  imports: [Reveal],
  templateUrl: './credibility.html',
})
export class Credibility {
  protected readonly stats: Stat[] = [
    { line1: '10+ Years', line2: 'Combined Experience' },
    { line1: 'Full-Stack', line2: 'Engineering' },
    { line1: 'Cloud &', line2: 'AI' },
    { line1: 'Founder-', line2: 'Led' },
  ];
}
