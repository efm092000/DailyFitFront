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
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";


@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    NgForOf,
    FormsModule
  ],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent {
  chart: any;
  private progress?: Progress;
  protected exercises: string[] = [];
  selectedExerciseName: string = "";

  years: number[] = Array.from({length: 1}, (v, k) => k + 2024);
  months: number[] = Array.from({length: 12}, (v, k) => k + 1);
  weeks: number[] = Array.from({length: 4}, (v, k) => k + 1);

  constructor(private router: Router, private userService: UserService, private progressService: ProgressService) { }

  ngOnInit(): void {
    if (!this.userService.getLoggedInUser()) {
      this.router.navigate(['/login'])
    }
    this.progressService.getProgressExerciseName(this.userService.getLoggedInUser().email).then(
      (exercises: string[]) => {
        this.exercises = exercises;
      }
    )
  }

  onSelectExercise(exercise: string) {
    this.progressService.getProgressMock(this.userService.getLoggedInUser().email, exercise).then(
      (progress: Progress) => {
        this.progress = progress;
        this.loadChart();
      }
    )
  }

  onGenerateChart() {
    console.log(this.selectedExerciseName)

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

  private transformData(data: any) {
    return data.map((entry: any) => {
      return {
        x: entry.day,
        y: entry.weight
      }
    });
  }
}
