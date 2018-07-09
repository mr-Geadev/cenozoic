import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ChangeCityModalComponent} from './change-city.component';

@Injectable()
export class ChangeCityOpen {

    constructor(private _dialog: MatDialog) {}

    public open(locations): void {
        this._dialog.open(ChangeCityModalComponent, {
            width: '500px',
            height: '300px',
            overflow: 'visible',
            data: locations
        } as MatDialogConfig);
    }
}
