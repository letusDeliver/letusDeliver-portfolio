import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

export type AnalyticsEvent =
  | 'start_project_click'
  | 'contact_form_started'
  | 'contact_form_submitted'
  | 'work_project_viewed'
  | 'live_demo_clicked'
  | 'github_clicked';

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/**
 * Vendor-agnostic analytics facade. No analytics vendor is wired up yet —
 * when `environment.analyticsId` is configured this pushes events onto
 * `window.dataLayer`, which any GTM-compatible vendor can consume. Until
 * then, events are simply no-ops on the server and logged in development.
 */
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly platformId = inject(PLATFORM_ID);

  track(event: AnalyticsEvent, payload: Record<string, unknown> = {}): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (!environment.analyticsId) {
      if (!environment.production) {
        console.debug('[analytics]', event, payload);
      }
      return;
    }

    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event, ...payload });
  }
}
