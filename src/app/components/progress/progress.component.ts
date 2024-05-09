import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { UserService } from "../../services/user.service";
import { Chart } from "chart.js/auto";
import 'chartjs-adapter-moment';
import { ProgressService } from "../../services/progress.service";
import { Progress } from "../../interfaces/progress";
import { ExerciseService } from "../../services/exercise.service";
import { NgForOf } from "@angular/common";


@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    NgForOf
  ],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent {
  chart: any;
  private progress?: Progress;
  protected exercises: string[] = [
    "Bench Press",
    "Dumbbell Curl"
  ];

  constructor(private userService: UserService, private progressService: ProgressService, private exerciseService: ExerciseService) {
  }

  ngOnInit(): void {
  }

  private transformData(data: any) {
    return data.map((entry: any) => {
      return {
        x: entry.date,
        y: entry.weight
      }
    });
  }

  selectExercise(exercise: string) {
    this.userService.loggedInUser.subscribe(user => {
      if (user) {
        this.progress = this.progressService.getProgressMock(user.email, exercise);
        this.loadChart();
      } else {
        // Manejar caso cuando el usuario no está autenticado
        console.log("Usuario not authenticated");
      }
    });
  }

  loadChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart("canvas", {
      type: 'line', //this denotes tha type of chart
      data: {
        datasets: [{
          label: this.progress?.exercise,
          data: this.transformData(this.progress?.data),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }],
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day'
            },
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Weight (kg)'
            }
          }
        },
      }
    });
  }
}
