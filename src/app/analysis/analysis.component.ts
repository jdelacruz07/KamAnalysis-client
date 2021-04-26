import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiCryptoService } from '../api-crypto.service';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { trigger, state, style, animate, transition, keyframes, query, stagger } from '@angular/animations';
import { Router } from '@angular/router';
import { StrategyService } from '../strategy.service';


@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css'],
  animations: [
    trigger('outIn', [
      state('in', style({
        opacity: 1,
        color: '#daf13e',
      })),
      transition('* => in', [
        animate('2s', keyframes([
          style({ transform: 'translateX(-100%)', offset: 0 }),
          style({ color: "#daf13e", offset: 1 }),
          style({ transform: 'translateX(0%)', offset: 1 }),
        ]))
      ]),
    ]),
    trigger('imgAnimation', [
      transition('* => inImg', [
        query('img', style({ opacity: 0 })),
        query('img', stagger('300ms', [
          animate('2000ms', style({ opacity: 1 })),
        ]), { optional: true }),
      ])
    ]),
  ]
})
export class AnalysisComponent implements OnInit, OnDestroy {

  crypto$: Observable<any>;
  endCrypto$: any;
  base: string;
  amount: string;
  currency: string;

  outIn = 'in';
  imgAnimation = null;

  asset: Strategy[] = [];
  assets: Strategy[] = [];

  constructor(private apiCrypto: ApiCryptoService, private strategyService: StrategyService, private router: Router) {
    this.crypto$ = interval(1000).pipe(map(tick => this.getCrypto()));
  }

  ngOnInit(): void {
    this.endCrypto$ = this.crypto$.subscribe();
    this.getAllStrategies();
  }

  getAllStrategies() {
    this.strategyService.getAllStrategies().subscribe((strategies) => {
      this.assets = strategies.content;
      this.asset.push(this.assets[this.assets.length - 1]);
      this.assets.splice(this.assets.length - 1, 1);
      this.imgAnimation = 'inImg';
    })
  }

  getCrypto() {
    let nameCrypto = "BTC-USD";
    this.apiCrypto.getCrypto(nameCrypto).subscribe((crypto: DataCrypto) => {
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

export interface DataCrypto {
  data: Crypto;
}

export interface Crypto {
  base: string;
  currency: string;
  amount: string;
}

export interface Strategy {
  id: string;
  asset: string;
  strategy: string;
  price: number;
  stopLoss: number;
  takeProfit: number;
  srcImage: string;
  alt: string;
}

