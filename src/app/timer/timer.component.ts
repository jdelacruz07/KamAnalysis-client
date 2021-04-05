import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval } from 'rxjs/internal/observable/interval';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { take } from 'rxjs/internal/operators/take';
import { Subject } from 'rxjs';
import { isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  timer$ = new Subject;
  timer: any;
  result: number;
  newDate: Date;
  endTime: string;
  time: any;
  finished: boolean = true;
  restart: any;
  subscription;
  error: boolean;

  constructor() {
    this.timer$.pipe(debounceTime(1000)).subscribe(seconds => {
      this.workTimer(seconds)
    });
  }
  
  ngOnInit(): void {
  }
  
  workTimer (seconds) {
    this.error = false;
    if (seconds > 0) {
      this.result = seconds;
      this.finished = false;
      this.timer = seconds;
      this.timer = parseInt(this.timer);
      this.subscription = interval(1000).pipe(take(this.timer)).subscribe(count => {
        this.result = this.timer - (count + 1);
        this.result == 0 ? this.printFinish() : this.result;
      });
    } else {
      this.time = null;
      this.finished = true;
      this.error = true;
    }
  }

  restartNow() {
    this.subscription.unsubscribe();
    this.time = null;
    this.finished = true;
    this.result = null;
  }

  startTimer(seconds) {
    this.timer$.next(seconds)
  }

  printFinish() {
    this.time = null;
    this.finished = true;
    let audio = new Audio();
    audio.src = 'https://kamanalysys.s3.eu-central-1.amazonaws.com/assets/alarma_alarma_es_tu_mujer.mp3';
    audio.play();
    this.finishTime();
  }

  finishTime() {
    this.newDate = new Date();
    let endHours = this.newDate.getHours();
    let endMinutes = this.newDate.getMinutes() < 10 ? "0" + this.newDate.getMinutes() : this.newDate.getMinutes();
    let endSeconds = this.newDate.getSeconds() < 10 ? "0" + this.newDate.getSeconds() : this.newDate.getSeconds();
    this.endTime = `${endHours}:${endMinutes}:${endSeconds}`
  }
}
