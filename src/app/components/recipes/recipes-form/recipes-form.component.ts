import { Component,ChangeDetectorRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ingredient } from 'src/app/recipe.model';
import { RecipeListService } from 'src/app/services/recipe-list.service';


@Component({
  selector: 'app-recipes-form',
  templateUrl: './recipes-form.component.html',
  styleUrls: ['./recipes-form.component.css'],
})
export class RecipesFormComponent {
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private recipeListService: RecipeListService,
  ) {
    this.formRecipe = this.fb.group({
      recipeName: ['', [Validators.required]],
      recipeDinners: ['', [Validators.required, Validators.min(1)]],
    });

    // this.formRecipe = this.fb.group({
    //   ingredientName: ['', [Validators.required]],
    //   quantity: ['', [Validators.required, Validators.min(1)]],
    //   price: [],
    // });
  }

  //formRecipeName: FormGroup;
  formRecipe: FormGroup;
  settedRecipeName= false;
  showErrorMsg = false;
  recipeName: string;
  recipeDinners: number;
  recipeIngredients: Ingredient[] = [];


  setRecipeData(){
    this.setRecipeName();
    this.setRecipeDinners();
    this.router.navigate(['/recipes-form-ingredients']);
  }

  setRecipeName() {
    if (this.formRecipe.valid) {
      this.recipeName = this.formRecipe.value.recipeName;
      //this.settedRecipeName = true;
      //this.cdr.detectChanges();
      this.recipeListService.setRecipeName(this.recipeName);
    }
     //else {
      //this.showErrorMsg = true;
    //}
  }

  setRecipeDinners() {
    if(this.formRecipe.valid){
      this.recipeDinners = this.formRecipe.value.recipeDinners;
      this.recipeListService.setRecipeDinners(this.recipeDinners);
    }
  }
  // recipe: Recipe[] = [];

  // newIngredient() {
  //   console.log(this.formRecipe.valid);
  //   if (this.formRecipe.valid) {
  //     const name = this.formRecipe.value.ingredientName;
  //     const quantity = this.formRecipe.value.quantity;
  //     const price = this.formRecipe.value.price;

  //     //Guardamos el ingrediente y lo metemos en el array ingredientes
  //     const ingredient = new Ingredient(name, quantity, price);
  //     console.log(this.recipeIngredients)

  //     this.recipeIngredients.push(ingredient);
  //     console.log(this.recipeIngredients)

  //   } else {
  //     this.showErrorMsg = true;
  //   }
  // }

  // saveRecipe() {
  //   const token = this.userService.getToken();
  //   const recipe = new Recipe(
  //     this.recipeName,
  //     // [
  //     //   new Ingredient('Harina', '300g', 2),
  //     //   new Ingredient('Azúcar', '150g', 1.5),
  //     //   new Ingredient('Chocolate en polvo', '50g', 3),
  //     //   new Ingredient('Huevos', '3 unidades', 0.5),
  //     // ],
  //     this.recipeIngredients,
  //     token
  //   );
  //   this.dataBaseService.saveRecipe(recipe).subscribe();
  // }
}
