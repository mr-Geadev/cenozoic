import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { VacancyModel } from 'models';
import { LocalizationService, SystemMessageService } from 'services';
import { ResumeApi, RespondsApi } from 'api';

@Component({
    selector: 'answer-to-offer',
    templateUrl: './answer-to-offer.component.html',
    styleUrls: ['./answer-to-offer.component.scss']
})

export class AnswerToOfferComponent implements OnInit {

    public dictionary: any = null;
    public answer: boolean = true;
    public vacancy: VacancyModel = null;
    public resume: any = null;

    constructor(private _systemMessageService: SystemMessageService,
                private _localizationService: LocalizationService,
                private listResumeApi: ResumeApi,
                private respondsApi: RespondsApi,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit(): void {
        this.dictionary = this._localizationService.currentDictionary;

        this.vacancy = new VacancyModel(this.data.respond ? this.data.respond.vacancy : this.data.vacancy);

        if (!this.data.respond) {
            this.listResumeApi.getUserResume()
                .subscribe((res: any) => {
                    this.resume = res.resumeList[0];
                });
        } else {
            this.resume = this.data.respond.resume;
        }
    }

    sendRespond() {
       if (!this.data.respond) {
           this.respondsApi.createRespond(this.vacancy._id, this.resume._id);
       }
    }

}
