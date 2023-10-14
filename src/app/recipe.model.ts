export class Recipe {
  constructor(
    name: string,
    description: string,
    ingredients: Ingredient[],
    uID: string
  ) {
    this.name = name;
    this.description = description;
    this.ingredients = ingredients;
    this.uID = uID;

  }

  name: string = '';
  description: string = '';
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
