import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval } from 'rxjs/internal/observable/interval';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { take } from 'rxjs/internal/operators/take';
import { Subject } from 'rxjs';

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

  constructor() {
    this.timer$.pipe(debounceTime(1000)).subscribe(seconds => {
      this.time = null;
      this.timer = seconds;
      this.timer = parseInt(this.timer);
      interval(1000).pipe(take(this.timer)).subscribe(count => {
        this.result = this.timer - (count + 1);
        this.result == 0 ? this.playAudio() : this.result;
      });
      this.result = null;
    });
  }

  ngOnInit(): void {
  }

  startTimer(seconds) {
    this.timer$.next(seconds)
  }

  playAudio() {
    let audio = new Audio();
    audio.src = 'https://kamanalysys.s3.eu-central-1.amazonaws.com/assets/alarma_alarma_es_tu_mujer.mp3';
    /*
    audio.src = 'https://master.d2ggfysibfn5i5.amplifyapp.com/assets/alarma_alarma_es_tu_mujer.mp3';
    */
    audio.play();
    this.newTime();
  }

  newTime() {
    this.newDate = new Date();
    let endHours = this.newDate.getHours();
    let endMinutes = this.newDate.getMinutes() < 10 ? "0" + this.newDate.getMinutes() : this.newDate.getMinutes();
    let endSeconds = this.newDate.getSeconds() < 10 ? "0" + this.newDate.getSeconds() : this.newDate.getSeconds();
    this.endTime = `${endHours}:${endMinutes}:${endSeconds}`
    console.log("end time en el timer", this.endTime)
  }
}
