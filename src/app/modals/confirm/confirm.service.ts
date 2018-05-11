import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ReqConfirmService} from './req-confirm.service';
import {ResConfirmService} from './res-confirm.service';

@Injectable()
export class ConfirmService {


    constructor(private _reqConfirm: ReqConfirmService,
                private _resConfirm: ResConfirmService) {
    }

    public confirm(title): Observable<boolean> {
        this._reqConfirm.confirmRequest(title);
        return this._resConfirm.response;
    }
}