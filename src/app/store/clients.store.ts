import { Injectable } from '@angular/core';
import { ClientDetails, ClientDto } from '@core/models/clients';
import { Store } from './store';

export class ClientsState {
  readonly clients: ClientDto[] = [];
}

@Injectable({
  providedIn: 'root'
})
export class ClientsStore extends Store<ClientsState> {

  constructor() { super(new ClientsState()); }

  addClient(client: ClientDetails): void {
    const currentClients = this.state.clients;
    const clientDto = this.prepareClientData(client);
    currentClients.push(clientDto);
    const newState = {
      clients: [...currentClients]
    };
    this.setState(newState);
  }

  editClient(client: ClientDetails, clientId: string): void {
    const currentClients = this.state.clients;
    const selectedClient = currentClients.find(client => client.id === clientId);
    const clientDto = this.prepareClientData(client, selectedClient);
    const foundIndex = currentClients.findIndex(client => client.id == clientId);
    currentClients[foundIndex] = clientDto;
    const newState = {
      clients: [...currentClients]
    };
    this.setState(newState);
  }

  deleteClient(clientId: string): void {
    const currentClients = this.state.clients;
    currentClients.splice(currentClients.findIndex(client => client.id == clientId), 1);
    const newState = {
      clients: [...currentClients]
    };
    this.setState(newState);
  }

  private prepareClientData(client: ClientDetails, selectedClient: ClientDto = null): ClientDto {
    const clientDto: ClientDto = {
      id: selectedClient ? selectedClient.id : Date.now().toString(),
      avatarUrl: client.avatar,
      name: client.name,
      company: client.company,
      email: client.email,
      phone: client.phone,
      address: client.address,
      about: client.about,
      createdAt: selectedClient ? selectedClient.createdAt : Date.now(),
      tags: client.tags
    };
    return clientDto;
  }

}

