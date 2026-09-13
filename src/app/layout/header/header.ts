import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostListener, PLATFORM_ID, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Button } from '../../shared/ui/button/button';
import { AnalyticsService } from '../../core/services/analytics.service';
import { ThemeService } from '../../core/services/theme.service';

interface NavLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Button],
  templateUrl: './header.html',
})
export class Header {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly analytics = inject(AnalyticsService);
  protected readonly themeService = inject(ThemeService);

  protected readonly scrolled = signal(false);
  readonly mobileMenuOpen = signal(false);

  protected readonly links: NavLink[] = [
    { label: 'Work', path: '/work' },
    { label: 'Services', path: '/services' },
    { label: 'About', path: '/about' },
    { label: 'Insights', path: '/insights' },
  ];

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.scrolled.set(window.scrollY > 8);
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 8);
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    if (this.mobileMenuOpen()) {
      this.closeMenu();
    }
  }

  toggleMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  onStartProjectClick(): void {
    this.analytics.track('start_project_click', { source: 'header' });
  }
}
