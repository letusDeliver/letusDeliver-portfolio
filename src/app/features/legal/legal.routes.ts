import { Routes } from '@angular/router';

export const PRIVACY_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./privacy/privacy').then((m) => m.Privacy),
  },
];

export const TERMS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./terms/terms').then((m) => m.Terms),
  },
];
