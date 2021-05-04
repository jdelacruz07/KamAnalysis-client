import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-performance-risk',
  templateUrl: './performance-risk.component.html',
  styleUrls: ['./performance-risk.component.css']
})

export class PerformanceRiskComponent implements OnInit {
  performanceRisk: number;
  ratioForm: FormGroup;
  risk = { stop: 0, buy: 0, profit: 0, risk: 0 }

  @ViewChild("stopLoss") stopLoss: ElementRef;
  @ViewChild("buySell") buySell: ElementRef;
  @ViewChild("takeProfit") takeProfit: ElementRef;

  newStrategy = false;

  constructor(private formBuilder: FormBuilder) {
    this.ratioForm = formBuilder.group({
      stopLoss: ['', [Validators.pattern('^[0-9]+([.][0-9]+)?$'), Validators.required]],
      buySell: ['', [Validators.pattern('^[0-9]+([.][0-9]+)?$'), Validators.required]],
      takeProfit: ['', [Validators.pattern('^[0-9]+([.][0-9]+)?$'), Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  changeForm() {
    this.newStrategy = false;
  }

  onFormStrategy() {
    console.log(this.newStrategy)
    this.newStrategy = true;
  }

  onChangeValue(nextInput) {
    if (nextInput == "buySell") {
      this.buySell.nativeElement.focus();
    } else {
      if (nextInput == "profit") {
        this.takeProfit.nativeElement.focus();
      } else {
        this.stopLoss.nativeElement.focus();
      }
    }
  }

  riskPerformance() {
    console.log("los datos son ", this.ratioForm.value)
    let stopLoss = this.ratioForm.value.stopLoss;
    let buySell = this.ratioForm.value.buySell;
    let takeProfit = this.ratioForm.value.takeProfit;
    if (takeProfit >= 0 && buySell >= 0 && stopLoss >= 0) {
      this.performanceRisk = (takeProfit - buySell) / (buySell - stopLoss)
      this.risk = { stop: stopLoss, buy: buySell, profit: takeProfit, risk: this.performanceRisk }
    } else {
      this.performanceRisk = null;
    }
  }

}
