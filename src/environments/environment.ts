/**
 * Development defaults. Production values are supplied via
 * environment.production.ts (wired through angular.json fileReplacements)
 * and should be set at deploy time through your hosting provider's
 * environment/config mechanism — never hard-code secrets here.
 */
export const environment = {
  production: false,
  publicSiteUrl: 'http://localhost:4200',
  apiBaseUrl: 'http://127.0.0.1:8010/api',
  contactEndpoint: 'http://127.0.0.1:8010/api/contact/submissions/',
  analyticsId: '',
  /**
   * The Django backend (letusDeliver-backend, run via `python manage.py
   * runserver 8010` locally) is live at `contactEndpoint` above — CORS is
   * already configured there for `http://localhost:4200`. Set back to
   * `true` if you're working without the backend running locally.
   */
  useMockContactApi: false,
};
