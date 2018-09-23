import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SystemMessageService } from 'services';
import { NEW_STATUSES } from "../const";
import { RespondModel } from "../models";

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

    public initializeResponds(): void {
        this.getResponds();
        this.getOffers();
    }


    constructor(private http: HttpClient,
                private messages: SystemMessageService) {
    }

    // соискатель откликается на вакансию
    public createRespond(vacancyId: string, resumeId: string): void {
        this.http.post('/api/v1/worker/respond/create', { respond: { vacancyId, resumeId } })
            .subscribe(
                (res) => {
                    this.messages.info('Отклик отправлен');
                });
    }

    // работодатель делает предложение на резюме
    public createOffer(vacancyId: string, resumeId: string): void {
        this.http.post('/api/v1/employer/offer/create', { offer: { vacancyId, resumeId } })
            .subscribe(
                (res) => {
                    this.messages.info('Приглашение отправлено');
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

    public setStatusOffer(offerId: string, status: string): void {
        status = NEW_STATUSES[status]
        this.http.get(`/api/v1/worker/offer/status/change?offerId=${offerId}&newStatus=${status}`)
            .subscribe((res) => {
                this.getOffers();
            });
    }

    public setStatusRespond(respondId: string, status: string): void {
        status = NEW_STATUSES[status]
        this.http.get(`/api/v1/employer/respond/status/change?respondId=${respondId}&newStatus=${status}`)
            .subscribe((res) => {
                this.getResponds();
            });
    }

}
