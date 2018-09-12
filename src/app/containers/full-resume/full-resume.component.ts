import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as moment from 'moment';

import {LocalizationService, ResumeService, UserService} from '../../services';
import {CitiesService} from '../../services/cities.service';

@Component({
    selector: 'full-resume',
    templateUrl: './full-resume.component.html',
    styleUrls: ['./full-resume.component.scss']
})
export class FullResumeComponent implements OnInit {

    public dictionary: any = null;
    public currentResume: any;
    public currentUser: any;
    private id: string = null;
    public nationalitiesDefault: any[] = null;

    constructor(public resumeService: ResumeService,
                public userService: UserService,
                public citiesService: CitiesService,
                private activateRoute: ActivatedRoute,
                private http: HttpClient,
                private _localizationService: LocalizationService) {
        this.id = activateRoute.snapshot.params['id'];
    }

    ngOnInit(): void {

        this.dictionary = this._localizationService.currentDictionary;

        this.http.get('/assets/json/nationalities.json')
            .subscribe(
                (nationalities: any) => {
                    this.nationalitiesDefault = nationalities.list;
                });

        this.userService.user$
            .subscribe((user) => {
                if (user) {
                    this.currentUser = user;
                }
            });

        this.http.get(`/api/v1/resume/get/one?resumeId=${this.id}`)
            .subscribe((res: any) => {
                if (res.success) {
                    this.currentResume = res.resume;
                    this.currentResume.age = this.getAge(this.currentResume.birthday);
                    this.currentResume.birthdayNormal = this.setBirthday(this.currentResume.birthday);
                    this.calculateTimeRange();
                }
            });
    }

    public calculateTimeRange() {
        this.currentResume.experience.forEach(workPlace => {
            const startDate = moment([workPlace.startYear, workPlace.startMonth]);
            let endDate = moment();
            if (!workPlace.present) {
                endDate = moment([workPlace.endYear, workPlace.endMonth]);
            }
            const diffMonths = moment.duration(endDate.diff(startDate)).asMonths();

            let years: any = Math.floor(diffMonths / 12);
            if ((Math.floor(years % 10) > 0) && (Math.floor(years % 10) < 5))  {
                years = years + ' год ';
            }   else {
                years = years + ' лет ';
            }

            let months: any = Math.floor(diffMonths % 12);
            switch (months) {
                case 0: months = ''; break;
                case 1: months = months + ' месяц'; break;
                case 2: case 3: case 4: months = months + ' месяца'; break;
                default: months = months + ' месяцев'; break;
            }
            const answer = years + months;
            workPlace.time = answer;
        });
    }

    public setBirthday(dateString): string {
        const day = parseInt(dateString.substring(8, 10));
        const month = parseInt(dateString.substring(5, 7));
        const year = parseInt(dateString.substring(0, 5));

        return `${day}.${month}.${year}`;
    }

    public getAge(dateString): number {
        // 1998-09-23T19:00:00.000Z
        // 22.05.1990
        const day = parseInt(dateString.substring(8, 10));
        const month = parseInt(dateString.substring(5, 7));
        const year = parseInt(dateString.substring(0, 5));

        const today = new Date();
        const birthDate = new Date(year, month - 1, day); // 'month - 1' т.к. нумерация месяцев начинается с 0
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    public findNameNationality(): string {
        let i = 0, answer = [];
        this.nationalitiesDefault.filter((item) => {
            if (item.code === this.currentResume.nationalities[i]) {
                answer.push(item.name); i++;
            }
        })
        return answer.join(', ');
    }
}
