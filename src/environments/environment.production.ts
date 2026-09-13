/**
 * Production configuration. Replace placeholder values at build/deploy
 * time (e.g. via CI secrets or hosting-platform env injection). No secret
 * keys belong in this file — only public, non-sensitive configuration.
 */
export const environment = {
  production: true,
  publicSiteUrl: 'https://letusdeliver.com',
  apiBaseUrl: 'https://api.letusdeliver.com',
  contactEndpoint: '/api/contact',
  analyticsId: '',
  /** Flip to `false` only once a real contact backend is deployed. */
  useMockContactApi: true,
};
