import { Component, OnInit } from '@angular/core';
import { WeeklyService } from '../../services/weekly.service';
import { Weekly } from '../../interfaces/weekly';
import { UserRoutines} from '../../interfaces/user-routines.interface';
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
  routinesByUser: UserRoutines[] | undefined = [];
  routinesByWeekly: UserRoutines [] = [];
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
    this.loadRoutines()
  }

  loadWeeklyPlans(): void {
    this.weeklyService.getWeeklyPlans().subscribe((weeklyPlans: Weekly[]) => {
      this.weeklyPlans = weeklyPlans;
    }, (error) => {
      console.error('Error al obtener los weeklies:', error);
    });
  }

  loadRoutines(): void {
    this.routinesService.getUserRoutines().subscribe(
      {
        next: (routines: UserRoutines[] | undefined) => {
          this.routinesByUser = routines;
        }, error: (error) => {
          console.log('Error al cargar las rutinas', error);
        }
      });
  }

  loadRoutinesOfWeekly() {
    this.weeklyService.getRoutinesOfWeeklyPlan(this.selectedWid).subscribe((routines: UserRoutines[]) => {
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
    this.weeklyService.createNewWeeklyPlan(`123@gmail.com`, name).subscribe((weekly: Weekly) => {
        this.loadWeeklyPlans();
      },
      (error) => {
        console.error(`Error al añadir un weekly`, error);
      });
    this.toggleInput();
  }

  async addRoutine(): Promise<void> {
    if (this.routinesByUser) {
      const selectedRoutine: UserRoutines = this.routinesByUser[this.selectedRoutineIndex];
      if(selectedRoutine){
        this.selectedRid = selectedRoutine.rid;
      }
    }
    this.numberOfDay = parseInt(String(this.numberOfDay)) + 1;
    console.log('Antes');
    this.weeklyService.addRoutineToWeeklyPlan(this.selectedWid, this.selectedRid, this.numberOfDay);
    console.log('Después');
    this.loadRoutines();
    this.loadRoutinesOfWeekly();
    this.togglePopup();
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

