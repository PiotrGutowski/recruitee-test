import { ClientDto } from '@core/models/clients';
import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';

import { ClientFormValidatorsService } from './client-form-validators.service';

describe('ClientFormValidatorsService', () => {
  let service: ClientFormValidatorsService;

  const defaultClients: ClientDto[] = [
    {
      'id': '5e39278ecc8cdd6643e9fb63',
      'avatarUrl': 'http://placehold.it/32x32',
      'name': 'Schroeder Bryan',
      'company': 'MIXERS',
      'email': 'schroeder.bryan@mixers.io',
      'phone': '(902) 591-3371',
      'address': '257 Hornell Loop, Driftwood, Nevada, 925',
      'about': 'Aliqua proident eu consequat cillum laborum commodo. Exercitation voluptate sunt est culpa veniam exercitation voluptate incididunt labore amet esse. Duis proident adipisicing voluptate eu aliquip anim aute in consectetur nulla eiusmod consequat. Pariatur duis cillum ea nisi velit proident do nostrud non culpa amet nulla consectetur exercitation. Sit nostrud commodo irure ut voluptate id et irure eu quis. Quis deserunt sit culpa laborum tempor pariatur. Qui et cillum exercitation ut commodo.',
      'createdAt': 1424510706,
      'tags': [
        'sunt',
        'nisi',
        'occaecat',
        'exercitation',
        'ex'
      ]
    },
    {
      'id': '5e39278ef970ba42114d6888',
      'avatarUrl': 'http://placehold.it/32x32',
      'name': 'Rojas Brock',
      'company': 'VIOCULAR',
      'email': 'rojas.brock@viocular.com',
      'phone': '(927) 536-3645',
      'address': '594 Poplar Street, Templeton, Kansas, 7946',
      'about': 'Commodo reprehenderit sit proident excepteur in eiusmod voluptate sint adipisicing ea irure deserunt culpa. Ipsum incididunt laborum consequat incididunt do laborum aute ut. Ut laborum amet labore occaecat do ea reprehenderit dolor culpa duis exercitation veniam dolor.',
      'createdAt': 1497632860,
      'tags': [
        'eu',
        'pariatur',
        'incididunt',
        'ad',
        'adipisicing'
      ],
    }];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientFormValidatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('uniqueName validator should return null if name is unique', () => {
    const control = new FormControl('input');
    const uniqueNameValidator = service.uniqueName(defaultClients);
    control.setValue('test');
    expect(uniqueNameValidator(control)).toBeNull();

  });

  it('uniqueName validator should return true if name is not unique', () => {
    const control = new FormControl('input');
    const uniqueNameValidator = service.uniqueName(defaultClients);
    control.setValue('VIOCULAR');
    expect(uniqueNameValidator(control)).toEqual({ notUnique: true });

  });

  it('uniqueName validator should return null if input is undefined', () => {
    const control = new FormControl('input');
    const uniqueNameValidator = service.uniqueName(defaultClients);
    control.setValue(undefined);
    expect(uniqueNameValidator(control)).toBeNull();
  });
});
