/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogService } from '@core/services/dialog.service';
import { ClientNewFormComponent } from '../client-new-form/client-new-form.component';
import { ClientEditFormComponent } from '../client-edit-form/client-edit-form.component';

@Injectable({
  providedIn: 'root'
})
export class ClientFormExitGuard implements CanDeactivate<ClientNewFormComponent | ClientEditFormComponent> {

  constructor(private dailogService: DialogService) {}

  canDeactivate(
    component: ClientNewFormComponent | ClientEditFormComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean {

    const dialogSize = '400px';
    const dialogText = 'There are unsaved changes. Do you want to continue without saving?';
    const confirmText = 'Yes';
    const cancelText = 'No';
    if (component.clientForm?.dirty) {
      return this.dailogService.openConfirmationDialog(dialogSize, dialogText, confirmText, cancelText);
    }

    return true;
  }
}
