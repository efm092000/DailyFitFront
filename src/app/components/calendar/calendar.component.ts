import { Component } from '@angular/core';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {FormsModule} from "@angular/forms";
import {Weekly} from "../../interface/weekly";
import {ProgressService} from "../../services/progress.service";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    BsDatepickerModule,
    FormsModule
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  selectedDate: Date | undefined;
  selectedPlan: Weekly | undefined;
  constructor(private progressService:ProgressService) {
  }
  onDateChanged(date: Date): void {
    const startDate = this.getMonday(date);
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
      this.assignWeeklyToWeek(this.selectedDate, this.selectedPlan.wid);
    } else {
      console.log('Please select a date and a weekly plan.');
    }
  }

  assignWeeklyToWeek(date: Date, plan: number): void {
    this.progressService.setWeeklyToWeek(plan, "prueba@gmail.com" ,date);
  }
}
