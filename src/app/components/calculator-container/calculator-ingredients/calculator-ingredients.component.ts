import { Component } from '@angular/core';
import { DataDinersService } from '../../../services/data-diners.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator-ingredients',
  templateUrl: './calculator-ingredients.component.html',
  styleUrls: ['./calculator-ingredients.component.css'],
})
export class CalculatorIngredientsComponent{
  formIngredients: FormGroup;
  showErrorMsg = false;


  constructor(
    private router: Router,
    private dataDiners: DataDinersService,
    private fb: FormBuilder
  ) {
    this.formIngredients = this.fb.group({
      name: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: [this.dataDiners.calcPrice ? '': null, this.dataDiners.calcPrice ? [Validators.required, Validators.min(1)]: null],
    });
  }



  recipe: any[] = [
  ];

  // Guardamos el ingrediente en la receta
  newIngredient() {
    if (this.formIngredients.valid) {
      const name = this.formIngredients.value.name;
      const quantity = this.formIngredients.value.quantity;
      const price = this.formIngredients.value.price;
      const ingredient = { name, quantity, price };
      this.recipe.push(ingredient);

      // Guardamos la receta en el servicio
      this.dataDiners.recipe = this.recipe;
    } else {
      this.showErrorMsg = true;
    }
  }

  saveRecipe() {
    this.dataDiners.recipe = this.recipe;
    this.router.navigate(['/calculator-ingredients-calculated']);
  }

  getCalcPrice() {
    return this.dataDiners.calcPrice;
  }
}
