import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { ClientDto } from '@core/models/clients';

@Injectable({
  providedIn: 'root'
})
export class ClientFormValidatorsService {

  uniqueName(clients: ClientDto[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let result = true;
      if (control.value !== undefined) {
        result = clients.every(n => n.company.toUpperCase() !== control.value.toUpperCase());
      }
      if (result === false) {
        return { notUnique: true };
      }
      return null;
    };
  }
}



