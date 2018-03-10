import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { ConfirmComponent } from "./confirm.component";
import { MatDialog, MatDialogConfig } from "@angular/material";

@Injectable()
export class ConfirmService {


    constructor(private dialog: MatDialog) {
    }

    public confirm(title: string): void {
        this.dialog.open(ConfirmComponent, {
            width: '300px',
            height: '200px',
            data: {title: title}
        } as MatDialogConfig);
    };
}
