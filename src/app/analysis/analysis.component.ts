import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { trigger, style, animate, transition, query, stagger, state } from '@angular/animations';
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
    trigger('contentAnimation', [
      state('stateActive', style({ transform: 'translate(1%, -2%)', color: "#daf13e", opacity: 1, })),
      state('stateInactive', style({ transform: 'translate(0%, 0%)', color: "rgb(157, 217, 219)", opacity: 1 })),
      transition('*=>stateActive', [animate('.3s ease-in')]),
      transition('stateActive=>stateInactive', [animate('.3s ease-in')]),
    ]),
    trigger('zoomAnimation', [
      state('zoomActive', style({ transform: 'scale(1.2)', color: "#daf13e", opacity: 1, })),
      state('zoomInactive', style({ transform: 'translate(0%, 0%)', opacity: 1 })),
      transition('*=>zoomActive', [animate('.3s ease-in')]),
      transition('zoomActive=>zoomInactive', [animate('.3s ease-in'),]),
    ]),
  ],

})
export class AnalysisComponent implements OnInit, OnChanges {

  @Input() strategies: Strategy[];
  @Input() onlyOneMarket;
  @Output() showResponse: EventEmitter<string> = new EventEmitter();

  imgState = 'inImg';
  contentState = '';
  zoomState = 'zoomInactive';
  // contentAnimation = 'stateInactive';

  share: Strategy;
  performanceRisk: number;
  isActiveDetails: boolean;
  restOfStrategies: Strategy[];
  strategy: Strategy[] = [];
  typeOfMarket: string;

  constructor(private strategyService: StrategyService, private router: Router) {
  }

  ngOnInit(): void {
    let strategyPrincipal = this.strategies[0];
    this.typeOfMarket = strategyPrincipal.market;
    this.strategy.push(strategyPrincipal);
    let strategies: Strategy[] = this.strategies.slice();
    strategies.splice(0, 1);
    this.restOfStrategies = strategies.slice();
    this.translateName();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  zoom() {
    this.zoomState == "zoomInactive" ? this.zoomState = "zoomActive" : this.zoomState = "zoomInactive";
    // if (this.zoomState == "zoomInactive") {
    //   this.zoomState = "zoomActive"
    // } else {
    //   this.zoomState = "zoomInactive"
    // }
    console.log("Estado de la animacion zomm", this.zoomState)
  }

  animate(state) {
    this.contentState = state;
  }

  toOneMarket(market) {
    this.onlyOneMarket = true;
    this.isActiveDetails = false;
    this.showResponse.emit(market);
  }

  backToAllMarkets() {
    this.onlyOneMarket = false;
    this.isActiveDetails = false;
    this.showResponse.emit("all");
  }

  getDetails(asset: Strategy) {
    this.showResponse.emit(asset.market);
    this.isActiveDetails = true;
    this.share = asset;
    this.performanceRisk = (asset.takeProfit - asset.buySell) / (asset.buySell - asset.stopLoss);
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

