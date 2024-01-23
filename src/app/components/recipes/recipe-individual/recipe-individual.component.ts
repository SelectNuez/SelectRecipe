import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/recipe.model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-recipe-individual',
  templateUrl: './recipe-individual.component.html',
  styleUrls: ['./recipe-individual.component.css'],
})
export class RecipeIndividualComponent implements OnInit {
  recipeName: string;
  recipeDinners: number;
  recipe: Recipe;
  recipeDinnersCalc: number;
  constructor(
    private route: ActivatedRoute,
    private databaseService: DatabaseService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.recipeName = params.get('name');
      this.recipe = this.databaseService.getRecipeByName(this.recipeName);
      this.recipeDinners = this.recipe.dinners;
      this.recipeDinnersCalc = this.recipe.dinners;
    });


  }

  addDiner() {
    this.recipeDinnersCalc++;
    this.updateIngredients();
  }

  discDiner() {
    if (this.recipeDinners > 1) {
      this.recipeDinnersCalc--;
      this.updateIngredients();
    }
  }

  updateIngredients() {
    // Calcular la relación de cambio en comensales
    const ratio = this.recipeDinnersCalc / this.recipeDinners;

    // Actualizar la cantidad y el precio de cada ingrediente
    this.recipe.ingredients.forEach((ingredient) => {
      ingredient.quantity *= ratio;
      ingredient.quantity = parseFloat(ingredient.quantity.toFixed(2));
      ingredient.price *= ratio;
      ingredient.price = parseFloat(ingredient.price.toFixed(2));
    });

    // Actualizar la cantidad total de comensales
    this.recipeDinners = this.recipeDinnersCalc;
  }


  getTotalPrice() {
    let totalPrice = 0;
    for (let i = 0; i < this.recipe.ingredients.length; i++) {
      totalPrice += this.recipe.ingredients[i].price;
    }
    totalPrice = +(
      (totalPrice / this.recipeDinners) *
      this.recipeDinnersCalc
    ).toFixed(2);
    return totalPrice;
  }

  getUnitPrice() {
    const unitPrice = this.recipeDinnersCalc === 0 ? 0 : this.getTotalPrice() / this.recipeDinnersCalc;
    const formattedPrice = parseFloat(unitPrice.toFixed(2)).toString();

    // Verificar si los dos decimales son '00'
    if (formattedPrice.endsWith('.00')) {
      return String(Math.floor(unitPrice));
    } else {
      return formattedPrice;
    }
  }
}
