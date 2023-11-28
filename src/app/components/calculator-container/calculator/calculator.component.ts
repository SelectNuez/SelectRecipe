import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataDinersService } from '../../../services/data-diners.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {
  formDiner: FormGroup;
  showErrorMsg = false;

  //Inicializamos los servicios que vamos a usar
  constructor(
    private router: Router,
    private dataDiners: DataDinersService,
    private fb: FormBuilder
  ) {
    this.formDiner = this.fb.group({
      originalNumber: ['', [Validators.required, Validators.min(1)]],
      newNumber: ['', [Validators.required, Validators.min(1)]],
      calcPrice: [''],
    });
  }


  setPersonas() {
//Si es valido cargamos los datos y los mandamos al servicio y cambiamos de pagina
    if (this.formDiner.valid) {
      const originalNumber = this.formDiner.value.originalNumber;
      const newNumber = this.formDiner.value.newNumber;
      const calcPrice = this.formDiner.value.calcPrice;

      //Almacenamos los datos en el servicio
      this.dataDiners.originalNumber = originalNumber;
      this.dataDiners.newNumber = newNumber;
      this.dataDiners.calcPrice = calcPrice;

      //Navegamos a la siguiente página
      this.router.navigate(['/calculator-ingredients']);
    }
    //Si no lo es activamos los mensajes de error
    else{
    this.showErrorMsg = true;
    }
  }
}
