import { Routes } from '@angular/router';
import { loggedGuard } from "./guards/logged.guard";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      { path: '', loadComponent: () => import('./components/home-page/home-page.component').then(m => m.HomePageComponent) },
      { path: 'calendar', loadComponent: () => import('./components/calendar/calendar.component').then(m => m.CalendarComponent), canActivate: [loggedGuard]},
      { path: 'details', loadComponent: () => import('./components/exercise-search/exercise-details/exercise-details.component').then(m => m.ExerciseDetailsComponent) },
      { path: 'progress', loadComponent: () => import('./components/progress/progress.component').then(m => m.ProgressComponent), canActivate: [loggedGuard]},
      { path: 'routine', loadComponent: () => import('./components/routine/routine.component').then(m => m.RoutineComponent), canActivate: [loggedGuard]},
      { path: 'routines', loadComponent: () => import('./components/routines/routines.component').then(m => m.RoutinesComponent), canActivate: [loggedGuard]},
      { path: 'search', loadComponent: () => import('./components/exercise-search/exercise-search.component').then(m => m.ExerciseSearchComponent) },
      { path: 'exercise', loadComponent: () => import('./components/exercise-create/exercise-create.component').then(m => m.ExerciseCreateComponent), canActivate: [loggedGuard]},
      { path: 'today', loadComponent: () => import('./components/today-planning/today-planning.component').then(m => m.TodayPlanningComponent), canActivate: [loggedGuard]},
      { path: 'profile', loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent), canActivate: [loggedGuard]},
      { path: 'weekly', loadComponent: () => import('./components/weekly/weekly.component').then(m => m.WeeklyComponent), canActivate: [loggedGuard]},
      { path: 'premium', loadComponent: () => import('./components/subscription/subscription.component').then(m => m.SubscriptionComponent)}
    ]
  },
  {
    path: '',
    loadComponent: () => import('./components/header-only-layout/header-only-layout.component').then(m => m.HeaderOnlyLayoutComponent),
    children: [
      { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
      { path: 'sign-up', loadComponent: () => import('./components/sign-up/sign-up.component').then(m => m.SignUpComponent) },
    ]
  },
];
