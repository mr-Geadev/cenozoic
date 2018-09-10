import {Component, OnInit} from '@angular/core';
import {City, Country} from '../../../pop-ups/change-city/cities.models';
import {CitiesService} from '../../../services/cities.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {SystemMessageService} from '../../../services';

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.less']
})

// TODO: вынести добавление города в компоненту
export class SettingsComponent implements OnInit {

    public city: FormGroup;

    public listCities: City[] = [];
    public listCountry: Country[] = [];

    constructor(private citiesService: CitiesService,
                private _messages: SystemMessageService,
                private _http: HttpClient) {
    }

    private createCityFormGroup() {
        this.city = new FormGroup({
                codeCountry: new FormControl(0, [Validators.required]),
                cityName: new FormGroup({
                    en: new FormControl('', [Validators.required]),
                    ru: new FormControl('', [Validators.required])
                }),
            }
        );
    }

    ngOnInit() {
        this.listCities = this.citiesService.locations.listCity;
        this.listCountry = this.citiesService.locations.listCountry;
        this.createCityFormGroup();
        console.log(this.listCities);
    }

    public saveCity() {
        let req = this.city.value;
        req.codeCountry = +req.codeCountry;
        console.log(req);
        this._http.post('/api/v1/admin/config/countries/city/add', req)
            .subscribe(
                res => {
                    this._messages.info('Добавлен!');
                    this.createCityFormGroup();
                },
                err => {
                    this._messages.info(err.error.errorCode);
                }
                );
    }

}
