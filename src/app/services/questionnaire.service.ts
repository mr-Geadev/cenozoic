import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class QuestionnaireService {

  private questionnaireSubject: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  public questionnaire$: Observable<any> = this.questionnaireSubject.asObservable();

  private respondIdSubject: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  public respondId$: Observable<any> = this.respondIdSubject.asObservable();

  constructor() {
  }

  public setQuestionnaire(questionnaire: any): void {
    this.questionnaireSubject.next(questionnaire);
  }

  public setRespondId(respondId: any): void {
    this.respondIdSubject.next(respondId);
  }


}
