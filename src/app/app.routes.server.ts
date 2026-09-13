import { RenderMode, ServerRoute } from '@angular/ssr';
import { PROJECTS, FOUNDERS, ARTICLES } from './core/data';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'work/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => PROJECTS.map((p) => ({ slug: p.slug })),
  },
  {
    path: 'about/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => FOUNDERS.map((f) => ({ slug: f.slug })),
  },
  {
    path: 'insights/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => ARTICLES.map((a) => ({ slug: a.slug })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
