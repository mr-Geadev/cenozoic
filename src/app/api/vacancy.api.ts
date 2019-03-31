import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CREATE_VACANCY, EDIT_VACANCY, GET_VACANCY_BY_ID } from 'const';
import { RespondModel, VacancyModel } from 'models';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalizationService, SystemMessageService, UserService } from 'services';

@Injectable()
export class VacancyApi {

  private viewedVacancy: BehaviorSubject<VacancyModel> = new BehaviorSubject<VacancyModel>(null);
  public viewedVacancy$: Observable<any> = this.viewedVacancy.asObservable();
  public dictionary: any = {};

  private setViewedVacancy(vacancy: VacancyModel): void {
    this.viewedVacancy.next(vacancy);
  }

  constructor(private http: HttpClient,
              private userService: UserService,
              private _localizationService: LocalizationService,
              private messages: SystemMessageService) {
    this._localizationService.currentDictionary
      .subscribe(
        res => this.dictionary = res,
      );
  }

  public getUserVacancy(): Observable<any> {
    return this.http.get(`/api/v1/employer/vacancy/all`);
  }

  public getVacancyById(id: string) {
    this.http.get(GET_VACANCY_BY_ID + `?vacancyId=${id}`)
      .subscribe(res => this.setViewedVacancy(new VacancyModel(res['vacancy'])));
  }

  public createVacancy(vacancy: any): Observable<any> {
    return this.http.post(CREATE_VACANCY, { 'vacancy': this.transformVacancy(vacancy) })
      .map(
        (res) => {
          this.userService.getUserInfo();
          return res['success'];
        },
        (err) => err,
      );
  }

  public editVacancy(vacancy: any, vacancyId: string): Observable<any> {
    return this.http.post(EDIT_VACANCY, { vacancyId, 'vacancy': this.transformVacancy(vacancy) })
      .map(
        (res) => res['success'],
        (err) => err,
      );
  }

  public activateVacancy(vacancyId: string): Observable<any> {
    return this.http.get(`/api/v1/employer/vacancy/time-out/activate?vacancyId=${vacancyId}`)
      .map(
        (res) => {
          this.userService.getUserInfo();
          return res['success'];
        },
        (err) => err,
      );
  }

  private transformVacancy(vacancy) {
    if (vacancy.experience) {
      if (!vacancy.experience.oil.checked) {
        vacancy.experience.oil = null;
      }
      if (!vacancy.experience.mining.checked) {
        vacancy.experience.mining = null;
      }
    }

    vacancy.vacancyLanguage = LocalizationService.currentLang();

    return vacancy;
  }

  public getNationalities(): Observable<any> {
    return this.http.get('/assets/json/nationalities.json');
  }

  show(vacancyId: string): void {
    this.http.get(`/api/v1/employer/vacancy/view/change?vacancyId=${vacancyId}&view=true`)
      .subscribe(
        res => {
          this.messages.info(this.dictionary.VACANCY_WILL_VIEW);
          this.getVacancyById(vacancyId);
        }
      );
  }

  hidden(vacancyId: string): void {
    this.http.get(`/api/v1/employer/vacancy/view/change?vacancyId=${vacancyId}&view=false`)
      .subscribe(
        res => {
          this.messages.info(this.dictionary.VACANCY_WAS_HIDDEN);
          this.getVacancyById(vacancyId);
        }
      );
  }

  ban(vacancyId: string): void {
    this.http.get(`api/v1/admin/resume-vacancy/block/change?entityId=${vacancyId}&block=true&entity=vacancy`)
      .subscribe(
        res => { this.messages.info('Вакансия заблокирована'); this.getVacancyById(vacancyId); }
      );
  }

  unban(vacancyId: string): void {
    this.http.get(`api/v1/admin/resume-vacancy/block/change?entityId=${vacancyId}&block=false&entity=vacancy`)
      .subscribe(
        res => { this.messages.info('Вакансия разблокирована'); this.getVacancyById(vacancyId);}
      );
  }
}
