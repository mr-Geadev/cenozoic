import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { LocalizationService, ResumeService, UserService } from "../../services";

@Component({
    selector: 'resume-full',
    templateUrl: './resume-full.component.html',
    styleUrls: ['./resume-full.component.less']
})
export class ResumeFullComponent implements OnInit {

    public dictionary: any = null;

    constructor(public resumeService: ResumeService,
                public userService: UserService,
                private activateRoute: ActivatedRoute,
                private http: HttpClient,
                private _localizationService: LocalizationService) {
        this.id = activateRoute.snapshot.params['id'];
    }

    private id: string = null;

    public currentResume: any;
    public currentUser: any;

    ngOnInit(): void {

        this.dictionary = this._localizationService.currentDictionary;

        this.userService.user$
            .subscribe((user) => {
                if (user) {
                    this.currentUser = user;
                }
            });

        this.http.get(`http://134.0.119.98:8080/api/v1/resume/get/one?resumeId=${this.id}`)
            .subscribe((res: any) => {
                if (res.success) {
                    this.currentResume = res.resume;
                    this.currentResume.age = this.getAge(this.currentResume.birthday);
                    this.currentResume.birthday = this.setBirthday(this.currentResume.birthday);
                }
            });
    }

    public setBirthday(dateString):string {
        let day = parseInt(dateString.substring(8,10));
        let month = parseInt(dateString.substring(5,7));
        let year = parseInt(dateString.substring(0,5));

        return `${day}.${month}.${year}`
    }

    public getAge(dateString): number {
        // 1998-09-23T19:00:00.000Z
        // 22.05.1990
        let day = parseInt(dateString.substring(8,10));
        let month = parseInt(dateString.substring(5,7));
        let year = parseInt(dateString.substring(0,5));

        let today = new Date();
        let birthDate = new Date(year, month - 1, day); // 'month - 1' т.к. нумерация месяцев начинается с 0
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())){
            age--;
        }
        return age;
    }
}