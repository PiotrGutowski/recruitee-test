import { Component, OnInit } from '@angular/core';
import { ClientFormService } from './../services/client-form.service';
import { FormGroup } from '@angular/forms';
import { ClientDetails } from '@core/models/clients';

@Component({
  selector: 'app-client-new-form',
  templateUrl: './client-new-form.component.html',
  styleUrls: ['./client-new-form.component.scss'],
  providers: [ClientFormService]
})
export class ClientNewFormComponent implements OnInit {

  clientForm: FormGroup
  constructor(
    private clientFormService: ClientFormService) { }

  ngOnInit(): void {
   this.clientForm =  this.clientFormService.buildForm();
  }

  addNewTag(): void {
    this.clientFormService.addNewTag();
  }

  saveForm(form: ClientDetails): void {
    this.clientFormService.saveForm(form);
  }

  cancel(): void {
    this.clientFormService.cancel();
  }

  removeTag(index: number): void {
    this.clientFormService.removeTag(index);
  }
}
