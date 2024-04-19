import { Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { catchError, Observable, of} from "rxjs";
import { UserRoutine} from "../interfaces/user-routines.interface";
import { Routine } from "../interfaces/routine.interface";

@Injectable({
  providedIn: 'root'
})

export class RoutinesService {
  constructor(private http: HttpClient) { }

  userRoutinesUrl: string = 'http://localhost:8080/api/user/prueba@gmail.com/routines';
  routineUrl: string = 'http://localhost:8080/api/routine/';
  userRoutine: UserRoutine = {rid:0,name:"name",email:"email"};
  rid?: number;
  name?: string;
  email?: string;
  routine?: Routine;

  setUserRoutine(rid: number, name: string, email: string){
    this.userRoutine.rid = rid;
    this.userRoutine.name = name;
    this.userRoutine.email = email;
  }
  //rid, nombre y email:
  getUserRoutine(userRoutine: UserRoutine): Observable <UserRoutine | undefined>{
    return this.http.get<UserRoutine>(this.routineUrl+`${userRoutine.rid}`).pipe(
      catchError ((error) => {
        console.log(error)
        return of(undefined)
    })
    )
  }

  setRoutine(routine: Routine){
    this.routine = routine;
  }

  getAllUserRoutines(): Observable<UserRoutine[] | undefined>{
    return this.http.get<UserRoutine[]>(this.userRoutinesUrl).pipe(
      catchError((error) => {
        console.log(error)
        return of(undefined)
      })
    )
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
    this.http.delete(this.routineUrl).subscribe(
      response => console.log(response),
    );
  }

  editRoutine(rid: number, name: string): void {
    this.routineUrl = `http://localhost:8080/api/routine/${rid}?name=${name}`;
    this.http.put(this.routineUrl, {}).subscribe(
        response => console.log(response),
      );
  }

  deleteExerciseFromRoutine(rid: number, name: string, sets: number, reps: number) {
    this.routineUrl = `http://localhost:8080/api/routine/${rid}/exercises?name=${name}&sets=${sets}&reps=${reps}`;
    this.http.delete(this.routineUrl).subscribe(
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
