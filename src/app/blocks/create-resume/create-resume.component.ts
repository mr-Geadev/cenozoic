import { HttpClient } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDialog, MatDialogConfig } from "@angular/material";
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from "@angular/material-moment-adapter";
import { Router } from "@angular/router";
import { Moment } from "moment";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/first";

import { CREATE_RESUME } from "../../constants";
import { ChangeCityModalComponent } from "../../modals/change-city";
import { ResumeService, SystemMessageService, UserService } from "../../services";
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
import { Subscription } from "rxjs/Subscription";
import { ConfirmService } from "../../modals/confirm/confirm.service";
import { ResConfirmService } from "../../modals/confirm/res-confirm.service";
import { LocalizationService } from "../../services/localization.service";

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

    public resumeForm: any = DEFAULT_RESUME_FORM; // резюме, которое будет заполняться
    public age: any = 1000;
    public cleanResumeForm = Object.assign({}, DEFAULT_RESUME_FORM); // схема незаполненнго резюме
    public isAuthorized: boolean = false; // проверка авторизации текущего пользователя
    public invalid: boolean = false; // форма валидна/нет
    public loadingPhotoButton: string = ''; // текст кнопки загрузки фото

    public textEditorConfig: any = {}; // для RichTextComponent'ы

    private subscriptions: Subscription[] = []; // для горчиях подписок
    private type: string = DEFAULT_TYPE; // создание/редактирование
    public resumeImage: any = DEFAULT_RESUME_IMAGE; // фотка по дефолту

    public dictionary: any = null;

    public listVisibleElement: any = {
        experience: [],
        education: [],
        languages: [],
        trainings: []
    }

    constructor(private http: HttpClient,
                private userService: UserService,
                private resumeService: ResumeService,
                private router: Router,
                private _systemMessageService: SystemMessageService,
                private _dialog: MatDialog,
                private _confirm: ConfirmService,
                private _resConfirm: ResConfirmService,
                private _localizationService: LocalizationService,) {
    }

    ngOnInit(): void {

        this.dictionary = this._localizationService.currentDictionary;
        this.loadingPhotoButton = this.dictionary.LOAD_PHOTO;

        this.subscriptions.push(this.userService.user$
            .filter(user => !!user)
            .subscribe((user) => {
                this.isAuthorized = !!user;
                this.resumeForm.fullName = user.fullName;
            }))

        this.subscriptions.push(this.resumeService.resume$
            .subscribe((resume) => {
                if (resume) {
                    for (let key in resume) {
                        if (resume.hasOwnProperty(key)) {
                            this.resumeForm[key] = resume[key];
                        }
                    }
                    this.type = CHANGES_TYPE;
                } else {
                    this.type = DEFAULT_TYPE;
                    for (let key in this.resumeForm) {
                        delete this.resumeForm[key];
                    }
                    this.resumeForm = Object.assign({}, this.cleanResumeForm);
                }
            }))
    }

    ngOnDestroy(): void {
        this.resumeService.setResume(null);
        this.subscriptions.forEach(sub=>sub.unsubscribe());
        this.type = DEFAULT_TYPE;
    }

    public showRequired(): void {
        this.invalid = true;
    }


    public manageFields(nameSection: string, index?: number): void {
        if (index === undefined) {
            let typeField: any = null;
            switch (nameSection) {
                case 'experience': typeField = DEFAULT_EXPERIENCE; break;
                case 'education': typeField = DEFAULT_EDUCATION; break;
                case 'languages': typeField = DEFAULT_LANGUAGE; break;
                case 'trainings': typeField = DEFAULT_TRAINING; break;
                default: console.log('Error program');
            }
            this.resumeForm[nameSection].push(Object.assign({}, typeField));
            this.listVisibleElement[nameSection].push(true);
        } else {
            this._confirm.confirm('Вы действительно хотите удалить?');
            this._resConfirm.answer
                .subscribe((res)=>{
                    if (res) {
                        this.resumeForm[nameSection].splice(index, 1);
                    }
                    this._dialog.closeAll();
                });
        }
    }

    public manageVisible(nameSection: string, index: number): void {
        this.listVisibleElement[nameSection][index] = !this.listVisibleElement[nameSection][index];
    }

    public onImageChange(event): void {
        const fileList: FileList = event.target.files;
        const file: File = fileList[0];

        if (fileList && fileList.length > 0) {
            if (file.size <= 5242880) {
                const reader = new FileReader();
                this.resumeImage.file = fileList[0];

                this.loadingPhotoButton = this.resumeImage.file.name;

                if (event.target.files && event.target.files.length > 0) {
                    reader.readAsDataURL(this.resumeImage.file);
                    reader.onload = () => {
                        this.resumeImage.data = reader.result;
                    };
                }
            } else {
                this._systemMessageService.info('Размер файла превышает 5мб');
            }
        }
    }

    public send(): void {
        let timeOil: number = 0;
        let timeMining: number = 0;

        this.resumeForm.experience.forEach((item) => {
            if (item.type === "Нефтегазовая") {
                timeOil += this._calculateTime(item, item.present);
            }

            if (item.type === "Горнодобывающая") {
                timeMining += this._calculateTime(item, item.present);
            }
        });

        this.resumeForm.experienceAll.oil.years = Math.floor(timeOil / 12);
        this.resumeForm.experienceAll.oil.months = timeOil % 12;
        this.resumeForm.experienceAll.mining.years = Math.floor(timeMining / 12);
        this.resumeForm.experienceAll.mining.months = timeMining % 12;
        this.resumeForm.experienceAllTime = `${Math.floor(( timeOil + timeMining ) / 12)};${( timeOil + timeMining ) % 12}`;

        if (this.type === DEFAULT_TYPE) {
            const formData: FormData = new FormData();

            if (!!this.resumeImage.file) {
                formData.append('fileToUpload', this.resumeImage.file);
            }

            formData.append('resume', JSON.stringify(this.resumeForm));
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

            const formData: FormData = new FormData();

            if (!!this.resumeImage.file) {
                formData.append('fileToUpload', this.resumeImage.file);
            }

            formData.append('resumeId', id);
            formData.append('resume', JSON.stringify(this.resumeForm));

            this.http.post('/api/v1/user/resume/edit', formData)
                .subscribe((res: any) => {
                    if (res.success) {
                        this.resumeForm = Object.assign({}, this.cleanResumeForm);
                        this.router.navigate(['resume', id]);
                    }
                });
        }
    };

    private _calculateTime(item: any, tillNow?: boolean): number {
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

        let endMonth: string = item.endMonth;
        let endYear: number = item.endYear;

        if (tillNow) {
            endMonth = months[new Date().getMonth()];
            endYear = new Date().getFullYear();
        }

        let allMonths: number = 0;

        if (endYear === startYear) {
            allMonths = months.indexOf(endMonth) - months.indexOf(startMonth);
        } else if (months.indexOf(startMonth) > months.indexOf(endMonth)) {
            allMonths = (endYear - startYear) * months.length + (months.indexOf(endMonth) - months.indexOf(startMonth) + 1);
        } else if (months.indexOf(startMonth) < months.indexOf(endMonth)) {
            allMonths = (endYear - startYear) * months.length + months.indexOf(endMonth) - months.indexOf(startMonth);
        } else {
            allMonths = (endYear - startYear) * months.length;
        }

        return allMonths;
    }

    public birthdayChanged(date: Moment): void {
        this.resumeForm.birthday = date.toISOString();
    }

    public changeEducationCity(index: number): void {
        this._dialog.open(ChangeCityModalComponent, {
            width: '600px',
            height: '370px'
        } as MatDialogConfig)
            .afterClosed()
            .first()
            .filter(city => !!city)
            .subscribe((city: string) => {
                this.resumeForm.education[index].city = city;
            });
    }

    public onPhoneKeyPress(event: KeyboardEvent): void {
        if (!((event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode === 43)) {
            event.stopPropagation();
            event.preventDefault();
        }
    }
}
