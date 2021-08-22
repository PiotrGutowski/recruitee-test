import { ClientDetails, ClientHitList } from '@core/models/clients';
import { ClientDto } from '@core/models/clients';
import { ClientsState, ClientsStore } from '@store/clients.store';
import { DataAccessService } from '@core/data-access/data-access.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ClientsService } from './clients.service';
import { of } from 'rxjs';

describe('ClientsService', () => {
  let service: ClientsService;
  let dataAccessService: DataAccessService;
  let clientsStore: ClientsStore;

  const clientDetails: ClientDetails = {
    'avatar': 'http://placehold.it/32x32',
    'name': 'Schroeder Bryan',
    'company': 'MIXERS',
    'email': 'schroeder.bryan@mixers.io',
    'phone': '(902) 591-3371',
    'address': '257 Hornell Loop, Driftwood, Nevada, 925',
    'about': 'Aliqua proident eu consequat cillum laborum commodo. Exercitation voluptate sunt est culpa veniam exercitation voluptate incididunt labore amet esse. Duis proident adipisicing voluptate eu aliquip anim aute in consectetur nulla eiusmod consequat. Pariatur duis cillum ea nisi velit proident do nostrud non culpa amet nulla consectetur exercitation. Sit nostrud commodo irure ut voluptate id et irure eu quis. Quis deserunt sit culpa laborum tempor pariatur. Qui et cillum exercitation ut commodo.',
    'createdAt': '17.01.1970',
    'tags': [
      'sunt',
      'nisi',
      'occaecat',
      'exercitation',
      'ex'
    ]
  };

  const expectedClientsHitList: ClientHitList[] = [
    {
      'id': '5e39278ecc8cdd6643e9fb63',
      'avatarUrl': 'http://placehold.it/32x32',
      'name': 'Schroeder Bryan',
      'company': 'MIXERS',
    },
    {
      'id': '5e39278ef970ba42114d6888',
      'avatarUrl': 'http://placehold.it/32x32',
      'name': 'Rojas Brock',
      'company': 'VIOCULAR',
    }];

  const expectedClients: ClientDto[] = [
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

  const clientsState: ClientsState = {
    clients: expectedClients
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClientsService, DataAccessService, ClientsStore]
    });
    service = TestBed.inject(ClientsService);
    dataAccessService = TestBed.inject(DataAccessService);
    clientsStore = TestBed.inject(ClientsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getClients() should call dataAccessService.getClients()', done => {
    const getClientsSpy = spyOn(dataAccessService, 'getClients').and.returnValue(of(expectedClients));
    service.getClients().subscribe(() => {
      expect(getClientsSpy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('getClients() should get clients data', (done) => {
    spyOn(dataAccessService, 'getClients').and.returnValue(of(expectedClients));
    service.getClients().subscribe(clients => {
      expect(clients).toEqual(expectedClients);
      done();
    });
  });

  it('clientsData$() should get clients from store', () => {
    clientsStore.setState(clientsState);
    service.clientsData$.subscribe(data => {
      expect(data.length).toEqual(2);
    });
  });

  it('updateClientsStore() should update clients store', () => {
    service.updateClientsStore(expectedClients);
    service.clientsData$.subscribe(data => {
      expect(data.length).toEqual(2);
    });
  });

  it('prepareClientDetails() should prepare client details data', done => {
    service.updateClientsStore(expectedClients);
    service.prepareClientDetails('5e39278ecc8cdd6643e9fb63').subscribe(data => {
      expect(data).toEqual(clientDetails);
      done();
    });
  });

  it('prepareClientDetails() if store is empty should call getClients()', done => {
    const getClientsSpy = spyOn(dataAccessService, 'getClients').and.returnValue(of(expectedClients));
    service.prepareClientDetails('5e39278ecc8cdd6643e9fb63').subscribe(() => {
      expect(getClientsSpy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('prepareClientsHitList() should prepare client hitlist data', done => {
    service.updateClientsStore(expectedClients);
    service.prepareClientsHitList().subscribe(data => {
      expect(data).toEqual(expectedClientsHitList);
      done();
    });
  });
});
