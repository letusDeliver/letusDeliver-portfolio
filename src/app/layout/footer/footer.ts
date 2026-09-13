import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { siteConfig } from '../../core/config/site.config';

interface FooterLink {
  label: string;
  path: string;
}

interface SocialLink {
  label: string;
  key: keyof typeof siteConfig.social;
}

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
})
export class Footer {
  protected readonly year = new Date().getFullYear();
  protected readonly tagline = siteConfig.shortPositioning;
  protected readonly social = siteConfig.social;

  protected readonly links: FooterLink[] = [
    { label: 'Work', path: '/work' },
    { label: 'Services', path: '/services' },
    { label: 'About', path: '/about' },
    { label: 'Insights', path: '/insights' },
    { label: 'Start a Project', path: '/start-a-project' },
  ];

  protected readonly socialLinks: SocialLink[] = [
    { label: 'GitHub', key: 'github' },
    { label: 'LinkedIn', key: 'linkedin' },
    { label: 'YouTube', key: 'youtube' },
    { label: 'X', key: 'x' },
    { label: 'Instagram', key: 'instagram' },
    { label: 'Facebook', key: 'facebook' },
    { label: 'Upwork', key: 'upwork' },
  ];
}
