import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ResumeApi, VacancyApi } from 'api';
import { RespondModel, VacancyModel } from 'models';
import { AnswerToOfferComponent, AnswerTopQuestionnaireFileComponent, AnswerToRespondComponent } from 'pop-ups';
import { LocalizationService } from 'services/localization.service';
import { SystemMessageService } from 'services/system-message.service';

@Injectable()
export class PopupsService {

  public dictionary: any = {};

  constructor(private dialog: MatDialog,
              private vacancyApi: VacancyApi,
              private resumeAPi: ResumeApi,
              private _localizationService: LocalizationService,
              private messages: SystemMessageService) {
    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res,
      );
  }

  // работодателя отвечает на отклик соискатля
  public answerToRespond(respond: RespondModel): void {
    this.dialog.open(AnswerToRespondComponent, {
      width: '937px',
      height: 'auto',
      data: { respond },
    } as MatDialogConfig);
  }

  // работодатель создает предложение на резюме, т е по сути отвечает на отлкик
  public newOffer(resume): void {
    this.vacancyApi.getUserVacancy()
      .subscribe((res: any) => {
        if (res.vacancyList.length) {
          this.dialog.open(AnswerToRespondComponent, {
            width: '937px',
            height: 'auto',
            data: { resume },
          } as MatDialogConfig);
        } else {
          this.messages.info(this.dictionary.BEFORE_CREATE_VACANCY);
        }
      });
  }

  // сосикатль отвечает на предложение работодателя
  public answerToOffer(respond: RespondModel): void {
    this.dialog.open(AnswerToOfferComponent, {
      width: '937px',
      height: 'auto',
      data: { respond },
    } as MatDialogConfig);
  }

  // соискатель создает отклик на вакансиию, т е по сути отвечает на предложение
  public newRespond(vacancy): void {
    this.resumeAPi.getUserResume()
      .subscribe((res: any) => {
        if (res.resumeList.length) {
          this.dialog.open(AnswerToOfferComponent, {
            width: '937px',
            height: 'auto',
            data: { vacancy },
          } as MatDialogConfig);
        } else {
          this.messages.info(this.dictionary.BEFORE_CREATE_RESUME);
        }
      });
  }

  public answerToQuestionnaireFile(questionnaire): void {
    this.dialog.open(AnswerTopQuestionnaireFileComponent, {
      width: '937px',
      height: 'auto',
      data: { questionnaire },
    } as MatDialogConfig);
  }

}
