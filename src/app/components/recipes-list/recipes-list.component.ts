import { Component } from '@angular/core';
import { Recipe } from 'src/app/recipe.model';
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
    this.dataBaseService.loadRecipes().subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
    console.log(this.recipes);
  }


}
