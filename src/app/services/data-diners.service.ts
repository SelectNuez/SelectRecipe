import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DataDinersService {

  constructor() { }

  originalNumber: number;

  newNumber: number;

  calcPrice: boolean;

  recipe: any[];
}
