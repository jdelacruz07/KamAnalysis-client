import { not } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-performance-risk',
  templateUrl: './performance-risk.component.html',
  styleUrls: ['./performance-risk.component.css']
})

export class PerformanceRiskComponent implements OnInit {
  // stopLoss: number;
  performanceRisk: number;
  // takeProfit: number;
  // buySell: number;
  ratioForm: FormGroup;

  @ViewChild("stopLoss") stopLoss: ElementRef;
  @ViewChild("buySell") buySell: ElementRef;
  @ViewChild("takeProfit") takeProfit: ElementRef;

  constructor(private formBuilder: FormBuilder) {
    this.ratioForm = formBuilder.group({
      stopLoss: ['', [Validators.pattern('^[0-9]+([.][0-9]+)?$'), Validators.required]],
      buySell: ['', [Validators.pattern('^[0-9]+([.][0-9]+)?$'), Validators.required]],
      takeProfit: ['', [Validators.pattern('^[0-9]+([.][0-9]+)?$'),Validators.required]]
    })
  }

  ngOnInit(): void {
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
    if (takeProfit >= 0 && buySell >= 0 && stopLoss >= 0 ) {
      this.performanceRisk = (takeProfit - buySell) / (buySell - stopLoss)
    } else {
      this.performanceRisk = null;
    }
    
  }

}
