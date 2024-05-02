import { Injectable } from '@angular/core';
import { Progress } from "../interfaces/progress";
import {HttpClient} from "@angular/common/http";
import {ExerciseDone} from "../interfaces/exercise-done";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  getProgressExercises(userEmail:string): string[] {
    return [
      "Dumbbell curl",
      "Bench Press"
    ]
  }
  getProgressMock(userEmail: string, exerciseName: string): Progress {
    if (exerciseName === 'Bench Press') {
      return {
        exercise: exerciseName,
        data: [
          {
            date: '2024-04-04',
            weight: 40
          },
          {
            date: '2024-04-05',
            weight: 50
          },
          {
            date: '2024-04-06',
            weight: 20
          },
          {
            date: '2024-04-07',
            weight: 70
          },
          ]
      }
    }
    return {
      exercise: exerciseName,
      data: [
        {
          date: '2024-04-01',
          weight: 10
        },
        {
          date: '2024-04-02',
          weight: 20
        },
        {
          date: '2024-04-04',
          weight: 30
        },
        {
          date: '2024-04-06',
          weight: 55
        },
        {
          date: '2024-04-15',
          weight: 50
        },
        {
          date: '2024-04-20',
          weight: 70
        },
      ]
    }
  }

  private apiUrl = "http://localhost:8080/api/progress/";

  constructor(private http: HttpClient, private userService: UserService) { }


  getWeeklyFromWeek(week:Date){
    return this.http.get<number>(this.apiUrl+ `weekly/get?email=${this.userService.getLoggedInUser().email}&week=${this.formattedDate(week)}`)
  }
  getDoneExercisesByUserAndDay(day:Date){
    return this.http.get<ExerciseDone[]>(this.apiUrl+ `get_exercises_of_day?email=${this.userService.getLoggedInUser().email}&day=${this.formattedDate(day)}`)
  }
  getDoneExerciseOfUser(name:string){
    return this.http.get<ExerciseDone[]>(this.apiUrl+ `get_done_exercises?email=${this.userService.getLoggedInUser().email}&name=${name}`)
  }
  setWeeklyToWeek(wid:number,week:Date){
    return this.http.post(this.apiUrl+ `weekly/set?email=${this.userService.getLoggedInUser().email}&wid=${wid}&week=${this.formattedDate(week)}`, {})
  }
  markExerciseAsDone(exerciseName:string, date:Date,weight:number,rid:number){
    return this.http.post(this.apiUrl+ `exercise/mark?email=${this.userService.getLoggedInUser().email}&date=${this.formattedDate(date)}&weight=${weight}&exerciseName=${exerciseName}&rid=${rid}`, {})
  }
  getDoneExerciseNamesOfUser(){
    return this.http.get<string[]>(this.apiUrl+ `get_done_exercises_names?email=${this.userService.getLoggedInUser().email}`)

  }


  formattedDate(week:Date){
    const day = String(week.getDate()).padStart(2,'0');
    const month = String(week.getMonth() + 1).padStart(2,'0');
    const year = week.getFullYear();
    return `${month}/${day}/${year}`
  }
}
