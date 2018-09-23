import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {LocalizationService, ResumeService} from '../../services';
import { PopupsService } from '../../services/popups.service';
import {FullVacancyService} from './full-vacancy.service';
import {CitiesService} from '../../services/cities.service';

@Component({
    selector: 'full-vacancy',
    templateUrl: './full-vacancy.component.html',
    styleUrls: ['./full-vacancy.component.scss']
})
export class FullVacancyComponent implements OnInit {

    public dictionary: any = null;
    public currentVacancy: any = null;
    private id: string = null;
    public nationalitiesDefault: any[] = null;

    constructor(public resumeService: ResumeService,
                private _vacancyFullService: FullVacancyService,
                private _localizationService: LocalizationService,
                public responds: PopupsService,
                public citiesService: CitiesService,
                private activateRoute: ActivatedRoute) {
        this.id = activateRoute.snapshot.params['id'];
    }

    ngOnInit(): void {

        this.dictionary = this._localizationService.currentDictionary;

        this._vacancyFullService.getVacancy(this.id)
            .subscribe(
                res => {
                    this.currentVacancy = res;
                    console.log(this.currentVacancy);
                }
            );

        this._vacancyFullService.getNationalities()
            .subscribe(
                (nationalities: any) => {
                    this.nationalitiesDefault = nationalities.list;
                });
    }

    public findNameNationality(): string {
        let i = 0, answer = [];
        this.nationalitiesDefault.filter((item) => {
            if (item.code === this.currentVacancy.nationalities[i]) {
                answer.push(item.name); i++;
            }
        });
        return answer.join(', ');
    }

}
