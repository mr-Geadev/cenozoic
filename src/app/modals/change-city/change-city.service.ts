import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { isPlatformBrowser } from '@angular/common';


@Injectable()
export class ChangeCityModalService {


    constructor(private _http: HttpClient,
                @Inject(PLATFORM_ID) private platformId: Object) {
    }

    public getLocations(): Observable<any> {
        return this._http.get('/assets/json/russia.locality.json');
    }

    public setCity(city: string): void {
        if (typeof window !== 'undefined') {
            if (isPlatformBrowser(this.platformId)) {
                localStorage.setItem('city', city);
            }
        }
    }

    public getCurrentCity(): string {
        if (isPlatformBrowser(this.platformId)) {
            if (typeof window !== 'undefined') {
                return localStorage.getItem('city');
            } else {
                return '';
            }
        }
    }
}