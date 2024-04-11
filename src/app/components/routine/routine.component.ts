import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {RoutinesService} from "../../services/routines.service";
import {Routine} from "../../interfaces/routine.interface";

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
  constructor(private serviceRoutine: RoutinesService) {
  }

  exercises?: Routine[] = [];
  routineId?: number | undefined;

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
  }

  addExerciseButton: boolean = false;
  saveRoutineButton: boolean = false;
  editRoutineButton: boolean = true;

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

  addExerciseAction() {

  }

  deleteRoutineAction() {
    this.serviceRoutine.deleteRoutine(this.rid);
    location.reload();
    this.goBackAction();
  }

  @Output() goBackEvent = new EventEmitter<boolean>();
  goBackAction() {
    this.goBackEvent.emit();
  }
}
