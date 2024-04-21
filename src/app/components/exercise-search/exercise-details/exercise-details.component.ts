import {Component, Input, OnInit} from '@angular/core';
import {Exercise} from "../../../interfaces/exercise";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {RoutinesService} from "../../../services/routines.service";
import {UserRoutine} from "../../../interfaces/user-routines.interface";
import {ExerciseService} from "../../../services/exercise.service";

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
  image: String | undefined;
  constructor(private routineService: RoutinesService,
              private exerciseService: ExerciseService) {
  }
  ngOnInit(): void {
    this.loadRoutineSelector();
    this.getImage();
  }

  loadRoutineSelector() {
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
  getImage(): void {
    this.exerciseService.getImage(this.exercise.gif).subscribe(
      response => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.image = reader.result as string;
        };
        reader.readAsDataURL(response);
      });
  }
}
