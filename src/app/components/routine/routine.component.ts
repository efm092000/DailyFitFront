import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {RoutinesService} from "../../services/routines.service";
import {Routine} from "../../interfaces/routine.interface";
import {RouterLink} from "@angular/router";
import {UserRoutines} from "../../interfaces/user-routines.interface";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-routine',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    NgIf,
    RouterLink,
    FormsModule
  ],
  templateUrl: './routine.component.html',
  styleUrl: './routine.component.css'
})
export class RoutineComponent implements OnInit{
  constructor(private serviceRoutine: RoutinesService) {
  }

  exercises?: Routine[] = [];
  routineId: number = 0;
  routine?: UserRoutines;
  isEditMode: boolean = false;
  showDeleteConfirmation: boolean = false;
  routineName: string = "";

  ngOnInit(): void {
    this.serviceRoutine.routine$.subscribe(routine => {
      this.routineId = routine;
    });
    this.serviceRoutine.getRoutineExercises(this.routineId).subscribe(
      {
        next: (exercisesRoutine: Routine[] | undefined) => {
          this.exercises = exercisesRoutine;
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
    this.serviceRoutine.getRoutine(this.routineId).subscribe(
      {
        next: (routine: UserRoutines | undefined) => {
          this.routine = routine;
          this.routineName = <string>routine?.name;
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  toggleMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  saveRoutineAction() {
    const routineNameInput = document.getElementById("routine-name");
    this.routineName = (routineNameInput as HTMLInputElement).value;
    this.serviceRoutine.editRoutine(this.routineId, this.routineName);
    this.toggleMode();
  }

  editRoutineAction() {
    this.toggleMode();
  }

  addExerciseAction() {

  }

  toggleDeleteConfirmation(): void {
    this.showDeleteConfirmation = !this.showDeleteConfirmation;
  }

  deleteRoutineAction() {
    this.serviceRoutine.deleteRoutine(this.routineId);
  }

  deleteExerciseAction(exercise: any) {
    console.log("rid: ", this.routineId);
    console.log("Exercise: ", exercise.exercise);
    console.log("Sets: ", exercise.sets);
    console.log("Reps: ", exercise.reps);
    this.serviceRoutine.deleteExerciseFromRoutine(this.routineId, exercise.exercise, exercise.sets, exercise.reps);
    const index = this.exercises?.indexOf(exercise);
    this.exercises?.splice(<number>index, 1);
  }
}
