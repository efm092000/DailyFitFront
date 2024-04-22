import { Routes } from '@angular/router';
import { PruebaComponent } from "./components/prueba/prueba.component";
import {WeeklyComponent} from "./components/weekly/weekly.component";

export const routes: Routes = [
  {path: 'prueba', component:PruebaComponent},
  { path: '', loadComponent: () => import('./components/home-page/home-page.component').then(m => m.HomePageComponent)},
  { path: 'weekly', loadComponent: () => import('./components/weekly/weekly.component').then(m => m.WeeklyComponent)},
  { path: 'search', loadComponent: () => import('./components/exercise-search/exercise-search.component').then(m => m.ExerciseSearchComponent)},
  { path: 'details', loadComponent: () => import('./components/exercise-search/exercise-details/exercise-details.component').then(m => m.ExerciseDetailsComponent)},
  { path: 'routines', loadComponent: () => import('./components/routines/routines.component').then(m => m.RoutinesComponent)},
	{ path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)},
	{ path: 'sign-up', loadComponent: () => import('./components/sign-up/sign-up.component').then(m => m.SignUpComponent)},
  { path: 'sidebar', loadComponent: () => import('./components/sidebar/sidebar.component').then(m => m.SidebarComponent)},
  { path: 'routine', loadComponent: () => import('./components/routine/routine.component').then(m => m.RoutineComponent)},
  { path: 'progress', loadComponent: () => import('./components/progress/progress.component').then(m => m.ProgressComponent)},
  { path: 'today', loadComponent: () => import('./components/today-planning/today-planning.component').then (m => m.TodayPlanningComponent)},
  { path: 'calendar', loadComponent: () => import('./components/calendar/calendar.component').then (m => m.CalendarComponent)}
];
