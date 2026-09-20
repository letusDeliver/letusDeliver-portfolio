import { isPlatformBrowser } from '@angular/common';
import { DestroyRef, Directive, ElementRef, PLATFORM_ID, afterNextRender, inject } from '@angular/core';

/**
 * Writes two families of custom properties as the pointer moves over the
 * host element:
 *
 *  - `--pointer-x`/`--pointer-y` (px, relative to the host's top-left) —
 *    consumed by the `.pointer-glow` radial-gradient card highlight.
 *  - `--pointer-dx`/`--pointer-dy` (unitless, -1..1, relative to the
 *    host's center) — consumed by `.ambient-orb`'s subtle drift transform.
 *
 * Desktop-only (`hover: hover` + `pointer: fine`) and skipped under
 * reduced motion — on touch devices / reduced motion the custom
 * properties are simply never set, so both consumers' zero/`opacity: 0`
 * defaults keep them inert.
 *
 * Deliberately writes raw DOM styles, not a signal — under zoneless
 * change detection a signal write schedules a CD pass; a plain
 * `style.setProperty` call does not, so 60fps pointer movement never
 * triggers Angular at all. The bounding-rect read is throttled alongside
 * the write (both happen once per animation frame, inside the same rAF
 * callback), not once per `pointermove` event.
 *
 * Pure data plumbing — attaching this directive alone draws nothing. Add
 * the `pointer-glow` class (for the card radial highlight) and/or an
 * `.ambient-orb` descendant (for the hero-style drift) explicitly at the
 * call site, so a consumer can opt into either, both, or neither visual.
 */
@Directive({
  selector: '[appPointerGlow]',
})
export class PointerGlow {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  private rafId: number | null = null;
  private pendingClientX = 0;
  private pendingClientY = 0;

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        return;
      }
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const el = this.host.nativeElement;
      const onPointerMove = (event: PointerEvent): void => {
        this.pendingClientX = event.clientX;
        this.pendingClientY = event.clientY;
        this.scheduleUpdate();
      };

      el.addEventListener('pointermove', onPointerMove);
      this.destroyRef.onDestroy(() => {
        el.removeEventListener('pointermove', onPointerMove);
        if (this.rafId !== null) {
          cancelAnimationFrame(this.rafId);
        }
      });
    });
  }

  private scheduleUpdate(): void {
    if (this.rafId !== null) {
      return;
    }
    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      const el = this.host.nativeElement;
      const rect = el.getBoundingClientRect();

      const x = this.pendingClientX - rect.left;
      const y = this.pendingClientY - rect.top;
      el.style.setProperty('--pointer-x', `${x}px`);
      el.style.setProperty('--pointer-y', `${y}px`);

      const dx = rect.width > 0 ? (x / rect.width - 0.5) * 2 : 0;
      const dy = rect.height > 0 ? (y / rect.height - 0.5) * 2 : 0;
      el.style.setProperty('--pointer-dx', `${dx.toFixed(3)}`);
      el.style.setProperty('--pointer-dy', `${dy.toFixed(3)}`);
    });
  }
}
