import {Component, Input} from '@angular/core';
import {Exercise} from "../../../interfaces/exercise";

@Component({
  selector: 'app-exercise-details',
  standalone: true,
  imports: [],
  templateUrl: './exercise-details.component.html',
  styleUrl: './exercise-details.component.css'
})
export class ExerciseDetailsComponent {
  @Input() exercise!: Exercise;
}
