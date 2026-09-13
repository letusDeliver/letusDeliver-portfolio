/**
 * Central, environment-driven site configuration.
 * Values fall back to safe placeholders when not supplied via environment.
 * No secrets belong here — this file is bundled into the client.
 */
import { environment } from '../../../environments/environment';

export interface SocialLinks {
  github: string | null;
  linkedin: string | null;
  youtube: string | null;
  x: string | null;
  instagram: string | null;
  facebook: string | null;
  upwork: string | null;
}

export const siteConfig = {
  name: 'letusdeliver',
  tagline: 'Think. Build. Deliver.',
  shortPositioning: 'Software Engineering · Cloud · AI',
  siteUrl: environment.publicSiteUrl,
  apiBaseUrl: environment.apiBaseUrl,
  contactEndpoint: environment.contactEndpoint,
  analyticsId: environment.analyticsId,
  /**
   * Social profiles are not yet live. Keep every entry `null` until a real
   * URL is supplied — the footer renders only the links that are configured.
   */
  social: {
    github: null,
    linkedin: null,
    youtube: null,
    x: null,
    instagram: null,
    facebook: null,
    upwork: null,
  } satisfies SocialLinks,
  founders: {
    kunal: 'kunal',
    mrityunjay: 'mrityunjay',
  },
} as const;
