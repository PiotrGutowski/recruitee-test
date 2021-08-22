import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { ClientsStore } from '@store/clients.store';
import { ClientDetails, ClientDto, ClientHitList } from '@core/models/clients';
import { DataAccessService } from '@core/data-access/data-access.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {

  constructor(
    private dataAccessService: DataAccessService,
    private clientsStore: ClientsStore) { }

  getClients(): Observable<ClientDto[]> {
    return this.dataAccessService.getClients();
  }

  updateClientsStore(clients: ClientDto[]): void {
    this.clientsStore.setPartialState<ClientDto[]>('clients', clients);
  }

  get clientsData$(): Observable<ClientDto[]> {
    return this.clientsStore.getPartialState<ClientDto[]>(['clients']);
  }

  private createClientDetailsModel(clientDto: ClientDto): ClientDetails {
    const pipe = new DatePipe('en-US');
    const clientDetails: ClientDetails = {
      avatar: clientDto.avatarUrl,
      name: clientDto.name,
      company: clientDto.company,
      email: clientDto.email,
      phone: clientDto.phone,
      address: clientDto.address,
      about: clientDto.about,
      createdAt: pipe.transform(clientDto.createdAt, 'dd.MM.y'),
      tags: clientDto.tags
    };
    return clientDetails;
  }

  private createClientHitListModel(clientsDto: ClientDto[]): ClientHitList[] {
    const clientHitList: ClientHitList[] = [];
    for (const clientDto of clientsDto) {
      const client: ClientHitList = {
        id: clientDto.id,
        avatarUrl: clientDto.avatarUrl,
        name: clientDto.name,
        company: clientDto.company,
      };
      clientHitList.push(client);
    }
    return clientHitList;
  }

  prepareClientDetails(id: string): Observable<ClientDetails> {
    return this.clientsData$.pipe(
      concatMap(clients => {
        if (clients.length > 0) {
          return of(clients);
        } else {
          return this.getClients();
        }
      }),
      map(clients => clients.find(client => client.id === id)),
      map(client => this.createClientDetailsModel(client)));
  }

  prepareClientsHitList(): Observable<ClientHitList[]> {
    return this.clientsData$.pipe(map(client => this.createClientHitListModel(client)));
  }

}
