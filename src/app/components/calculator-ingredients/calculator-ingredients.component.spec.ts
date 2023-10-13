import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorIngredientsComponent } from './calculator-ingredients.component';

describe('CalculatorIngredientsComponent', () => {
  let component: CalculatorIngredientsComponent;
  let fixture: ComponentFixture<CalculatorIngredientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalculatorIngredientsComponent]
    });
    fixture = TestBed.createComponent(CalculatorIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
