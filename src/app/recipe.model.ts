export class Recipe {
  constructor(
    name: string,
    dinners: number,
    ingredients: Ingredient[],
    uID: string,
  ) {
    this.name = name;
    this.dinners = dinners;
    this.ingredients = ingredients;
    this.uID = uID;
  }

  name: string;
  dinners: number;
  ingredients: Ingredient[];
  uID: string;
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
