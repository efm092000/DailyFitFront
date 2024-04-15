import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Exercise} from "../interfaces/exercise";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private apiUrl = "http://localhost:8080/api/exercise";

  constructor(private http: HttpClient) {}

  getExercises(filters: Exercise): Observable<Exercise[]> {
    let filter = '?';
    if (filters.difficulty) {filter = filter + `difficulty=${filters.difficulty}&`;}
    if (filters.name) {filter = filter + `name=${filters.name}&`;}
    if (filters.type) {filter = filter + `type=${filters.type}&`;}
    if (filters.material) {filter = filter + `material=${filters.material}&`;}
    if (filters.muscleGroup) {filter = filter + `muscleGroup=${filters.muscleGroup}`;}
    return this.http.get<Exercise[]>(this.apiUrl + filter);
  }
}
