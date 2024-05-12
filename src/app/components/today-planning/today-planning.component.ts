import {Component, OnInit} from '@angular/core';
import {ProgressService} from "../../services/progress.service";
import {WeeklyService} from "../../services/weekly.service";
import {RoutinesService} from "../../services/routines.service";
import {UserRoutine} from "../../interfaces/user-routines.interface";
import {NgForOf, NgIf} from "@angular/common";
import {Routine} from "../../interfaces/routine.interface";
import {FormsModule} from "@angular/forms";
import {ExerciseDone} from "../../interfaces/exercise-done";



@Component({
  selector: 'app-today-planning',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './today-planning.component.html',
  styleUrl: './today-planning.component.css'
})
export class TodayPlanningComponent implements OnInit{
  private currentWeekly: number = 0;
  protected routines: UserRoutine[] | undefined;
  protected exercises: {[clave: number]: Routine[]}= {};

  constructor(private progressService: ProgressService,
              private weeklyService: WeeklyService,
              private routineService: RoutinesService) {
  }

  ngOnInit(): void {
    this.progressService.getWeeklyFromWeek(this.currentMonday()).subscribe(
      (w: number) => {
        this.currentWeekly = w;
        this.getRoutinesOfWeeklyByDay();
      });
  }

  currentMonday(){
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diffDays = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    return new Date(today.setDate(diffDays));
  }

  filterDoneRoutines(){
    this.progressService.getDoneExercisesByUserAndDay(new Date()).subscribe(
      (e:ExerciseDone[]) => {
        if(this.routines){
          console.log(e.length)
          this.routines = this.routines.filter(routine => !e.some(exercise => exercise.rid === routine.rid))
          this.exercises = Array(this.routines.length);
          this.getRoutineNames();
          for (let routine of this.routines) {
            this.getExercisesOfRoutine(routine.rid);
          }
        }
    }
    );
  }
  getRoutinesOfWeeklyByDay(){
    if (this.currentWeekly == 0) return;
    console.log(this.currentWeekly)
    this.weeklyService.getRoutinesOfWeeklyPlan(this.currentWeekly).subscribe(
      (r:UserRoutine[])=>{
        this.routines = r.filter(routine => routine.day == (new Date().getDay() == 0 ? 7 : new Date().getDay()));
        this.filterDoneRoutines();
      }
    );
  }

  getRoutineNames(){
    if (!this.routines) return;
    for (let r of this.routines) {
      this.routineService.getRoutine(r.rid).subscribe(
        (routine:UserRoutine|undefined)=>{
          if(routine){
            r.name = routine.name;
          }
        }
      );
    }
  }

  getExercisesOfRoutine(rid:number){
    this.routineService.getRoutineExercises(rid).subscribe(
      (exercises) => {
        if (exercises){
          this.exercises[rid] = exercises;
        }
      }
    )
  }
  onRoutineDone(rid:number){
    for (let exercise of this.exercises[rid]) {
      this.progressService.markExerciseAsDone(
        exercise.exercise,
        new Date(),
        exercise.weight,
        rid,
        exercise.sets,
        exercise.reps
      ).subscribe(()=> {
        console.log(`Ejercicio ${exercise.exercise} terminado`);
      })
    }
    window.location.reload();
  }

}
