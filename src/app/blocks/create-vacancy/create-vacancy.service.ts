import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { CREATE_VACANCY } from "../../constants/api.constant";
import "rxjs/add/operator/map";

@Injectable()
export class CreateVacancyService {

    constructor(private _http: HttpClient) {

    }

    public createVacancy(vacancy: any): Observable<any> {
        if (!vacancy.experience.oil.checked) {vacancy.experience.oil = null}
        if (!vacancy.experience.mining.checked) {vacancy.experience.mining = null}
        return this._http.post(CREATE_VACANCY, { 'vacancy': vacancy })
            .map(
                (res) => { res['success'] },
                (err) => err
            );
    }
}