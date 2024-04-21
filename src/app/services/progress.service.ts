import { Injectable } from '@angular/core';
import { Progress } from "../interfaces/progress";

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  constructor() { }
  getProgressMock(userEmail: string, exerciseName: string): Progress {
    return {
      exercise: exerciseName,
      data: [
        {
          x: '2024-04-01',
          y: 10
        },
        {
          x: '2024-04-02',
          y: 20
        },
        {
          x: '2024-04-03',
          y: 30
        },
        {
          x: '2024-04-04',
          y: 40
        },
        {
          x: '2024-04-05',
          y: 50
        },
        {
          x: '2024-04-06',
          y: 60
        },
        {
          x: '2024-04-07',
          y: 70
        },
        {
          x: '2024-04-08',
          y: 80
        },
        {
          x: '2024-04-09',
          y: 90
        },
        {
          x: '2024-04-10',
          y: 100
        }
      ]
    }
  }
}

