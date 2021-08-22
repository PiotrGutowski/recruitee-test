import { ClientsState } from './clients.store';
import { ClientDetails, ClientDto } from '@core/models/clients';
import { ClientsStore } from '@store/clients.store';
import { TestBed } from '@angular/core/testing';

describe('ClientsStore', () => {
  let store: ClientsStore;

  const updatedClientDetails: ClientDetails = {
    'avatar': 'http://placehold.it/32x32',
    'name': 'John Rambo',
    'company': 'MIXERS',
    'email': 'schroeder.bryan@mixers.io',
    'phone': '(902) 591-3371',
    'address': '257 Hornell Loop, Driftwood, Nevada, 925',
    'about': 'Aliqua proident eu consequat cillum laborum commodo. Exercitation voluptate sunt est culpa veniam exercitation voluptate incididunt labore amet esse. Duis proident adipisicing voluptate eu aliquip anim aute in consectetur nulla eiusmod consequat. Pariatur duis cillum ea nisi velit proident do nostrud non culpa amet nulla consectetur exercitation. Sit nostrud commodo irure ut voluptate id et irure eu quis. Quis deserunt sit culpa laborum tempor pariatur. Qui et cillum exercitation ut commodo.',
    'createdAt': '1424510706',
    'tags': [
      'sunt',
      'nisi',
      'occaecat',
      'exercitation',
      'ex'
    ]
  };

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ClientsStore]
    });
    store = TestBed.inject(ClientsStore);
  });

  it('should create', () => {
    expect(store).toBeTruthy();
  });

  it('editClient() should update client in store', () => {
    const clientsState: ClientsState = {
      clients: defaultClients
    };
    store.setState(clientsState);
    store.editClient(updatedClientDetails, '5e39278ef970ba42114d6888');
    expect(store.state.clients[1].name).toEqual('John Rambo');
  });
});
