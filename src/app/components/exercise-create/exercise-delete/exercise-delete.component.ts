import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Exercise} from "../../../interfaces/exercise";
import {NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ExerciseService} from "../../../services/exercise.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-exercise-delete',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './exercise-delete.component.html',
  styleUrl: './exercise-delete.component.css'
})
export class ExerciseDeleteComponent implements OnInit {
  @Output() confirmClicked: EventEmitter<void> = new EventEmitter<void>();
  exercises: Exercise[] = [];
  searchFilters = {
    difficulty: "",
    material: "",
    muscleGroup: "",
    name: "",
    type: "",
  };
  selectedExercise: string = '';
  constructor(protected exerciseService: ExerciseService) {}

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

  deleteExercise(){
    this.exerciseService.deleteExercise(this.selectedExercise);
  }


}
