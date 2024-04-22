import {Component, OnInit} from '@angular/core';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {FormsModule} from "@angular/forms";
import {Weekly} from "../../interfaces/weekly";
import {ProgressService} from "../../services/progress.service";
import {WeeklyService} from "../../services/weekly.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    BsDatepickerModule,
    FormsModule,
    NgForOf
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit{
  selectedDate: Date | undefined;
  selectedPlan: number | undefined;
  userWeeklies: Weekly[] =[];

  constructor(private progressService:ProgressService, private weeklyService:WeeklyService) {
  }

  ngOnInit(): void {
        this.getUserWeeklies();
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
      console.log(this.selectedPlan)
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
}
