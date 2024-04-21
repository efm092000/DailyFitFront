import {Component, Input, OnInit} from '@angular/core';
import {Exercise} from "../../../interfaces/exercise";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {RoutinesService} from "../../../services/routines.service";
import {UserRoutine} from "../../../interfaces/user-routines.interface";
import {ExerciseService} from "../../../services/exercise.service";

@Component({
  selector: 'app-exercise-details',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './exercise-details.component.html',
  styleUrl: './exercise-details.component.css'
})
export class ExerciseDetailsComponent implements OnInit{
  routines: UserRoutine[] | undefined;
  @Input() exercise!: Exercise;
  @Input() rid!: number;
  image: String | undefined;
  selectedRid: number | undefined;
  sets: number | undefined;
  reps: number | undefined;
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
  addExerciseToRoutine(exerciseName:string){
    if(this.rid && this.sets && this.reps){
      this.routineService.addExerciseToRoutine(this.rid,exerciseName,this.sets,this.reps).subscribe();
    } else if(this.sets && this.reps && this.selectedRid){
      this.routineService.addExerciseToRoutine(this.selectedRid,exerciseName,this.sets,this.reps).subscribe();
    }
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
