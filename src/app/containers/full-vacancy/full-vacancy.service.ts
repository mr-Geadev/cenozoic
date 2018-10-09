import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GET_VACANCY_BY_ID} from '../../const/api.constant';
import {VacancyModel} from '../../models/vacancy.model';

@Injectable()
export class FullVacancyService {

    constructor(private _http: HttpClient) {
    }

    public getNationalities(): Observable<any> {
        return this._http.get('/assets/json/nationalities.json')
    }

}
