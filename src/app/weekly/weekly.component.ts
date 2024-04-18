import { Component, OnInit } from '@angular/core';
import { WeeklyService } from '../services/weekly.service';
import { Weekly } from '../interfaces/weekly';
import { UserRoutines} from '../interfaces/user-routines.interface';
import {NgForOf, NgIf} from "@angular/common";
import {Observable} from "rxjs";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule
  ],
  styleUrls: ['./weekly.component.css']
})
export class WeeklyComponent implements OnInit {
  weeklyPlans: Weekly[] = [] ;
  //selectedWeeklyPlan: Observable<Weekly | null>;
  routines: UserRoutines[] = [];
  editingMode: boolean = false;
  showPopup:  boolean = false;
  showInput: boolean = false;
  daysOfWeek: string[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  newWeeklyName: string='New_Weekly_Plan';

  constructor(private weeklyService: WeeklyService) {}

  ngOnInit(): void {
    this.loadWeeklyPlans();
    this.loadRoutines();
    //this.weeklyPlans = this.weeklyService.getWeeklyPlans();
    //this.selectedWeeklyPlan = this.weeklyService.getSelectedWeeklyPlan();
  }

  loadWeeklyPlans(): void {
    this.weeklyService.getWeeklyPlans().subscribe((weeklyPlans: Weekly[]) => {
      this.weeklyPlans = weeklyPlans;
    }, (error) =>{
      console.error('Error al obtener los weeklies:', error);
    });

  }

  loadRoutines(){
    this.weeklyService.getRoutinesOfWeeklyPlan(16).subscribe((routines: UserRoutines[])=>{
      this.routines = routines;
    }, (error) =>{
      console.error('Error al obtener las rutinas:', error);
    });
  }
  toggleEditMode(): void {
    this.editingMode = !this.editingMode;
  }
  togglePopup() {
    if(!this.showInput){
      this.showPopup =!this.showPopup;
    }
  }

  toggleInput(){
    if(!this.showPopup){
      this.showInput =!this.showInput
    }
  }
  /*
  SelectWeeklyPlan(weeklyPlan: Weekly): void {
    // Seleccionar un plan semanal
    this.weeklyService.setSelectedWeeklyPlan(weeklyPlan);
    // Cargar las rutinas del plan semanal seleccionado
    this.weeklyService.loadRoutinesForSelectedWeeklyPlan();
  }
  */
  async addWeeklyPlan(): Promise<void> {
    this.weeklyService.createNewWeeklyPlan(`123@gmail.com`);
    this.toggleInput();
  }

  async addRoutine(): Promise<void> {
    this.weeklyService.addRoutineToWeeklyPlan(14, 5, 'monday')
    this.togglePopup()
  }
  /*
  async onWeeklyPlanChange(weeklyPlanId: number): Promise<void> {
    if (weeklyPlanId === 0) {
      // Lógica para crear un nuevo plan semanal
    } else {
      this.selectedWeeklyPlanId = weeklyPlanId;
      // Lógica para cargar las rutinas del plan semanal seleccionado
    }
  }
*/



}
