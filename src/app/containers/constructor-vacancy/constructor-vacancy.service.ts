import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {CREATE_VACANCY} from '../../const/api.constant';
import 'rxjs/add/operator/map';
import {LocalizationService} from '../../services/localization.service';

@Injectable()
export class ConstructorVacancyService {

    constructor(private _http: HttpClient) {

    }

    public createVacancy(vacancy: any): Observable<any> {

        if (vacancy.experience) {
            if (!vacancy.experience.oil.checked) {
                vacancy.experience.oil = null;
            }
            if (!vacancy.experience.mining.checked) {
                vacancy.experience.mining = null;
            }
        }

        vacancy.vacancyLanguage = LocalizationService.currentLang();

        return this._http.post(CREATE_VACANCY, {'vacancy': vacancy})
            .map(
                (res) => {
                    res['success'];
                },
                (err) => err
            );
    }

    public getNationalities(): Observable<any> {
        return this._http.get('/assets/json/nationalities.json')
    }
}
