import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'routines', loadComponent: () => import('./components/routines/routines.component').then(m => m.RoutinesComponent) }
];
