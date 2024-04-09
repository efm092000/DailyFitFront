import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'routines', loadComponent: () => import('./components/routines/routines.component').then(m => m.RoutinesComponent)},
	{ path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)},
	{ path: 'sign-up', loadComponent: () => import('./components/sign-up/sign-up.component').then(m => m.SignUpComponent)},
  { path: 'routine', loadComponent: () => import('./components/routine/routine.component').then (m => m.RoutineComponent)}
];
