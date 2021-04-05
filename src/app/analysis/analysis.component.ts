import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiCryptoService } from '../api-crypto.service';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
        color: '#daf13e',
      })),
      transition('* => open', [
        animate('4s', keyframes([
          style({ transform: 'translateX(-100%)', offset: 0 }),
          style({ color: "#daf13e", offset: 1 }),
          style({ transform: 'translateX(0%)', offset: 1 }),
        ]))
      ]),
    ]),
    trigger('banner', [
      state('active', style({
        opacity: 1,
        color: '#daf13e',
      })),
      transition('* => active', [
        animate('4s', keyframes([
          style({ transform: 'translateX(0%)', offset: 1 }),
          style({ opacity: 1, offset: 1 }),
        ]))
      ]),
    ])
  ]
})
export class AnalysisComponent implements OnInit, OnDestroy {

  crypto$: Observable<any>;
  endCrypto$: any;
  base: string;
  amount: string;
  currency: string;
  valueOfCrypto: cryptoInterface;

  isOpen = true;
  isActive = true;


  toggle() {
    this.isOpen = !this.isOpen;
  }

  constructor(private apiCrypto: ApiCryptoService) {
    this.crypto$ = interval(1000).pipe(map(tick => this.getCrypto()));
  }

  ngOnInit(): void {
    this.endCrypto$ = this.crypto$.subscribe();
  }

  getCrypto() {
    let nameCrypto = "BTC-USD";
    this.apiCrypto.getCrypto(nameCrypto).subscribe((crypto: dataCrypto) => {
      this.base = crypto.data.base;
      this.currency = crypto.data.currency;
      this.amount = crypto.data.amount;
      console.log(`Recibo ${this.base} y ${this.amount}`);
    });
  }

  ngOnDestroy(): void {
    this.endCrypto$.unsubscribe();
  }


}

export interface dataCrypto {
  data: cryptoInterface;
}

export interface cryptoInterface {
  base: string;
  currency: string;
  amount: string;
}

