import { Routes } from '@angular/router';

export const CAREERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./careers').then((m) => m.Careers),
  },
];
