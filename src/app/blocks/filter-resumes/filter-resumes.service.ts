import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class FilterResumesService {

    constructor(private _http: HttpClient) {
    }

    private filterSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public filter$: Observable<any> = this.filterSubject.asObservable();

    private _setFilterParameters(parameter: any): void {
        this.filterSubject.next(parameter);
    }

    public age: any = {
        from: null,
        before: null
    };

    public setAge():void {
        let from = null;
        let before = null;
        this.age.from == null ? from = 0 : from = this.age.from;
        this.age.before == null ? before = 0 : before = this.age.before;
        this.parameters.age = `${from}-${before}`;
    }

    private _parametersTemplate: any = {
        education: 0,
        placeResidence: 0,
        experienceAllTime: 0,
        languagesResume: 0,
        schedule: 0,
        languages: 0,
        salary: 0,
        family: 0,
        gender: 0,
        age: 0,
        photo: 0
    };

    public parameters = Object.assign({}, this._parametersTemplate);

    public resetFilterParameters(): void {
        this.parameters = Object.assign({}, this._parametersTemplate);
        this._setFilterParameters(null);
        this.age.from = null;
        this.age.before == null;
    }

    public changeForm(): void {

        let req: any = {};

        for (let key in this.parameters) {
            if (this.parameters[key] !== 0) {
                req[key] = this.parameters[key];
            }
        }

        console.log(req);

        this._setFilterParameters(req);
    }
}
