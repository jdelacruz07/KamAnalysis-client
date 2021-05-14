import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataCrypto, Strategy } from '../analysis/analysis.component';
import { ApiCryptoService } from '../api-crypto.service';
import { StrategyService } from '../strategy.service';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css'],
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
  ]
})

export class PresentationComponent implements OnInit {

  crypto$: Observable<any>;
  endCrypto$: any;
  base: string;
  amount: string;
  currency: string;

  outIn = 'in';

  market: string[] = ['stocks', 'comodities', 'forex'];

  stocks: Strategy[];
  comodities: Strategy[];
  forex: Strategy[];
  goAheadStocks: boolean;
  goAheadComodities: boolean;
  goAheadForex: boolean;

  constructor(private apiCrypto: ApiCryptoService, private strategyService: StrategyService) {
    this.crypto$ = interval(1000).pipe(map(tick => this.getCrypto()));
  }

  ngOnInit(): void {
    this.endCrypto$ = this.crypto$.subscribe();
    this.getStrategies();
  }

  getStrategies() {
    this.market.forEach(market => {
      if (market === 'stocks') {
        this.strategyService.getStrategiesByMarket(market).subscribe(x => {
          this.stocks = x.content;
          this.goAheadStocks = this.checkLength(this.stocks);
        });
      } else {
        if (market === 'comodities') {
          this.strategyService.getStrategiesByMarket(market).subscribe(x => {
            this.comodities = x.content;
            this.goAheadComodities = this.checkLength(this.comodities);
          });
        } else {
          this.strategyService.getStrategiesByMarket(market).subscribe(x => {
            this.forex = x.content;
            this.goAheadForex = this.checkLength(this.forex);
          });
        }
      }
    })
  }

  checkLength(strategies) {
    if (strategies.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  getStrategiesByMarket(market) {
    this.strategyService.getStrategiesByMarket(this.market).subscribe((strategies) => {
      return strategies;
    });
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
    this.endCrypto$;
  }
}
