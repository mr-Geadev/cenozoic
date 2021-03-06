import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {FilterResumesModel} from './filter-resume.model';


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
        console.log(this.parameters);
        this._setFilterParameters(null);
    }

    public changeForm(): void {
        console.log(this.parameters.getObjectRequest());
        this._setFilterParameters(this.parameters.getObjectRequest());
    }

    private _setFilterParameters(parameter: any): void {
        this.filterSubject.next(parameter);
    }
}
