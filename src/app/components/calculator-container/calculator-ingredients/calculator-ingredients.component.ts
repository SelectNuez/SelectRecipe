import { Component } from '@angular/core';
import { DataDinersService } from '../../../services/data-diners.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator-ingredients',
  templateUrl: './calculator-ingredients.component.html',
  styleUrls: ['./calculator-ingredients.component.css'],
})
export class CalculatorIngredientsComponent {
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
      price: [
        this.dataDiners.calcPrice ? '' : null,
        this.dataDiners.calcPrice
          ? [Validators.required, Validators.min(1)]
          : null,
      ],
    });
  }

  recipe: any[] = [
    { name: 'Tomate', quantity: 2, price: 1.5 },
    { name: 'Cebolla', quantity: 1, price: 0.5 },
    { name: 'Pimiento', quantity: 1, price: 0.75 },
    { name: 'Aceite', quantity: 1, price: 0.75 },
    { name: 'Sal', quantity: 1, price: 0.25 },
    { name: 'Huevos', quantity: 5, price: 1.5 },
    { name: 'Patatas', quantity: 5, price: 1.5 },
    { name: 'Perejil', quantity: 1, price: 0.25 },
    { name: 'Ajo', quantity: 1, price: 0.25 },
    { name: 'Pimienta', quantity: 1, price: 0.25 },
    { name: 'Leche', quantity: 1, price: 0.75 },
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
      this.showErrorMsg = false;
    } else {
      this.showErrorMsg = true;
    }
    this.formIngredients.reset();
  }

  saveRecipe() {
    this.dataDiners.recipe = this.recipe;
    this.router.navigate(['/calculator-ingredients-calculated']);
  }

  getCalcPrice() {
    /**
     * TEST
     */
    this.dataDiners.calcPrice = true;
    /** */
    return this.dataDiners.calcPrice;
  }

  deleteIngredient(item) {
    const index = this.recipe.indexOf(item);
    this.recipe.splice(index, 1);
  }
}
