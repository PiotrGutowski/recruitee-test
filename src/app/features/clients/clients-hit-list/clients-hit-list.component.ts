import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ClientHitList } from '@core/models/clients';

@Component({
  selector: 'app-clients-hit-list',
  templateUrl: './clients-hit-list.component.html',
  styleUrls: ['./clients-hit-list.component.scss']
})
export class ClientsHitListComponent implements OnInit, AfterViewInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();
  @Input() clientsData$: Observable<ClientHitList[]>;
  @Output() navigateToClientDetails: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteClient: EventEmitter<string> = new EventEmitter<string>();
  @Output() editClient: EventEmitter<string> = new EventEmitter<string>();
  @Output() addNewClient: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['avatar', 'name', 'company', 'options'];
  clients = new MatTableDataSource<ClientHitList>()

  ngOnInit(): void {
    this.clientsData$.pipe(takeUntil(this.unsubscribe$)
    ).subscribe(data => this.clients.data = data);
  }

  ngAfterViewInit(): void {
    this.clients.paginator = this.paginator;
    this.clients.sort = this.sort;
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.clients.filter = filterValue;
  }

  goToClientDetails(id: string): void {
    this.navigateToClientDetails.emit(id);
  }

  goToDeleteClient(id: string): void {
    this.deleteClient.emit(id);
  }

  goToEditClient(id: string): void {
    this.editClient.emit(id);
  }

  eventTarget(event: KeyboardEvent): HTMLInputElement {
    if (!(event.target instanceof HTMLInputElement)) {
      throw new Error('');
    }
    return event.target;
  }

  addClient(): void {
    this.addNewClient.emit();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
