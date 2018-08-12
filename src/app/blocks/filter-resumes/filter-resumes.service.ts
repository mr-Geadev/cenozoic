import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {FilterResumesModel} from './filter-resumes.model';


@Injectable()
export class FilterResumesService {

    // хрнанит текущие фильтры
    public parameters: FilterResumesModel = new FilterResumesModel();
    private filterSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public filter$: Observable<any> = this.filterSubject.asObservable();

    constructor(private _http: HttpClient) {
    }

    public resetFilterParameters(): void {
        this.parameters.reset();
        this._setFilterParameters(null);
    }

    public changeForm(): void {
        this._setFilterParameters(this.parameters.getObjectRequest());
    }

    private _setFilterParameters(parameter: any): void {
        this.filterSubject.next(parameter);
    }

    public getNationalitiesList(): Observable<any> {
        return this._http.get('/assets/json/nationalities.json');
    }
}
