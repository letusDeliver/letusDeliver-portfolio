import { Component, input } from '@angular/core';

export type TagTone = 'neutral' | 'accent';

@Component({
  selector: 'app-tag',
  template: `
    <span
      class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium"
      [class]="
        tone() === 'accent'
          ? 'border-accent/40 bg-accent/10 text-accent-bright'
          : 'border-border bg-surface text-secondary-text'
      "
    >
      <ng-content />
    </span>
  `,
})
export class Tag {
  tone = input<TagTone>('neutral');
}
