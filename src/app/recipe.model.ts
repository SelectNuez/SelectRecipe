export class Recipe {
  constructor(
    name: string,
    dinners: number,
    ingredients: Ingredient[],
    uID: string,
    recipeID: string
  ) {
    this.name = name;
    this.dinners = dinners;
    this.ingredients = ingredients;
    this.uID = uID;
    this.recipeID = recipeID;
  }

  name: string;
  dinners: number;
  ingredients: Ingredient[];
  uID: string;
  recipeID: string;
}
export class Ingredient {
  constructor(
    name: string,
    quantity: number,
    price: number
  ) {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
  }

  name: string;
  quantity: number;
  price: number;
}
