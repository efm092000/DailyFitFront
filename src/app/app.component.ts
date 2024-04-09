import { Component } from '@angular/core';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterOutlet, RouterModule } from '@angular/router';
import {RoutinesComponent} from "./components/routines/routines.component";
import { LoginComponent } from "./components/login/login.component";
import {RoutineComponent} from "./components/routine/routine.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, LoginComponent, RoutinesComponent, RoutineComponent, HomePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'daily-fit';
}
