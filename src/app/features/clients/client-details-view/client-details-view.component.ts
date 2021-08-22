import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientDetails } from '@core/models/clients';

@Component({
  selector: 'app-client-details-view',
  templateUrl: './client-details-view.component.html',
  styleUrls: ['./client-details-view.component.scss']
})
export class ClientDetailsViewComponent {

  @Input() clientDetails$: Observable<ClientDetails>

  originalOrder = (): number => {
    return 0;
  }

}
