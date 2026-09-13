import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
  },
  {
    path: 'work',
    loadChildren: () => import('./features/work/work.routes').then((m) => m.WORK_ROUTES),
  },
  {
    path: 'services',
    loadChildren: () => import('./features/services/services.routes').then((m) => m.SERVICES_ROUTES),
  },
  {
    path: 'about',
    loadChildren: () => import('./features/about/about.routes').then((m) => m.ABOUT_ROUTES),
  },
  {
    path: 'insights',
    loadChildren: () => import('./features/insights/insights.routes').then((m) => m.INSIGHTS_ROUTES),
  },
  {
    path: 'start-a-project',
    loadChildren: () => import('./features/start-project/start-project.routes').then((m) => m.START_PROJECT_ROUTES),
  },
  {
    path: 'privacy',
    loadChildren: () => import('./features/legal/legal.routes').then((m) => m.PRIVACY_ROUTES),
  },
  {
    path: 'terms',
    loadChildren: () => import('./features/legal/legal.routes').then((m) => m.TERMS_ROUTES),
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
  },
];
