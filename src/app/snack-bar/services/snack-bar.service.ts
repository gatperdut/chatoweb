import { Injectable, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService implements OnInit {

  constructor(
    private matSnackBar: MatSnackBar
  ) {

  }

  ngOnInit(

  ) {

  }

  public ok(message: string): void {
    this.matSnackBar.open(
      message,
      null,
      {
        duration: 2000
      }
    );
  }

  public bad(message: string, errors: { [key: string]: string }): void {
    const matSnackBarRef: MatSnackBarRef<SnackBarComponent> = this.matSnackBar.openFromComponent(
      SnackBarComponent,
      {
        panelClass: ['snack-bar-bad'],
        data: {
          message: message,
          errors: errors
        }
      }
    );
  }

}
