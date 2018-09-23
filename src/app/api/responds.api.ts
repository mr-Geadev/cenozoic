import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemMessageService } from 'services';

@Injectable()
export class RespondsApi {

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
                    this.messages.info('Отклик отправлен');
                });
    }

    // список откликов для юзверя
    public getResponds(): Observable<any> {
        return this.http.post('/api/v1/user/respond/all', {});
    }

    // список предложений юзверя
    public getOffers(): Observable<any> {
        return this.http.post('/api/v1/user/offer/all', {});
    }

}
