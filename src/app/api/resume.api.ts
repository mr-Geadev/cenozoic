import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GET_VACANCY_BY_ID } from 'const';
import { VacancyModel } from 'models';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ResumeApi {

  private viewedResume: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public viewedResume$: Observable<any> = this.viewedResume.asObservable();

  private setViewedResume(resume): void {
    this.viewedResume.next(resume);
  }


  constructor(private http: HttpClient) {
    }
    public getUserResume(): Observable<any> {
        return this.http.get(`/api/v1/user/resume/all`);
    }

  public getResumeById(id: string) {
    this.http.get(`/api/v1/resume/get/one?resumeId=${id}`)
      .subscribe(res => this.setViewedResume(res['resume']));
  }
}
