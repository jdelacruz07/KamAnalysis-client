import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
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

export class PresentationComponent implements OnInit, OnDestroy {

  crypto$: Observable<any>;
  endCrypto$: any;
  base: string;
  amount: string;
  currency: string;

  outIn = 'in';

  market: string[] = ['stocks', 'commodities', 'forex'];

  stocks: Strategy[];
  commodities: Strategy[];
  forex: Strategy[];
  goAheadStocks: boolean;
  goAheadCommodities: boolean;
  goAheadForex: boolean;
  showStocks: boolean = true;
  showCommodities: boolean = true;
  showForex: boolean = true;
  oneMarket: boolean;

  constructor(private apiCrypto: ApiCryptoService, private strategyService: StrategyService) {
    this.crypto$ = interval(1000).pipe(map(tick => this.getCrypto()));
  }

  ngOnInit(): void {
    this.endCrypto$ = this.crypto$.subscribe();
    this.getStrategies();
  }

  showResponse(typeOfMarket) {
    this.oneMarket = true;
    if (typeOfMarket === "stocks") {
      this.showStocks = true;
      this.showCommodities = false;
      this.showForex = false;
    } else {
      if (typeOfMarket === "commodities") {
        this.showStocks = false;
        this.showCommodities = true;
        this.showForex = false;
      } else {
        if (typeOfMarket === 'forex') {
          this.showStocks = false;
          this.showCommodities = false;
          this.showForex = true;
        } else {
          this.oneMarket = false;
          this.showStocks = true;
          this.showCommodities = true;
          this.showForex = true;
        }
      }
    }
  }

  getStrategies() {
    this.market.forEach(market => {
      if (market === 'stocks') {
        this.strategyService.getStrategiesByMarket(market).subscribe(x => {
          this.stocks = x.content;
          this.goAheadStocks = this.checkLength(this.stocks);
        });
      } else {
        if (market === 'commodities') {
          this.strategyService.getStrategiesByMarket(market).subscribe(x => {
            this.commodities = x.content;
            this.goAheadCommodities = this.checkLength(this.commodities);
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
      // console.log(`Recibo ${this.base} y ${this.amount}`);
    });
  }

  ngOnDestroy(): void {
    this.endCrypto$.unsubscribe();
  }
}
