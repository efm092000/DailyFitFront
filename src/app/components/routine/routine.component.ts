import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {RoutineService} from "../../services/routine.service";
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
  constructor(private serviceRoutine: RoutineService) {
  }

  exercises?: Routine[] = [];

  ngOnInit(): void {
    this.serviceRoutine.getRoutineExercises().subscribe(
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
    
  }
}
