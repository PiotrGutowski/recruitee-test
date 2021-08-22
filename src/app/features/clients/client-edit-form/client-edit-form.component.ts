
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { map, switchMap } from 'rxjs/operators';
import { ClientsService } from '../services/clients.service';
import { ClientDetails } from '@core/models/clients';
import { ClientFormService } from '../services/client-form.service';

@Component({
  selector: 'app-client-edit-form',
  templateUrl: './client-edit-form.component.html',
  styleUrls: ['./client-edit-form.component.scss'],
  providers: [ClientFormService]
})
export class ClientEditFormComponent implements OnInit {

  isEditView = true;
  clientForm: FormGroup;
  clientId:  string;
  constructor(
    private clientFormService: ClientFormService,
    private route: ActivatedRoute,
    private clientsService: ClientsService) { }

  ngOnInit(): void {
    this.prepareClientForm();
  }

  private prepareClientForm(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.clientId = params.get('id');
        return this.clientsService.prepareClientDetails(this.clientId);
      }),
      map(client => {
        this.clientForm = this.clientFormService.buildForm(client);
        this.clientForm.patchValue(client);
      })).subscribe();
  }

  addNewTag(): void {
    this.clientFormService.addNewTag();
  }

  saveForm(form: ClientDetails): void {
    this.clientFormService.editForm(form, this.clientId);
  }

  cancel(): void {
    this.clientFormService.cancel();
  }

  removeTag(index: number): void {
    this.clientFormService.removeTag(index);
  }
}
