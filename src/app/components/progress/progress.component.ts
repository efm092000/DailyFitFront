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
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";


@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    NgForOf,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent {
  private chart: any;
  private progress: Progress = {
    exercise: '',
    data: []
  };
  protected exercises: string[] = [];

  years: number[] = Array.from({length: 1}, (v, k) => k + 2024);
  months: number[] = Array.from({length: 12}, (v, k) => k + 1);
  progressForm: FormGroup = this.fb.group(
    {
      'exercise': ['', Validators.required],
      'year': ['', Validators.required],
      'month': ['0', Validators.required]
    }
  );

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private progressService: ProgressService) { }

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

  onGenerateChart() {
    this.progress.exercise = this.exercise.value;
    this.progressService.getProgressByYearAndMonth(this.userService.getLoggedInUser().email, this.exercise.value, this.year.value, this.month.value).then(
      data => {
        this.progress.data = data;
        if (this.progress.data.length == 0) {
          alert('No data found for the selected exercise, year and month');
          return;
        }
        this.loadChart();
      }
    )
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

  get exercise() {
    return this.progressForm.get('exercise') as FormControl;
  }

  get year() {
    return this.progressForm.get('year') as FormControl;
  }

  get month() {
    return this.progressForm.get('month') as FormControl;
  }
}
