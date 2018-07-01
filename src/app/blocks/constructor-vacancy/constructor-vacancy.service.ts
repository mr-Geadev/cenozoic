import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {CREATE_VACANCY} from '../../constants/api.constant';
import 'rxjs/add/operator/map';

@Injectable()
export class ConstructorVacancyService {

    constructor(private _http: HttpClient) {

    }

    public createVacancy(vacancy: any): Observable<any> {

        console.log(vacancy);

        if (vacancy.experience) {
            if (!vacancy.experience.oil.checked) {
                vacancy.experience.oil = null;
            }
            if (!vacancy.experience.mining.checked) {
                vacancy.experience.mining = null;
            }
        }

        if (!vacancy.duties.length) vacancy.duties = null;
        if (!vacancy.demands.length) vacancy.demands = null;
        if (!vacancy.conditions.length) vacancy.conditions = null;

        console.log(vacancy);

        return this._http.post(CREATE_VACANCY, {'vacancy': vacancy})
            .map(
                (res) => {
                    res['success'];
                },
                (err) => err
            );
    }
}
