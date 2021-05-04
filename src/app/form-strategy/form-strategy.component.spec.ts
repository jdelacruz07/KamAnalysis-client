import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStrategyComponent } from './form-strategy.component';

describe('FormStrategyComponent', () => {
  let component: FormStrategyComponent;
  let fixture: ComponentFixture<FormStrategyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormStrategyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
