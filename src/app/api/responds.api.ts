import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemMessageService } from 'services';

@Injectable()
export class RespondsApi {

    constructor(private http: HttpClient,
                private messages: SystemMessageService) {
    }

    public createRespond(vacancyId: string, resumeId: string): void {
        this.http.post('/api/v1/worker/respond/create', { respond: { vacancyId, resumeId } })
            .subscribe(
                (res) => {
                    this.messages.info('Отклик отправлен');
                });
    }

    public getResponds(): Observable<any> {
        return this.http.post('/api/v1/user/respond/all', {});
    }

    public getOffers(): Observable<any> {
        return this.http.post('/api/v1/user/offer/all', {});
    }

}
