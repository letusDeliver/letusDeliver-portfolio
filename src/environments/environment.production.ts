/**
 * Production configuration. Replace placeholder values at build/deploy
 * time (e.g. via CI secrets or hosting-platform env injection). No secret
 * keys belong in this file — only public, non-sensitive configuration.
 */
export const environment = {
  production: true,
  publicSiteUrl: 'https://letusdeliver.com',
  apiBaseUrl: 'https://api.letusdeliver.com',
  contactEndpoint: 'https://api.letusdeliver.com/api/contact/submissions/',
  analyticsId: '',
  /**
   * The real backend (Django, same API contract verified against the local
   * instance — see core/services/contact.service.ts) is not deployed to
   * `api.letusdeliver.com` yet. Flip to `false` once it is.
   */
  useMockContactApi: true,
};
