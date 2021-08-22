import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ClientDetails } from '@core/models/clients';
import { ClientsService } from './../services/clients.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  constructor(
    private clientsService: ClientsService,
    private route: ActivatedRoute) { }

  clientDetails$: Observable<ClientDetails>

  ngOnInit(): void {
    this.clientDetails$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        return this.clientsService.prepareClientDetails(id);
      }));
  }

}
