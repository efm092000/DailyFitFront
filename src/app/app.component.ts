import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import {RoutinesComponent} from "./components/routines/routines.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, RoutinesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'daily-fit';
}
