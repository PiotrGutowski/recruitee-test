import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ClientsStore } from '@store/clients.store';
import { ClientsService } from '../services/clients.service';
import { DialogService } from '@core/services/dialog.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();
  clientsData$ = this.clientsService.prepareClientsHitList();
  constructor(
    private clientsService: ClientsService,
    private clientsStore: ClientsStore,
    private dialogService: DialogService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getClients();
  }

  navigateToClientDetails(id: string): void {
    this.router.navigate(['/clients', id]);
  }

  editClient(id: string): void {
    this.router.navigate(['/clients/edit/form', id]);
  }

  addNewClient(): void {
    this.router.navigate(['/clients/new/form']);
  }

  deleteClient(id: string): void {
    const dialogSize = '400px';
    const dialogText = 'Do you want to delete selected client?';
    const confirmText = 'Yes';
    const cancelText = 'No';
    this.dialogService.openConfirmationDialog(dialogSize, dialogText, confirmText, cancelText).pipe(
      take(1),
      map(dialogResponse => {
        const closeDialog = dialogResponse;
        if (closeDialog === true) {
          this.clientsStore.deleteClient(id);
        }
      })
    ).subscribe();
  }

  private getClients(): void {
    const clients = this.clientsStore.state.clients;
    if (clients.length === 0) {
      this.clientsService.getClients().pipe(
        takeUntil(this.unsubscribe$),
        map(data => this.clientsService.updateClientsStore(data))).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
