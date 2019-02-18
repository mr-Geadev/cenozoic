import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {LoginModalComponent} from './login.component';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../services/user.service';

@Injectable()
export class LoginModalService {

    constructor(private dialog: MatDialog,
                private _http: HttpClient,
                public user: UserService) {
    }

    public openModal(): void {
        this.dialog.open(LoginModalComponent, {
            width: '640px',
            height: '430px'
        } as MatDialogConfig);
    };
}
