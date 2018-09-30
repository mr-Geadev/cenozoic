import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GET_VACANCY_BY_ID } from 'const';
import { RespondModel, VacancyModel } from 'models';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class VacancyApi {

  private viewedVacancy: BehaviorSubject<VacancyModel> = new BehaviorSubject<VacancyModel>(null);
  public viewedVacancy$: Observable<any> = this.viewedVacancy.asObservable();

  private setViewedVacancy(vacancy: VacancyModel): void {
    this.viewedVacancy.next(vacancy);
  }

  constructor(private http: HttpClient) {
  }

  public getUserVacancy(): Observable<any> {
    return this.http.get(`/api/v1/employer/vacancy/all`);
  }

  public getVacancyById(id: string) {
    this.http.get(GET_VACANCY_BY_ID + `?vacancyId=${id}`)
      .subscribe(res => this.setViewedVacancy(new VacancyModel(res['vacancy'])));
  }
}