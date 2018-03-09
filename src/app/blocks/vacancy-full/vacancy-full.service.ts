import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { GET_VACANCY_BY_ID } from "../../constants/api.constant";
import { VacancyModel } from "../../models/vacancy.model";

@Injectable()
export class VacancyFullService {

    constructor (private _http: HttpClient) {
    }

    public getVacancy(vacancyId: string): Observable<any> {
        return this._http.get(GET_VACANCY_BY_ID + `?vacancyId=${vacancyId}`)
            .map(res => new VacancyModel(res['vacancy']) );
    }

}