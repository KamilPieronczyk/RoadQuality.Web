import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberChartComponent } from './number-chart.component';

describe('NumberChartComponent', () => {
  let component: NumberChartComponent;
  let fixture: ComponentFixture<NumberChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
