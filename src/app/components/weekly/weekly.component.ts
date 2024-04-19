import { Component, OnInit } from '@angular/core';
import { WeeklyService } from '../../services/weekly.service';
import { Weekly } from '../../interfaces/weekly';
import { UserRoutines} from '../../interfaces/user-routines.interface';
import {NgForOf, NgIf} from "@angular/common";
import {Observable} from "rxjs";
import {FormsModule} from "@angular/forms";
import {RoutinesService} from "../../services/routines.service";
import {Routine} from "../../interfaces/routine.interface";

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
  routines: UserRoutines[] | undefined = [];
  selectedWeeklyPlanIndex: number = 0;
  editingMode: boolean = false;
  selectedWid: number = 0;
  showPopup:  boolean = false;
  showInput: boolean = false;
  daysOfWeek: string[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  newWeeklyName: string='New_Weekly_Plan';

  constructor(private weeklyService: WeeklyService, private routinesService: RoutinesService) {}

  ngOnInit(): void {
    this.loadWeeklyPlans();
    this.onWeeklyPlanChange();
    this.loadRoutines()
  }

  loadWeeklyPlans(): void {
    this.weeklyService.getWeeklyPlans().subscribe((weeklyPlans: Weekly[]) => {
      this.weeklyPlans = weeklyPlans;
    }, (error) =>{
      console.error('Error al obtener los weeklies:', error);
    });
  }
  loadRoutines(): void{
    this.routinesService.getUserRoutines().subscribe(
      {
        next: (routines: UserRoutines[] | undefined) => {
          this.routines = routines;
        },
        error: (error) => {
          console.log('Error al cargar las rutinas', error);
        }
      });
  }
  loadRoutinesOfWeekly(){

    this.weeklyService.getRoutinesOfWeeklyPlan(this.selectedWid).subscribe((routines: UserRoutines[])=>{
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
  async addWeeklyPlan(name: string): Promise<void> {
    console.log("1");
    this.weeklyService.createNewWeeklyPlan(`123@gmail.com`, name).subscribe((weekly: Weekly) => {
      this.loadWeeklyPlans();},
      (error) =>{
      console.error(`Error al añadir un weekly`, error);
      });
    this.toggleInput();
  }

  async addRoutine(): Promise<void> {
    this.weeklyService.addRoutineToWeeklyPlan(this.selectedWid, 5, 'monday')
    this.togglePopup()
  }

  onWeeklyPlanChange(): void{
    const selectedWeeklyPlan = this.weeklyPlans[this.selectedWeeklyPlanIndex];
    this.selectedWid = selectedWeeklyPlan.wid;
    console.log("Selected wid:", this.selectedWid);
    this.loadRoutinesOfWeekly();
  }



}
function next(value: UserRoutines[] | undefined): void {
    throw new Error('Function not implemented.');
}

