import { Injectable } from '@angular/core';
import { Progress } from "../interfaces/progress";
import {HttpClient} from "@angular/common/http";
import {ExerciseDone} from "../interfaces/exercise-done";

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
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
            weight: 60
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
          date: '2024-04-03',
          weight: 30
        },
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
          weight: 60
        },
        {
          date: '2024-04-07',
          weight: 70
        },
      ]
    }
  }
}
  private apiUrl = "http://localhost:8080/api/progress/";

  constructor(private http: HttpClient) { }


  getWeeklyFromWeek(email:string,week:Date){
    return this.http.get<number>(this.apiUrl+ `weekly/get?email=${email}&week=${week}`)
  }
  getDoneExercisesByUserAndDay(email:string,day:Date){
    return this.http.get<ExerciseDone[]>(this.apiUrl+ `get_exercises_of_day?email=${email}&day=${day}`)
  }
  getDoneExerciseOfUser(email:string,name:string){
    return this.http.get<ExerciseDone[]>(this.apiUrl+ `get_done_exercises?email=${email}&name=${name}`)
  }
  setWeeklyToWeek(wid:number,email:string,week:Date){
    return this.http.get(this.apiUrl+ `weekly/set?email=${email}&week=${week}`)
  }
  markExerciseAsDone(exerciseName:string, email:string,date:Date,weight:number,rid:number){
    return this.http.get(this.apiUrl+ `exercise/mark?email=${email}&date=${date}&weight=${weight}&exerciseName=${exerciseName}&rid=${rid}`)
  }
  getDoneExerciseNamesOfUser(email:string){
    return this.http.get<string[]>(this.apiUrl+ `get_done_exercises_names?email=${email}`)

  }
}
