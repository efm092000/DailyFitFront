import { Component, OnInit } from '@angular/core';
import { WeeklyService } from '../../services/weekly.service';
import { Weekly } from '../../interfaces/weekly';
import { UserRoutine} from '../../interfaces/user-routines.interface';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RoutinesService} from "../../services/routines.service";


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
  weeklyPlans: Weekly[] = [];
  routinesByUser: UserRoutine[] | undefined = [];
  routinesByWeekly: UserRoutine[] = [];
  selectedWeeklyPlanIndex: number = 0;
  editingMode: boolean = false;
  selectedWid: number = 0;
  showPopup: boolean = false;
  showInput: boolean = false;
  daysOfWeek: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  newWeeklyName: string = 'New_Weekly_Plan';
  numberOfDay: number = 0;
  selectedRoutineIndex : number =0;
  private selectedRid: number = 0;
  constructor(private weeklyService: WeeklyService, private routinesService: RoutinesService) {
  }

  ngOnInit(): void {
    this.loadWeeklyPlans();
  }

  loadWeeklyPlans(): void {
    this.weeklyService.getWeeklyPlans().subscribe((weeklyPlans: Weekly[]) => {
      this.weeklyPlans = weeklyPlans;
      this.loadRoutines();
      this.onWeeklyPlanChange();
    }, (error) => {
      console.error('Error al obtener los weeklies:', error);
    });
  }

  loadRoutines(): void {
    this.routinesService.getAllUserRoutines().subscribe(
      {
        next: (routines: UserRoutine[] | undefined) => {
          this.routinesByUser = routines;
        }, error: (error) => {
          console.log('Error al cargar las rutinas', error);
        }
      });
  }

  loadRoutinesOfWeekly() {
    this.weeklyService.getRoutinesOfWeeklyPlan(this.selectedWid).subscribe((routines: UserRoutine[]) => {
      this.routinesByWeekly = routines;
    }, (error) => {
      console.error('Error al obtener las rutinas:', error);
    });
  }

  toggleEditMode(): void {
    this.editingMode = !this.editingMode;
  }

  togglePopup() {
    if (!this.showInput) {
      this.showPopup = !this.showPopup;
    }
  }

  toggleInput() {
    if (!this.showPopup) {
      this.showInput = !this.showInput
    }
  }

  async addWeeklyPlan(name: string): Promise<void> {
    console.log("1");
    this.weeklyService.createNewWeeklyPlan(name).subscribe(() => {
        this.loadWeeklyPlans();
      },
      (error) => {
        console.error(`Error al añadir un weekly`, error);
      });
    this.toggleInput();
  }

  async addRoutine(): Promise<void> {
    if (this.routinesByUser) {
      const selectedRoutine: UserRoutine = this.routinesByUser[this.selectedRoutineIndex];
      if(selectedRoutine){
        this.selectedRid = selectedRoutine.rid;
      }
    }
    this.numberOfDay = parseInt(String(this.numberOfDay)) + 1;
    this.weeklyService.addRoutineToWeeklyPlan(this.selectedWid, this.selectedRid, this.numberOfDay).subscribe(()=>{this.loadRoutines();
      this.loadRoutinesOfWeekly();
      this.togglePopup();},
      (error) =>{console.error('Error al añadir una rutina', error)});
  }

  onWeeklyPlanChange(): void {
    const selectedWeeklyPlan = this.weeklyPlans[this.selectedWeeklyPlanIndex];
    if (selectedWeeklyPlan) {
      this.selectedWid = selectedWeeklyPlan.wid;
      this.loadRoutinesOfWeekly();
    } else {
      console.error("No se ha seleccionado ningún plan semanal.");
    }
  }
  filterRoutinesByDay(day:number){
    if (this.routinesByWeekly == undefined){
      return;
    }
    return this.routinesByWeekly.filter(entry => entry.day === day);
  }

  getRoutineNameByRid(rid: number) {
    if(!this.routinesByUser) return '';
    let routineName : string = '';
    for(const routine of this.routinesByUser){
      if( routine.rid === rid){
        routineName = routine.name;
        break;
      }
    }
    return routineName;
  }

}

