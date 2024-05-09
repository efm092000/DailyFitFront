import { Injectable } from '@angular/core';
import { Progress } from "../interfaces/progress";
import { HttpClient } from "@angular/common/http";
import { ExerciseDone } from "../interfaces/exercise-done";
import { UserService } from "./user.service";
import {Observable, of, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private apiUrl = "http://localhost:8080/api/progress/";

  constructor(private http: HttpClient, private userService: UserService) { }

  getProgressMock(userEmail: string, exerciseName: string): Progress {
    // Código de simulación para obtener el progreso, no se usa el usuario actual aquí.
    // Puedes mantenerlo o eliminarlo según tus necesidades.
    return { exercise: exerciseName, data: [] };
  }

  getWeeklyFromWeek(week: Date): Observable<number | null> {
    return this.userService.loggedInUser.pipe(
      switchMap(user => {
        if (user) {
          return this.http.get<number>(
            `${this.apiUrl}weekly/get?email=${user.email}&week=${this.formattedDate(week)}`
          );
        } else {
          // Devolvemos un observable que emite null
          return of(null);
        }
      })
    );
  }

  getDoneExercisesByUserAndDay(day: Date): Observable<ExerciseDone[]> {
    return this.userService.loggedInUser.pipe(
      switchMap(user => {
        if (user) {
          return this.http.get<ExerciseDone[]>(
            `${this.apiUrl}get_exercises_of_day?email=${user.email}&day=${this.formattedDate(day)}`
          );
        } else {
          // Devolvemos un observable vacío
          return of([]);
        }
      })
    );
  }

  getDoneExerciseOfUser(name: string): Observable<ExerciseDone[]> {
    return this.userService.loggedInUser.pipe(
      switchMap(user => {
        if (user) {
          return this.http.get<ExerciseDone[]>(
            `${this.apiUrl}get_done_exercises?email=${user.email}&name=${name}`
          );
        } else {
          // Devolvemos un observable vacío
          return of([]);
        }
      })
    );
  }

  setWeeklyToWeek(wid: number, week: Date): Observable<any> {
    return this.userService.loggedInUser.pipe(
      switchMap(user => {
        if (user) {
          return this.http.post(
            `${this.apiUrl}weekly/set?email=${user.email}&wid=${wid}&week=${this.formattedDate(week)}`,
            {}
          );
        } else {
          // Devolvemos un observable vacío
          return of(null);
        }
      })
    );
  }

  markExerciseAsDone(exerciseName: string, date: Date, weight: number, rid: number): Observable<any> {
    return this.userService.loggedInUser.pipe(
      switchMap(user => {
        if (user) {
          return this.http.post(
            `${this.apiUrl}exercise/mark?email=${user.email}&date=${this.formattedDate(date)}&weight=${weight}&exerciseName=${exerciseName}&rid=${rid}`,
            {}
          );
        } else {
          // Devolvemos un observable vacío
          return of(null);
        }
      })
    );
  }

  getDoneExerciseNamesOfUser(): Observable<string[]> {
    return this.userService.loggedInUser.pipe(
      switchMap(user => {
        if (user) {
          return this.http.get<string[]>(
            `${this.apiUrl}get_done_exercises_names?email=${user.email}`
          );
        } else {
          // Devolvemos un observable vacío
          return of([]);
        }
      })
    );
  }

  formattedDate(week: Date): string {
    const day = String(week.getDate()).padStart(2, '0');
    const month = String(week.getMonth() + 1).padStart(2, '0');
    const year = week.getFullYear();
    return `${month}/${day}/${year}`;
  }
}
