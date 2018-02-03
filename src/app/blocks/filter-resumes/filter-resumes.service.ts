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

    private _parametersTemplate: any = {
        educationStage: 0,
        schedule: 0,
        experienceAllTime: 0,
        languagesResume: 0,
        employmentType: 0,
        languages: 0,
        salary: {
            from: 0,
            to: 0
        },
        family: 0,
        gender: 0,
        age: {
            from: 0,
            to: 0
        },
        photo: 0
    };

    public parameters = Object.assign({}, this._parametersTemplate);

    public resetFilterParameters(): void {
        this.parameters = Object.assign({}, this._parametersTemplate);
        this.parameters.age.from = 0;
        this.parameters.age.to = 0;
        this.parameters.salary.from = 0;
        this.parameters.salary.to = 0;
        this._setFilterParameters(null);
    }

    public changeForm(): void {

        let req: any = {};

        for (let key in this.parameters) {
            if (this.parameters[key] != 0) {
                req[key] = this.parameters[key];
            }
        }


        if (req.salary.to == 'other') {
            req.salary.from = 600000;
            delete req.salary.to;
        }

        if ((req.salary.to == 0) && (req.salary.from == 0)) {
            delete req.salary;
        }

        if ((req.age.to == 0) && (req.age.from == 0)) {
            delete req.age;
        }

        console.log(req);

        this._setFilterParameters(req);
    }
}
