import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LocalizationService, SystemMessageService, UserService } from 'services';

@Injectable()
export class AnalyticsApi {

  constructor(private http: HttpClient) {
  }

  // статистика по работодателю

  /** статистика по взаимодействию работодателя с резюме по дням*/
  public statEmployerResumePerDay(employerId: string): Observable<any> {
    return this.http.get(`/api/v1/admin/statistics/employer/stat1?employerId=${employerId}`);
  }

  /** статистика по откликам работодателя */
  public statEmployerRespondsPerDay(employerId: string): Observable<any> {
    return this.http.get(`/api/v1/admin/statistics/employer/stat23?employerId=${employerId}`);
  }

  /** статистика по предложениям работодателя */
  public statEmployerOffersPerDay(employerId: string): Observable<any> {
    return this.http.get(`/api/v1/admin/statistics/employer/stat45?employerId=${employerId}`);
  }

  /** соотношение откликов работодателя по отношению ко всем откликам на сайте (в рамках определнного статуса) */
  public statEmployerResponds(employerId: string, status: number): Observable<any> {
    return this.http.get(`/api/v1/admin/statistics/employer/stat678?employerId=${employerId}&status=${status}`);
  }

  /** соотношение предложений работодателя по отношению ко всем предложениям на сайте (в рамках определнного статуса) */
  public statEmployerOffer(employerId: string, status: number): Observable<any> {
    return this.http.get(`/api/v1/admin/statistics/employer/stat91011?employerId=${employerId}&status=${status}`);
  }

  /** соотношение откликов по статусу */
  public statEmployerAttitudeResponses(employerId: string): Observable<any> {
    return this.http.get(`/api/v1/admin/statistics/employer/stat1213?employerId=${employerId}`);
  }

  /** соотношение предложений по статусу */
  public statEmployerAttitudeOffers(employerId: string): Observable<any> {
    return this.http.get(`/api/v1/admin/statistics/employer/stat1415?employerId=${employerId}`);
  }

  // не готов
  /** доход от работодателя (график покупок по дням)*/
  public statEmployerIncomePerDay(employerId: string): Observable<any> {
    return this.http.get(`/api/v1/admin/statistics/employer/stat16?employerId=${employerId}`);
  }

  // не готов
  /** Процентное соотношение покупок за весь период (на что в основном тратит) */
  public statEmployerPaymentsType(employerId: string): Observable<any> {
    return this.http.get(`/api/v1/admin/statistics/employer/stat17?employerId=${employerId}`);
  }

  // статистика по соискателю

  /** просмотренных вакансий в день */
  public statWorkerViewVacancyPerDay(workerId: string): Observable<any> {
    return this.http.get(`/api/v1/admin/statistics/worker/stat1?workerId=${workerId}`);
  }

  // общая статистика

  /** всего просмотренных резюме и купленных данных резюме в день */
  public statCommonResumeViewBuyPerDay(): Observable<any> {
    return this.http.get('/api/v1/admin/statistics/common/stat1');
  }

  /** всего новых откликов за день */
  public statCommonNewRespondsPerDay(): Observable<any> {
    return this.http.get('/api/v1/admin/statistics/common/stat2');
  }

  /** соотношение откликов по статусу (принятых/отклоненных/в рассмотрении/ожидает опросника) на текущий момент */
  public statCommonAttitudeRespondsStatusNow(): Observable<any> {
    return this.http.get('/api/v1/admin/statistics/common/stat3');
  }

  /** соотношение предложений по статусу (принятых/отклоненных/в рассмотрении/ожидает опросника) на текущий момент */
  public statCommonAttitudeOffersStatusNow(): Observable<any> {
    return this.http.get('/api/v1/admin/statistics/common/stat4');
  }

  /** количество размещенных новостей в день*/
  public statCommonNewNewsPerDay(): Observable<any> {
    return this.http.get('/api/v1/admin/statistics/common/stat5');
  }

  /** количество размещенных банеров в день */
  public statCommonNewBannersPerDay(): Observable<any> {
    return this.http.get('/api/v1/admin/statistics/common/stat6');
  }

  // не готов
  /** График покупок по дням */
  public statCommonPeymentsPerDay(): Observable<any> {
    return this.http.get('/api/v1/admin/statistics/common/stat7');
  }

  // не готов
  /** Процентное соотношение покупок за весь период (на что в основном тратят работодатели) */
  public statCommonPeymentsAttitide(): Observable<any> {
    return this.http.get('/api/v1/admin/statistics/common/stat8');
  }
}
