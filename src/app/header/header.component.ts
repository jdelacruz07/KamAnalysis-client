import { Component, OnInit } from '@angular/core';

import { map } from 'rxjs/internal/operators/map';
import { timer } from 'rxjs/internal/observable/timer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  time$: any;
  hours: any;
  seconds: any;
  minutes: any;

  constructor() {
    this.time$ = timer(0, 1000).pipe(map(() => new Date()));
  }

  ngOnInit(): void {
    this.time$.subscribe(
      (t) => {
        this.hours = t.getHours();
        this.minutes =
          t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes();
        this.seconds =
          t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds();
      },
      () => console.log('Error'),
      () => console.log('Terminado')
    );
  }
}
