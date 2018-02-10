import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSnackBarConfig } from "@angular/material";

@Injectable()
export class SystemMessageService {
    constructor(private _snackBar: MatSnackBar) {
    }

    public info(message: string, action: string = "Закрыть", description?: string): void {
        this._snackBar.open(message, action, {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
        } as MatSnackBarConfig);
    }
}
