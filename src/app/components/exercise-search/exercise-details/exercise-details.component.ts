import {Component, Input, OnInit} from '@angular/core';
import {Exercise} from "../../../interfaces/exercise";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {RoutinesService} from "../../../services/routines.service";
import {UserRoutine} from "../../../interfaces/user-routines.interface";

@Component({
  selector: 'app-exercise-details',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './exercise-details.component.html',
  styleUrl: './exercise-details.component.css'
})
export class ExerciseDetailsComponent implements OnInit{
  routines: UserRoutine[] | undefined;
  @Input() exercise!: Exercise;
  constructor(private routineService: RoutinesService) {
  }
  ngOnInit(): void {
    this.routineService.getAllUserRoutines().subscribe(
      (routines: UserRoutine[] | undefined) => {
        this.routines = routines;
      },
      (error) => {
        console.error('Error al obtener los ejercicios:', error);
      }
    );
  }
  addExerciseToRoutine(){
    return;
  }
}
