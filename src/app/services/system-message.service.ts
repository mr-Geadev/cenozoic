import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSnackBarConfig } from "@angular/material";

@Injectable()
export class SystemMessageService {
    constructor(private _snackBar: MatSnackBar) {
    }

    public info(message: string, duration: number = 2000, action: string = "Закрыть", description?: string): void {
        this._snackBar.open(message, action, {
            duration: duration,
            horizontalPosition: 'right',
            verticalPosition: 'top'
        } as MatSnackBarConfig);
    }
}
