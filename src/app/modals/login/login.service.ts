import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { LoginModalComponent } from "./login.component";
import { HttpClient } from "@angular/common/http";
import { LOG_OUT } from "../../constants/api.constant";
import { UserService } from "../../services/user.service";

@Injectable()
export class LoginModalService {

    constructor(private dialog: MatDialog,
                private _http: HttpClient,
                public user: UserService) {
    }

    public logOut(): void {
        this._http.post(LOG_OUT,{})
            .subscribe((res: any) => {
                if (res.success === true) {
                    this.user.setUser(null);
                    // this.user.session = false;
                }
            });
    }

    public openModal(): void {
        this.dialog.open(LoginModalComponent, {
            width: '600px',
            height: '400px'
        } as MatDialogConfig);
    };

}
