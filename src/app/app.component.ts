import { Component } from '@angular/core';
import {HeaderComponent} from "./components/header/header.component";
import {PruebaComponent} from "./components/prueba/prueba.component";
import {FooterComponent} from "./components/footer/footer.component";
import { HomePageComponent } from './components/home-page/home-page.component';
import {RouterModule } from '@angular/router';
import {RoutinesComponent} from "./components/routines/routines.component";
import { LoginComponent } from "./components/login/login.component";
import {RoutineComponent} from "./components/routine/routine.component";
import {ExerciseSearchComponent} from "./components/exercise-search/exercise-search.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, PruebaComponent, FooterComponent, RouterModule, LoginComponent, RoutinesComponent, RoutineComponent, ExerciseSearchComponent, HomePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'daily-fit';
}
