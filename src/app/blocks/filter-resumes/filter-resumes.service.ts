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

    private setFilterParameters(parameter: any): void {
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
        alert(this.parameters.age);
    }

    private _parametersTemplate: any = {
        education: 'Образование',
        placeResidence: 'Место проживания',
        experienceAllTime: 'Общий стаж',
        languagesResume: 'Язык резюме',
        schedule: 'Занятость',
        languages: 'Знание языков',
        salary: 'Заработная плата',
        family: 'Семейное положение',
        gender: 'Пол',
        age: 'Возраст',
        photo: 'Фото'
    };

    public parameters = Object.assign({}, this._parametersTemplate);

    public resetFilterParameters(): void {
        this.parameters = Object.assign({}, this._parametersTemplate);
        this.setFilterParameters(null);
    }

    public changeForm(): void {

        let req: any = {};

        for (let key in  this.parameters) {
            if (this.parameters[key] !== this._parametersTemplate[key]) {
                req[key] = this.parameters[key];
            }
        }

        this.setFilterParameters(req);
    }
}
