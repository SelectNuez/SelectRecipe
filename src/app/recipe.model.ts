export class Recipe {
  constructor(
    name: string,
    ingredients: Ingredient[],
    uID: string
  ) {
    this.name = name;
    this.ingredients = ingredients;
    this.uID = uID;

  }

  name: string = '';
  ingredients: Ingredient[] = [];
  uID: string = '';
}
export class Ingredient {
  constructor(
    name: string,
    quantity: string,
    price: number
  ) {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
  }

  name: string = '';
  quantity: string = '';
  price: number = 0;
}
