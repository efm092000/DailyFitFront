import { Routes } from '@angular/router';
import { PruebaComponent } from "./components/prueba/prueba.component";
import {WeeklyComponent} from "./weekly/weekly.component";

export const routes: Routes = [
  {path: 'prueba', component:PruebaComponent},
  {path: 'weekly', component:WeeklyComponent}
];
