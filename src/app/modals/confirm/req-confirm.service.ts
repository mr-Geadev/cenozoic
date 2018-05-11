import {Injectable} from '@angular/core';
import {ConfirmComponent} from './confirm.component';
import {MatDialog, MatDialogConfig} from '@angular/material';

@Injectable()
export class ReqConfirmService {

    constructor(private dialog: MatDialog) {
    }

    public confirmRequest(title: string): void {
        this.dialog.open(ConfirmComponent, {
            width: '400px',
            height: '300px',
            data: {title: title}
        } as MatDialogConfig);
    };
}
