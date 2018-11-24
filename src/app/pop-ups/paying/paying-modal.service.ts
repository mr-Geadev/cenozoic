import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { PayingComponent } from 'pop-ups/paying/paying.component';

@Injectable()
export class PayingModalService {

  constructor(private dialog: MatDialog) {
  }

  public openBuyModal(type: string): void {
    this.dialog.open(PayingComponent, {
      width: '600px',
      height: '400px',
      data: { type },
    } as MatDialogConfig);
  }

}
