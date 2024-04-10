import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ExerciseSearchComponent} from "./components/exercise-search/exercise-search.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ExerciseSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'daily-fit';
}
