import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {MatDialog} from '@angular/material';
import {City} from './cities.models';

@Injectable()
export class ChangeCityClose {

    public response: Subject<City> = new Subject<City>();

    constructor(private _dialog: MatDialog) {
    }

    public setCity(city: City): void {
        this.response.next(city);
        this._dialog.closeAll();
    }


}