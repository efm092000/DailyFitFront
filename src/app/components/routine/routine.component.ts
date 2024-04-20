import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {RoutinesService} from "../../services/routines.service";
import {Routine} from "../../interfaces/routine.interface";
import {RouterLink} from "@angular/router";
import {UserRoutine} from "../../interfaces/user-routines.interface";
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
  userRoutine: UserRoutine = this.serviceRoutine.userRoutine;
  isEditMode: boolean = this.serviceRoutine.isEditMode;
  showDeleteConfirmation: boolean = false;

  ngOnInit(): void {
    this.serviceRoutine.getRoutineExercises(this.userRoutine.rid).subscribe(
      (exercises) => {
        this.exercises = exercises;
      }
    )

  }

  toggleMode(): void {
    this.serviceRoutine.isEditMode = !this.serviceRoutine.isEditMode;
    this.isEditMode = this.serviceRoutine.isEditMode;
  }

  saveRoutineAction() {
    const routineNameInput = document.getElementById("routine-name");
    this.userRoutine.name = (routineNameInput as HTMLInputElement).value;
    this.serviceRoutine.editRoutine(this.userRoutine.rid, this.userRoutine.name).subscribe();
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
    this.serviceRoutine.deleteRoutine(this.userRoutine.rid);
  }

  deleteExerciseAction(exercise: any) {
    this.serviceRoutine.deleteExerciseFromRoutine(this.userRoutine.rid, exercise.exercise, exercise.sets, exercise.reps);
    const index = this.exercises?.indexOf(exercise);
    this.exercises?.splice(<number>index, 1);
  }
}
