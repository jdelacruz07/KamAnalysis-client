
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { GapService } from '../gap.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  animations: [
    trigger('gapAnimation', [
      state('add', style({
        color: '#007bff',
      })),
      state('delete', style({
        opacity: 1,
        color: '#007bff',
      })),
      transition('void => add', [
        animate('700ms ease-in', keyframes([
          style({ transform: 'translateX(-60px)', opacity: '0', offset: 0 }),
          style({ color: "#daf13e", offset: 0 }),
          style({ color: "#007bff", offset: 1 }),
          style({ transform: 'translateX(0%)', opacity: '1', offset: 1 }),
        ]))
      ]),
      transition('delete => void', [
        animate('300ms ease-out', keyframes([
          style({ transform: 'translateX(0%)', opacity: '1', offset: 0 }),
          style({ color: "red", offset: 1 }),
          style({ transform: 'translateX(-60px)', opacity: '0', offset: 1 }),
        ]))
      ]),
    ]),
  ]

})
export class StatisticsComponent implements OnInit {

  gapForm: FormGroup;
  gapHistory: any[];
  percentage: number = 0;
  gapError = null;
  menuDisplay = [];
  page: number = 0;

  animationList = null;

  isAuthenticate = false;

  constructor(private formBuilder: FormBuilder, private gapService: GapService, private auth: AuthService) {
    const dateLength = 10;
    let todayDate = new Date().toISOString().substring(0, dateLength);
    this.gapForm = this.formBuilder.group({
      gapClose: ['No', Validators.required],
      dateSelected: [todayDate, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getGaps(this.page);
    this.isAuthenticated();
    console.log("Esta autorizado ", this.isAuthenticate)
  }

  isAuthenticated() {
    return this.isAuthenticate = this.auth.authenticated();
  }

  onChangePage(i) {
    this.animationList = null;
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
    this.animationList = "delete";
    this.gapError = null;
    this.gapService.deleteGap(id).subscribe(() => {
      this.gapHistory.splice(index, 1);
    });
  }

  addGap() {
    let gap: Gap = this.gapForm.value;
    this.animationList = "add";
    this.gapError = null;
    this.gapService.addGap(gap).subscribe(newGap => {
      this.gapForm.reset();
      this.updatePercentage();
      this.gapHistory.unshift(newGap);
    }, (error: Response) => {
      console.log("El error es: ", error.status)
      if (error.status === 401) {
        this.gapError = "Usuario no autorizado";
      } else {
        if (error.status === 302) {
          this.gapError = "Fecha duplicada"
        }
      }
      this.gapForm.reset();
    })
  }

  getGaps(pageSelect) {
    let size = 20;
    this.gapService.getGaps(pageSelect, size).subscribe((gaps: Pageable) => {
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
  gapIsClose: string;
  dateSelected: Date;
}

export interface Pageable {
  content;
  pageable;
  totalPages;
  totalElements;
  last;
}
