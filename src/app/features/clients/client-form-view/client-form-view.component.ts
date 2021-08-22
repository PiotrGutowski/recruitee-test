import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { ClientDetails } from '@core/models/clients';

@Component({
  selector: 'app-client-form-view',
  templateUrl: './client-form-view.component.html',
  styleUrls: ['./client-form-view.component.scss']
})
export class ClientFormViewComponent implements OnInit {

  @Input() clientForm: FormGroup;
  @Output() saveForm: EventEmitter<ClientDetails> = new EventEmitter<ClientDetails>();
  @Output() cancelForm: EventEmitter<void> = new EventEmitter<void>();
  @Output() addNewTag: EventEmitter<void> = new EventEmitter<void>();
  @Output() removeTag: EventEmitter<number> = new EventEmitter<number>();
  tags: FormArray = null

  ngOnInit(): void {
    this.tags = this.clientForm.get('tags') as FormArray;
  }

  save(): void {
    this.saveForm.emit(this.clientForm.value);
  }

  cancel(): void {
    this.cancelForm.emit();
  }

  addTag(): void {
    this.addNewTag.emit();
  }

  removeSelectedTag(index: number): void {
    this.removeTag.emit(index);
  }

  get form(): {
    [key: string]: AbstractControl
  } { return this.clientForm.controls; }

}
