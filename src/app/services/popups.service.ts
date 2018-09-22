import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { RespondModel } from 'models';
import { AnswerToOfferComponent, AnswerToRespondComponent } from 'pop-ups';

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

    public answerToOffer(respond: RespondModel): void {
        this.dialog.open(AnswerToOfferComponent, {
            width: '937px',
            height: 'auto',
            data: { respond }
        } as MatDialogConfig);
    }

    public closeAnswer(): void {

    }


}
