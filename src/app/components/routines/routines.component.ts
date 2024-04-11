import { Component, OnInit } from '@angular/core';
import { RouterLink} from "@angular/router";
import { JsonPipe, NgFor} from "@angular/common";
import {RoutinesService} from "../../services/routines.service";
import {UserRoutines} from "../../interfaces/user-routines.interface";
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
  userRoutines?: UserRoutines[] = [];
  routine?: Routine;

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
  onClick(routineId: number){
    this.serviceRoutines.loadRoutine(routineId);
  }
}

