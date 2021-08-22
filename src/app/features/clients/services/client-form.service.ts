import { Injectable } from '@angular/core';
import { ClientDetails } from '@core/models/clients';
import { ClientsStore } from '@store/clients.store';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ClientFormValidatorsService } from '@core/validators/client-form-validators.service';

@Injectable()
export class ClientFormService {

  clientDetails$: Observable<ClientDetails>
  clientForm: FormGroup
  constructor(
    private router: Router,
    private clientsStore: ClientsStore,
    private clientFormValidatorsService: ClientFormValidatorsService,
    private formBuilder: FormBuilder) { }

  buildForm(client: ClientDetails = null): FormGroup {
    const tags = client ? client.tags : [];
    this.clientForm = this.formBuilder.group({
      avatar: [''],
      name: ['', Validators.required],
      company: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: [''],
      about: [''],
      tags: this.formBuilder.array(tags)
    });
    if (!client) {
      this.clientForm.controls.company.setValidators(this.clientFormValidatorsService.uniqueName(this.clientsStore.state.clients));
    }
    return this.clientForm;
  }

  addNewTag(): void {
    const tags = this.clientForm.controls.tags as FormArray;
    tags.push(new FormControl());
    this.clientForm.controls.tags = tags;
  }

  removeTag(index: number): void {
    const tags = this.clientForm.controls.tags as FormArray;
    tags.removeAt(index);
  }

  saveForm(form: ClientDetails): void {
    this.clientForm.markAsPristine();
    this.clientsStore.addClient(form);
    this.router.navigate(['clients']);
  }

  editForm(form: ClientDetails, clientId: string): void {
    this.clientForm.markAsPristine();
    this.clientsStore.editClient(form, clientId);
    this.router.navigate(['clients']);
  }

  cancel(): void {
    this.router.navigate(['clients']);
  }
}
