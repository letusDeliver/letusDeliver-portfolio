import { Routes } from '@angular/router';

export const ABOUT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./about').then((m) => m.About),
  },
  {
    path: ':slug',
    loadComponent: () => import('./founder/founder').then((m) => m.FounderPage),
  },
];
