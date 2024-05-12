import {Component, OnInit} from '@angular/core';
import { RouterLink } from "@angular/router";
import {JsonPipe, NgFor, NgIf} from "@angular/common";
import {RoutinesService} from "../../services/routines.service";
import {UserRoutine} from "../../interfaces/user-routines.interface";
import {RoutineComponent} from "../routine/routine.component";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {UserService} from "../../services/user.service";
import {PremiumPopupComponent} from "../premium-popup/premium-popup.component";
import {User} from "../../interfaces/user";



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
    PremiumPopupComponent,
  ],
  templateUrl: './routines.component.html',
  styleUrl: './routines.component.css'
})
export class RoutinesComponent implements OnInit{
  userRoutines?: UserRoutine[] = [];
  showPopup: boolean = false;
  user: User = this.userService.getLoggedInUser();


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
    this.userService.user$.subscribe(
      user => this.user = user
    );
  }

  routineAccess(rid: number, name: string, email: string){
    console.log(rid);
    this.serviceRoutines.setUserRoutine(rid,name,email);

  }

  routineLimitReached() {
    // @ts-ignore
    return this.userRoutines.length >= 5 && !this.user.isPremium;
  }

  routineGenerator(): void {
    this.serviceRoutines.clearUserRoutine();
    this.serviceRoutines.isEditMode = true;
    this.userService.loggedInUser.subscribe(user => {
      if (user) {
        this.serviceRoutines.createRoutine("NewRoutine", user.email).subscribe({
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
      } else {
        // Manejar caso cuando el usuario no está autenticado
        console.log("Usuario no autenticado");
      }
    });
  }

  togglePopup() {
    this.showPopup = !this.showPopup;
  }
}

