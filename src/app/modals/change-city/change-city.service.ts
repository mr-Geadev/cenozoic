import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ChangeCityModalService {
    constructor(private _http: HttpClient) {
    }

    public getLocations(): Observable<any> {
        return this._http.get('/assets/json/russia.locality.json');
    }

    public setCity(city: string): void {
        localStorage.setItem('city', city);
    }

    public getCurrentCity(): string {
        return localStorage.getItem('city');
    }
}