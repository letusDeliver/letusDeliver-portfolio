import { Routes } from '@angular/router';

export const START_PROJECT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./start-project').then((m) => m.StartProject),
  },
];
