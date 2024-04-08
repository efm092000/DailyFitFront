import { Routes } from '@angular/router';
import { SignUpComponent } from "./sign-up/sign-up.component";
import { LoginComponent } from "./login/login.component";

export const routes: Routes = [
  { path: 'routines', loadComponent: () => import('./components/routines/routines.component').then(m => m.RoutinesComponent) }
	{ path: 'login', component: LoginComponent },
	{ path: 'sign-up', component: SignUpComponent }
];
