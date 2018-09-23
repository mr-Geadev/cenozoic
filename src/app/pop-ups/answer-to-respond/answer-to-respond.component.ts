import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material";
import { LocalizationService, SystemMessageService } from 'services';
import { RespondsApi, VacancyApi } from "../../api";
import { VacancyModel } from "../../models";

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

    private resume: any = null
    public vacancy: VacancyModel = null

    constructor(private _systemMessageService: SystemMessageService,
                private _localizationService: LocalizationService,
                private vacancyApi: VacancyApi,
                private respondsApi: RespondsApi,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit(): void {
        this.dictionary = this._localizationService.currentDictionary;

        this.resume = this.data.respond ? this.data.respond.resume : this.data.resume;

        if (!this.data.respond) {
            this.vacancyApi.getUserVacancy()
                .subscribe((res: any) => {
                    this.vacancy = new VacancyModel(res.vacancyList[0]);
                });
        } else {
            this.vacancy = new VacancyModel(this.data.respond.resume);
        }
    }

    sendRespond() {
        if (!this.data.respond) {
            this.respondsApi.createOffer(this.vacancy._id, this.resume._id);
        }
    }

}
