import { Component, OnInit } from '@angular/core';
import { RouterLink} from "@angular/router";
import { JsonPipe, NgFor} from "@angular/common";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-routines',
  standalone: true,
  imports: [
    JsonPipe,
    NgFor,
    RouterLink,
  ],
  templateUrl: './routines.component.html',
  styleUrl: './routines.component.css'
})
export class RoutinesComponent implements OnInit{
  userRoutines: any[] = [];
  user: any = {email: 'prueba@gmail.com'};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadRoutines();
  }

  loadRoutines(): void {
    this.http.get<any[]>(`http://localhost:8080/api/user/${this.user.email}/routines`)
      .subscribe({
        next: (routines: any[]) => {
          this.userRoutines = routines;
        },
        error: (error) => {
          console.error('Error loading routines:', error);
        }
      });
  }

}

