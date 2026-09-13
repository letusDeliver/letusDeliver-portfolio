import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { siteConfig } from '../config/site.config';

export interface PageMetadata {
  title: string;
  description: string;
  /** Path beginning with `/`, used to build the canonical URL and og:url. */
  path: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  update(data: PageMetadata): void {
    const fullTitle = data.title.includes('letusdeliver') ? data.title : `${data.title} — letusdeliver`;
    const url = `${siteConfig.siteUrl}${data.path}`;

    this.titleService.setTitle(fullTitle);

    this.meta.updateTag({ name: 'description', content: data.description });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: data.type ?? 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'letusdeliver' });
    this.meta.updateTag({ name: 'twitter:card', content: data.image ? 'summary_large_image' : 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: data.description });

    // No default social preview image is committed yet — only set og/twitter
    // image tags when a real page explicitly supplies one, rather than
    // pointing at a placeholder asset that doesn't exist.
    if (data.image) {
      this.meta.updateTag({ property: 'og:image', content: data.image });
      this.meta.updateTag({ name: 'twitter:image', content: data.image });
    } else {
      this.meta.removeTag('property="og:image"');
      this.meta.removeTag('name="twitter:image"');
    }

    this.setCanonical(url);
  }

  private setCanonical(url: string): void {
    let link: HTMLLinkElement | null = this.document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  /** Injects (or replaces) a single JSON-LD structured data block identified by `id`. */
  setStructuredData(id: string, data: Record<string, unknown>): void {
    const existing = this.document.getElementById(id);
    if (existing) {
      existing.remove();
    }
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.text = JSON.stringify(data);
    this.document.head.appendChild(script);
  }
}
