import { Component } from '@angular/core';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    BsDatepickerModule
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  onDateChanged(date: Date): void {
    const startDate = this.getMonday(date);
    console.log(startDate);
    // Aquí puedes usar startDate para tu lógica de planificación
  }

  getMonday(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Ajusta cuando el día es domingo
    return new Date(date.setDate(diff));
  }
}
