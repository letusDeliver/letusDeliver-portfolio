import { Component, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'md' | 'lg';

@Component({
  selector: 'app-button',
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './button.html',
})
export class Button {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  /**
   * Internal navigation target. Deliberately NOT named `routerLink` —
   * giving a component input the same name as a built-in directive
   * selector causes Angular to match that directive onto this host
   * element too (in any template that also imports `RouterLink`),
   * which silently breaks content projection and click handling.
   */
  link = input<string | undefined>(undefined);
  href = input<string | undefined>(undefined);
  /** Set for off-site `href` links (GitHub, live demos) so they open in a new tab. */
  external = input(false);
  type = input<'button' | 'submit'>('button');
  disabled = input(false);

  protected readonly classesByVariant: Record<ButtonVariant, string> = {
    // White text on the brand accent only measures ~4.2:1 (~2.7:1 on the
    // hover shade) — under WCAG AA's 4.5:1 for normal-size text. Dark
    // text on both accent shades comfortably passes (~4.7:1 / ~7.3:1).
    primary:
      'bg-accent text-background hover:bg-accent-bright shadow-[0_0_0_1px_rgba(139,92,246,0.4)] hover:shadow-glow',
    secondary: 'bg-elevated text-primary-text border border-border hover:border-accent/60',
    ghost: 'text-primary-text hover:text-accent-bright',
  };

  protected readonly classesBySize: Record<ButtonSize, string> = {
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-base',
  };
}
