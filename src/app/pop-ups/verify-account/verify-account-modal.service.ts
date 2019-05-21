import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { VerifyAccountComponent } from 'pop-ups/verify-account/verify-account.component';

@Injectable()
export class VerifyAccountModalService {

	constructor(private dialog: MatDialog) {
	}

	public openVerifyModal(typeAccount: string): void {
		this.dialog.open(VerifyAccountComponent, {
			width: '600px',
			height: '400px',
			data: { typeAccount },
		} as MatDialogConfig);
	}

}
