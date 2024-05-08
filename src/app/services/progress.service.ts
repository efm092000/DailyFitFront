import { Injectable } from '@angular/core';
import { Progress } from "../interfaces/progress";
import {HttpClient} from "@angular/common/http";
import {ExerciseDone} from "../interfaces/exercise-done";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private apiUrl = "http://localhost:8080/api/progress/";

  constructor(private http: HttpClient, private userService: UserService) { }

  async getProgressMock(userEmail: string, exerciseName: string): Promise<Progress> {
    const response = await fetch(this.apiUrl + `get_done_exercises?email=${userEmail}&name=${exerciseName}`);
    const data = await response.json();
    console.log(data)
    return {
      exercise: exerciseName,
      data: data
    };
  }

  async getProgressExerciseName(userEmail:string) {
    const request = fetch(this.apiUrl + `get_done_exercises_names?email=${userEmail}`);
    return request.then((response) => response.json());
  }

  async getProgressByYearAndMonth(userEmail:string, exerciseName:string, year: number, month: number) {
    const request = fetch(this.apiUrl + `done_exercises?email=${userEmail}&exerciseName=${exerciseName}&year=${year}&month=${month}`)
    return request.then((response) => response.json());
  }

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
