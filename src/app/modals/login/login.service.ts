import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { LoginModalComponent } from "./login.component";

@Injectable()
export class LoginModalService {

    constructor(private dialog: MatDialog) {

    }

    public openModal(): void {
        this.dialog.open(LoginModalComponent, {
            width: '600px',
            height: '400px'
        } as MatDialogConfig);
    };
}
