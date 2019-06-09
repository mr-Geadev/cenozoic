import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ChangeCityModalComponent} from './change-city.component';

@Injectable()
export class ChangeCityOpen {

    constructor(private _dialog: MatDialog) {}

    public open(locations): void {
        this._dialog.open(ChangeCityModalComponent, {
            maxWidth: '500px',
            maxHeight: '400px',
            width: '90%',
            height: '90%',
            overflow: 'visible',
            data: locations
        } as MatDialogConfig);
    }
}
