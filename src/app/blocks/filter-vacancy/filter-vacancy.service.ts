import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {FilterVacancyModel} from './filter-vacancy.model';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ChangeCityModalComponent} from '../../modals/change-city/change-city.component';

@Injectable()
export class FilterVacancyService {

    // хрнанит текущие фильтры
    public parameters: FilterVacancyModel = new FilterVacancyModel();
    private filterSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public filter$: Observable<any> = this.filterSubject.asObservable();

    private _setFilterParameters(parameter: any): void {
        this.filterSubject.next(parameter);
    }

    constructor(private _dialog: MatDialog) {
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

    public changeCity(event: any): void {
        event.preventDefault();
        this._dialog.open(ChangeCityModalComponent, {
            width: '600px',
            height: '370px'
        } as MatDialogConfig)
            .afterClosed()
            .first()
            .filter(city => !!city)
            .subscribe((city: string) => {
                this.parameters.city = city;
                console.log(this.parameters.getObjectRequest());
                this._setFilterParameters(this.parameters.getObjectRequest());
            });
    }
}
