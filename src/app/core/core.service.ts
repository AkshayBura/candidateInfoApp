import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private _snackBar: MatSnackBar, private dialog: MatDialog) { }

  openConfirmationDialog(): Promise<boolean> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    return firstValueFrom(dialogRef.afterClosed());
  }

  openSnackBar(message: any, action: string = 'OK') {
    let actionColor = {}
    if (action === 'Success') {
      actionColor = {color: 'green'};
    }

    this._snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: ['custom-class'],
      ...actionColor
    });
  }
}
