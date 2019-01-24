import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LocalizationService, SystemMessageService, UserService } from 'services';

@Injectable()
export class AnalyticsApi {

  constructor(private http: HttpClient) {
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
}
