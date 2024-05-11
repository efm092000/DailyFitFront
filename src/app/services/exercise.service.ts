import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Exercise} from "../interfaces/exercise";
import {IntegerFilter} from "../interfaces/integer-filter";
import {BooleanFilter} from "../interfaces/boolean-filter";

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
  getImage(image: String){
    return this.http.get(this.apiUrl + `/image?gif=${image}`, { responseType: 'blob' })
  }
  getMuscleGroupFilters(){
    return this.http.get<string[]>(this.apiUrl + "/filters/muscle");
  }
  getTypeFilters(){
    return this.http.get<string[]>(this.apiUrl + "/filters/type");
  }
  getDifficultyFilters(){
    return this.http.get<IntegerFilter[]>(this.apiUrl + "/filters/difficulty");
  }
  getMaterialFilters(){
    return this.http.get<BooleanFilter[]>(this.apiUrl + "/filters/material");
  }

  createExercise(exercise:Exercise): Observable<Exercise>{
    return this.http.post<Exercise>(this.apiUrl, exercise);

  }
}
