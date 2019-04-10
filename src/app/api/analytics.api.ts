import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { LocalizationService, SystemMessageService, UserService } from 'services';

@Injectable()
export class AnalyticsApi {

  dateFilter = new BehaviorSubject<{from?: string, to?: string}>({});

  constructor(private http: HttpClient) {
  }

  // статистика по работодателю

  /** статистика по взаимодействию работодателя с резюме по дням*/
  public statEmployerResumePerDay(employerId: string): Observable<any> {
    let url = `/api/v1/admin/statistics/employer/stat1?employerId=${employerId}`;
    const dates = this.dateFilter.getValue();
    let params = '';
    if (dates.from) { params += `&from=${dates.from}`; }
    if (dates.to) {
      params += `&to=${dates.to}`;
    }
    url += params ? `${params}` : '';
    return this.http.get(url);
  }

  /** статистика по откликам работодателя */
  public statEmployerRespondsPerDay(employerId: string): Observable<any> {
    let url = `/api/v1/admin/statistics/employer/stat23?employerId=${employerId}`;
    const dates = this.dateFilter.getValue();
    let params = '';
    if (dates.from) { params += `&from=${dates.from}`; }
    if (dates.to) {
      params += `&to=${dates.to}`;
    }
    url += params ? `${params}` : '';
    return this.http.get(url);
  }

  /** статистика по предложениям работодателя */
  public statEmployerOffersPerDay(employerId: string): Observable<any> {
    let url = `/api/v1/admin/statistics/employer/stat45?employerId=${employerId}`;
    const dates = this.dateFilter.getValue();
    let params = '';
    if (dates.from) { params += `&from=${dates.from}`; }
    if (dates.to) {
      params += `&to=${dates.to}`;
    }
    url += params ? `${params}` : '';
    return this.http.get(url);
  }

  /** соотношение откликов работодателя по отношению ко всем откликам на сайте (в рамках определнного статуса) */
  public statEmployerResponds(employerId: string, status: number): Observable<any> {
    let url = `/api/v1/admin/statistics/employer/stat678?employerId=${employerId}&status=${status}`;
    const dates = this.dateFilter.getValue();
    let params = '';
    if (dates.from) { params += `&from=${dates.from}`; }
    if (dates.to) {
      params += `&to=${dates.to}`;
    }
    url += params ? `${params}` : '';
    return this.http.get(url);
  }

  /** соотношение предложений работодателя по отношению ко всем предложениям на сайте (в рамках определнного статуса) */
  public statEmployerOffer(employerId: string, status: number): Observable<any> {
    let url = `/api/v1/admin/statistics/employer/stat91011?employerId=${employerId}&status=${status}`;
    const dates = this.dateFilter.getValue();
    let params = '';
    if (dates.from) { params += `&from=${dates.from}`; }
    if (dates.to) {
      params += `&to=${dates.to}`;
    }
    url += params ? `${params}` : '';
    return this.http.get(url);
  }

  /** соотношение откликов по статусу */
  public statEmployerAttitudeResponses(employerId: string): Observable<any> {
    let url = `/api/v1/admin/statistics/employer/stat1213?employerId=${employerId}`;
    const dates = this.dateFilter.getValue();
    let params = '';
    if (dates.from) { params += `&from=${dates.from}`; }
    if (dates.to) {
      params += `&to=${dates.to}`;
    }
    url += params ? `${params}` : '';
    return this.http.get(url);
  }

  /** соотношение предложений по статусу */
  public statEmployerAttitudeOffers(employerId: string): Observable<any> {
    let url = `/api/v1/admin/statistics/employer/stat1415?employerId=${employerId}`;
    const dates = this.dateFilter.getValue();
    let params = '';
    if (dates.from) { params += `&from=${dates.from}`; }
    if (dates.to) {
      params += `&to=${dates.to}`;
    }
    url += params ? `${params}` : '';
    return this.http.get(url);
  }

  // не готов
  /** доход от работодателя (график покупок по дням)*/
  public statEmployerIncomePerDay(employerId: string): Observable<any> {
    let url = `/api/v1/admin/statistics/employer/stat16?employerId=${employerId}`;
    const dates = this.dateFilter.getValue();
    let params = '';
    if (dates.from) { params += `&from=${dates.from}`; }
    if (dates.to) {
      params += `&to=${dates.to}`;
    }
    url += params ? `${params}` : '';
    return this.http.get(url);
  }

  // не готов
  /** Процентное соотношение покупок за весь период (на что в основном тратит) */
  public statEmployerPaymentsType(employerId: string): Observable<any> {
    let url = `/api/v1/admin/statistics/employer/stat17?employerId=${employerId}`;
    const dates = this.dateFilter.getValue();
    let params = '';
    if (dates.from) { params += `&from=${dates.from}`; }
    if (dates.to) {
      params += `&to=${dates.to}`;
    }
    url += params ? `${params}` : '';
    return this.http.get(url);
  }

  // статистика по соискателю

  /** просмотренных вакансий в день */
  public statWorkerViewVacancyPerDay(workerId: string): Observable<any> {
    let url = `/api/v1/admin/statistics/worker/stat1?workerId=${workerId}`;
    const dates = this.dateFilter.getValue();
    let params = '';
    if (dates.from) { params += `&from=${dates.from}`; }
    if (dates.to) {
      params += `&to=${dates.to}`;
    }
    url += params ? `${params}` : '';
    return this.http.get(url);
  }

  // общая статистика

  /** всего просмотренных резюме и купленных данных резюме в день */
  public statCommonResumeViewBuyPerDay(): Observable<any> {
    let url = '/api/v1/admin/statistics/common/stat1';
    const dates = this.dateFilter.getValue();
    let params = '';
    if (dates.from) { params += `from=${dates.from}`; }
    if (dates.to) {
      if (dates.from) { params += `&`; }
      params += `to=${dates.to}`;
    }
    url += params ? `?${params}` : '';
    return this.http.get(url);
  }

  /** всего новых откликов за день */
  public statCommonNewRespondsPerDay(): Observable<any> {
    let url = '/api/v1/admin/statistics/common/stat2';
    const dates = this.dateFilter.getValue();
    let params = '';
    if (dates.from) { params += `from=${dates.from}`; }
    if (dates.to) {
      if (dates.from) { params += `&`; }
      params += `to=${dates.to}`;
    }
    url += params ? `?${params}` : '';
    return this.http.get(url);
  }

  /** соотношение откликов по статусу (принятых/отклоненных/в рассмотрении/ожидает опросника) на текущий момент */
  public statCommonAttitudeRespondsStatusNow(): Observable<any> {
    let url = '/api/v1/admin/statistics/common/stat3';
    const dates = this.dateFilter.getValue();
    let params = '';
    if (dates.from) { params += `from=${dates.from}`; }
    if (dates.to) {
      if (dates.from) { params += `&`; }
      params += `to=${dates.to}`;
    }
    url += params ? `?${params}` : '';
    return this.http.get(url);
  }

  /** соотношение предложений по статусу (принятых/отклоненных/в рассмотрении/ожидает опросника) на текущий момент */
  public statCommonAttitudeOffersStatusNow(): Observable<any> {
    let url = '/api/v1/admin/statistics/common/stat4';
    const dates = this.dateFilter.getValue();
    let params = '';
    if (dates.from) { params += `from=${dates.from}`; }
    if (dates.to) {
      if (dates.from) { params += `&`; }
      params += `to=${dates.to}`;
    }
    url += params ? `?${params}` : '';
    return this.http.get(url);
  }

  /** количество размещенных новостей в день*/
  public statCommonNewNewsPerDay(): Observable<any> {
    let url = '/api/v1/admin/statistics/common/stat5';
    const dates = this.dateFilter.getValue();
    let params = '';
    if (dates.from) { params += `from=${dates.from}`; }
    if (dates.to) {
      if (dates.from) { params += `&`; }
      params += `to=${dates.to}`;
    }
    url += params ? `?${params}` : '';
    return this.http.get(url);
  }

  /** количество размещенных банеров в день */
  public statCommonNewBannersPerDay(): Observable<any> {
    let url = '/api/v1/admin/statistics/common/stat6';
    const dates = this.dateFilter.getValue();
    let params = '';
    if (dates.from) { params += `from=${dates.from}`; }
    if (dates.to) {
      if (dates.from) { params += `&`; }
      params += `to=${dates.to}`;
    }
    url += params ? `?${params}` : '';
    return this.http.get(url);
  }

  // не готов
  /** График покупок по дням */
  public statCommonPeymentsPerDay(): Observable<any> {
    let url = '/api/v1/admin/statistics/common/stat7';
    const dates = this.dateFilter.getValue();
    let params = '';
    if (dates.from) { params += `from=${dates.from}`; }
    if (dates.to) {
      if (dates.from) { params += `&`; }
      params += `to=${dates.to}`;
    }
    url += params ? `?${params}` : '';
    return this.http.get(url);
  }

  // не готов
  /** Процентное соотношение покупок за весь период (на что в основном тратят работодатели) */
  public statCommonPeymentsAttitide(): Observable<any> {
    let url = '/api/v1/admin/statistics/common/stat8';
    const dates = this.dateFilter.getValue();
    let params = '';
    if (dates.from) { params += `from=${dates.from}`; }
    if (dates.to) {
      if (dates.from) { params += `&`; }
      params += `to=${dates.to}`;
    }
    url += params ? `?${params}` : '';
    return this.http.get(url);
  }
}
