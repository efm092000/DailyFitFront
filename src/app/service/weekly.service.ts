import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Weekly} from "../interface/weekly";
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeeklyService {
  private apiUrl = "http://localhost:8080/api/weekly/";

  constructor(private http: HttpClient) {
  }

  getWeekly(weekly: string): Observable<Weekly> {
      return this.http.get<Weekly>(this.apiUrl + '${weekly.wid}&');
  }
}
