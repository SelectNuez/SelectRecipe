import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorIngredientsCalculatedComponent } from './calculator-ingredients-calculated.component';

describe('CalculatorIngredientsCalculatedComponent', () => {
  let component: CalculatorIngredientsCalculatedComponent;
  let fixture: ComponentFixture<CalculatorIngredientsCalculatedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalculatorIngredientsCalculatedComponent]
    });
    fixture = TestBed.createComponent(CalculatorIngredientsCalculatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
