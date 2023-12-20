import { Component, OnInit } from '@angular/core';
import { DataDinersService } from '../../../services/data-diners.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-calculator-ingredients-calculated',
  templateUrl: './calculator-ingredients-calculated.component.html',
  styleUrls: ['./calculator-ingredients-calculated.component.css'],
})
export class CalculatorIngredientsCalculatedComponent implements OnInit {
  constructor(private dataDiners: DataDinersService) {}

  recipe: any[];
  diners: number = 0;
  recipeCalc: any[];

  ngOnInit() {
    this.diners = this.dataDiners.newNumber;
    this.recipe = this.dataDiners.recipe;
    /**
     * Para pruebas
    this.dataDiners.originalNumber = 5;
    this.diners = 5;
    this.dataDiners.calcPrice = true;
    this.recipe = [
      { name: 'Tomate', quantity: 2.5, price: 1.5 },
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
     */


    /*La línea this.recipeCalc = this.recipe;
    no crea una copia independiente de this.recipe.
    En cambio, ambas variables this.recipeCalc y this.recipe apuntarán al mismo objeto en la memoria.
    Esto significa que cualquier cambio que realices en this.recipeCalc se reflejará en this.recipe y viceversa,
    ya que ambos hacen referencia al mismo objeto.
    */
    this.recipeCalc = this.recipe.map((item) => ({ ...item }));
    this.calcRecipe();
  }

  calcRecipe() {
    for (let i = 0; i < this.recipe.length; i++) {
      this.recipeCalc[i].quantity = parseFloat(
        ((this.recipe[i].quantity * this.diners) /
          this.dataDiners.originalNumber).toFixed(2)
      ).toString();
      this.recipeCalc[i].price = parseFloat(
        ((this.recipe[i].price * this.diners) /
          this.dataDiners.originalNumber).toFixed(2)
      ).toString();
    }
  }

  addDiner() {
    this.diners++;
    this.calcRecipe();
  }

  discDiner() {
    if (this.diners > 1) {
      this.diners--;
      this.calcRecipe();
    }
  }

  getCalcPrice() {
    return this.dataDiners.calcPrice;
  }

  getTotalPrice() {
    let totalPrice = 0;
    for (let i = 0; i < this.recipe.length; i++) {
      totalPrice += this.recipe[i].price;
    }
    totalPrice = +(
      (totalPrice / this.dataDiners.originalNumber) *
      this.diners
    ).toFixed(2);
    return totalPrice;
  }

  getUnitPrice() {
    const unitPrice = this.diners === 0 ? 0 : this.getTotalPrice() / this.diners;
    const formattedPrice = parseFloat(unitPrice.toFixed(2)).toString();

    // Verificar si los dos decimales son '00'
    if (formattedPrice.endsWith('.00')) {
      return String(Math.floor(unitPrice));
    } else {
      return formattedPrice;
    }
  }
}
