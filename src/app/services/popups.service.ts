import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { RespondModel } from 'models';
import { AnswerToRespondComponent } from 'pop-ups';

@Injectable()
export class PopupsService {

    constructor(private dialog: MatDialog) {
    }

    public answerToRespond(respond: RespondModel): void {
        this.dialog.open(AnswerToRespondComponent, {
            width: '937px',
            height: 'auto',
            data: { respond }
        } as MatDialogConfig);
    }

    public answerToOffer(): void {
        // smth
    }

    public closeAnswer(): void {

    }


}
