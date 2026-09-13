import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';
import { Meta } from '@angular/platform-browser';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'theme';
const THEME_COLOR: Record<Theme, string> = {
  dark: '#0a0a0b',
  light: '#ffffff',
};

/**
 * letusdeliver's brand identity is dark by default (see PROGRESS.md) —
 * this deliberately does NOT read `prefers-color-scheme` on first visit,
 * so a visitor's OS light-mode setting doesn't silently flip the brand
 * theme. Light is strictly an opt-in the visitor reaches via the header
 * toggle, remembered across visits in `localStorage`.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly meta = inject(Meta);

  readonly theme = signal<Theme>(this.readInitialTheme());

  constructor() {
    effect(() => {
      const theme = this.theme();
      this.document.documentElement.setAttribute('data-theme', theme);
      this.meta.updateTag({ name: 'theme-color', content: THEME_COLOR[theme] });

      if (isPlatformBrowser(this.platformId)) {
        try {
          localStorage.setItem(STORAGE_KEY, theme);
        } catch {
          // Storage unavailable (private browsing, disabled storage) — the
          // toggle still works for the current page view, it just won't persist.
        }
      }
    });
  }

  toggle(): void {
    this.theme.set(this.theme() === 'dark' ? 'light' : 'dark');
  }

  private readInitialTheme(): Theme {
    if (!isPlatformBrowser(this.platformId)) {
      return 'dark';
    }

    try {
      return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  }
}
