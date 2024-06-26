import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Weekly} from "../interfaces/weekly";
import {map, Observable} from "rxjs";
import {UserRoutine} from "../interfaces/user-routines.interface";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class WeeklyService {
  private apiUrl = "http://localhost:8080/api/weekly/";
  private apiUser = `http://localhost:8080/api/user/`;

  constructor(private http: HttpClient, private userService: UserService) {
  }

  getWeeklyPlans(): Observable<Weekly[]> {
    return this.http.get<Weekly[]>(`${(this.apiUser)}${this.userService.getLoggedInUser().email}/weeklies`);
  }

  //For later upgrades
  updateWeeklyPlanName(wid: number, name: string): Observable<any>{
    return this.http.put(`${this.apiUrl}${wid}`, { name });
  }

  createNewWeeklyPlan(name: string){
    return this.http.post<any>(`${this.apiUrl}${this.userService.getLoggedInUser().email}?name=${name}`, {}).pipe(
      map(response => response.wid)
    );
  }

  getRoutinesOfWeeklyPlan(wid: number): Observable<UserRoutine[]> {
    return this.http.get<UserRoutine[]>(`${this.apiUrl}${wid}/routines`);
  }

  addRoutineToWeeklyPlan(wid: number, rid: number, day: number) {
    return this.http.post<any>(`${this.apiUrl}${wid}/routine?rid=${rid}&day=${day}`, {})
  }
}
