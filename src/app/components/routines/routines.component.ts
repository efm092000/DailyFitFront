import { Component, OnInit } from '@angular/core';
import { RouterLink} from "@angular/router";
import { JsonPipe, NgFor} from "@angular/common";
import {RoutinesService} from "../../services/routines.service";
import {Routine} from "../../interfaces/routine.interface";


@Component({
  selector: 'app-routines',
  standalone: true,
  imports: [
    JsonPipe,
    NgFor,
    RouterLink,
  ],
  templateUrl: './routines.component.html',
  styleUrl: './routines.component.css'
})
export class RoutinesComponent implements OnInit{
  userRoutines?: any[] = [];
  routine?: Routine;

  constructor(private serviceRoutines: RoutinesService) {}

  ngOnInit(): void {
    this.serviceRoutines.getUserRoutines().subscribe(
      {
        next: (routines: any[] | undefined) => {
          this.userRoutines = routines;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }
/*
  loadDetails(): void {
    this.serviceRoutines.getRoutine().subscribe(
      {
        next: (routine: Routine | undefined) => {
          this.routine = routine;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }
 */
}

