import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Exercise} from "../interfaces/exercise";
import {IntegerFilter} from "../interfaces/integer-filter";
import {BooleanFilter} from "../interfaces/boolean-filter";
import {User} from "../interfaces/user";
import {diff} from "ngx-bootstrap/chronos/moment/diff";

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

  createExercise(muscleGroup: string, type: string, name: string, difficulty: number, material: boolean, gif: string, description: string ):Observable<any>{
    return this.http.post<any>(this.apiUrl + `?muscleGroup=${muscleGroup}&type=${type}&difficulty=${difficulty}&material=${material}&gif=${gif}&description=${description}&name=${name}`, {});

  }
  deleteExercise(name: string){
    return this.http.delete<any>(this.apiUrl + `?name=${name}`).subscribe(
      response => console.log(response),
    );

  }
  updateExercise(muscleGroup?: string, type?: string, name?: string, difficulty?: number, material?: boolean, gif?: string, description?: string ){
    updateUrl: string = `${this.apiUrl}?muscleGroup=${muscleGroup}&type=${type}&difficulty=${difficulty}&material=${material}&gif=${gif}&description=${description}&name=${name}`;
    const response = this.http.put<any>(updateUrl, {}, {});
  }
}
8
