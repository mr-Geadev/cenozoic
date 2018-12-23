import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GET_VACANCY_BY_ID } from 'const';
import { VacancyModel } from 'models';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalizationService, SystemMessageService } from 'services';

@Injectable()
export class ResumeApi {

  private viewedResume: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public viewedResume$: Observable<any> = this.viewedResume.asObservable();
  public dictionary: any = {};

  private setViewedResume(resume): void {
    this.viewedResume.next(resume);
  }

  constructor(private http: HttpClient,
              private _localizationService: LocalizationService,
              private messages: SystemMessageService) {
    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res,
      );
  }

  public getUserResume(): Observable<any> {
    return this.http.get(`/api/v1/user/resume/all`);
  }

  public getResumeById(id: string) {
    this.http.get(`/api/v1/resume/get/one?resumeId=${id}`)
      .subscribe(res => this.setViewedResume(res['resume']));
  }

  show(resumeId: string): void {
    this.http.get(`/api/v1/worker/resume/view/change?resumeId=${resumeId}&view=true`)
      .subscribe(
        res => { this.messages.info(this.dictionary.RESUME_WILL_VIEW); this.getResumeById(resumeId); }
      );
  }

  hidden(resumeId: string): void {
    this.http.get(`/api/v1/worker/resume/view/change?resumeId=${resumeId}&view=false`)
      .subscribe(
        res => { this.messages.info(this.dictionary.RESUME_WAS_HIDDEN); this.getResumeById(resumeId); }
      );
  }
}
