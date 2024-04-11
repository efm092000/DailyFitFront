import { Routes } from '@angular/router';
import {ExerciseSearchComponent} from "./components/exercise-search/exercise-search.component";

export const routes: Routes = [
  { path: 'search', component: ExerciseSearchComponent},
  { path: 'routines', loadComponent: () => import('./components/routines/routines.component').then(m => m.RoutinesComponent)},
	{ path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)},
	{ path: 'sign-up', loadComponent: () => import('./components/sign-up/sign-up.component').then(m => m.SignUpComponent)},
  { path: 'routine', loadComponent: () => import('./components/routine/routine.component').then (m => m.RoutineComponent)}
];
