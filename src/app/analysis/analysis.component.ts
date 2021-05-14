import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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

  @Input() strategies: Strategy;
  @Input() typeOfMarket;

  imgAnimation = 'inImg';

  share: Strategy;
  performanceRisk: number;

  constructor(private strategyService: StrategyService, private router: Router) {
  }

  ngOnInit(): void {
    this.translateName();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.getStrategiesByMarket();
  }

  getDetails(asset: Strategy) {
    this.share = asset;
    this.performanceRisk = (asset.takeProfit - asset.buySell) / (asset.buySell - asset.stopLoss)
  }

  translateName() {
    if (this.typeOfMarket === 'stocks') {
      this.typeOfMarket = 'Acciones'
    } else {
      if (this.typeOfMarket === 'comodities') {
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

