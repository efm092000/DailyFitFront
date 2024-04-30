import { Routes } from '@angular/router';
import { WeeklyComponent } from "./components/weekly/weekly.component";
import { ProgressComponent } from "./components/progress/progress.component";
import { RoutinesComponent } from "./components/routines/routines.component";
import { RoutineComponent } from "./components/routine/routine.component";
import { ExerciseDetailsComponent } from "./components/exercise-search/exercise-details/exercise-details.component";
import { TodayPlanningComponent } from "./components/today-planning/today-planning.component";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { ExerciseSearchComponent } from "./components/exercise-search/exercise-search.component";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { LoginComponent } from "./components/login/login.component";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      { path: '', component: HomePageComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'details', component: ExerciseDetailsComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'routine', component: RoutineComponent },
      { path: 'routines', component: RoutinesComponent },
      { path: 'search', component: ExerciseSearchComponent },
      { path: 'today', component: TodayPlanningComponent },
      { path: 'weekly', component: WeeklyComponent },
    ]
  },
  {
    path: '',
    loadComponent: () => import('./components/header-only-layout/header-only-layout.component').then(m => m.HeaderOnlyLayoutComponent),
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'sign-up', component: SignUpComponent },
    ]
  },
];
