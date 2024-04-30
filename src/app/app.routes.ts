import { Routes } from '@angular/router';
import {WeeklyComponent} from "./components/weekly/weekly.component";
import { ProgressComponent } from "./components/progress/progress.component";
import { RoutinesComponent } from "./components/routines/routines.component";
import { RoutineComponent } from "./components/routine/routine.component";
import { ExerciseDetailsComponent } from "./components/exercise-search/exercise-details/exercise-details.component";
import { TodayPlanningComponent } from "./components/today-planning/today-planning.component";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { ExerciseSearchComponent } from "./components/exercise-search/exercise-search.component";
import { HomePageComponent } from "./components/home-page/home-page.component";

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/main-layout/main-layout.component').then(m => m.MainLayoutComponent), children: [{path: '', component: HomePageComponent}]},
  { path: 'weekly', loadComponent: () => import('./components/main-layout/main-layout.component').then(m => m.MainLayoutComponent), children: [{path: '', component: WeeklyComponent}]},
  { path: 'search', loadComponent: () => import('./components/main-layout/main-layout.component').then(m => m.MainLayoutComponent), children: [{path: '', component: ExerciseSearchComponent}]},
  { path: 'details', loadComponent: () => import('./components/main-layout/main-layout.component').then(m => m.MainLayoutComponent), children: [{path: '', component: ExerciseDetailsComponent}]},
  { path: 'routines', loadComponent: () => import('./components/main-layout/main-layout.component').then(m => m.MainLayoutComponent), children: [{path: '', component: RoutinesComponent}]},
	{ path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)},
	{ path: 'sign-up', loadComponent: () => import('./components/sign-up/sign-up.component').then(m => m.SignUpComponent)},
  { path: 'routine', loadComponent: () => import('./components/main-layout/main-layout.component').then(m => m.MainLayoutComponent), children: [{path: '', component: RoutineComponent}]},
  { path: 'progress', loadComponent: () => import('./components/main-layout/main-layout.component').then(m => m.MainLayoutComponent), children: [{path: '', component: ProgressComponent}]},
  { path: 'today', loadComponent: () => import('./components/main-layout/main-layout.component').then(m => m.MainLayoutComponent), children: [{path: '', component: TodayPlanningComponent}]},
  { path: 'calendar', loadComponent: () => import('./components/main-layout/main-layout.component').then(m => m.MainLayoutComponent), children: [{path: '', component: CalendarComponent}]},
];
