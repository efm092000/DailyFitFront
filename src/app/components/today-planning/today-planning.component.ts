import { Component } from '@angular/core';



@Component({
  selector: 'app-today-planning',
  standalone: true,
  imports: [],
  templateUrl: './today-planning.component.html',
  styleUrl: './today-planning.component.css'
})
export class TodayPlanningComponent {
  currentWeekly = this.getCurrentWeeklyPlanning();
  isDateInCurrentWeek: boolean = false;

  getCurrentWeeklyPlanning() {

  }
  checkWeek(date: string): void {
    const currentDate = new Date();
    const selectedDate = new Date(date);

    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    const endOfWeek = new Date(currentDate);
    endOfWeek.setDate(currentDate.getDate() + (6 - currentDate.getDay()));

    this.isDateInCurrentWeek = selectedDate >= startOfWeek && selectedDate <= endOfWeek;
  }
}
