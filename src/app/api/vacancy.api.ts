import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class VacancyApi {

    constructor(private http: HttpClient) {
    }

    public getUserVacancy(): Observable<any> {
        return this.http.get(`/api/v1/employer/vacancy/all`);
    }
}
