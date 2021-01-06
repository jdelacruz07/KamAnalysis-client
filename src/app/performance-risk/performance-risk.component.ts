import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-performance-risk',
  templateUrl: './performance-risk.component.html',
  styleUrls: ['./performance-risk.component.css']
})
export class PerformanceRiskComponent implements OnInit {
  stopLoss: any;
  performanceRisk: number;
  takeProfit: any;
  buySell: any;

  constructor() { }

  ngOnInit(): void {
  }


  onChangeStopLoss($event) {
    this.stopLoss = $event;
    this.RiskPerformance();
  }

  onChangeBuySell($event) {
    this.buySell = $event;
    this.RiskPerformance();
  }

  onChangeTakeProfit($event) {
    this.takeProfit = $event;
    this.RiskPerformance();
  }

  RiskPerformance() {
    if (this.takeProfit > 0 && this.buySell > 0 && this.stopLoss > 0) {
      this.performanceRisk = (this.takeProfit - this.buySell) / (this.buySell - this.stopLoss)
    }
  }

}
