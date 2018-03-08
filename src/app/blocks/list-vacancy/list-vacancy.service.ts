import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LIST_VACANCY } from "../../constants/api.constant";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ListVacancyService {

    constructor(private _http: HttpClient) {

    }

    public getListVancacy(offset: number): Observable<any> {
        return this._http.post(LIST_VACANCY,{offset: offset})
            .map(res => res['vacancyList']);
    }

}