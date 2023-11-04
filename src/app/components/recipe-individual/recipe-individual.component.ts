import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/recipe.model'; // Asegúrate de importar tu modelo Recipe aquí
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-recipe-individual',
  templateUrl: './recipe-individual.component.html',
  styleUrls: ['./recipe-individual.component.css'],
})
export class RecipeIndividualComponent implements OnInit {
  recipeName: string;
  recipe: Recipe; // Declarar una propiedad para almacenar la receta

  constructor(
    private route: ActivatedRoute,
    private databaseService: DatabaseService // Reemplaza RecipeService con el servicio que obtiene las recetas
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.recipeName = params.get('name');
      // Obtener la receta correspondiente utilizando el servicio
      this.recipe = this.databaseService.getRecipeByName(this.recipeName);
    });
  }
}
