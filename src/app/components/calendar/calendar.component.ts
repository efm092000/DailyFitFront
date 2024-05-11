import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {FormsModule} from "@angular/forms";
import {Weekly} from "../../interfaces/weekly";
import {ProgressService} from "../../services/progress.service";
import {WeeklyService} from "../../services/weekly.service";
import {NgClass, NgForOf, NgStyle, NgSwitch, NgSwitchCase} from "@angular/common";
import {CalendarModule} from "primeng/calendar";
import {FullCalendarModule} from "@fullcalendar/angular";
import {CalendarOptions} from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';




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


  constructor(private progressService:ProgressService, private weeklyService:WeeklyService) {
  }

  ngOnInit(): void {
        this.getUserWeeklies();
    }

  onDateChanged(): void {
    const startDate = this.getMonday(this.date);
    console.log(startDate);
  }

  getMonday(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    this.selectedDate = new Date(date.setDate(diff));
    return this.selectedDate;
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
    eventClick: this.handleDateClick.bind(this),
    events: [
      // Define your events here
    ],
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
    },
    selectable:true,
    selectMirror: true,
    dayMaxEvents: true
  };

  handleDateClick(arg:any) {
    alert('Date clicked: ' + arg.dateStr);
  }

}
