import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, OnDestroy, PLATFORM_ID, inject, input } from '@angular/core';

/**
 * Adds a `reveal-in` class once the host scrolls into view, driving the
 * fade/slide-up defined in styles/animations.css. Falls back to an
 * immediately-visible state on the server and when IntersectionObserver
 * is unavailable, so content is never hidden from crawlers or non-JS
 * clients.
 */
@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal',
  },
})
export class Reveal implements AfterViewInit, OnDestroy {
  readonly appRevealDelay = input<number>(0);

  private readonly platformId = inject(PLATFORM_ID);
  private readonly host = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || typeof IntersectionObserver === 'undefined') {
      this.host.nativeElement.classList.add('reveal-in');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.animationDelay = `${this.appRevealDelay()}ms`;
            el.classList.add('reveal-in');
            this.observer?.unobserve(el);
          }
        }
      },
      { threshold: 0.15 },
    );

    this.observer.observe(this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
