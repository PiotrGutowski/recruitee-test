import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialogData } from '@core/models/dialog-types';

@Component({
  selector: 'the-shared-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  hasOnlyConfirmButton = true;

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData) { }

  ngOnInit(): void {
    if (this.data.cancelButtonText) {
      this.hasOnlyConfirmButton = false;
    }
  }

  onCloseConfirm(): void {
    this.dialogRef.close(true);
  }

  onCloseCancel(): void {
    this.dialogRef.close(false);
  }

}
