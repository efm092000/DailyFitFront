import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { UserService } from "../../services/user.service";
import { Chart } from "chart.js/auto";
import 'chartjs-adapter-moment';
import { ProgressService } from "../../services/progress.service";
import { Progress } from "../../interfaces/progress";
import { NgForOf, NgIf } from "@angular/common";
import { Router } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { RecommendationComponent } from "./recommendation/recommendation.component";
import { last } from "rxjs";
import { Goal } from "../../enums/goal.enum";


@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    NgForOf,
    FormsModule,
    ReactiveFormsModule,
    RecommendationComponent,
    NgIf
  ],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent implements OnInit {
  private chart: any;
  chartLoaded: boolean = false;
  showRecommendation: boolean = false;
  progress: Progress = {
    exercise: '',
    data: []
  };
  protected exercises: string[] = [];

  years: number[] = Array.from({ length: 1 }, (v, k) => k + 2024);
  months: number[] = Array.from({ length: 12 }, (v, k) => k + 1);
  progressForm: FormGroup = this.fb.group(
    {
      'exercise': ['', Validators.required],
      'year': ['', Validators.required],
      'month': ['0', Validators.required]
    }
  );

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private progressService: ProgressService) {
  }

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
        datasets: [
          {
            label: "Sets",
            data: this.mapToSets(this.progress?.data),
            borderColor: 'green',
            borderWidth: 1
          },
          {
            label: "Reps",
            data: this.mapToReps(this.progress?.data),
            borderColor: 'blue',
            borderWidth: 1
          },
          {
            label: "Weight",
            data: this.mapToWeight(this.progress?.data),
            borderColor: 'red',
            borderWidth: 1,
          },
        ],
      },
      options: {
        interaction: {
          intersect: false,
          mode: 'index',
        },
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
            },
            min: 0
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              footer: function(context: any) {
                let reps = context[0].dataset.data[context[0].dataIndex].y
                let sets = context[1].dataset.data[context[1].dataIndex].y
                let weight = context[2].dataset.data[context[2].dataIndex].y
                let volume = reps * sets * weight
                return "Training Volume: " + volume + " kg"
              }
            }
          }
        },
      }
    });
    this.chartLoaded = true;
  }

  private mapToWeight(data: any) {
    return data.map((entry: any) => {
      return {
        x: entry.day,
        y: entry.weight
      }
    });
  }

  private mapToReps(data: any) {
    return data.map((entry: any) => {
      return {
        x: entry.day,
        y: entry.reps
      }
    });
  }

  private mapToSets(data: any) {
    return data.map((entry: any) => {
      return {
        x: entry.day,
        y: entry.sets
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

  onShowRecommendation() {
    this.showRecommendation = true;
  }

  get lastEntry() {
    return this.progress.data[this.progress.data.length - 1];
  }

  protected readonly JSON = JSON;
  protected readonly last = last;
  protected readonly Goal = Goal;
}
