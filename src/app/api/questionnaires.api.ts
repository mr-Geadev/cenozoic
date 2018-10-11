import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import { SystemMessageService } from 'services';
import { QuestionnaireModel, RespondModel } from 'models';

@Injectable()
export class QuestionnairesApi {

  private filters: any = {};

  // TODO: вынести все это гавно в сервис состояния
  private listQuestionnaire: BehaviorSubject<QuestionnaireModel[]> = new BehaviorSubject<QuestionnaireModel[]>([]);
  public listQuestionnaire$: Observable<any> = this.listQuestionnaire.asObservable();

  private setListQuestionnaire(list: QuestionnaireModel[]): void {
    this.listQuestionnaire.next(list);
  }

  constructor(private http: HttpClient,
              private messages: SystemMessageService) {}

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

  public createQuestionnaire(questionnaire): Observable<any> {
    return this.http.post('api/v1/employer/questionnaire/create',  { questionnaire });
  }

  public createWithFileQuestionnaire(formData: FormData): Observable<any> {
    return this.http.post('api/v1/employer/questionnaire-file/create',  formData);
  }

}
