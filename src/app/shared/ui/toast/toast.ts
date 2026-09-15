import { Component, effect, input, output } from '@angular/core';

/**
 * A transient success/status notification, fixed to the viewport corner.
 * Purely presentational + self-timing — the owning component just sets
 * `message` and clears it (or listens for `dismissed`) when done.
 */
@Component({
  selector: 'app-toast',
  template: `
    @if (message(); as text) {
      <div
        role="status"
        aria-live="polite"
        class="fixed bottom-6 right-6 z-50 flex max-w-sm items-start gap-3 rounded-xl border border-accent/40 bg-elevated px-5 py-4 text-sm text-primary-text shadow-lg"
      >
        <svg viewBox="0 0 20 20" class="mt-0.5 h-5 w-5 shrink-0 fill-accent-bright" aria-hidden="true">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.567a.75.75 0 0 0-1.214-.883l-2.98 3.928-1.463-1.412a.75.75 0 0 0-1.04 1.08l2.033 1.964a.75.75 0 0 0 1.127-.098l3.537-4.579Z"
            clip-rule="evenodd"
          />
        </svg>
        <span class="flex-1">{{ text }}</span>
        <button
          type="button"
          (click)="dismissed.emit()"
          aria-label="Dismiss notification"
          class="shrink-0 text-muted-text hover:text-primary-text"
        >
          <svg viewBox="0 0 20 20" class="h-4 w-4 fill-current" aria-hidden="true">
            <path
              d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"
            />
          </svg>
        </button>
      </div>
    }
  `,
})
export class Toast {
  message = input<string | null>(null);
  durationMs = input(5000);
  dismissed = output<void>();

  constructor() {
    effect((onCleanup) => {
      if (!this.message()) {
        return;
      }
      const timer = setTimeout(() => this.dismissed.emit(), this.durationMs());
      onCleanup(() => clearTimeout(timer));
    });
  }
}
