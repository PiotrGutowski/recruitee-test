import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ClientDto } from '../models/clients';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {

  constructor(private httpClient: HttpClient) { }

  getClients(): Observable<ClientDto[]> {
    return this.httpClient.get<ClientDto[]>('assets/data.json');
  }
}
