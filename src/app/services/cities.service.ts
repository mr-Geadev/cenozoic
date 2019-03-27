import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Locations } from 'pop-ups/change-city/cities.models';
import { LocalizationService } from './localization.service';

@Injectable()
export class CitiesService {

  public locations: Locations = null;

  constructor(private _http: HttpClient) {
  }

  public getCities(): void {
    this._http.get('/api/v1/common/countries/info')
      .subscribe((res) => {
        this.locations = new Locations(res['config'], LocalizationService.currentLang());
      });
  }

  public getCitiesObservable(): any {
    this._http.get('/api/v1/common/countries/info')
  }
}
