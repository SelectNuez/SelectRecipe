import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipeListService implements OnInit{

  recipeName: string;

  constructor() { }
  ngOnInit(): void {

  }

  setRecipeName(recipeName: string){
    this.recipeName = recipeName;
  }

  getRecipeName(){
    return this.recipeName;
  }


}
