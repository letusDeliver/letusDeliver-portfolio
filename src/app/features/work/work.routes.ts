import { Routes } from '@angular/router';

export const WORK_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./work-list/work-list').then((m) => m.WorkList),
  },
  {
    path: ':slug',
    loadComponent: () => import('./work-detail/work-detail').then((m) => m.WorkDetail),
  },
];
