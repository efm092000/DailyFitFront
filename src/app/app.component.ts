import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RoutineComponent} from "./components/routine/routine.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RoutineComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'daily-fit';
}
