import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable, Subscription, timer} from "rxjs";
import {Chronometer} from "../interfaces/chronometer.interface";

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private readonly initialTime: number = 0;

  private timer$: BehaviorSubject<number> = new BehaviorSubject<number>(this.initialTime);

  private lastStoppedTime: number = this.initialTime;
  private timerSubscription: Subscription = new Subscription();
  private isRunning: boolean = false;

  constructor() { }

  public get chronometer$(): Observable<Chronometer> {
    return this.timer$.pipe(
      map((seconds: number): Chronometer => this.secondsToChronometer(seconds))
    );
  }

  startTimer() {
    if (this.isRunning) {
      return;
    }

    this.timerSubscription = timer(0, 1000)
      .pipe(map((value: number): number => value + this.lastStoppedTime))
      .subscribe(this.timer$);
    this.isRunning = true;
  }

  stopTimer() {
    this.lastStoppedTime = this.timer$.value;
    this.timerSubscription.unsubscribe();
    this.isRunning = false;
  }

  resetTimer() {
    this.timerSubscription.unsubscribe();
    this.lastStoppedTime = this.initialTime;
    this.timer$.next(this.initialTime);
    this.isRunning = false;
  }

  private secondsToChronometer(totalSeconds: number): Chronometer {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return {
      minutes: this.convertToString(minutes),
      seconds: this.convertToString(seconds)
    }
  }

  private convertToString(value: number) {
    return `${value < 10 ? "0" + value : value}`;
  }
}
