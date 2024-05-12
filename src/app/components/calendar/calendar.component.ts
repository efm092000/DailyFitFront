import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild} from '@angular/core';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {FormsModule} from "@angular/forms";
import {Weekly} from "../../interfaces/weekly";
import {ProgressService} from "../../services/progress.service";
import {WeeklyService} from "../../services/weekly.service";
import {NgClass, NgForOf, NgStyle, NgSwitch, NgSwitchCase} from "@angular/common";
import {CalendarModule} from "primeng/calendar";
import {FullCalendarComponent, FullCalendarModule} from "@fullcalendar/angular";
import {CalendarOptions} from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import {UserRoutine} from "../../interfaces/user-routines.interface";
import {RoutinesService} from "../../services/routines.service";
import {Router} from "@angular/router";




@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    BsDatepickerModule,
    FormsModule,
    NgForOf,
    NgClass,
    NgSwitch,
    NgSwitchCase,
    CalendarModule,
    NgStyle,
    FullCalendarModule
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CalendarComponent implements OnInit{
  selectedDate: Date | undefined;
  selectedPlan: number | undefined;
  userWeeklies: Weekly[] =[];
  date: Date = new Date();
  routines:any[] = [];
  routinesByUser: UserRoutine[] | undefined = [];
  @ViewChild('calendar') calendar: FullCalendarComponent | undefined;


  constructor(private progressService:ProgressService, private weeklyService:WeeklyService, private routineService:RoutinesService, private router:Router) {
  }

  ngOnInit(): void {
        this.getUserWeeklies();
        this.loadRoutines();
  }

  onDateChanged(): void {
    this.selectedDate = this.getMonday(this.date);
  }

  getMonday(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  onSubmit(): void {
    if (this.selectedDate && this.selectedPlan) {
      console.log(this.selectedDate)
      this.assignWeeklyToWeek(this.selectedDate, this.selectedPlan);
    } else {
      console.log('Please select a date and a weekly plan.');
    }
  }
  getUserWeeklies(){
    this.weeklyService.getWeeklyPlans().subscribe((w:Weekly[])=>{this.userWeeklies = w;})
  }

  assignWeeklyToWeek(date: Date, plan: number): void {
    this.progressService.setWeeklyToWeek(plan, date).subscribe(()=>{});
  }

  calendarOptions: CalendarOptions = {
    plugins:[dayGridPlugin],
    eventClick: this.onEventClicked.bind(this),
    weekends: true,
    eventColor:'blue',
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: false,
    contentHeight: 500,
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
    },
    events:this.routines,
    firstDay: 1,
    datesSet: this.onDateSet.bind(this),
    displayEventTime: false,
  };

  private getRoutineDates(date:Date) {
    let weeklyDate:Date = this.getMonday(date);
    this.progressService.getWeeklyFromWeek(weeklyDate).subscribe(
      (wid:number) =>{
        this.weeklyService.getRoutinesOfWeeklyPlan(wid).subscribe((routine:UserRoutine[]) => {
          for (let userRoutine of routine) {
            let routineDate:Date = new Date(weeklyDate);
            if(userRoutine.day) {
              routineDate.setDate(routineDate.getDate() + userRoutine.day - weeklyDate.getDay());
            }
            let routineName = this.getRoutineNameByRid(userRoutine.rid)
            this.routines.push({title:routineName,
                                start: routineDate,
                                end: routineDate,
              extendedProps: {
                id: userRoutine.rid,
                name: routineName,
                email: userRoutine.email
              }})
          }
          if(this.calendar){
            this.calendar.getApi().removeAllEvents();
            this.calendar.getApi().addEventSource(this.routines);
          }
        })
      });
  }
  getRoutineNameByRid(rid: number) {
    if (!this.routinesByUser) return '';
    let routineName: string = '';
    for (const routine of this.routinesByUser) {
      if (routine.rid === rid) {
        routineName = routine.name;
        break;
      }
    }
    return routineName;
  }
  loadRoutines(): void {
    this.routineService.getAllUserRoutines().subscribe(
      {
        next: (routines: UserRoutine[] | undefined) => {
          this.routinesByUser = routines;
        }, error: (error) => {
          console.log('Error al cargar las rutinas', error);
        }
      });
  }
  onDateSet(info:any){
    this.routines = [];
    const monthBeginning = info.view.currentStart;
    this.getRoutineDates(monthBeginning)
    for (let i = 0; i < 6; i++) {
      monthBeginning.setDate(monthBeginning.getDate() + 7)
      this.getRoutineDates(monthBeginning)
    }
  }
  onEventClicked(info: any){
    this.routineService.setUserRoutine(info.event.extendedProps.id,
      info.event.extendedProps.name,
      info.event.extendedProps.email);
    this.router.navigate(['/routine']);
  }
}
