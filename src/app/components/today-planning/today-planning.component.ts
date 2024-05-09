import {Component, OnInit} from '@angular/core';
import {ProgressService} from "../../services/progress.service";
import {Weekly} from "../../interfaces/weekly";
import {Observable} from "rxjs";
import {WeeklyService} from "../../services/weekly.service";
import {RoutinesService} from "../../services/routines.service";
import {UserRoutine} from "../../interfaces/user-routines.interface";
import {NgForOf} from "@angular/common";
import {Exercise} from "../../interfaces/exercise";



@Component({
  selector: 'app-today-planning',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './today-planning.component.html',
  styleUrl: './today-planning.component.css'
})
export class TodayPlanningComponent implements OnInit{
  private currentWeekly: number = 0;
  isDateInCurrentWeek: boolean = false;
  protected routines: UserRoutine[] | undefined;

  constructor(private progressService: ProgressService,
              private weeklyService: WeeklyService,
              private routineService: RoutinesService) {
  }

  ngOnInit(): void {
    this.progressService.getWeeklyFromWeek(this.currentMonday()).subscribe(
      (w: number | null) => {
        if (w !== null) {
          this.currentWeekly = w;
          this.getRoutinesOfWeekly();
        } else {
          console.error("Error: No se pudo obtener la semana actual.");
        }
      });
  }

  currentMonday(){
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diffDays = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    return new Date(today.setDate(diffDays));
  }
  getRoutinesOfWeekly(){
    if (this.currentWeekly == 0) return;
    console.log(this.currentWeekly)
    this.weeklyService.getRoutinesOfWeeklyPlan(this.currentWeekly).subscribe(
      (r:UserRoutine[])=>{
        this.routines = r;
        this.getRoutineNames();
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

}
