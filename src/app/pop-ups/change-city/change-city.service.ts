import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ChangeCityOpen} from './change-city-open.service';
import {ChangeCityClose} from './change-city-close.service';
import {City} from './cities.models';
import {CitiesService} from '../../services/cities.service';

@Injectable()
export class ChangeCityService {


    constructor(private _http: HttpClient,
                private _openModal: ChangeCityOpen,
                private _cities: CitiesService,
                private _closeModal: ChangeCityClose) {
    }

    public changeCity(): Observable<City> {
        this._openModal.open(this._cities.locations);
        return this._closeModal.response;
    }
}