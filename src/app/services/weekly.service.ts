import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Weekly} from "../interfaces/weekly";
import {map, Observable} from "rxjs";
import {UserRoutines} from "../interfaces/user-routines.interface";

@Injectable({
  providedIn: 'root'
})
export class WeeklyService {
  private apiUrl = "http://localhost:8080/api/weekly/";
  private apiUser = `http://localhost:8080/api/user/`;

  constructor(private http: HttpClient) {
  }

  getWeeklyPlans(): Observable<Weekly[]> {
    return this.http.get<Weekly[]>(`${(this.apiUser)}123@gmail.com/weeklies`);
  }

  //Este método es raro, porque no tengo botón para update el nombre.
  updateWeeklyPlanName(wid: number, name: string): Observable<any>{
    return this.http.put(`${this.apiUrl}${wid}`, { name });
  }

  //Se elige un nombre y se añade una weekly al user que está conectado.
  createNewWeeklyPlan(email: string): Observable<number>{
    return this.http.post<Weekly>(`${this.apiUrl}${email}?name=Prueba`, {}).pipe(
      map(response => response.wid)
    );
  }

  //Cuando se ha seleccionado algo en el selector, se muestran las rutinas de esa weekly, se coge el wid asociado a ese nombre, se cogen las routines de eso y se muestran
  getRoutinesOfWeeklyPlan(wid: number): Observable<UserRoutines[]> {
    return this.http.get<UserRoutines[]>(`${this.apiUrl}${wid}/routines`);
  }

  //Se añade una rutina al weekly plan seleccionado en el selector.
  addRoutineToWeeklyPlan(wid: number, rid: number, day: string): Observable<any> {
    return this.http.post(`${this.apiUrl}${wid}/routine`, { rid, day });
  }

}
