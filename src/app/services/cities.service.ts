import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Locations } from 'pop-ups/change-city/cities.models';
import { environment } from '../../environments/environment';

@Injectable()
export class CitiesService {

  url = environment.apiUrl;

  public locations: Locations = null;

  constructor(private _http: HttpClient) {}

  public getCities(lang: string): void {
    this._http.get(this.url + '/api/v1/common/countries/info')
      .subscribe((res) => {
        this.locations = new Locations(res['config'], lang);
      });
  }

  public getCitiesObservable(): any {
    this._http.get(this.url + '/api/v1/common/countries/info')
  }
}
