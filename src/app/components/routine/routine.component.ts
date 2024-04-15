import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {RoutinesService} from "../../services/routines.service";
import {Routine} from "../../interfaces/routine.interface";
import {RouterLink} from "@angular/router";
import {UserRoutines} from "../../interfaces/user-routines.interface";

@Component({
  selector: 'app-routine',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    NgIf,
    RouterLink
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
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  addExerciseButton: boolean = false;
  deleteRoutineButton: boolean = false;

  toggleMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  saveRoutineAction() {
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

  cancelDeleteRoutineAction() {
    this.deleteRoutineButton = false;
  }
}
