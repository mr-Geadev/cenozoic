import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { RespondsApi, VacancyApi } from 'api';
import { RESPOND_STATUSES } from 'const';
import { VacancyModel } from 'models';
import { LocalizationService, SystemMessageService } from 'services';

@Component({
  selector: 'answer-to-respond',
  templateUrl: './answer-to-respond.component.html',
  styleUrls: ['./answer-to-respond.component.scss'],
})

export class AnswerToRespondComponent implements OnInit {

  public dictionary: any = null;
  public answer: boolean = true;
  public isSendQuestionnaire: boolean = false;
  public idQuestionnaire: string = '';

  private resume: any = null;
  public checkedVacancy: VacancyModel = null;
  public listVacancy: VacancyModel[] = [];

  constructor(private _systemMessageService: SystemMessageService,
              private _localizationService: LocalizationService,
              private vacancyApi: VacancyApi,
              private respondsApi: RespondsApi,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.dictionary = this._localizationService.currentDictionary;

    this.resume = this.data.respond ? this.data.respond.resume : this.data.resume;
    this.answer = this.data.respond ? !(this.data.respond.status === RESPOND_STATUSES.REJECTED) : true;

    if (!this.data.respond) {
      this.vacancyApi.getUserVacancy()
        .subscribe((res: any) => {
          this.listVacancy = res.vacancyList.map(vacancy => new VacancyModel(vacancy));
        });
    } else {
      this.checkedVacancy = new VacancyModel(this.data.respond.resume);
    }
  }

  sendRespond() {
    if (!this.data.respond) {
      this.respondsApi.createOffer(this.checkedVacancy._id, this.resume._id);
    } else {
      this.respondsApi.setStatusRespond(this.data.respond._id, this.answer ? RESPOND_STATUSES.APPROVED : RESPOND_STATUSES.REJECTED);
      this.respondsApi.checkRespondToViewed(this.data.respond._id);
    }
  }

  checkVacancy(vacancy) {
    this.checkedVacancy = vacancy;
  }

}
