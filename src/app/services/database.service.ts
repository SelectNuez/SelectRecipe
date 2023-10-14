import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Recipe } from 'src/app/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}

  loadRecipes() {
    const token = this.userService.getToken();
    return this.httpClient.get(
      'https://selectrecipedev-default-rtdb.europe-west1.firebasedatabase.app/recipes.json' +
        token
    );
  }

  saveRecipe(recipe: Recipe) {
    const token = this.userService.getToken();
    return this.httpClient.post(
      'https://selectrecipedev-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      recipe
    );
  }
}
