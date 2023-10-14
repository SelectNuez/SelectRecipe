import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Ingredient, Recipe } from 'src/app/recipe.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  user: any;
  constructor(private userService: UserService,private dataBaseService: DatabaseService) {}
  ngOnInit(): void {
    this.user = this.userService.user$;
  }

  recipe: Recipe[] = [];

  logout() {
    this.userService.logout().catch((error) => console.log(error));
  }
  test() {
    const token = this.userService.getToken();
    const recipe1 = new Recipe(
      'Bizcocho de Chocolate',
      'Delicioso bizcocho de chocolate',
      [
        new Ingredient('Harina', '300g', 2),
        new Ingredient('Azúcar', '150g', 1.5),
        new Ingredient('Chocolate en polvo', '50g', 3),
        new Ingredient('Huevos', '3 unidades', 0.5),
      ],
      token
    );

    const recipe2 = new Recipe(
      'Ensalada César',
      'Una clásica ensalada César',
      [
        new Ingredient('Lechuga Romana', '1 cabeza', 1),
        new Ingredient('Pechuga de Pollo', '200g', 4),
        new Ingredient('Crutones', '50g', 2),
        new Ingredient('Salsa César', '50ml', 3),
      ],
      token
    );

    const recipe3 = new Recipe(
      'Pizza Margherita',
      'Pizza Margherita tradicional italiana',
      [
        new Ingredient('Masa para pizza', '1 unidad', 2),
        new Ingredient('Tomate', '3 unidades', 2),
        new Ingredient('Mozzarella', '100g', 3),
        new Ingredient('Albahaca', '1 ramo', 1),
      ],
      token
    );

    const recipe4 = new Recipe(
      'Sopa de Tomate',
      'Sopa de tomate casera',
      [
        new Ingredient('Tomates maduros', '500g', 1),
        new Ingredient('Cebolla', '1 unidad', 0.5),
        new Ingredient('Ajo', '2 dientes', 0.2),
        new Ingredient('Caldo de pollo', '1 litro', 2),
      ],
      token
    );
    this.dataBaseService.saveRecipe(recipe3).subscribe();
  }
}
