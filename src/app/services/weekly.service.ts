import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable, of} from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { Weekly } from "../interfaces/weekly";
import { UserRoutine } from "../interfaces/user-routines.interface";
import { UserService } from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class WeeklyService {
  private apiUrl = "http://localhost:8080/api/weekly/";
  private apiUser = `http://localhost:8080/api/user/`;

  constructor(private http: HttpClient, private userService: UserService) { }

  getWeeklyPlans(): Observable<Weekly[]> {
    return this.userService.loggedInUser.pipe(
      switchMap(user => {
        if (user) {
          return this.http.get<Weekly[]>(`${this.apiUser}${user.email}/weeklies`);
        } else {
          // Devolvemos un observable vacío
          return of([]);
        }
      })
    );
  }

  updateWeeklyPlanName(wid: number, name: string): Observable<any> {
    return this.http.put(`${this.apiUrl}${wid}`, { name });
  }

  createNewWeeklyPlan(name: string): Observable<number> {
    return this.userService.loggedInUser.pipe(
      switchMap(user => {
        if (user) {
          return this.http.post<any>(`${this.apiUrl}${user.email}?name=${name}`, {}).pipe(
            map(response => response.wid)
          );
        } else {
          // Devolvemos un observable que emite null
          return of(null);
        }
      })
    );
  }

  getRoutinesOfWeeklyPlan(wid: number): Observable<UserRoutine[]> {
    return this.http.get<UserRoutine[]>(`${this.apiUrl}${wid}/routines`);
  }

  addRoutineToWeeklyPlan(wid: number, rid: number, day: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${wid}/routine?rid=${rid}&day=${day}`, {});
  }
}
