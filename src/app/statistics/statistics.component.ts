
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GapService } from '../gap.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  checkoutForm: FormGroup;
  gapHistory: any;
  percentage: number = 0;
  dateError;
  menuDisplay = [];
  page = 0;

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

  deleteGap(id) {
    this.gapService.deleteGap(id).subscribe(() => {
      this.getGaps(this.page);
    }
    );
  }

  addGap() {
    let gap: gap = this.checkoutForm.value;
    this.gapService.addGap(gap).subscribe(() => {
      this.checkoutForm.reset();
      this.updatePercentage();
      this.getGaps(this.page);
      this.dateError = null;
    }, x => {
      console.log("El error es: ", x)
      this.dateError = "Fecha Duplicada";
      this.checkoutForm.reset();
    })
  }

  getGaps(pageSelect) {
    this.gapService.getGaps(pageSelect).subscribe((gaps: Pageable) => {
      console.log(gaps)
      this.gapHistory = gaps.content;
      let totalPages = gaps.totalPages;
      let history: gap[] = this.gapHistory;
      this.gapHistory = history.reverse();
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

export interface gap {
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
