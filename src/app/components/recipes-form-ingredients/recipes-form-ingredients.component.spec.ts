import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesFormIngredientsComponent } from './recipes-form-ingredients.component';

describe('RecipesFormIngredientsComponent', () => {
  let component: RecipesFormIngredientsComponent;
  let fixture: ComponentFixture<RecipesFormIngredientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipesFormIngredientsComponent]
    });
    fixture = TestBed.createComponent(RecipesFormIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
