
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { reduce } from 'rxjs/operators';
import { GapService } from '../gap.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  animations: [
    trigger('delete', [
      state('create', style({
        opacity: 1,
        color: '#daf13e',
      })),
      state('delete', style({
        opacity: 1,
        color: '#daf13e',
      })),
      transition('void => *', [
        animate('700ms ease-in', keyframes([
          style({ transform: 'translateX(-60px)', offset: 0 }),
          style({ color: "blue", offset: 0 }),
          style({ color: "#daf13e", offset: 1 }),
          style({ transform: 'translateX(0%)', offset: 1 }),
        ]))
      ]),
      transition('* => void', [
        animate('300ms ease-out', keyframes([
          style({ transform: 'translateX(0%)', offset: 0 }),
          style({ color: "red", offset: 1 }),
          style({ transform: 'translateX(-60px)', offset: 1 }),
        ]))
      ]),
    ]),

  ]
})
export class StatisticsComponent implements OnInit {

  checkoutForm: FormGroup;
  gapHistory: any[];
  percentage: number = 0;
  dateError;
  menuDisplay = [];
  page = 0;

  isDelete = false;

  constructor(private formBuilder: FormBuilder, private gapService: GapService) {
    const dateLength = 10;
    let todayDate = new Date().toISOString().substring(0, dateLength);
    this.checkoutForm = this.formBuilder.group({
      gapClose: ['No', Validators.required],
      dateSelected: [todayDate, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getGaps(this.page);
  }

  onChangePage(i) {
    this.page = i;
    this.getGaps(i);
  }

  getMenuGaps(totalPages) {
    this.menuDisplay = [];
    for (let index = 0; index < totalPages; index++) {
      this.menuDisplay.push(index + 1);
    }
  }

  deleteGap(id, index) {
    this.isDelete = true;
    this.gapService.deleteGap(id).subscribe(() => {
      // this.getGaps(this.page);
      this.gapHistory.splice(index, 1);
    });
  }

  addGap() {
    this.isDelete = false;
    let gap: Gap = this.checkoutForm.value;
    this.gapService.addGap(gap).subscribe(newGap => {
      this.checkoutForm.reset();
      this.updatePercentage();
      // this.getGaps(this.page);
      this.gapHistory.unshift(newGap);
      this.dateError = null;
    }, x => {
      console.log("El error es: ", x)
      this.dateError = "Fecha Duplicada";
      this.checkoutForm.reset();
    })
  }

  getGaps(pageSelect) {
    this.gapService.getGaps(pageSelect).subscribe((gaps: Pageable) => {
      this.gapHistory = gaps.content;
      let totalPages = gaps.totalPages;
      this.updatePercentage();
      this.getMenuGaps(totalPages)
    })
  }

  updatePercentage() {
    let total = 0;
    let gapclose = 0;
    this.gapHistory.forEach(gap => {
      if (gap.gapClose == 'Si') {
        gapclose++;
        total++;
      } else {
        total++;
      }
      this.percentage = gapclose / total;
    });
  }

}

export interface Gap {
  id: string;
  gapClose: string;
  dateSelected: Date;
}

export interface Pageable {
  content;
  pageable;
  totalPages;
  totalElements;
  last;
}
