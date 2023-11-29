import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/recipe.model';


@Injectable({
  providedIn: 'root',
})
export class RecipeListService implements OnInit {
  recipeName: string;
  recipeDinners: number;
  recipeIngredients: any[] = [];
  recipeEdit: boolean = false;
  recipe: Recipe;

  constructor(private router: Router) {}
  ngOnInit(): void {}

  setRecipeName(recipeName: string) {
    this.recipeName = recipeName;
  }

  getRecipeName() {
    return this.recipeName;
  }

  setRecipeDinners(recipeDinners: number) {
    this.recipeDinners = recipeDinners;
  }

  getRecipeDinners() {
    return this.recipeDinners;
  }

  setRecipeIngredients(recipeIngredients: any[]) {
    this.recipeIngredients = recipeIngredients;
  }

  getRecipeIngredients() {
    return this.recipeIngredients;
  }

  setRecipeEdit(recipeEdit: boolean) {
    this.recipeEdit = recipeEdit;
  }

  getRecipeEdit() {
    return this.recipeEdit;
  }

  setRecipe(recipe: any) {
    this.recipe = recipe;
  }

  getRecipe() {
    return this.recipe;
  }


  editRecipe(recipe: any) {
    this.recipeName = recipe.name;
    this.recipeDinners = recipe.dinners;
    this.recipeIngredients = recipe.ingredients;
    this.recipeEdit = true;
    this.recipe = recipe;
    this.router.navigate(['/recipes-form-ingredients']);
  }
}
