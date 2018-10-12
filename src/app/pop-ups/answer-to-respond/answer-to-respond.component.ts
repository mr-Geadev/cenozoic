import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { QuestionnairesApi, RespondsApi, VacancyApi } from 'api';
import { RESPOND_STATUSES } from 'const';
import { QuestionnaireModel, VacancyModel } from 'models';
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

  public questionnaireId: string = null;
  public listQuestionnaire: QuestionnaireModel[] = [];

  private resume: any = null;
  public checkedVacancy: VacancyModel = null;
  public listVacancy: VacancyModel[] = [];

  constructor(private _systemMessageService: SystemMessageService,
              private _localizationService: LocalizationService,
              private vacancyApi: VacancyApi,
              private respondsApi: RespondsApi,
              private questionnaireApi: QuestionnairesApi,
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
          this.checkedVacancy = this.listVacancy[0];
        });
    } else {
      this.checkedVacancy = new VacancyModel(this.data.respond.vacancy);
    }

    this.questionnaireApi.getQuestionnaires();
    this.questionnaireApi.listQuestionnaire$
      .subscribe(
        listQuestionnaire => this.listQuestionnaire = listQuestionnaire
      );
  }

  sendRespond() {
    if (!this.data.respond) {
      this.respondsApi.createOffer(this.checkedVacancy._id, this.resume._id, this.isSendQuestionnaire ? this.questionnaireId : null);
    } else {
      this.respondsApi.setStatusRespond(this.data.respond._id, this.answer ? RESPOND_STATUSES.APPROVED : RESPOND_STATUSES.REJECTED);
      this.respondsApi.checkRespondToViewed(this.data.respond._id);
    }
  }

  checkVacancy(vacancy) {
    this.checkedVacancy = vacancy;
  }

}
