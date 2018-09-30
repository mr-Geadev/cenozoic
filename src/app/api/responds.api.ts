import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ResumeApi } from 'api/resume.api';
import { VacancyApi } from 'api/vacancy.api';
import { BehaviorSubject, Observable } from 'rxjs';
import { SystemMessageService } from 'services';
import { NEW_STATUSES } from 'const';
import { RespondModel } from 'models';

@Injectable()
export class RespondsApi {

  // TODO: вынести все это гавно в сервис состояния
  private listRespond: BehaviorSubject<RespondModel[]> = new BehaviorSubject<RespondModel[]>([]);
  public listRespond$: Observable<any> = this.listRespond.asObservable();

  private setListRespond(list: RespondModel[]): void {
    this.listRespond.next(list);
  }

  private listOffers: BehaviorSubject<RespondModel[]> = new BehaviorSubject<RespondModel[]>([]);
  public listOffers$: Observable<any> = this.listOffers.asObservable();

  private setListOffers(list: RespondModel[]): void {
    this.listOffers.next(list);
  }

  private listArchive: BehaviorSubject<RespondModel[]> = new BehaviorSubject<RespondModel[]>([]);
  public listArchive$: Observable<any> = this.listArchive.asObservable();

  private setListArchive(list: RespondModel[]): void {
    this.listArchive.next(list);
  }

  public initializeResponds(): void {
    this.getResponds();
    this.getOffers();
  }

  constructor(private http: HttpClient,
              private dialog: MatDialog,
              private vacancyApi: VacancyApi,
              private resumeApi: ResumeApi,
              private messages: SystemMessageService) {
  }

  // соискатель откликается на вакансию
  public createRespond(vacancyId: string, resumeId: string): void {
    this.http.post('/api/v1/worker/respond/create', { respond: { vacancyId, resumeId } })
      .subscribe(
        (res) => {
          this.messages.info('Отклик отправлен');
          this.vacancyApi.getVacancyById(vacancyId);
          this.dialog.closeAll();
        });
  }

  // работодатель делает предложение на резюме
  public createOffer(vacancyId: string, resumeId: string): void {
    this.http.post('/api/v1/employer/offer/create', { offer: { vacancyId, resumeId } })
      .subscribe(
        (res) => {
          this.messages.info('Приглашение отправлено');
          this.resumeApi.getResumeById(resumeId);
          this.dialog.closeAll();
        });
  }

  // список откликов для юзверя
  public getResponds(): void {
    this.http.post('/api/v1/user/respond/all', {})
      .subscribe(
        res => {
          const list = res['responds'].map(respond => new RespondModel(respond));
          this.setListRespond(list);
        },
        (err) => {
          if (err.error.errorCode === 'offers is not defined') {
            this.setListRespond([]);
          }
        });
  }

  // список предложений юзверя
  public getOffers(): void {
    this.http.post('/api/v1/user/offer/all', {})
      .subscribe(res => {
        const list = res['offers'].map(offer => new RespondModel(offer));
        this.setListOffers(list);
      });
  }

  // отменить отклик
  public cancelRespond(respondId: string): void {
    this.http.get(`/api/v1/worker/respond/cancel?respondId=${respondId}`)
      .subscribe((res) => {
        this.messages.info('Отклик отменен');
        this.getResponds();
      });
  }

  // отменить предложение (изанчально в макетах этот метод не предусмотрен)
  public cancelOffer(respondId: string): void {
    this.http.get(`/api/v1/employer/offer/cancel?offerId=${respondId}`);
  }

  // изменить статус преложения (соискателем)
  public setStatusOffer(offerId: string, status: string): void {
    status = NEW_STATUSES[status];
    this.http.get(`/api/v1/worker/offer/status/change?offerId=${offerId}&newStatus=${status}`)
      .subscribe((res) => {
        this.getOffers();
        this.dialog.closeAll();
      });
  }

  // изменить статус отклика (работодателем)
  public setStatusRespond(respondId: string, status: string): void {
    status = NEW_STATUSES[status];
    this.http.get(`/api/v1/employer/respond/status/change?respondId=${respondId}&newStatus=${status}`)
      .subscribe((res) => {
        this.getResponds();
        this.dialog.closeAll();
      });
  }

  // помечает отклик как просмотренный
  public checkRespondToViewed(respondId: string): void {
    this.http.get(`/api/v1/employer/respond/view?respondId=${respondId}`)
      .subscribe((res) => {
        this.getResponds();
      });
  }

  // помечает предложение как просмотренное
  public checkOfferToViewed(offerId: string): void {
    this.http.get(`/api/v1/worker/offer/view?offerId=${offerId}`)
      .subscribe((res) => {
        this.getOffers();
      });
  }

  // работодатель отправляет отклик в архив
  public employerSendRespondToArchive(respond): void {
  }

  // работодатель отправляет предложение в архив
  public sendToArchive(respond: RespondModel, typeUser: string): void {
    if (typeUser === 'employer') {
      if (respond.entity === 'offer') {
        this.http.get(`/api/v1/employer/offer/archive?offerId=${respond._id}`)
          .subscribe((res) => {
            this.getOffers();
            this.getArchive();
          });
      } else {
        this.http.get(`/api/v1/employer/respond/archive?respondId=${respond._id}`)
          .subscribe((res) => {
            this.getResponds();
            this.getArchive();
          });
      }
    } else {
      if (respond.entity === 'offer') {
        this.http.get(`/api/v1/worker/offer/archive?offerId=${respond._id}`)
          .subscribe((res) => {
            this.getOffers();
            this.getArchive();
          });
      } else {
        this.http.get(`/api/v1/worker/respond/archive?respondId=${respond._id}`)
          .subscribe((res) => {
            this.getResponds();
            this.getArchive();
          });
      }
    }
  }

  // возвращает архив
  public getArchive(): void {
    this.http.get(`/api/v1/user/archive/entities/all`)
      .subscribe((res) => {
        const list = res['entities'].map(entity => new RespondModel(entity));
        this.setListArchive(list);
      });
  }

}
