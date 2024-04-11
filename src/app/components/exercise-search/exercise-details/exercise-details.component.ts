import {Component, Input} from '@angular/core';
import {Exercise} from "../../../interfaces/exercise";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-exercise-details',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './exercise-details.component.html',
  styleUrl: './exercise-details.component.css'
})
export class ExerciseDetailsComponent {
  @Input() exercise!: Exercise;
}
