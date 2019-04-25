import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDialog, MatDialogConfig } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { Router } from '@angular/router';
import { Moment } from 'moment';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { Subscription } from 'rxjs/Subscription';

import { CREATE_RESUME, IMG_URL } from '../../const';
import { ConfirmService } from '../../services/confirm.service';
import { ResumeService, SystemMessageService, UserService } from '../../services';
import { LocalizationService } from '../../services/localization.service';
import {
  CHANGES_TYPE, DEFAULT_CERTIFICATE_IMAGE,
  DEFAULT_EDUCATION,
  DEFAULT_EXPERIENCE,
  DEFAULT_LANGUAGE,
  DEFAULT_RESUME_FORM,
  DEFAULT_RESUME_IMAGE, DEFAULT_SALARY,
  DEFAULT_TRAINING,
  DEFAULT_TYPE,
} from './constructor-resume.constants';
import { ChangeCityService } from '../../pop-ups/change-city/change-city.service';
import { City } from '../../pop-ups/change-city/cities.models';
import 'rxjs-compat/add/operator/take';

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

  imgUrl = IMG_URL;

  public languages = {
    en: false,
    ru: false,
    chi: false,
    arab: false,
    span: false,
    port: false,
    ind: false,
    fran: false,
    dutch: false,
  };

  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;
  imageChangedEvent: any = '';

  public age: any = 1000;
  public resumeId: string = null;
  public cleanResumeForm = Object.assign({}, DEFAULT_RESUME_FORM); // схема незаполненнго резюме
  public isAuthorized = false; // проверка авторизации текущего пользователя
  public loadingPhotoButton = ''; // текст кнопки загрузки фото
  public currentUser = null;
  public phoneMask: any[] = ['+', '7', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  public nationalitiesDefault: any[] = null;
  public LocalizationService = LocalizationService;

  public textEditorConfig: any = {}; // для RichTextComponent'ы
  public dictionary: any = {};
  private subscriptions: Subscription[] = []; // для горчиях подписок
  private type: string = DEFAULT_TYPE; // создание/редактирование
  public resumeImage: any = DEFAULT_RESUME_IMAGE; // фотка по дефолту
  public getResumeSubscribe;
  public intervalEnd = false;

  // данные о заполняемом резюме
  public resumeForm: any = Object.assign({}, DEFAULT_RESUME_FORM); // само резюме
  public invalid = false; // форма валидна/нет
  public invalidTime = false; // в форме есть невалидное время
  public imagesOfCertificate: any = []; // фотки сертификатов
  public nameImagesOfCertificate: string[] = []; // имена фоток сертификатов
  public educationCityName: string[] = []; // образование: имена городов
  public trainingsCityName: string[] = []; // тренинги: имена городов
  public validExperienceTime: boolean[] = []; // места работы: валидность дат по отдельности
  public isValidExperienceTime: boolean = true; // места работы: валидность дат в общем
  public validCityTrainings: boolean[] = [];
  public isValidCityTrainings: boolean = true;
  public isBirthdayInvalid: boolean = true;
  public isBirthdayTouched: boolean = false;
  public listVisibleElement: any = {
    experience: [],
    education: [],
    languages: [],
    trainings: [],
  };

  constructor(private http: HttpClient,
              private userService: UserService,
              private resumeService: ResumeService,
              private router: Router,
              private _changeCityService: ChangeCityService,
              private _systemMessageService: SystemMessageService,
              private _dialog: MatDialog,
              @Inject(PLATFORM_ID) private platformId: Object,
              private _confirm: ConfirmService,
              public _localizationService: LocalizationService) {
  }

  saveResumeStorage() {
    if (isPlatformBrowser(this.platformId)) {
      if (typeof window !== 'undefined') {
        const resume = {
          resumeForm: this.resumeForm,
          invalid: this.invalid,
          invalidTime: this.invalidTime,
          imagesOfCertificate: this.imagesOfCertificate,
          nameImagesOfCertificate: this.nameImagesOfCertificate,
          educationCityName: this.educationCityName,
          trainingsCityName: this.trainingsCityName,
          validExperienceTime: this.validExperienceTime,
          isValidExperienceTime: this.isValidExperienceTime,
          validCityTrainings: this.validCityTrainings,
          isValidCityTrainings: this.isValidCityTrainings,
          isBirthdayInvalid: this.isBirthdayInvalid,
          isBirthdayTouched: this.isBirthdayTouched,
          listVisibleElement: this.listVisibleElement,
        };
        localStorage.setItem('resume', JSON.stringify(resume));
      }
    }
  }

  getResumeStorage() {
    if (isPlatformBrowser(this.platformId)) {
      if (typeof window !== 'undefined') {
        const resume = JSON.parse(localStorage.getItem('resume'));
        this.resumeForm = resume.resumeForm;
        this.invalid = resume.invalid;
        this.invalidTime = resume.invalidTime;
        this.imagesOfCertificate = resume.imagesOfCertificate;
        this.nameImagesOfCertificate = resume.nameImagesOfCertificate;
        this.educationCityName = resume.educationCityName;
        this.trainingsCityName = resume.trainingsCityName;
        this.validExperienceTime = resume.validExperienceTime;
        this.isValidExperienceTime = resume.isValidExperienceTime;
        this.validCityTrainings = resume.validCityTrainings;
        this.isValidCityTrainings = resume.isValidCityTrainings;
        this.isBirthdayInvalid = resume.isBirthdayInvalid;
        this.isBirthdayTouched = resume.isBirthdayTouched;
        this.listVisibleElement = resume.listVisibleElement;
      }
    }
  }

  ngOnInit(): void {
    this.http.get('/assets/json/nationalities.json')
      .subscribe(
        (nationalities: any) => {
          this.nationalitiesDefault = nationalities.list;
        });

    // подклюение локализцаии
    this._localizationService.currentDictionary
      .subscribe(
        res => {
          this.dictionary = res;

          if (!this.resumeImage.data) {
            this.loadingPhotoButton = res.LOAD_PHOTO;
          }

          this.nameImagesOfCertificate = this.nameImagesOfCertificate.map((certificate, index) => {
            if (this.imagesOfCertificate[index].data) {
              return certificate;
            } else {
              return res.TRAINING_CERTIFICATE_LOAD;
            }
          });

          // imagesOfCertificate
          // nameImagesOfCertificate
        },
      );

    // установка текста кнопки локализации из словаря
    this.loadingPhotoButton = this.dictionary.LOAD_PHOTO;

    // получить текущего юзера
    this.subscriptions.push(this.userService.user$
      .filter(user => !!user)
      .subscribe((user) => {
        this.isAuthorized = !!user;
        this.currentUser = Object.assign({}, user);
        this.resumeForm.phoneNumber = user.phone;
        this.resumeForm.email = user.email;
      }),
    );

    this.getResumeSubscribe = this.resumeService.resume$
      .take(1)
      .subscribe((resume) => {
        console.log('DEFAULT_RESUME_FORM', DEFAULT_RESUME_FORM);
        if (resume) {
          for (const key in resume) {
            if (resume.hasOwnProperty(key)) {
              this.resumeForm[key] = resume[key];
            }
          }
          this.resumeId = this.resumeForm._id;
          this.type = CHANGES_TYPE;
          this.resumeForm.experience.forEach(() => {
            this.validExperienceTime.push(true);
          });
          this.resumeForm.trainings.forEach((training, index) => {
            training.document = false;
            training.documentName = null;
            this.validCityTrainings.push(true);
            this.nameImagesOfCertificate[index] = this.dictionary.TRAINING_CERTIFICATE_LOAD;
          });

          this.resumeForm.experience.forEach(() => this.listVisibleElement.experience.push(true));
          this.resumeForm.education.forEach(() => this.listVisibleElement.education.push(true));
          this.resumeForm.trainings.forEach(() => this.listVisibleElement.trainings.push(true));
          this.resumeForm.languages.forEach((lang) => {
            this.listVisibleElement.languages.push(true);
            this.languages[lang.name] = true;
          });
        } else {
          this.type = DEFAULT_TYPE;

          for (const key in DEFAULT_RESUME_FORM) {
            if (DEFAULT_RESUME_FORM.hasOwnProperty(key)) {
              this.resumeForm[key] = DEFAULT_RESUME_FORM[key];
            }
          }

          this.resumeForm.salary = Object.assign({}, DEFAULT_SALARY);
          this.resumeForm.experience = [];
          this.resumeForm.education = [];
          this.resumeForm.trainings = [];
          this.resumeForm.languages = [];

          this.manageFields('languages');

          this.subscriptions.push(this.userService.user$
            .filter(user => !!user)
            .subscribe((user) => {
              this.resumeForm.phoneNumber = user.phone;
              this.resumeForm.email = user.email;
            }),
          );

          // if (isPlatformBrowser(this.platformId)) {
          //   if (typeof window !== 'undefined') {
          //     let savedResume = localStorage.getItem('resume');
          //     savedResume = savedResume ? JSON.parse(savedResume) : null;
          //     if (savedResume && savedResume['resumeForm']) {
          //       this.getResumeStorage();
          //     }
          //   }
          // }
          //
          //
          // const interval = setInterval(() => {
          //   this.saveResumeStorage();
          //   if (this.intervalEnd) {
          //     clearInterval(interval);
          //   }
          // }, 1000);
        }

      });
  }

  ngOnDestroy(): void {
    this.resumeService.setResume(null);
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.type = DEFAULT_TYPE;
    this.intervalEnd = true;
  }

  public showRequired(): void {
    this.invalid = true;
  }

  public checkTimeValid(mustBeInvalid): void {
    mustBeInvalid ? this.invalidTime = true : this.invalidTime = false;
  }

  public checkExperienceTimeValid(index, mustBeInvalid): void {
    mustBeInvalid ? this.invalidTime = true : this.invalidTime = false;

    const item = this.resumeForm.experience[index];
    this.validExperienceTime[index] = this._calculateTime(item, item.present) > 0;
    this.isValidExperienceTime = this.validExperienceTime.findIndex(exp => exp === false) > -1 ? false : true;
  }

  public manageFields(nameSection: string, index?: number): void {
    if (index === undefined) {
      let typeField: any = null;
      switch (nameSection) {
        case 'experience':
          typeField = Object.assign({}, DEFAULT_EXPERIENCE);
          this.validExperienceTime.push(false);
          break;
        case 'education':
          typeField = Object.assign({}, DEFAULT_EDUCATION);
          break;
        case 'languages':
          typeField = Object.assign({}, DEFAULT_LANGUAGE);
          break;
        case 'trainings':
          typeField = Object.assign({}, DEFAULT_TRAINING);
          this.validCityTrainings.push(false);
          this.isValidCityTrainings = false;
          this.nameImagesOfCertificate.push(this.dictionary.TRAINING_CERTIFICATE_LOAD);
          this.imagesOfCertificate.push(Object.assign({}, DEFAULT_CERTIFICATE_IMAGE));
          break;
        default:
          break;
      }
      this.resumeForm[nameSection].push(Object.assign({}, typeField));
      this.listVisibleElement[nameSection].push(true);
    } else {
      this._confirm.confirm(this.dictionary.APPROVED_MESSAGE_DELETE)
        .subscribe((res) => {
          if (res) {
            this.resumeForm[nameSection].splice(index, 1);
            if (nameSection === 'trainings') {
              this.nameImagesOfCertificate.splice(index, 1);
              this.imagesOfCertificate.splice(index, 1);
              this.trainingsCityName.splice(index, 1);
              this.validCityTrainings.splice(index, 1);
              this.isValidCityTrainings = this.validCityTrainings.findIndex(elem => elem === false) === -1;
            }
            if (nameSection === 'experience') {
              this.validExperienceTime.splice(index, 1);
            }
            if (nameSection === 'education') {
              this.educationCityName.splice(index, 1);
            }

            if (nameSection === 'languages') {
              this.setLangChecked();
            }
          }
          this._dialog.closeAll();
        });
    }
  }

  setLangChecked() {
    for (const key in this.languages) {
      this.languages[key] = false;
    }
    this.resumeForm.languages.forEach((lang) => {
      this.languages[lang.name] = true;
    });
  }

  public changeCity(index: number, nameField: string): void {
    const subscribe = this._changeCityService.changeCity()
      .subscribe((city: City) => {
        if (nameField === 'education') {
          this.resumeForm.education[index].city = city.code;
          this.resumeForm.education[index].country = city.codeCountry;
          this.educationCityName[index] = city.name;
        } else {
          this.resumeForm.trainings[index].city = city.code;
          this.resumeForm.trainings[index].country = city.codeCountry;
          this.trainingsCityName[index] = city.name;
          this.validCityTrainings[index] = true;
          this.isValidCityTrainings = this.validCityTrainings.findIndex(elem => elem === false) === -1;
        }
        subscribe.unsubscribe();
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
        }
      } else {
        this._systemMessageService.info(this.dictionary.INFO_MESSAGES_SIZE_FILE_MORE_THAN + '5mb');
      }
    }

    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    const reader = new FileReader();

    this.resumeImage.file = new File([event.file], this.loadingPhotoButton, {type: 'image/png'});

    if (new File([event.file], this.loadingPhotoButton)) {
      reader.readAsDataURL(this.resumeImage.file);
      reader.onload = () => {
        this.resumeImage.data = reader.result;
      };
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
        behavior: 'smooth',
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
      months: (timeOil + timeMining + timeOther) % 12,
    };
    // конец

    this.resumeForm.resumeLanguage = LocalizationService.currentLang();

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
            // this.intervalEnd = true;
            // if (isPlatformBrowser(this.platformId)) {
            //   if (typeof window !== 'undefined') {
            //     localStorage.removeItem('resume');
            //   }
            // }
            this.resumeForm = null;
            this.resumeService.setResume(null);
            this.router.navigate(['/personal-account', 'resume']);
          }
        });
    } else {
      delete this.resumeForm.userId;
      delete this.resumeForm._id;
      delete this.resumeForm.birthdayNormal;
      delete this.resumeForm.history;

      if (this.resumeForm.experience.length) {
        this.resumeForm.experience.forEach((experience) => {
          delete experience.time;
        });
      }

      delete this.resumeForm.status;
      delete this.resumeForm.age;
      delete this.resumeForm.creationDate;
      delete this.resumeForm.answered;

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
            this.resumeForm = null;
            this.resumeService.setResume(null);
            this.router.navigate(['resume', this.resumeId]);
          }
        });
    }
  }
}
