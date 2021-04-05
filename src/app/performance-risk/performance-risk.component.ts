import { not } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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

  @ViewChild("stop") stop: ElementRef;
  @ViewChild("buy") buy: ElementRef;
  @ViewChild("profit") profit: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  onChangeValue(value, nextInput) {
    if (nextInput == "buy") {
      this.buy.nativeElement.focus();
    } else {
      if (nextInput == "profit") {
        this.profit.nativeElement.focus();
      } else {
        this.profit.nativeElement.blur();
      }
    }
    if (value > 0) {
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
