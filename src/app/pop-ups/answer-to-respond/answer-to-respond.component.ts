import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material";
import { LocalizationService, SystemMessageService } from 'services';

@Component({
    selector: 'answer-to-respond',
    templateUrl: './answer-to-respond.component.html',
    styleUrls: ['./answer-to-respond.component.scss']
})

export class AnswerToRespondComponent implements OnInit {

    public dictionary: any = null;
    public answer: boolean = true;
    public isSendQuestionnaire: boolean = false;
    public idQuestionnaire: string = '';

    constructor(private _systemMessageService: SystemMessageService,
                private _localizationService: LocalizationService,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit(): void {
        this.dictionary = this._localizationService.currentDictionary;
    }

}
