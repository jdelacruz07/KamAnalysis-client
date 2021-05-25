import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { trigger, style, animate, transition, query, stagger } from '@angular/animations';
import { Router } from '@angular/router';
import { StrategyService } from '../strategy.service';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css'],
  animations: [
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
export class AnalysisComponent implements OnInit, OnChanges {

  @Input() strategies: Strategy[];
  @Input() typeOfMarket;

  imgAnimation = 'inImg';

  share: Strategy;
  performanceRisk: number;
  isActiveDetails: boolean;
  @Output() showResponse: EventEmitter<string> = new EventEmitter();
  restOfStrategies: Strategy[];
  strategy: Strategy[] = [];

  constructor(private strategyService: StrategyService, private router: Router) {
  }

  ngOnInit(): void {
    this.translateName();
    let strategyPrincipal = this.strategies[0];
    this.strategy.push(strategyPrincipal);
    let strategies: Strategy[] = this.strategies.slice();
    strategies.splice(0, 1);
    this.restOfStrategies = strategies.slice();
    console.log("El resto de estragegias son ", this.restOfStrategies)
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.getStrategiesByMarket();
  }

  backTypeOfMarket(market) {
    this.isActiveDetails = false;
    console.log("Es materias primas ", market)
    this.showResponse.emit(market);
  }

  backToAllMarkets() {
    this.isActiveDetails = false;
    this.showResponse.emit("all");
  }

  getDetails(asset: Strategy) {
    this.showResponse.emit(asset.market);
    this.isActiveDetails = true;
    this.share = asset;
    this.performanceRisk = (asset.takeProfit - asset.buySell) / (asset.buySell - asset.stopLoss)
  }

  translateName() {
    if (this.typeOfMarket === 'stocks') {
      this.typeOfMarket = 'Acciones'
    } else {
      if (this.typeOfMarket === 'commodities') {
        this.typeOfMarket = 'Materias primas'
      } else {
        if (this.typeOfMarket === 'forex') {
          this.typeOfMarket = 'Divisas'
        }
      }
    }
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
  market: string;
  position: string;
  strategy: string;
  buySell: number;
  stopLoss: number;
  takeProfit: number;
  urlImg: string;
  altImg: string;
  createdAt: Date;
}

