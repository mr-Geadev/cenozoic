import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDialog, MatDialogConfig } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { Router } from '@angular/router';
import { Moment } from 'moment';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import { Subscription } from 'rxjs/Subscription';

import { CREATE_RESUME } from '../../const';
import { ConfirmService } from '../../services/confirm.service';
import { ResumeService, SystemMessageService, UserService } from '../../services';
import { LocalizationService } from '../../services/localization.service';
import {
    CHANGES_TYPE, DEFAULT_CERTIFICATE_IMAGE,
    DEFAULT_EDUCATION,
    DEFAULT_EXPERIENCE,
    DEFAULT_LANGUAGE,
    DEFAULT_RESUME_FORM,
    DEFAULT_RESUME_IMAGE,
    DEFAULT_TRAINING,
    DEFAULT_TYPE
} from './constructor-resume.constants';
import { ChangeCityService } from '../../pop-ups/change-city/change-city.service';
import { City } from '../../pop-ups/change-city/cities.models';

@Component({
    selector: 'constructor-resume',
    templateUrl: './constructor-resume.component.html',
    styleUrls: ['./constructor-resume.component.scss'],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    ],
})
export class ConstructorResumeComponent implements OnInit, OnDestroy {

    public resumeForm: any = DEFAULT_RESUME_FORM; // резюме, которое будет заполняться
    public age: any = 1000;
    public resumeId: string = null;
    public cleanResumeForm = Object.assign({}, DEFAULT_RESUME_FORM); // схема незаполненнго резюме
    public isAuthorized = false; // проверка авторизации текущего пользователя
    public invalid = false; // форма валидна/нет
    public invalidTime = false; // форма не валидна по времени
    public loadingPhotoButton = ''; // текст кнопки загрузки фото
    public nameImagesOfCertificate: string[] = [];
    public currentUser = null;
    public educationCityName: string[] = [];
    public trainingsCityName: string[] = [];
    public phoneMask: any[] = ['+', '7', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
    public nationalitiesDefault: any[] = null;
    public LocalizationService = LocalizationService;

    public textEditorConfig: any = {}; // для RichTextComponent'ы
    public resumeImage: any = DEFAULT_RESUME_IMAGE; // фотка по дефолту
    public imagesOfCertificate: any = []; // фотка сертификата
    public dictionary: any = null;
    public listVisibleElement: any = {
        experience: [],
        education: [],
        languages: [],
        trainings: []
    };
    private subscriptions: Subscription[] = []; // для горчиях подписок
    private type: string = DEFAULT_TYPE; // создание/редактирование
    public isBirthdayInvalid: boolean = true;
    public isBirthdayTouched: boolean = false;

    constructor(private http: HttpClient,
                private userService: UserService,
                private resumeService: ResumeService,
                private router: Router,
                private _changeCityService: ChangeCityService,
                private _systemMessageService: SystemMessageService,
                private _dialog: MatDialog,
                private _confirm: ConfirmService,
                public _localizationService: LocalizationService) {
    }

    ngOnInit(): void {

        this.http.get('/assets/json/nationalities.json')
            .subscribe(
                (nationalities: any) => {
                this.nationalitiesDefault = nationalities.list;
            });

        // подклюение локализцаии
        this.dictionary = this._localizationService.currentDictionary;

        // установка текста кнопки локализации из словаря
        this.loadingPhotoButton = this.dictionary.LOAD_PHOTO;

        // получить текущего юзера
        this.subscriptions.push(this.userService.user$
            .filter(user => !!user)
            .subscribe((user) => {
                this.isAuthorized = !!user;
                this.currentUser = Object.assign({}, user);
            })
        );

        this.subscriptions.push(
            this.resumeService.resume$
                .subscribe((resume) => {
                    if (resume) {
                        for (const key in resume) {
                            if (resume.hasOwnProperty(key)) {
                                this.resumeForm[key] = resume[key];
                            }
                        }
                        this.resumeId = this.resumeForm._id;
                        this.type = CHANGES_TYPE;
                        this.resumeForm.trainings.forEach((training, index) => {
                            training.document = false;
                            training.documentName = null;
                            this.nameImagesOfCertificate[index] = 'Выбрать фото';
                        });
                        console.log(this.resumeForm);
                    } else {
                        this.type = DEFAULT_TYPE;
                        this.resumeForm = Object.assign({}, DEFAULT_RESUME_FORM);
                    }
                }));
    }

    ngOnDestroy(): void {
        this.resumeService.setResume(null);
        this.subscriptions.forEach(sub => sub.unsubscribe());
        this.type = DEFAULT_TYPE;
    }

    public showRequired(): void {
        this.invalid = true;
    }

    public checkTimeValid(mustBeInvalid): void {
        mustBeInvalid ? this.invalidTime = true : this.invalidTime = false;
        console.log(this.invalidTime);
    }

    public manageFields(nameSection: string, index?: number): void {
        if (index === undefined) {
            let typeField: any = null;
            switch (nameSection) {
                case 'experience':
                    typeField = DEFAULT_EXPERIENCE;
                    break;
                case 'education':
                    typeField = DEFAULT_EDUCATION;
                    break;
                case 'languages':
                    typeField = DEFAULT_LANGUAGE;
                    break;
                case 'trainings':
                    typeField = DEFAULT_TRAINING;
                    this.nameImagesOfCertificate.push(this.dictionary.TRAINING_CERTIFICATE_LOAD);
                    this.imagesOfCertificate.push(Object.assign({}, DEFAULT_CERTIFICATE_IMAGE));
                    break;
                default:
                    null;
            }
            this.resumeForm[nameSection].push(Object.assign({}, typeField));
            this.listVisibleElement[nameSection].push(true);
            console.log(this.imagesOfCertificate);
            console.log(this.nameImagesOfCertificate);
        } else {
            this._confirm.confirm('Вы действительно хотите удалить?')
                .subscribe((res) => {
                    if (res) {
                        this.resumeForm[nameSection].splice(index, 1);
                        if (nameSection === 'trainings') {
                            this.nameImagesOfCertificate.splice(index, 1);
                            this.imagesOfCertificate.splice(index, 1);
                            this.trainingsCityName.splice(index, 1);
                        }
                        if (nameSection === 'education') {
                            this.educationCityName.splice(index, 1);
                        }
                    }
                    this._dialog.closeAll();
                });
        }
    }

    public changeCity(index: number, nameField: string): void {
        this._changeCityService.changeCity()
            .subscribe((city: City) => {
                if (nameField === 'education') {
                    this.resumeForm.education[index].city = city.code;
                    this.resumeForm.education[index].country = city.codeCountry;
                    this.educationCityName[index] = city.name;
                } else {
                    this.resumeForm.trainings[index].city = city.code;
                    this.resumeForm.trainings[index].country = city.codeCountry;
                    this.trainingsCityName[index] = city.name;
                }
            });
    }

    public manageVisible(nameSection: string, index: number): void {
        this.listVisibleElement[nameSection][index] = !this.listVisibleElement[nameSection][index];
    }

    public onImageChange(event, nameField, index?): void {
        const fileList: FileList = event.target.files;
        const file: File = fileList[0];

        if (fileList && fileList.length > 0) {
            if (file.size <= 5242880) {
                const reader = new FileReader();

                if (nameField === 'avatar') {
                    this.resumeImage.file = fileList[0];
                    this.loadingPhotoButton = this.resumeImage.file.name;
                    if (event.target.files && event.target.files.length > 0) {
                        reader.readAsDataURL(this.resumeImage.file);
                        reader.onload = () => {
                            this.resumeImage.data = reader.result;
                        };
                    }
                } else {
                    this.imagesOfCertificate[index] = (Object.assign({}, DEFAULT_CERTIFICATE_IMAGE));
                    this.imagesOfCertificate[index].file = fileList[0];
                    this.nameImagesOfCertificate[index] = this.imagesOfCertificate[index].file.name;
                    if (event.target.files && event.target.files.length > 0) {
                        reader.readAsDataURL(this.imagesOfCertificate[index].file);
                        reader.onload = () => {
                            this.imagesOfCertificate[index].data = reader.result;
                            this.resumeForm.trainings[index].document = true;
                            this.resumeForm.trainings[index].photoURL = null;
                        };
                    }
                    console.log(this.imagesOfCertificate);
                    console.log(this.nameImagesOfCertificate);
                }
            } else {
                this._systemMessageService.info('Размер файла превышает 5мб');
            }
        }
    }

    public deletePhotoCertificate(i: number) {
        this.resumeForm.trainings[i].photoURL = null;
    }

    public birthdayChanged(date: Moment): void {
        this.resumeForm.birthday = date.toISOString();
        this.isBirthdayTouched = true;
        this.isBirthdayInvalid = this.resumeForm.birthday > new Date().toISOString();
    }

    public showInvalidField(): void {
        const firstInvalid = document.querySelectorAll('form .ng-invalid')[0];
        scrollToElement(firstInvalid);

        function focus(theElement) {
            theElement.focus();
        }

        function scrollToElement(theElement) {
            let selectedPosY = 0;

            while (theElement != null) {
                selectedPosY += theElement.offsetTop;
                theElement = theElement.offsetParent;
            }

            selectedPosY -= 20;
            window.scroll({
                top: selectedPosY,
                behavior: 'smooth'
            });

            setTimeout(focus, 500, firstInvalid);
        }
    }

    private _calculateTime(item: any, tillNow?: boolean): number {

        const startMonth: number = item.startMonth;
        const startYear: number = item.startYear;

        let endMonth: number = item.endMonth;
        let endYear: number = item.endYear;

        if (tillNow) {
            endMonth = new Date().getMonth();
            endYear = new Date().getFullYear();
        }

        let allMonths = 0;

        if (endYear === startYear) {
            allMonths = endMonth - startMonth;
        } else if (startMonth > endMonth) {
            allMonths = (endYear - startYear) * 12 + (endMonth - startMonth + 1);
        } else if (startMonth < endMonth) {
            allMonths = (endYear - startYear) * 12 + endMonth - startMonth;
        } else {
            allMonths = (endYear - startYear) * 12;
        }

        return allMonths;
    }

    public send(): void {

        // блок рассчета опыта
        let timeOil = 0;
        let timeMining = 0;
        let timeOther = 0;

        this.resumeForm.experience.forEach((item) => {
            if (item.type === 'oil') {
                timeOil += this._calculateTime(item, item.present);
            }

            if (item.type === 'mining') {
                timeMining += this._calculateTime(item, item.present);
            }

            if (item.type === 'other') {
                timeOther += this._calculateTime(item, item.present);
            }
        });

        this.resumeForm.experienceTime.oil.years = Math.floor(timeOil / 12);
        this.resumeForm.experienceTime.oil.months = timeOil % 12;
        this.resumeForm.experienceTime.mining.years = Math.floor(timeMining / 12);
        this.resumeForm.experienceTime.mining.months = timeMining % 12;
        this.resumeForm.experienceTime.all = {
            years: Math.floor((timeOil + timeMining + timeOther) / 12),
            months: (timeOil + timeMining + timeOther) % 12
        };
        // конец

        this.resumeForm.resumeLanguage = LocalizationService.currentLang();
        this.resumeForm.salary.currency = LocalizationService.currentLang() === 'ru' ? 'rubles' : 'dollars';


        if (this.type === DEFAULT_TYPE) {
            const formData: FormData = new FormData();

            if (!!this.resumeImage.file) {
                formData.append('fileToUpload', this.resumeImage.file);
            }

            this.resumeForm.trainings.forEach((training, index) => {
                if ((training.document) && (!!this.imagesOfCertificate[index].file)) {
                    formData.append(`certificatePhoto-${index}`, this.imagesOfCertificate[index].file);
                    this.resumeForm.trainings[index].documentName = `certificatePhoto-${index}`;
                }
            });

            this.resumeForm.fullName = this.currentUser.fullName;
            formData.append('resume', JSON.stringify(this.resumeForm));
            this.http.post(CREATE_RESUME, formData)
                .subscribe((res: any) => {
                    if (res.success) {
                        this.resumeForm = Object.assign({}, this.cleanResumeForm);
                        this.resumeService.setResume(null);
                        this.router.navigate(['personal-account']);
                    }
                });
        } else {
            delete this.resumeForm.userId;
            delete this.resumeForm._id;
            delete this.resumeForm.birthdayNormal;

            if (this.resumeForm.experience.length) {
                this.resumeForm.experience.forEach((experience) => {
                    delete experience.time;
                });
            }

            delete this.resumeForm.status;
            delete this.resumeForm.age;
            delete this.resumeForm.creationDate;

            const formData: FormData = new FormData();

            if (!!this.resumeImage.file) {
                formData.append('fileToUpload', this.resumeImage.file);
            }

            this.resumeForm.trainings.forEach((training, index) => {
                if ((training.document) && (!!this.imagesOfCertificate[index].file)) {
                    formData.append(`certificatePhoto-${index}`, this.imagesOfCertificate[index].file);
                    this.resumeForm.trainings[index].documentName = `certificatePhoto-${index}`;
                }
            });

            formData.append('resumeId', this.resumeId);
            formData.append('resume', JSON.stringify(this.resumeForm));

            this.http.post('/api/v1/user/resume/edit', formData)
                .subscribe((res: any) => {
                    if (res.success) {
                        this.resumeForm = Object.assign({}, this.cleanResumeForm);
                        this.resumeService.setResume(null);
                        this.router.navigate(['resume', this.resumeId]);
                    }
                });
        }
    }
}
