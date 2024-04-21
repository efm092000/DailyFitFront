import { Injectable } from '@angular/core';
import { Progress } from "../interfaces/progress";

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  constructor() { }
  getProgressMock(userEmail: string, exerciseName: string): Progress {
    if (exerciseName === 'Bench Press') {
      return {
        exercise: exerciseName,
        data: [
          {
            date: '2024-04-04',
            weight: 40
          },
          {
            date: '2024-04-05',
            weight: 50
          },
          {
            date: '2024-04-06',
            weight: 60
          },
          {
            date: '2024-04-07',
            weight: 70
          },
          ]
      }
    }
    return {
      exercise: exerciseName,
      data: [
        {
          date: '2024-04-01',
          weight: 10
        },
        {
          date: '2024-04-02',
          weight: 20
        },
        {
          date: '2024-04-03',
          weight: 30
        },
        {
          date: '2024-04-04',
          weight: 40
        },
        {
          date: '2024-04-05',
          weight: 50
        },
        {
          date: '2024-04-06',
          weight: 60
        },
        {
          date: '2024-04-07',
          weight: 70
        },
      ]
    }
  }
}

