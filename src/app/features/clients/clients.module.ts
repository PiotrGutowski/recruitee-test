import { TitleCasePipe } from '@core/pipes/title-case.pipe';
import { MaterialModule } from '@core/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients/clients.component';
import { ClientsHitListComponent } from './clients-hit-list/clients-hit-list.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientDetailsViewComponent } from './client-details-view/client-details-view.component';
import { ClientNewFormComponent } from './client-new-form/client-new-form.component';
import { ClientFormViewComponent } from './client-form-view/client-form-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientEditFormComponent } from './client-edit-form/client-edit-form.component';


@NgModule({
  declarations: [
    ClientsComponent,
    ClientsHitListComponent,
    ClientDetailsComponent,
    ClientDetailsViewComponent,
    TitleCasePipe,
    ClientNewFormComponent,
    ClientEditFormComponent,
    ClientFormViewComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ClientsModule { }
