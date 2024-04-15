import {Component, Input, OnInit} from '@angular/core';
import {Exercise} from "../../../interfaces/exercise";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {RoutinesService} from "../../../services/routines.service";
import {UserRoutines} from "../../../interfaces/user-routines.interface";

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
  routines: UserRoutines[] | undefined;
  @Input() exercise!: Exercise;
  constructor(private routineService: RoutinesService) {
  }
  ngOnInit(): void {
    this.routineService.getUserRoutines().subscribe(
      (routines: UserRoutines[] | undefined) => {
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
