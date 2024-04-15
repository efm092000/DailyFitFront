import { Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of} from "rxjs";
import { UserRoutines} from "../interfaces/user-routines.interface";
import { Routine } from "../interfaces/routine.interface";

@Injectable({
  providedIn: 'root'
})

export class RoutinesService {
  constructor(private http: HttpClient) { }
  private routineSource = new BehaviorSubject<number>(0);
  routine$ = this.routineSource.asObservable();


  routineUrl: string = 'http://localhost:8080/api/routine/';
  userRoutinesUrl: string = 'http://localhost:8080/api/user/prueba@gmail.com/routines';
  getRoutine(routineId: number): Observable <UserRoutines | undefined>{
    return this.http.get<UserRoutines>(this.routineUrl+`${routineId}`).pipe(
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

  loadRoutine(routineId: number){
    this.routineSource.next(routineId);
  }
  getRoutineExercises(routineID: number): Observable<Routine[] |undefined> {
    return this.http.get<Routine[]>(this.routineUrl+`${routineID}/exercises`).pipe(
      catchError( (err) => {
        console.log(err);
        return of(undefined);
      })
    )
  }

  deleteRoutine(rid: number | undefined): void {
    this.routineUrl = `http://localhost:8080/api/routine/${rid}`;
    this.http.delete(this.routineUrl).subscribe(() => {
      alert("test");
    });
  }

  editRoutine(routine: UserRoutines): void {
    this.routineUrl = `http://localhost:8080/api/routine/${routine.rid}?name=${routine.name}`;
    this.http.put(this.routineUrl, {}).subscribe(
        response => console.log(response),
      );
  }

/*
  createRoutine(): UserRoutines {
    this.http.post(this.routineUrl+'/NewRoutine', {},{responseType: "json"} );
    return
  }
  */
}
