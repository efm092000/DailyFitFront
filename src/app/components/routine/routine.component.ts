import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {RoutineService} from "../../services/routine.service";
import {ExerciseRoutine} from "../../interfaces/routine-exercise.interface";

@Component({
  selector: 'app-routine',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './routine.component.html',
  styleUrl: './routine.component.css'
})
export class RoutineComponent implements OnInit{
  constructor(private serviceRoutine: RoutineService) {
  }

  exercises?: ExerciseRoutine[] = [];

  ngOnInit(): void {
    this.serviceRoutine.getRoutineExercises().subscribe(
      {
        next: (exercisesRoutine: ExerciseRoutine[] | undefined) => {
          this.exercises = exercisesRoutine;
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }



  addExerciseButton: boolean = false;
  saveRoutineButton: boolean = false;
  editRoutineButton: boolean = true;
  /*async loadExercises(): Promise<Exercise[]> {
    const response = await fetch('http://localhost:8080/api/routine/30/exercises');
    const data = await response.json();
    return data.map((e: any) => ({
      exercise: e.exercise,
      sets: e.sets,
      reps: e.reps
    }));
  }*/

  saveRoutineAction() {
    this.addExerciseButton = false;
    this.saveRoutineButton = false;
    this.editRoutineButton = true;
  }

  editRoutineAction() {
    this.addExerciseButton = true;
    this.saveRoutineButton = true;
    this.editRoutineButton = false;
  }
}
