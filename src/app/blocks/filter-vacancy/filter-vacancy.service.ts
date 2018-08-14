import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {FilterVacancyModel} from './filter-vacancy.model';
import {City} from '../../modals/change-city/cities.models';
import {ChangeCityService} from '../../modals/change-city';

@Injectable()
export class FilterVacancyService {

    // хрнанит текущие фильтры
    public parameters: FilterVacancyModel = new FilterVacancyModel();
    private filterSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public filter$: Observable<any> = this.filterSubject.asObservable();

    private _setFilterParameters(parameter: any): void {
        this.filterSubject.next(parameter);
    }

    constructor(private _changeCityService: ChangeCityService,
                private _http: HttpClient) {
    }

    public resetFilterParameters(): void {
        this.parameters.reset();
        this._setFilterParameters(null);
    }

    public getNationalitiesList(): Observable<any> {
        return this._http.get('/assets/json/nationalities.json');
    }

    public changeForm(): void {
        this._setFilterParameters(this.parameters.getObjectRequest());
    }

    public changeCity(e: any): void {
        e.preventDefault();
        this._changeCityService.changeCity()
            .first()
            .subscribe((city: City) => {
                this.parameters.city = city.code;
                this._setFilterParameters(this.parameters.getObjectRequest());
            });
    }
}
