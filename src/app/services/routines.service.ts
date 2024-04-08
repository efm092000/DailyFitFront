import { Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import { UserRoutines} from "../interfaces/user-routines.interface";
import { Routine } from "../interfaces/routine.interface";

@Injectable({
  providedIn: 'root'
})

export class RoutinesService {
  constructor(private http: HttpClient) { }

  routineUrl: string = 'http://localhost:8080/api/routine/';
  userRoutinesUrl: string = 'http://localhost:8080/api/user/prueba@gmail.com/routines';
  getRoutine(routineId: number): Observable <Routine | undefined>{
    return this.http.get<Routine>(this.routineUrl+`${routineId}/exercises`).pipe(
      catchError ((error) => {
        console.log(error)
        return of(undefined)
    })
    )
  }

  getUserRoutines(): Observable<UserRoutines[] | undefined>{
    return this.http.get<UserRoutines[]>(this.userRoutinesUrl).pipe(
      catchError((error) => {
        console.log(error)
        return of(undefined)
      })
    )
  }
}
