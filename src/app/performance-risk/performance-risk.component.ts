import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-performance-risk',
  templateUrl: './performance-risk.component.html',
  styleUrls: ['./performance-risk.component.css']
})
export class PerformanceRiskComponent implements OnInit {
  stopLoss: number;
  performanceRisk: number;
  takeProfit: number;
  buySell: number;

  constructor() { }

  ngOnInit(): void {
  }


  onChangeValue(value) {
    if ( value > 0 ) {
      this.RiskPerformance();
    } else {
      this.performanceRisk = null;
    }
  }

  RiskPerformance() {
    if (this.takeProfit > 0 && this.buySell > 0 && this.stopLoss > 0) {
      this.performanceRisk = (this.takeProfit - this.buySell) / (this.buySell - this.stopLoss)
    } 
  }

}
