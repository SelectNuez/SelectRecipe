import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ingredient, Recipe } from 'src/app/recipe.model';
import { DatabaseService } from 'src/app/services/database.service';
import { RecipeListService } from 'src/app/services/recipe-list.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recipes-form-ingredients',
  templateUrl: './recipes-form-ingredients.component.html',
  styleUrls: ['./recipes-form-ingredients.component.css'],
})
export class RecipesFormIngredientsComponent implements OnInit {
  formRecipe: FormGroup;
  constructor(
    private userService: UserService,
    private dataBaseService: DatabaseService,
    private fb: FormBuilder,
    private recipeListService: RecipeListService,
  ) {
    this.formRecipe = this.fb.group({
      ingredientName: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.min(0.01)]],
      price: ['', [Validators.min(0)]],
    });
  }
  ngOnInit(): void {
    this.recipeName = this.recipeListService.getRecipeName();
    this.recipeDinners = this.recipeListService.getRecipeDinners();
    if(this.recipeListService.getRecipeEdit()) {
      this.recipeIngredients = this.recipeListService.getRecipeIngredients();
    }
    else{
      this.recipeIngredients = [];
    }



  }
  recipeName: string;
  recipeDinners: number;
  settedRecipeName = false;
  showErrorMsg = false;
  recipeIngredients: Ingredient[] = [];


  recipe: Recipe[] = [];

  newIngredient() {
    if (this.formRecipe.valid) {
      let name = this.formRecipe.value.ingredientName;
      let quantity = this.formRecipe.value.quantity;
      let price = this.formRecipe.value.price;

      //Guardamos el ingrediente y lo metemos en el array ingredientes
      if(!price) price = 0;
      const ingredient = new Ingredient(name, quantity, price);

      this.recipeIngredients.push(ingredient);
      console.log(this.recipeIngredients);
      this.formRecipe.reset();
      this.showErrorMsg = false;
    } else {
      this.showErrorMsg = true;
    }
  }

  saveRecipe() {
    if (this.recipeListService.getRecipeEdit()) {
      this.recipeListService.setRecipeEdit(false);
      const editedRecipe = this.recipeListService.getRecipe();
      this.dataBaseService.saveRecipe(editedRecipe).subscribe();
    } else {
      const UID = this.userService.getUID();
      const recipeID = this.dataBaseService.createID(UID, this.recipeName);
      const recipe = new Recipe(
        this.recipeName,
        this.recipeDinners,
        this.recipeIngredients,
        UID,
        recipeID
      );
      this.dataBaseService.saveRecipe(recipe).subscribe();
    }
  }


  deleteIngredient(ingredient: Ingredient) {
    const index = this.recipeIngredients.indexOf(ingredient);
    this.recipeIngredients.splice(index, 1);
  }
}
