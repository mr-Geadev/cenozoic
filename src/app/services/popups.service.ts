import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { RespondModel } from 'models';
import { AnswerToOfferComponent, AnswerToRespondComponent } from 'pop-ups';

@Injectable()
export class PopupsService {

    constructor(private dialog: MatDialog) {
    }

    // работодателя отвечает на отклик соискатля
    public answerToRespond(respond: RespondModel): void {
        this.dialog.open(AnswerToRespondComponent, {
            width: '937px',
            height: 'auto',
            data: { respond }
        } as MatDialogConfig);
    }

    // сосикатль отвечает на предложение работодателя
    public answerToOffer(respond: RespondModel): void {
        this.dialog.open(AnswerToOfferComponent, {
            width: '937px',
            height: 'auto',
            data: { respond }
        } as MatDialogConfig);
    }

    // соискатель создает отклик на вакансиию, т е по сути отвечает на предложение
    public newRespond(vacancy: string): void {
        this.dialog.open(AnswerToOfferComponent, {
            width: '937px',
            height: 'auto',
            data: { vacancy }
        } as MatDialogConfig);
    }

    public closeAnswer(): void {

    }


}
