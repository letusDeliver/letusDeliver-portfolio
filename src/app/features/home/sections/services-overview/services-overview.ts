import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeading } from '../../../../shared/ui/section-heading/section-heading';
import { Reveal } from '../../../../shared/directives/reveal';
import { SERVICES } from '../../../../core/data';

@Component({
  selector: 'app-home-services-overview',
  imports: [RouterLink, SectionHeading, Reveal],
  templateUrl: './services-overview.html',
})
export class ServicesOverview {
  protected readonly services = SERVICES;
}
