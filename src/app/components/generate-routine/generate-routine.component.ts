import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RouterLink} from "@angular/router";
import {RoutinesService} from "../../services/routines.service";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {ExerciseService} from "../../services/exercise.service";

@Component({
  selector: 'app-generate-routine',
  standalone: true,
  imports: [
    RouterLink,
    CalendarModule,
    FormsModule,
    NgForOf,
    NgIf,
    PaginatorModule
  ],
  templateUrl: './generate-routine.component.html',
  styleUrl: './generate-routine.component.css'
})
export class GenerateRoutineComponent implements OnInit{
  @Output() closePopup = new EventEmitter<boolean>();
  protected selectedMuscle:String = "";
  protected muscleGroupFilters: String[] | undefined;
  protected routineName="Generated Routine";
  protected maxExercises= 0;
  constructor(private routineService:RoutinesService, private exerciseService:ExerciseService) {
  }

  ngOnInit(): void {
    this.exerciseService.getMuscleGroupFilters().subscribe((filters)=>{
      this.muscleGroupFilters=filters;})
  }
  closeEvent() {
    this.closePopup.emit();
  }

  generateRoutine() {
    this.closeEvent();
  }

}
