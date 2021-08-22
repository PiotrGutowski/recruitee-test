import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from '@shared/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  openConfirmationDialog(dialogWidth: string, message: string, confirmButtonText: string,
    cancelButtonText?: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: dialogWidth,
      data: { text: message, confirmButtonText, cancelButtonText }
    });
    return dialogRef.afterClosed();
  }
}
