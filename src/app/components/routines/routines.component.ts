import {Component, OnInit} from '@angular/core';
import { RouterLink } from "@angular/router";
import {JsonPipe, NgFor, NgIf} from "@angular/common";
import {RoutinesService} from "../../services/routines.service";
import {UserRoutine} from "../../interfaces/user-routines.interface";
import {RoutineComponent} from "../routine/routine.component";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {UserService} from "../../services/user.service";



@Component({
  selector: 'app-routines',
  standalone: true,
  imports: [
    JsonPipe,
    NgFor,
    RouterLink,
    RoutineComponent,
    NgIf,
    SidebarComponent,
  ],
  templateUrl: './routines.component.html',
  styleUrl: './routines.component.css'
})
export class RoutinesComponent implements OnInit{
  userRoutines?: UserRoutine[] = [];


  constructor(private serviceRoutines: RoutinesService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.serviceRoutines.getAllUserRoutines().subscribe(
      {
        next: (routines: UserRoutine[] | undefined) => {
          this.userRoutines = routines;
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  routineAccess(rid: number, name: string, email: string){
    console.log(rid);
    this.serviceRoutines.setUserRoutine(rid,name,email);

  }

  routineGenerator(): void{
    this.serviceRoutines.clearUserRoutine();
    this.serviceRoutines.isEditMode = true;
    this.serviceRoutines.createRoutine("NewRoutine", this.userService.getLoggedInUser().email).subscribe({
      next: (response: UserRoutine) => {
        console.log('Rutina creada:', response);
        this.serviceRoutines.userRoutine.rid = response.rid;
        this.serviceRoutines.userRoutine.name = response.name;
        this.serviceRoutines.userRoutine.email = response.email;


      },
      error: error => {
        console.error('Error al crear la rutina:', error);
      }
    });

  }
}

