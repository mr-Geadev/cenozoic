import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { LocalizationService, SystemMessageService } from 'services';

@Component({
    selector: 'answer-to-offer',
    templateUrl: './answer-to-offer.component.html',
    styleUrls: ['./answer-to-offer.component.scss']
})

export class AnswerToOfferComponent implements OnInit {

    public dictionary: any = null;
    public answer: boolean = true;

    constructor(private _systemMessageService: SystemMessageService,
                private _localizationService: LocalizationService,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit(): void {
        this.dictionary = this._localizationService.currentDictionary;
    }

}
