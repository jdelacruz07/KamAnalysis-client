import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceRiskComponent } from './performance-risk.component';

describe('PerformanceRiskComponent', () => {
  let component: PerformanceRiskComponent;
  let fixture: ComponentFixture<PerformanceRiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PerformanceRiskComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
