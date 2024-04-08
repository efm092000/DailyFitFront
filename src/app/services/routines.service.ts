import { Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import { Routine} from "../interfaces/routine.interface";

@Injectable({
  providedIn: 'root'
})

export class RoutinesService {
  constructor(private http: HttpClient) { }

  routineUrl: string = 'http://localhost:8080/api/routine/1';
  userRoutinesUrl: string = 'http://localhost:8080/api/user/prueba@gmail.com/routines';
  getRoutine(): Observable <Routine | undefined>{
    return this.http.get<Routine>(this.routineUrl).pipe(
      catchError ((error) => {
        console.log(error)
        return of(undefined)
    })
    )
  }

  getUserRoutines(): Observable<any[] | undefined>{
    return this.http.get<any[]>(this.userRoutinesUrl).pipe(
      catchError((error) => {
        console.log(error)
        return of(undefined)
      })
    )
  }
}
