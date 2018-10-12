import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RespondsApi } from 'api/responds.api';
import { BehaviorSubject, Observable } from 'rxjs';
import { QuestionnaireService, SystemMessageService } from 'services';
import { QuestionnaireModel, RespondModel } from 'models';

@Injectable()
export class QuestionnairesApi {

  private filters: any = {};
  private respond: any = null;

  // TODO: вынести все это гавно в сервис состояния
  private listQuestionnaire: BehaviorSubject<QuestionnaireModel[]> = new BehaviorSubject<QuestionnaireModel[]>([]);
  public listQuestionnaire$: Observable<any> = this.listQuestionnaire.asObservable();

  private setListQuestionnaire(list: QuestionnaireModel[]): void {
    this.listQuestionnaire.next(list);
  }

  constructor(private http: HttpClient,
              private questionnaireService: QuestionnaireService,
              private respondsApi: RespondsApi,
              private dialog: MatDialog,
              private messages: SystemMessageService) {
    this.questionnaireService.respondId$
      .filter(respond => !!respond)
      .subscribe(respond => {
        this.respond = respond;
      });
  }

  // список откликов для юзверя
  public getQuestionnaires(): void {
    this.http.get('api/v1/employer/questionnaire/all')
      .subscribe(
        res => {
          console.log(res);
          const list = res['questionnaireList'].map(questionnaire => new QuestionnaireModel(questionnaire));
          this.setListQuestionnaire(list);
        });
  }

  public getQuestionnaireById(id: string): Observable<any> {
    return this.http.get(`api/v1/employer/questionnaire/one?questionnaireId=${id}`);
  }

  public removeQuestionnaire(id: string): Observable<any> {
    return this.http.get(`api/v1/employer/questionnaire/remove?questionnaireId=${id}`)
      .map(res => this.getQuestionnaires());
  }

  public createQuestionnaire(questionnaire): Observable<any> {
    return this.http.post('api/v1/employer/questionnaire/create', { questionnaire });
  }

  public editQuestionnaire(questionnaireId, questionnaire): Observable<any> {
    return this.http.post('api/v1/employer/questionnaire/edit', { questionnaireId, questionnaire });
  }

  public createWithFileQuestionnaire(formData: FormData): Observable<any> {
    return this.http.post('api/v1/employer/questionnaire-file/create', formData);
  }

  public answerToData(questionnaireAnswer) {
    const body = {
      questionnaireAnswer: {sections: questionnaireAnswer},
      offerId: this.respond.id,
      respondId: this.respond.id,
    };

    if (this.respond.entity === 'offer') {
      delete body.respondId;
    } else {
      delete body.offerId;
    }
    return this.http.post(`api/v1/worker/questionnaire/answer`, body);
  }

  public answerToFile(formData: FormData) {
    if (this.respond.entity === 'offer') {
      formData.append('offerId', this.respond.id);
    } else {
      formData.append('respondId', this.respond.id);
    }
    return this.http.post(`api/v1/worker/questionnaire-file/answer`, formData)
      .map(res => {
        this.respondsApi.getOffers();
        this.respondsApi.getResponds();
        this.dialog.closeAll();
      });
  }
}
