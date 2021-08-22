import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientNewFormComponent } from './client-new-form/client-new-form.component';
import { ClientFormExitGuard } from './guards/client-form-exit.guard';
import { ClientEditFormComponent } from './client-edit-form/client-edit-form.component';

const routes: Routes = [
  { path: '', component: ClientsComponent },
  { path: ':id', component: ClientDetailsComponent },
  { path: 'new/form', component: ClientNewFormComponent, canDeactivate: [ClientFormExitGuard] },
  { path: 'edit/form/:id', component: ClientEditFormComponent, canDeactivate: [ClientFormExitGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
