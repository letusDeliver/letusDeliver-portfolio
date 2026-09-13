import { Routes } from '@angular/router';

export const INSIGHTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./insights-list/insights-list').then((m) => m.InsightsList),
  },
  {
    path: ':slug',
    loadComponent: () => import('./insight-detail/insight-detail').then((m) => m.InsightDetail),
  },
];
