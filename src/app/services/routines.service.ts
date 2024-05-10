import { Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import { UserRoutine} from "../interfaces/user-routines.interface";
import { Routine } from "../interfaces/routine.interface";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})

export class RoutinesService {
  constructor(private http: HttpClient, private userService: UserService) { }

  routineUrl: string = 'http://localhost:8080/api/routine/';
  userRoutinesUrl: string = 'http://localhost:8080/api/user/123@gmail.com/routines';
  getRoutine(routineId: number): Observable <UserRoutine | undefined>{
    return this.http.get<UserRoutine>(this.routineUrl+`${routineId}`).pipe(
      catchError( (error) => {
        console.log(error);
        return of(undefined);
      })
    );
  }

  userRoutine: UserRoutine = {rid:0,name:"name",email:"email"};
  rid?: number;
  name?: string;
  email?: string;
  routine?: Routine;
  isEditMode: boolean = false;

  setUserRoutine(rid: number, name: string, email: string){
    this.userRoutine.rid = rid;
    this.userRoutine.name = name;
    this.userRoutine.email = email;
  }

  getUserRoutine(userRoutine: UserRoutine): Observable <UserRoutine | undefined>{
    return this.http.get<UserRoutine>(this.routineUrl+`${userRoutine.rid}`).pipe(

      catchError ((error) => {
        console.log(error)
        return of(undefined)
    })
    )
  }

  getAllUserRoutines(): Observable<UserRoutine[] | undefined>{
    return this.http.get<UserRoutine[]>(`http://localhost:8080/api/user/${this.userService.getLoggedInUser().email}/routines`).pipe(
      catchError((error) => {
        console.log(error)
        return of(undefined)
      })
    )
  }

  getNumberOfRoutines(): Observable<number> {
    return this.getAllUserRoutines().pipe(
      map((routines: UserRoutine[] | undefined) => routines ? routines.length : 0),
      catchError((error) => {
        console.log(error);
        return of(0);
      })
    );
  }

  getRoutineExercises(routineID: number): Observable<Routine[] |undefined> {
    this.routineUrl = `http://localhost:8080/api/routine/${routineID}/exercises`;
    return this.http.get<Routine[]>(this.routineUrl).pipe(
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

  editRoutine(rid: number, name: string): Observable<Routine | undefined> {
    this.routineUrl = `http://localhost:8080/api/routine/${rid}?name=${name}`;
    return this.http.put<Routine>(this.routineUrl, {rid: rid, name: name, email: this.userRoutine.email}).pipe(
      catchError( (err) => {
        console.log(err);
        return of(undefined);
      })
    )
  }

  deleteExerciseFromRoutine(rid: number, name: string, sets: number, reps: number) {
    this.routineUrl = `http://localhost:8080/api/routine/${rid}/exercises?name=${name}&sets=${sets}&reps=${reps}`;
    this.http.delete(this.routineUrl).subscribe(
      response => console.log(response),
    );
  }

  createRoutine(name: string, email: string): Observable<UserRoutine> {
    this.routineUrl = `http://localhost:8080/api/routine/${name}?email=${email}`;
    return this.http.post<UserRoutine>(this.routineUrl, {});
  }

  clearUserRoutine(): void {
    this.userRoutine = {
      rid: 0,
      name: '',
      email: ''
    };
  }

  addExerciseToRoutine(rid:number, name:string, set:number, rep:number){
    console.log(rid);
    const url = `http://localhost:8080/api/routine/${rid}/exercise?name=${name}&sets=${set}&reps=${rep}`
    return this.http.post(url, {});
  }
}
