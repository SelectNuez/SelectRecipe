import { Component } from '@angular/core';
import { Ingredient, Recipe } from 'src/app/recipe.model';
import { DatabaseService } from 'src/app/services/database.service';
import { RecipeListService } from 'src/app/services/recipe-list.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent {
  constructor(
    private dataBaseService: DatabaseService,
    private recipeListService: RecipeListService,
    private userService: UserService
  ) {}

  recipes: Recipe[] = [];
  recipeName: string;

  ngOnInit(): void {
    this.dataBaseService.loadRecipes().subscribe((data: any) => {
      // Transforma los datos en objetos Recipe y asigna a la variable recipes
      this.recipes = Object.keys(data).map((key) => {
        const recipeData = data[key];
        const ingredients = recipeData.ingredients.map(
          (ingredient: any) =>
            new Ingredient(
              ingredient.name,
              ingredient.quantity,
              ingredient.price
            )
        );
        return new Recipe(
          recipeData.name,
          recipeData.dinners,
          ingredients,
          recipeData.uID
        );
      });
    });
  }
}
