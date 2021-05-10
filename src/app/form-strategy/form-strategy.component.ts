import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, } from '@angular/forms';
import { AuthService } from '../auth.service';
import { StrategyService } from '../strategy.service';


@Component({
  selector: 'app-form-strategy',
  templateUrl: './form-strategy.component.html',
  styleUrls: ['./form-strategy.component.css'],
})
export class FormStrategyComponent implements OnInit {
  @Input() totalRisk = { stop: 0, buy: 0, profit: 0, risk: 0 };
  @Output() changeForm: EventEmitter<boolean> = new EventEmitter();

  isLogged: boolean = false;
  habilitar = true;

  strategyForm = this.fb.group({
    asset: ['', Validators.required],
    market: ['share'],
    strategy: ['', Validators.required],
    state: 'inactive',
    buySell: [{ value: '' }],
    stopLoss: [{ value: '' }],
    takeProfit: [{ value: '' }],
    urlImg: '',
    altImg: '',
  })

  constructor(private fb: FormBuilder, private strategyService: StrategyService, private authService: AuthService) { }

  ngOnInit(): void {
    console.log("Valores importados", this.totalRisk)
    this.strategyForm.get('stopLoss').setValue(this.totalRisk.stop)
    this.strategyForm.get('buySell').setValue(this.totalRisk.buy)
    this.strategyForm.get('takeProfit').setValue(this.totalRisk.profit)
    this.verifyAuth();
  }

  verifyAuth() {
    this.isLogged = this.authService.isAuthenticate;
    console.log("Esta auth ", this.isLogged);
  }


  returnPerformanceRisk() {
    this.changeForm.emit(false);
  }

  sendForm(form) {
    this.strategyService.addStrategy(form).subscribe(x => {
      console.log("Esta es la nueva estrategia", x)
    });
  }

}
