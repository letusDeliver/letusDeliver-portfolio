/**
 * Development defaults. Production values are supplied via
 * environment.production.ts (wired through angular.json fileReplacements)
 * and should be set at deploy time through your hosting provider's
 * environment/config mechanism — never hard-code secrets here.
 */
export const environment = {
  production: false,
  publicSiteUrl: 'http://localhost:4200',
  apiBaseUrl: 'http://localhost:4200/api',
  contactEndpoint: '/api/contact',
  analyticsId: '',
  /**
   * No contact backend exists yet in this repository (see
   * core/services/contact.service.ts for the documented API contract).
   * While that's true, the dev environment simulates a successful
   * response so the Start a Project flow can be demoed locally. Set to
   * `false` once a real `contactEndpoint` is live.
   */
  useMockContactApi: true,
};
