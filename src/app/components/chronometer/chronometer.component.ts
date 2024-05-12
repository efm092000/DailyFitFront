import {Component, OnDestroy} from '@angular/core';
import {Chronometer} from "../../interfaces/chronometer.interface";
import {Subscription} from "rxjs";
import {TimerService} from "../../services/timer.service";

@Component({
  selector: 'app-chronometer',
  standalone: true,
  imports: [],
  templateUrl: './chronometer.component.html',
  styleUrl: './chronometer.component.css'
})
export class ChronometerComponent implements OnDestroy{
  public chronometer: Chronometer = {minutes: '0', seconds: '0'};
  private subscription: Subscription = new Subscription();

  constructor(private timerService: TimerService) {
    this.subscription.add(
      this.timerService.chronometer$.subscribe(
        (val: Chronometer) => (this.chronometer = val)
      )
    );
  }

  startTimer() {
    this.timerService.startTimer()
  }

  stopTimer() {
    this.timerService.stopTimer()
  }

  resetTimer() {
    this.timerService.resetTimer()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
