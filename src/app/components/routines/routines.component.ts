import { Component, OnInit } from '@angular/core';
import { RouterLink} from "@angular/router";
import {JsonPipe, NgFor, NgIf} from "@angular/common";
import {RoutinesService} from "../../services/routines.service";
import {UserRoutines} from "../../interfaces/user-routines.interface";
import {Routine} from "../../interfaces/routine.interface";
import {RoutineComponent} from "../routine/routine.component";


@Component({
  selector: 'app-routines',
  standalone: true,
  imports: [
    JsonPipe,
    NgFor,
    RouterLink,
    RoutineComponent,
    NgIf,
  ],
  templateUrl: './routines.component.html',
  styleUrl: './routines.component.css'
})
export class RoutinesComponent implements OnInit{
  userRoutines?: UserRoutines[] = [];
  routine?: Routine;
  rid?: number
  showChild: boolean = false;

  constructor(private serviceRoutines: RoutinesService) {}

  ngOnInit(): void {
    this.serviceRoutines.getUserRoutines().subscribe(
      {
        next: (routines: UserRoutines[] | undefined) => {
          this.userRoutines = routines;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  loadRoutine(routineId: number): void {
    this.serviceRoutines.getRoutine(routineId).subscribe(
      {
        next: (routine: Routine | undefined) => {
          this.routine = routine;
          this.rid = routineId;
          this.showChild = true;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  getRoutineId(): number {
    return <number>this.rid;
  }

  showParent($event: boolean) {
    this.showChild = false;
  }
}

