import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {LocalizationService, ResumeService, UserService} from '../../services';

@Component({
    selector: 'full-resume',
    templateUrl: './full-resume.component.html',
    styleUrls: ['./full-resume.component.less']
})
export class FullResumeComponent implements OnInit {

    public dictionary: any = null;
    public currentResume: any;
    public currentUser: any;
    private id: string = null;

    constructor(public resumeService: ResumeService,
                public userService: UserService,
                private activateRoute: ActivatedRoute,
                private http: HttpClient,
                private _localizationService: LocalizationService) {
        this.id = activateRoute.snapshot.params['id'];
    }

    ngOnInit(): void {

        this.dictionary = this._localizationService.currentDictionary;

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
                    this.currentResume.birthday = this.setBirthday(this.currentResume.birthday);
                }
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
}
