import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Ingredient, Recipe } from 'src/app/recipe.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}

  private recipes: Recipe[] = []; // Agrega una propiedad para almacenar las recetas

  loadRecipes() {
    const UID = this.userService.getUID();
    return this.httpClient
      .get<Record<string, Recipe>>(
        'https://selectrecipedev-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map((data) => {
          if (!data) {
            return [];
          }

          // Filtrar las recetas según el UID del usuario
          this.recipes = Object.keys(data)
            .filter((key) => data[key]?.uID === UID)
            .map((key) => {
              const recipeData = data[key];
              const ingredients = recipeData.ingredients.map((ingredient: any) =>
                new Ingredient(ingredient.name, ingredient.quantity, ingredient.price)
              );
              return new Recipe(
                recipeData.name,
                recipeData.dinners,
                ingredients,
                recipeData.uID
              );
            });

          return this.recipes;
        })
      );
  }
  // loadRecipes() {
  //   const UID = this.userService.getUID();
  //   return this.httpClient
  //     .get<Record<string, Recipe>>(
  //       'https://selectrecipedev-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
  //     )
  //     .pipe(
  //       map((data) => {
  //         if (!data) {
  //           return { recipes: [], recipeKeys: [] };
  //         }

  //         // Filtrar las recetas según el UID del usuario
  //         const recipeKeys = Object.keys(data)
  //           .filter((key) => data[key]?.uID === UID);

  //         this.recipes = recipeKeys.map((key) => {
  //           const recipeData = data[key];
  //           const ingredients = recipeData.ingredients.map((ingredient: any) =>
  //             new Ingredient(ingredient.name, ingredient.quantity, ingredient.price)
  //           );
  //           return new Recipe(
  //             recipeData.name,
  //             recipeData.dinners,
  //             ingredients,
  //             recipeData.uID,
  //           // Agrega el nombre del nodo como propiedad de la receta
  //           );
  //         });

  //         return { recipes: this.recipes, recipeKeys };
  //       })
  //     );
  // }

  getRecipeByName(name: string): Recipe | undefined {
    // Buscar la receta por nombre en las recetas cargadas
    return this.recipes.find((recipe) => recipe.name === name);
  }

  saveRecipe(recipe: Recipe) {
    // const token = this.userService.getToken();
    return this.httpClient.post(
      'https://selectrecipedev-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      recipe
    );
  }
  deleteRecipe(recipe: Recipe) {

  }
}
