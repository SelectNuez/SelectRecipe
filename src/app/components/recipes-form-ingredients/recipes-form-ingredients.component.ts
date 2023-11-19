import { Component,ChangeDetectorRef, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ingredient, Recipe } from 'src/app/recipe.model';
import { DatabaseService } from 'src/app/services/database.service';
import { RecipeListService } from 'src/app/services/recipe-list.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recipes-form-ingredients',
  templateUrl: './recipes-form-ingredients.component.html',
  styleUrls: ['./recipes-form-ingredients.component.css']
})
export class RecipesFormIngredientsComponent implements OnInit{
  constructor(
    private userService: UserService,
    private dataBaseService: DatabaseService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private recipeListService: RecipeListService,
    private router: Router,
  ) {
    this.formRecipeName = this.fb.group({
      recipeName: ['', [Validators.required]],
    });

    this.formRecipe = this.fb.group({
      ingredientName: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: [],
    });
  }
  ngOnInit(): void {
    this.recipeName = this.recipeListService.getRecipeName();
    this.recipeDinners = this.recipeListService.getRecipeDinners();
  }
  recipeName: string;
  recipeDinners: number;
  formRecipeName: FormGroup;
  formRecipe: FormGroup;
  settedRecipeName= false;
  showErrorMsg = false;
  recipeIngredients: Ingredient[] = [];



  setRecipeName() {
    if (this.formRecipeName.valid) {
      this.recipeName = this.formRecipeName.value.recipeName;
      this.settedRecipeName = true;
      this.cdr.detectChanges();
    } else {
      this.showErrorMsg = true;
    }
  }
  recipe: Recipe[] = [];

  newIngredient() {
    if (this.formRecipe.valid) {
      const name = this.formRecipe.value.ingredientName;
      const quantity = this.formRecipe.value.quantity;
      const price = this.formRecipe.value.price;

      //Guardamos el ingrediente y lo metemos en el array ingredientes
      const ingredient = new Ingredient(name, quantity, price);

      this.recipeIngredients.push(ingredient);
      console.log(this.recipeIngredients);
      this.formRecipe.reset();
    } else {
      this.showErrorMsg = true;
    }
  }

  saveRecipe() {
    const UID = this.userService.getUID();
    const recipe = new Recipe(
      this.recipeName,
      this.recipeDinners,
      this.recipeIngredients,
      UID,

    );
    this.dataBaseService.saveRecipe(recipe).subscribe();
    this.router.navigate(['/recipes']);

  }
}
