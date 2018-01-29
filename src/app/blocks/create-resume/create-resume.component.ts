import { HttpClient } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material";
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from "@angular/material-moment-adapter";
import { Router } from "@angular/router";
import "rxjs/add/operator/filter";

import { CREATE_RESUME } from "../../constants";
import { ResumeService, UserService } from "../../services";
import {
    CHANGES_TYPE,
    DEFAULT_EDUCATION,
    DEFAULT_EXPERIENCE,
    DEFAULT_LANGUAGE,
    DEFAULT_RESUME_FORM,
    DEFAULT_RESUME_IMAGE,
    DEFAULT_TRAINING,
    DEFAULT_TYPE
} from "./create-resume.contants";

@Component({
    selector: 'create-resume',
    templateUrl: './create-resume.component.html',
    styleUrls: ['./create-resume.component.less'],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    ],
})
export class CreateResumeComponent implements OnInit, OnDestroy {
    public resumeForm: any = DEFAULT_RESUME_FORM;
    public cleanResumeForm = Object.assign({}, DEFAULT_RESUME_FORM);
    public isAuthorized: boolean = false;
    public invalid: boolean = false;
    public loadingPhotoButton: string = 'Загрузить фото';

    private sub: any;
    private type: string = DEFAULT_TYPE;
    private resumeImage: any = DEFAULT_RESUME_IMAGE;

    constructor(private http: HttpClient,
                private userService: UserService,
                private resumeService: ResumeService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.userService.user$
            .filter(user => !!user)
            .subscribe((user) => {
                this.isAuthorized = !!user;
                console.log(user);
            });

        this.sub = this.resumeService.resume$
            .subscribe((resume) => {
                if (resume != null) {
                    for (let key in resume) {
                        if (resume.hasOwnProperty(key)) {
                            this.resumeForm[key] = resume[key];
                        }
                    }
                    this.type = CHANGES_TYPE;
                }
            });
    }

    ngOnDestroy(): void {
        this.resumeService.setResume(null);
    }

    public showRequired(): void {
        this.invalid = true;
    }

    public manageWorkplace(index?: number): void {
        if (index === undefined) {
            this.resumeForm.experience.push(Object.assign({}, DEFAULT_EXPERIENCE));
        } else {
            this.resumeForm.experience.splice(index, 1);
        }
    }

    public manageEducation(index?: number): void {
        if (index === undefined) {
            this.resumeForm.education.push(Object.assign({}, DEFAULT_EDUCATION));
        } else {
            this.resumeForm.education.splice(index, 1);
        }
    }

    public manageLanguage(index?: number): void {
        if (index === undefined) {
            this.resumeForm.languages.push(Object.assign({}, DEFAULT_LANGUAGE));
        } else {
            this.resumeForm.languages.splice(index, 1);
        }
    }

    public manageTraining(index?: number): void {
        if (index === undefined) {
            this.resumeForm.trainings.push(Object.assign({}, DEFAULT_TRAINING));
        } else {
            this.resumeForm.trainings.splice(index, 1);
        }
    }

    public onImageChange(event): void {
        const fileList: FileList = event.target.files;

        if (fileList && fileList.length > 0) {
            const reader = new FileReader();
            this.resumeImage.file = fileList[0];

            this.loadingPhotoButton = this.resumeImage.file.name;

            if (event.target.files && event.target.files.length > 0) {
                reader.readAsDataURL(this.resumeImage.file);
                reader.onload = () => {
                    this.resumeImage.data = reader.result;
                };
            }
        }
    }

    public send(): void {


        let timeOil: number = 0;
        let timeMining: number = 0;

        this.resumeForm.experience.forEach((item) => {
            if (item.type === "Нефтегазовая") {
                timeOil += this._calculateTime(item);
            }
            ;
            if (item.type === "Горнодобывающая") {
                timeMining += this._calculateTime(item);
            }
            ;
        });

        console.log(timeOil);
        console.log(timeMining);
        this.resumeForm.experienceAll.oil.year = Math.floor(timeOil / 12);
        this.resumeForm.experienceAll.oil.month = timeOil % 12;
        this.resumeForm.experienceAll.mining.year = Math.floor(timeMining / 12);
        this.resumeForm.experienceAll.mining.month = timeMining % 12;
        this.resumeForm.experienceAllTime = `${Math.floor(( timeOil + timeMining ) / 12)};${( timeOil + timeMining ) % 12}`;

        if (this.type === DEFAULT_TYPE) {
            const formData: FormData = new FormData();

            if (!!this.resumeImage.file) {
                formData.append('fileToUpload', this.resumeImage.file);
            }

            formData.append('resume', JSON.stringify(this.resumeForm));
            console.log(this.resumeForm);
            this.http.post(CREATE_RESUME, formData)
                .subscribe((res: any) => {
                    if (res.success) {
                        this.resumeForm = Object.assign({}, this.cleanResumeForm);
                        this.router.navigate(['personal-account']);
                    }
                });
        } else {
            delete this.resumeForm.userId;
            let id = this.resumeForm._id;
            delete this.resumeForm._id;

            this.http.post('/api/v1/user/resume/edit', { resumeId: id, resume: this.resumeForm })
                .subscribe((res: any) => {
                    if (res.success) {
                        this.resumeForm = Object.assign({}, this.cleanResumeForm);
                        this.router.navigate(['resume', id]);
                    } else {
                        console.log(res);
                        console.log({ resumeId: this.resumeForm._id, resume: this.resumeForm });
                    }
                });
        }
    };

    private _calculateTime(item: any): number {
        let months = [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь'
        ];

        const startMonth: string = item.startMonth;
        const startYear: number = item.startYear;

        const endMonth: string = item.endMonth;
        const endYear: number = item.endYear;

        let allMonths: number = 0;

        if (endYear === startYear) {
            console.log("a");
            allMonths = months.indexOf(endMonth) - months.indexOf(startMonth);
        } else if (months.indexOf(startMonth) > months.indexOf(endMonth)) {
            console.log("b");
            allMonths = (endYear - startYear) * months.length + (months.indexOf(endMonth) - months.indexOf(startMonth) + 1);
        } else if (months.indexOf(startMonth) < months.indexOf(endMonth)) {
            console.log("c");
            allMonths = (endYear - startYear) * months.length + months.indexOf(endMonth) - months.indexOf(startMonth);
        } else {
            console.log("d");
            allMonths = (endYear - startYear) * months.length;
        }

        return allMonths;
    }
}
