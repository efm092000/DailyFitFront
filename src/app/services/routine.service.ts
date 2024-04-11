import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {Routine} from "../interfaces/routine.interface";

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

  constructor(private http: HttpClient) { }

  url?: string;
  getRoutineExercises(rid: number): Observable<Routine[] |undefined> {
    this.url = `http://localhost:8080/api/routine/${rid}/exercises`
    return this.http.get<Routine[]>(this.url).pipe(
      catchError( (err) => {
        console.log(err);
        return of(undefined);
      })
    )
  }

  deleteRoutine(rid: number): void {
    this.url = `http://localhost:8080/api/routine/${rid}`;
    this.http.delete(this.url).subscribe(() => {
      alert("test");
    });
  }
}
