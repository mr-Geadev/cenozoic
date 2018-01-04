import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material";

@Component({
    selector: 'login-modal',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginModalComponent {

    public entry: boolean = true;

    constructor(private dialogRef: MatDialogRef<any>) {

    }

    public sent(): void {

    }
}
