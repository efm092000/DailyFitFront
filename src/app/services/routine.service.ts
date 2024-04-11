import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {Routine} from "../interfaces/routine.interface";

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

  constructor(private http: HttpClient) { }

  url: string = 'http://localhost:8080/api/routine/'
  getRoutineExercises(routineID: number): Observable<Routine[] |undefined> {
    return this.http.get<Routine[]>(this.url+`${routineID}/exercises`).pipe(
      catchError( (err) => {
        console.log(err);
        return of(undefined);
      })
    )
  }
}
