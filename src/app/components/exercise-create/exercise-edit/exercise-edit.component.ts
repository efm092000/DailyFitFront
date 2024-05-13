import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {Exercise} from "../../../interfaces/exercise";
import {ExerciseService} from "../../../services/exercise.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-exercise-edit',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './exercise-edit.component.html',
  styleUrl: './exercise-edit.component.css'
})
export class ExerciseEditComponent  implements OnInit {
  exercises: Exercise[] = [];
  searchFilters = {
    difficulty: "",
    material: "",
    muscleGroup: "",
    name: "",
    type: "",
  };
  constructor(protected exerciseService: ExerciseService){}

  ngOnInit(): void {
    this.loadExercises(this.searchFilters);

  }

  loadExercises(filters: any){
    this.exerciseService.getExercises(filters).subscribe(
      (exercises: Exercise[]) => {
        this.exercises = exercises;
      },(error) => {
        console.error('Error al obtener los ejercicios:', error);
      }
    );
  }
}
