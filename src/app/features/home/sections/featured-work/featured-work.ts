import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeading } from '../../../../shared/ui/section-heading/section-heading';
import { Tag } from '../../../../shared/ui/tag/tag';
import { Button } from '../../../../shared/ui/button/button';
import { Reveal } from '../../../../shared/directives/reveal';
import { PROJECTS } from '../../../../core/data';

@Component({
  selector: 'app-home-featured-work',
  imports: [RouterLink, SectionHeading, Tag, Button, Reveal],
  templateUrl: './featured-work.html',
})
export class FeaturedWork {
  protected readonly projects = PROJECTS.filter((p) => p.featured).slice(0, 3);
}
