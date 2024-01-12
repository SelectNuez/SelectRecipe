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
  }

  //formRecipeName: FormGroup;
  formRecipe: FormGroup;
  settedRecipeName= false;
  showErrorMsg = false;
  recipeName: string;
  recipeDinners: number;
  recipeIngredients: Ingredient[] = [];


  setRecipeData(){
    if(this.formRecipe.valid){
      this.setRecipeName();
      this.setRecipeDinners();
      this.recipeListService.setRecipeEdit(false);
      this.router.navigate(['/recipes-form-ingredients']);
    }
    else{
      this.showErrorMsg = true;
    }
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

}
