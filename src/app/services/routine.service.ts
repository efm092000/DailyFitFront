import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {ExerciseRoutine} from "../interfaces/routine-exercise.interface";

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

  constructor(private http: HttpClient) { }

  url: string = 'http://localhost:8080/api/routine/30/exercises'
  getRoutineExercises(): Observable<ExerciseRoutine[] |undefined> {
    return this.http.get<ExerciseRoutine[]>(this.url).pipe(
      catchError( (err) => {
        console.log(err);
        return of(undefined);
      })
    )
  }
}
