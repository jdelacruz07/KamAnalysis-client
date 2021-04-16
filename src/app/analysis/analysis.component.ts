import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiCryptoService } from '../api-crypto.service';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { trigger, state, style, animate, transition, keyframes, query, stagger } from '@angular/animations';
import { Router } from '@angular/router';


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
      transition('void => *', [
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
  imgAnimation;

  asset: Asset[] = [];
  assets: Asset[] = [
    {
      name: "Header",
      strategy: "Estrategia: posicionarse corto, es decir venta del USD y compra del MXN.",
      price: "Precio de entrada en los 21, con objetivo de los 20 y limite de perdidas en los 22",
      srcImage: "../assets/img/USDMXN.png",
      alt: "Image Header",
    },
    {
      name: "MXN",
      strategy: "Estrategia: posicionarse corto, es decir venta del USD y compra del MXN.",
      price: "Precio de entrada en los 21, con objetivo de los 20 y limite de perdidas en los 22",
      srcImage: "../assets/img/USDMXN.png",
      alt: "Image MXN",
    },
    {
      name: "MXN",
      strategy: "Estrategia: posicionarse corto, es decir venta del USD y compra del MXN.",
      price: "Precio de entrada en los 21, con objetivo de los 20 y limite de perdidas en los 22",
      srcImage: "../assets/img/USDMXN.png",
      alt: "Image MXN",
    },
    {
      name: "MXN",
      strategy: "Estrategia: posicionarse corto, es decir venta del USD y compra del MXN.",
      price: "Precio de entrada en los 21, con objetivo de los 20 y limite de perdidas en los 22",
      srcImage: "../assets/img/USDMXN.png",
      alt: "Image MXN",
    }
  ]

  constructor(private apiCrypto: ApiCryptoService, private router: Router) {
    this.crypto$ = interval(1000).pipe(map(tick => this.getCrypto()));
  }

  ngOnInit(): void {
    this.endCrypto$ = this.crypto$.subscribe();
    this.asset.push(this.assets[0]);
    this.assets.splice(0, 1);
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

export interface Asset {
  name: string;
  strategy: string;
  price: string;
  srcImage: string;
  alt: string;
}

