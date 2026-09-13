import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeading } from '../../../../shared/ui/section-heading/section-heading';
import { Reveal } from '../../../../shared/directives/reveal';
import { FOUNDERS } from '../../../../core/data';

@Component({
  selector: 'app-home-founders-preview',
  imports: [RouterLink, SectionHeading, Reveal],
  templateUrl: './founders-preview.html',
})
export class FoundersPreview {
  protected readonly founders = FOUNDERS;
}
