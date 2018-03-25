import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LIST_VACANCY, LIST_VACANCY_USER } from "../../constants/api.constant";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ListVacancyService {

    constructor(private _http: HttpClient) {

    }

    public getListVancacy(offset: number, config: string): Observable<any> {
        if (config === 'user') {
            return this._http.get(LIST_VACANCY_USER)
                .map(res => res['vacancyList']);
        } else {
            return this._http.post(LIST_VACANCY,{offset: offset, count: 24})
                .map(res => res['vacancyList']);
        }
    }

}