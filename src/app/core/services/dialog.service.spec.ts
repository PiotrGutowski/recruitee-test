import { ConfirmationDialogComponent } from '@shared/confirmation-dialog/confirmation-dialog.component';
import { TestBed } from '@angular/core/testing';
import { DialogService } from './dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of({ action: true })
    };
  }
}

describe('DialogService', () => {
  let service: DialogService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogService,
        { provide: MatDialog, useClass: MatDialogMock }, MatDialogMock]
    }).compileComponents();

    service = TestBed.inject(DialogService);
  });

  it('DialogService should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call function open() with specific parameter and call function afterClose()', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}) });
    const dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
    const dialogWidth = '400px';
    const message = 'There are unsaved changes. Do you want to continue without saving?';
    const confirmButtonText = 'confirmButtonText';
    const cancelButtonText = 'cancelButtonText';

    service.openConfirmationDialog(dialogWidth, message, confirmButtonText, cancelButtonText);

    expect(dialogSpy).toHaveBeenCalledTimes(1);
    expect(dialogSpy).toHaveBeenCalledWith(ConfirmationDialogComponent, {
      width: dialogWidth,
      data: { text: message, confirmButtonText: 'confirmButtonText', cancelButtonText: 'cancelButtonText' }
    });
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalledTimes(1);
  });
});
